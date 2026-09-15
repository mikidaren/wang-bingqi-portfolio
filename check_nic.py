"""查询 nic.eu.org 上 wangbingqi.eu.org 的域名状态。

⚠️ 凭据不再硬编码。2026-09-15 本文件中的明文密码曾随 public 仓库推送而泄露，
   现已外置：优先读环境变量 NIC_HANDLE / NIC_PASSWORD，
   否则读家目录 ~/.nic-eu-org-cred（每行一条 KEY=VALUE）。

用法：
    python check_nic.py
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
        return opener.open(urllib.request.Request(url, data=urllib.parse.urlencode(data).encode(), headers=h)).read().decode()
    except Exception as e:
        return f'ERROR: {e}'


# Login
html = get('https://nic.eu.org/arf/en/login/')
token = re.search(r'csrfmiddlewaretoken" value="([^"]+)"', html).group(1)
post('https://nic.eu.org/arf/en/login/', {
    'csrfmiddlewaretoken': token, 'handle': HANDLE,
    'password': PASSWORD, 'login': 'Login',
}, 'https://nic.eu.org/arf/en/login/')

# Get domain list page
html = get('https://nic.eu.org/arf/en/')
text = re.sub(r'<[^>]+>', ' ', html)
text = re.sub(r'\s+', ' ', text).strip()
if 'wangbingqi' in text.lower():
    idx = text.lower().find('wangbingqi')
    print(text[max(0, idx - 50):idx + 300])
else:
    print('wangbingqi.eu.org NOT in domain list')
    # Show all text
    start = text.find('Domain')
    if start > 0:
        print(text[start:start + 600])
    else:
        print(text[:600])
