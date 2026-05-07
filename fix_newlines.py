import os
import re
import glob

# Find all HTML files
html_files = glob.glob('**/*.html', recursive=True)

fixed_count = 0

for file_path in html_files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check for and fix the broken escape sequence
        if '`n</body>' in content:
            content = content.replace('`n</body>', '\n</body>')
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Fixed: {file_path}')
            fixed_count += 1
    except Exception as e:
        print(f'Error with {file_path}: {e}')

print(f'Total files fixed: {fixed_count}')
