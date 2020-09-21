from PIL import Image

# origin imager
L_path = './places2/origin/places2_07.png'
L_image = Image.open(L_path)
print(L_image)
out = L_image.convert("RGB")

# convert image
out.save("./places2/masks/places2_07.png")
