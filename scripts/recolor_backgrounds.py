from PIL import Image, ImageFilter
import os
import glob

def recolor_background(image_path, target_rgb=(226, 226, 226)):
    img = Image.open(image_path).convert('RGB')
    width, height = img.size
    
    # We can also check the background sample from the 4 corners
    corners = [
        img.getpixel((10, 10)),
        img.getpixel((width - 10, 10)),
        img.getpixel((10, height - 10)),
        img.getpixel((width - 10, height - 10))
    ]
    avg_bg = [sum(c[i] for c in corners) / 4.0 for i in range(3)]
    print(f"Processing {os.path.basename(image_path)} - detected corner avg RGB: {avg_bg}")

    # Create an alpha mask based on color distance to background and low saturation
    mask = Image.new('L', (width, height), 0)
    
    pixels = img.load()
    mask_pixels = mask.load()
    
    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            
            # Check saturation / neutralness
            max_c = max(r, g, b)
            min_c = min(r, g, b)
            diff = max_c - min_c
            brightness = (r + g + b) / 3.0
            
            # Distance to corner background color
            dist = ((r - avg_bg[0])**2 + (g - avg_bg[1])**2 + (b - avg_bg[2])**2)**0.5
            
            # If it's neutral light background
            if diff <= 18 and brightness >= 185 and dist <= 45:
                # Soft blend factor
                factor = min(1.0, max(0.0, (45 - dist) / 25.0))
                mask_pixels[x, y] = int(255 * factor)
            elif diff <= 12 and brightness >= 210:
                mask_pixels[x, y] = 255
            else:
                mask_pixels[x, y] = 0

    # Smooth the mask to avoid harsh edges
    mask = mask.filter(ImageFilter.GaussianBlur(radius=1.2))
    
    # Create target background image
    target_bg = Image.new('RGB', (width, height), target_rgb)
    
    # Composite original image over target background using the mask
    final_img = Image.composite(target_bg, img, mask)
    final_img.save(image_path, quality=95)
    print(f"✓ Successfully recolored background to #E2E2E2 for {os.path.basename(image_path)}")

def main():
    hoodie_dir = 'public/products/hoodies'
    target_files = [
        'nike-club-fleece-front.jpg',
        'nike-club-fleece-back.jpg',
        'nike-club-fleece-model-1.jpg',
        'nike-club-fleece-model-2.jpg',
        'essentials-oatmeal-front.jpg',
        'essentials-oatmeal-back.jpg',
        'essentials-oatmeal-model-1.jpg',
        'essentials-oatmeal-model-2.jpg',
        'stussy-8ball-front.jpg',
        'stussy-8ball-back.jpg',
        'stussy-8ball-model-1.jpg',
        'stussy-8ball-model-2.jpg'
    ]
    
    for filename in target_files:
        filepath = os.path.join(hoodie_dir, filename)
        if os.path.exists(filepath):
            recolor_background(filepath, target_rgb=(226, 226, 226))
            
if __name__ == '__main__':
    main()
