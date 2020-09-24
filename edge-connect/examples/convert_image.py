from PIL import Image
import os

path = "./places2/origin/"
file_list = os.listdir(path)
for file in file_list:
    # origin imager
    L_image = Image.open(path + str(file))
    print(str(file), L_image)
    ratio = L_image.size[1] / L_image.size[0]
    print(round(ratio * 256, 0))
    img_resize = L_image.resize((256, 256))
    out = img_resize.convert("RGB")

    # convert image
    if(str(file).endswith('mask.png')):
        out.save("./places2/masks/" + str(file).replace('_mask', ''))
    else:
        out.save("./places2/images/" + str(file))
