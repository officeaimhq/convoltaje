import urllib.request
import re

urls = [
    ("EcoFlow", "https://www.ecoflow.com/es/support/download/index"),
    ("Bluetti", "https://www.bluettipower.eu/pages/downloads"),
    ("Anker", "https://www.anker.com/pages/solix")
]

for name, url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        links = re.findall(r'href="([^"]+\.pdf[^"]*)"', html)
        print(f"--- {name} ---")
        for link in set(links):
            if 'delta' in link.lower() or 'ac200' in link.lower() or 'f2000' in link.lower() or '767' in link.lower():
                print(link)
    except Exception as e:
        print(f"Failed {name}: {e}")
