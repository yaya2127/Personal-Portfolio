import sys
import os
from PIL import Image

input_path = r'c:\yared-portfolio\assets\images\profile.png'
output_path = r'c:\yared-portfolio\assets\images\profile.png'

try:
    from rembg import remove
    print("Using rembg for AI background removal...")
    with open(input_path, 'rb') as i:
        input_data = i.read()
        output_data = remove(input_data)
    with open(output_path, 'wb') as o:
        o.write(output_data)
    print("Successfully removed background with rembg!")
except Exception as e:
    print("rembg not ready yet or error:", e)
    print("Applying precision alpha mask background removal...")
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        # Detect dark studio background pixels (low R, G, B near black/brown studio bg)
        r, g, b, a = item
        # Calculate luminance and color distance from portrait skin/suit
        luminance = 0.299 * r + 0.587 * g + 0.114 * b
        if luminance < 35 and abs(r - g) < 15 and abs(g - b) < 15:
            # Fade to transparent
            alpha = int(max(0, (luminance / 35.0) ** 2 * 255))
            new_data.append((r, g, b, alpha))
        else:
            new_data.append((r, g, b, a))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print("Saved alpha-masked portrait!")
