from pathlib import Path
import re

root = Path('.')
source = (root / 'index.html').read_text(encoding='utf-8')

# Extract full header block from index.html
header_match = re.search(r'(<div class="aa-header" role="banner">.*?</div>\s*</div>)', source, re.S)
if not header_match:
    raise SystemExit('Header block not found in index.html')
base_header = header_match.group(1)

def clean_active_classes(header_text: str) -> str:
    # Remove is-active from classes and details tags
    header_text = re.sub(r'class="([^"]*)\bis-active\b([^"]*)"', r'class="\1\2"', header_text)
    header_text = re.sub(r'<details class="([^"]*)\bis-active\b([^"]*)"', r'<details class="\1\2"', header_text)
    # Clean up double spaces inside class attributes
    header_text = re.sub(r'class="\s+', 'class="', header_text)
    header_text = re.sub(r'\s+"', '"', header_text)
    header_text = re.sub(r'\s{2,}', ' ', header_text)
    return header_text

def set_active_class(header_text: str, filename: str) -> str:
    header_text = clean_active_classes(header_text)
    fn = filename.lower()
    
    if fn in ('index.html', 'home page.html', 'landing page 2.html'):
        header_text = header_text.replace('href="index.html"', 'href="index.html" class="is-active"')
    elif fn in ('our story.html', 'meet the team page.html', 'about us.html', 'founders note.html'):
        header_text = header_text.replace('<details class="aa-dd">', '<details class="aa-dd is-active">', 1)
    elif fn in ('the executive.html', 'the overnight companion.html', 'the tourist.html', 'the explorer.html'):
        matches = list(re.finditer(r'<details class="aa-dd">', header_text))
        if len(matches) >= 2:
            start = matches[1].start()
            header_text = header_text[:start] + '<details class="aa-dd is-active">' + header_text[start + len('<details class="aa-dd">'):]
    elif fn in ('pricing main.html', 'pricing.html'):
        header_text = header_text.replace('href="Pricing Main.html"', 'href="Pricing Main.html" class="is-active"')
    elif fn in ('booking.html', 'booking.html.html'):
        header_text = header_text.replace('href="Booking.html"', 'href="Booking.html" class="is-active"')
    elif fn in ('insight hub.html', 'faqs.html', 'career page.html', 'safety & trust - main.html', 'blog.html', 'insight parent resources_page.html', 'insight downloadable documents page.html', 'insight media & press page.html'):
        header_text = header_text.replace('details class="aa-dd aa-dd--right"', 'details class="aa-dd aa-dd--right is-active"')
        
    return header_text

def adjust_paths(text: str, page_path: Path) -> str:
    prefix = '../' if page_path.parent.name == 'HTML' else ''
    if not prefix:
        return text
        
    # Adjust href="..."
    for match_obj in re.finditer(r'href="([^"]+)"', text):
        url = match_obj.group(1)
        if not url.startswith(('http://', 'https://', 'mailto:', '#', '/', './', '../')):
            text = text.replace(f'href="{url}"', f'href="{prefix}{url}"')
            
    # Adjust src="..."
    for match_obj in re.finditer(r'src="([^"]+)"', text):
        url = match_obj.group(1)
        if not url.startswith(('http://', 'https://', 'mailto:', '#', '/', './', '../')):
            text = text.replace(f'src="{url}"', f'src="{prefix}{url}"')
            
    # Adjust onclick="window.location.href='...';"
    for match_obj in re.finditer(r"window\.location\.href='([^']+)'", text):
        url = match_obj.group(1)
        if not url.startswith(('http://', 'https://', 'mailto:', '#', '/', './', '../')):
            text = text.replace(f"window.location.href='{url}'", f"window.location.href='{prefix}{url}'")
            
    return text

count = 0
for f in root.rglob('*.html'):
    if f.name == 'index.html':
        continue
    text = f.read_text(encoding='utf-8')
    header_match = re.search(r'(<div class="aa-header" role="banner">.*?</div>\s*</div>)', text, re.S)
    if not header_match:
        continue
        
    updated_header = set_active_class(base_header, f.name)
    updated_header = adjust_paths(updated_header, f)
    
    new_text, n = re.subn(r'<div class="aa-header" role="banner">.*?</div>\s*</div>', updated_header, text, count=1, flags=re.S)
    if n > 0:
        f.write_text(new_text, encoding='utf-8')
        count += 1

print(f'Updated header in {count} pages')
