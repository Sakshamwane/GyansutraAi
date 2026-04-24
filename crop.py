from PIL import Image, ImageOps

img = Image.open("/Users/apple/.gemini/antigravity/brain/09969cbc-aad1-4eae-8e2c-0d7cf12df830/media__1776985341166.jpg")

# Convert to grayscale
gray = img.convert("L")

# Assuming background is light, we find pixels darker than a threshold (e.g. 240)
# Create a mask where text/logo is 255, background is 0
mask = gray.point(lambda p: 255 if p < 240 else 0)

bbox = mask.getbbox()
if bbox:
    padding = 10
    bbox = (
        max(0, bbox[0] - padding),
        max(0, bbox[1] - padding),
        min(img.width, bbox[2] + padding),
        min(img.height, bbox[3] + padding)
    )
    cropped = img.crop(bbox)
    cropped.save("/Users/apple/Documents/Gyansutra/public/logo.jpg")
    print("Cropped and saved to public/logo.jpg")
else:
    print("Failed to find bounding box")
