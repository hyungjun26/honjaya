from PIL import Image
import os

path = "./places2/origin/"
file_list = os.listdir(path)
for file in file_list:
    # origin imager
    L_image = Image.open(path + str(file))
    print(str(file), L_image)
    out = L_image.convert("RGB")

    # convert image
    if(str(file).endswith('mask.png')):
        out.save("./places2/masks/" + str(file).replace('_mask', ''))
    else:
        out.save("./places2/images/" + str(file))
