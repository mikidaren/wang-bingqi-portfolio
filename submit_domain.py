import urllib.request, urllib.parse, http.cookiejar, re

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

# Login WB770-FREE
html = get('https://nic.eu.org/arf/en/login/')
token = re.search(r'csrfmiddlewaretoken" value="([^"]+)"', html).group(1)
post('https://nic.eu.org/arf/en/login/', {
    'csrfmiddlewaretoken': token, 'handle': 'WB770-FREE',
    'password': 'REDACTED-USE-LOCAL-CREDENTIAL-FILE', 'login': 'Login',
}, 'https://nic.eu.org/arf/en/login/')

# Get domain form
html = get('https://nic.eu.org/arf/en/domain/new/', 'https://nic.eu.org/arf/en/')
token2 = re.search(r'csrfmiddlewaretoken" value="([^"]+)"', html).group(1)

data = {
    'csrfmiddlewaretoken': token2, 'fqdn': 'wangbingqi.eu.org',
    'pn1': 'WANG Bingqi', 'ad1': 'City University of Hong Kong',
    'ad2': 'Hong Kong SAR', 'ad3': '', 'ad4': '', 'ad5': '',
    'ad6': 'HK', 'ph1': '+852 65794316', 'fx1': '',
    'private': 'on', 'th': 'WB770-FREE', 'level': '3',
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
        ctx = text[max(0,idx-30):idx+120]
        print(f'[{kw}]: {ctx}')
