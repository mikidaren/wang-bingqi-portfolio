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
        return opener.open(urllib.request.Request(url, data=urllib.parse.urlencode(data).encode(), headers=h)).read().decode()
    except Exception as e:
        return f'ERROR: {e}'

# Login WB770-FREE
html = get('https://nic.eu.org/arf/en/login/')
token = re.search(r'csrfmiddlewaretoken" value="([^"]+)"', html).group(1)
post('https://nic.eu.org/arf/en/login/', {
    'csrfmiddlewaretoken': token, 'handle': 'WB770-FREE',
    'password': 'REDACTED-USE-LOCAL-CREDENTIAL-FILE', 'login': 'Login',
}, 'https://nic.eu.org/arf/en/login/')

# Get domain list page
html = get('https://nic.eu.org/arf/en/')
text = re.sub(r'<[^>]+>', ' ', html)
text = re.sub(r'\s+', ' ', text).strip()
if 'wangbingqi' in text.lower():
    idx = text.lower().find('wangbingqi')
    print(text[max(0,idx-50):idx+300])
else:
    print('wangbingqi.eu.org NOT in domain list')
    # Show all text
    start = text.find('Domain')
    if start > 0:
        print(text[start:start+600])
    else:
        print(text[:600])
