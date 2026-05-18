from PIL import Image
import sys

img = Image.open(sys.argv[1]).convert('L')
img = img.resize((60, 20))
pixels = img.getdata()
chars = ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "]
new_pixels = [chars[pixel//26] for pixel in pixels]
new_pixels = ''.join(new_pixels)
new_pixels_count = len(new_pixels)
ascii_image = [new_pixels[index:index+60] for index in range(0, new_pixels_count, 60)]
print("\n".join(ascii_image))
