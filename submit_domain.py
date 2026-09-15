"""向 nic.eu.org 提交 wangbingqi.eu.org 域名申请。

⚠️ 凭据不再硬编码。2026-09-15 本文件中的明文密码曾随 public 仓库推送而泄露，
   现已外置：优先读环境变量 NIC_HANDLE / NIC_PASSWORD，
   否则读家目录 ~/.nic-eu-org-cred（每行一条 KEY=VALUE）。

用法：
    python submit_domain.py
"""
import os
import pathlib
import re
import urllib.request, urllib.parse, http.cookiejar


def cred(name, default=''):
    """读凭据：环境变量优先，其次 ~/.nic-eu-org-cred。"""
    v = os.environ.get(name)
    if v:
        return v
    f = pathlib.Path.home() / '.nic-eu-org-cred'
    if f.exists():
        for line in f.read_text(encoding='utf-8').splitlines():
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            k, _, val = line.partition('=')
            if k.strip() == name:
                return val.strip()
    return default


HANDLE = cred('NIC_HANDLE', 'WB770-FREE')
PASSWORD = cred('NIC_PASSWORD')
if not PASSWORD:
    raise SystemExit(
        '缺少 NIC_PASSWORD。请设置环境变量，或写入 ~/.nic-eu-org-cred：\n'
        '  NIC_HANDLE=WB770-FREE\n'
        '  NIC_PASSWORD=<密码>'
    )

cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))


def get(url, ref=''):
    h = {'User-Agent': 'Mozilla/5.0'}
    if ref: h['Referer'] = ref
    return opener.open(urllib.request.Request(url, headers=h)).read().decode()


def post(url, data, ref=''):
    h = {'User-Agent': 'Mozilla/5.0', 'Content-Type': 'application/x-www-form-urlencoded', 'Referer': ref}
    try:
        resp = opener.open(urllib.request.Request(url, data=urllib.parse.urlencode(data).encode(), headers=h))
        return resp.read().decode(), resp.geturl()
    except Exception as e:
        return f'ERROR: {e}', ''


# Login
html = get('https://nic.eu.org/arf/en/login/')
token = re.search(r'csrfmiddlewaretoken" value="([^"]+)"', html).group(1)
post('https://nic.eu.org/arf/en/login/', {
    'csrfmiddlewaretoken': token, 'handle': HANDLE,
    'password': PASSWORD, 'login': 'Login',
}, 'https://nic.eu.org/arf/en/login/')

# Get domain form
html = get('https://nic.eu.org/arf/en/domain/new/', 'https://nic.eu.org/arf/en/')
token2 = re.search(r'csrfmiddlewaretoken" value="([^"]+)"', html).group(1)

data = {
    'csrfmiddlewaretoken': token2, 'fqdn': 'wangbingqi.eu.org',
    'pn1': 'WANG Bingqi', 'ad1': 'City University of Hong Kong',
    'ad2': 'Hong Kong SAR', 'ad3': '', 'ad4': '', 'ad5': '',
    'ad6': 'HK', 'ph1': '+852 65794316', 'fx1': '',
    'private': 'on', 'th': HANDLE, 'level': '3',
    'f1': 'khalid.ns.cloudflare.com', 'i1': '',
    'f2': 'malavika.ns.cloudflare.com', 'i2': '',
    'submit': 'Create',
}
for n in range(3, 10):
    data[f'f{n}'] = ''
    data[f'i{n}'] = ''

result, url = post('https://nic.eu.org/arf/en/domain/new/', data, 'https://nic.eu.org/arf/en/domain/new/')
text = re.sub(r'<[^>]+>', ' ', result)
text = re.sub(r'\s+', ' ', text).strip()
for kw in ['successfully', 'storing', 'IGNORED', 'already', 'Error', 'No error']:
    idx = text.lower().find(kw.lower())
    if idx >= 0:
        ctx = text[max(0, idx - 30):idx + 120]
        print(f'[{kw}]: {ctx}')
