#!/usr/bin/env node
/**
 * 部署主站到 Cloudflare Worker（含静态资源）。
 *
 * 用法：npm run deploy
 *
 * ── 为什么需要这个脚本 ─────────────────────────────────────────────
 * 1) 必须先剥离 HTTP(S)_PROXY。
 *    本机（Clash 类 TUN 代理）会注入 http_proxy/https_proxy。wrangler 检测到后
 *    会让 undici 走该 HTTP 代理，**资源上传阶段必报 `fetch failed`**。
 *    2026-09-15 实测：带代理连败 8 次（每次约 55 秒），剥离后首次即成功。
 *    剥离后 Node 仍经 TUN 直连，对 api.cloudflare.com 的可达性无影响。
 *
 * 2) 凭据从 ~/.cloudflare-token 兜底读取。
 *    Token 不进项目、不进 git（本仓库是 public）。查找顺序：
 *      ① 环境变量 CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID
 *      ② ~/.cloudflare-token（KEY=VALUE 每行一条）
 *
 * 3) 内置重试（默认 6 次，可用 DEPLOY_ATTEMPTS 调整）。
 *    资源按内容哈希去重，重试不会重传已上传的部分
 *    （输出形如 `Uploaded 18 of 18 assets (35 already uploaded)`）。
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const WRANGLER = resolve(
  process.env.WRANGLER_BIN ??
    'C:/Users/mikid/.workbuddy/binaries/node/workspace/node_modules/wrangler/bin/wrangler.js',
);
if (!existsSync(WRANGLER)) {
  console.error(`✗ 找不到 wrangler：${WRANGLER}`);
  console.error('  可用环境变量 WRANGLER_BIN 指定其它路径。');
  process.exit(1);
}

if (!existsSync(join(root, 'dist'))) {
  console.error('✗ 缺少 dist/，请先执行 npm run build');
  process.exit(1);
}

// ── 1. 剥离代理 ────────────────────────────────────────────────────
const env = { ...process.env };
const stripped = [];
for (const key of [
  'http_proxy', 'https_proxy', 'all_proxy',
  'HTTP_PROXY', 'HTTPS_PROXY', 'ALL_PROXY',
]) {
  if (env[key]) {
    stripped.push(key);
    delete env[key];
  }
}
if (stripped.length) {
  console.log(`· 已剥离代理变量：${stripped.join(', ')}（否则上传阶段会 fetch failed）`);
}

// ── 2. 凭据兜底 ────────────────────────────────────────────────────
const tokenFile = join(homedir(), '.cloudflare-token');
if ((!env.CLOUDFLARE_API_TOKEN || !env.CLOUDFLARE_ACCOUNT_ID) && existsSync(tokenFile)) {
  for (const line of readFileSync(tokenFile, 'utf8').split(/\r?\n/)) {
    const m = /^\s*([A-Z_]+)\s*=\s*(.+?)\s*$/.exec(line);
    if (m && !env[m[1]]) env[m[1]] = m[2];
  }
  console.log(`· 已从 ${tokenFile} 载入凭据`);
}
if (!env.CLOUDFLARE_API_TOKEN) {
  console.error('✗ 缺少 CLOUDFLARE_API_TOKEN');
  console.error(`  写入 ${tokenFile}：`);
  console.error('    CLOUDFLARE_API_TOKEN=<token>');
  console.error('    CLOUDFLARE_ACCOUNT_ID=<account id>');
  process.exit(1);
}

env.WRANGLER_SEND_METRICS = 'false';

// ── 3. 部署（内置重试）─────────────────────────────────────────────
// 上传通道对代理敏感、且本身有抖动，单次失败属常态（2026-09-15 实测：
// 带代理 8 次全败、剥离代理后 1 成 1 败）。资源按内容哈希去重，重试不会
// 重传已上传的部分，因此「直接重跑」是最有效的对策 —— 这里自动化它。
const MAX_ATTEMPTS = Number(process.env.DEPLOY_ATTEMPTS ?? 6);
const extraArgs = process.argv.slice(2);

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
  console.log(`\n── 部署尝试 ${attempt}/${MAX_ATTEMPTS} ──`);
  const r = spawnSync(process.execPath, [WRANGLER, 'deploy', ...extraArgs], {
    stdio: 'inherit',
    cwd: root,
    env,
  });
  if (r.status === 0) {
    console.log('\n✓ 部署成功');
    process.exit(0);
  }
  if (attempt < MAX_ATTEMPTS) {
    const wait = Math.min(3 * attempt, 15);
    console.log(`\n✗ 第 ${attempt} 次失败（多为上传通道抖动），${wait}s 后重试…`);
    await new Promise((res) => setTimeout(res, wait * 1000));
  }
}

console.error(`\n✗ 连续 ${MAX_ATTEMPTS} 次部署失败。`);
console.error('  脚本已剥离 http_proxy / https_proxy；若仍持续失败，临时关闭代理软件再试。');
console.error(`  可用 DEPLOY_ATTEMPTS=<次数> 调整重试上限（当前 ${MAX_ATTEMPTS}）。`);
process.exit(1);
