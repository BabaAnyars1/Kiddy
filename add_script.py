import os
import re

# Files that need the script tag
files_to_update = [
    'blog.html', 'contact.html', 'FAQs.html', 'footer.html', 
    'Meet the Team Page.html', 'Our Story.html', 'The Executive.html',
    'HTML/About Us.html', 'HTML/Blog page.html', 'HTML/Booking Guidance.html',
    'HTML/Booking Processes.html', 'HTML/Career page.html', 'HTML/Comparison_page.html',
    'HTML/Contact Us page.html', 'HTML/Home page.html', 
    'HTML/Insight Downloadable documents page.html', 'HTML/Insight Hub.html',
    'HTML/Insight Media & Press page.html', 'HTML/Insight Parent Resources_page.html',
    'HTML/Landing page 2.html', 'HTML/Privacy Notice.html',
    'HTML/Safety & Trust - Main.html', 'HTML/Terms_of_Service.html',
    'HTML/The Explorer.html', 'HTML/The Overnight Companion.html', 'HTML/The Tourist.html'
]

for file_path in files_to_update:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        if 'script src' not in content or 'script.js' not in content:
            content = re.sub(r'(</body>)', r'  <script src="script.js"></script>\n\1', content)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print('Updated: ' + file_path)
