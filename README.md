# 혼자야

> **AI 이미지 편집 서비스**  
> 유명 관광지, 포토존은 항상 사람이 많고  
> 그 속에서 맘에 드는 사진을 남기기 위해 노력합니다.  
> 하지만 원치 않는 사람, 차와 같은 피사체가 함께 담긴 사진이 갤러리 속 하나는 존재할 것입니다.  
> 이를 위한, AI 이미지 편집 모바일 서비스입니다.  

:clapper: [Checkout Live Demo](https://youtu.be/tROn0HdZoC8)

## 앱 실행화면

![](./images/1.png)
![](./images/2.png)
![](./images/3.png)
![](./images/4.png)
![](./images/5.png)

## Setup
``` sh
git clone https://lab.ssafy.com/s03-ai-sub3/s03p23a409.git
cd s03p23a409
conda env create -f environment.yml
```

Download the model and place it in the correct location.
You can use download script (`bash install.sh`)

|path|link|
|----|----|
|yolact/weights/|[download](https://drive.google.com/drive/folders/1NFJQVP_h1WaXfV8ZfhVz6HJwKd2f6r7w)|
|edge-connect/checkpoints/|[download](https://drive.google.com/drive/folders/1rE1KyIPEa_a8yszWXx7t9g3AbUdZFHjd)|


## Execute
### Image segmentation
``` sh
cd yolact
python eval.py --trained_model=weights/yolact_base_54_800000.pth --score_threshold=0.15 --top_k=15 --image=images/input/example.jpg:images/output/example.png
python eval.py --trained_model=weights/yolact_base_54_800000.pth --score_threshold=0.15 --top_k=15 --image=images/input/example.jpg:images/output/example.png --skip=[0] # 남길 오브젝트의 id
```

### Object Remove
``` sh
cd edge-connect
python test.py --checkpoints ./checkpoints/places2 --input ./examples/places2/images --mask ./examples/places2/masks --output ./checkpoints/results
```

## Contribute
[Contribute Guide](./CONTRIBUTING.md)

## License
[MIT License](./LICENSE)
