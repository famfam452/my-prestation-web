import os
import re
import glob

def parse_figma_css(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Regex to find all comments and the text that follows them
    # A block starts with a comment.
    
    # Let's split by /* ... */
    # This regex captures comments and the text between them.
    parts = re.split(r'(/\*.*?\*/)', content, flags=re.DOTALL)
    
    blocks = []
    current_class = None
    current_properties = []
    
    ignore_comments = ['auto layout', 'inside auto layout', 'fill_icon']
    
    class_counts = {}
    
    for part in parts:
        part = part.strip()
        if not part:
            continue
            
        if part.startswith('/*') and part.endswith('*/'):
            comment_text = part[2:-2].strip()
            comment_lower = comment_text.lower()
            
            # Check if it's an ignorable comment
            if comment_lower in ignore_comments or comment_lower.startswith('identical to box height') or comment_lower.startswith('or ') or comment_lower.startswith('note:'):
                current_properties.append(f"  {part}")
            else:
                # Save previous block
                if current_class and current_properties:
                    blocks.append((current_class, current_properties))
                
                # Start new class
                base_class = comment_lower.replace(' ', '-').replace('_', '-')
                base_class = re.sub(r'[^a-z0-9\-]', '', base_class)
                if not base_class:
                    base_class = "element"
                    
                # Handle duplicates
                if base_class in class_counts:
                    class_counts[base_class] += 1
                    current_class = f"{base_class}-{class_counts[base_class]}"
                else:
                    class_counts[base_class] = 1
                    current_class = base_class
                    
                current_properties = []
        else:
            if current_class:
                # It's a block of properties
                lines = part.split('\n')
                for line in lines:
                    line_stripped = line.strip()
                    if line_stripped:
                        current_properties.append(f"  {line_stripped}")

    if current_class and current_properties:
        blocks.append((current_class, current_properties))
        
    return blocks

files = glob.glob('ref/**/*.css', recursive=True)
for f in files:
    blocks = parse_figma_css(f)
    print(f"Parsing {f}... Found {len(blocks)} classes.")
    
    # Let's see the output for a small file
    if 'button_1_style.css' in f:
        print(f"--- {f} ---")
        for cls, props in blocks:
            print(f".{cls} {{")
            print('\n'.join(props))
            print("}")
