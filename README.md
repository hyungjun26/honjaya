# 혼자야

> **AI 이미지 편집 서비스**  
> 유명 관광지, 포토존은 항상 사람이 많고  
> 그 속에서 맘에 드는 사진을 남기기 위해 노력합니다.  
> 하지만 원치 않는 사람, 차와 같은 피사체가 함께 담긴 사진이 갤러리 속 하나는 존재할 것입니다.  
> 이를 위한, AI 이미지 편집 모바일 서비스입니다.  

## Requirements
* [yolact
](https://github.com/tristan3716/yolact)
a
## Setup
``` sh
git clone --recursive https://lab.ssafy.com/s03-ai-sub2/s03p23a409.git
```

## Execute
### Image segmentation
``` sh
cd yolact
python eval.py --trained_model=weights/yolact_base_54_800000.pth --score_threshold=0.15 --top_k=15 --image=images/input/example.jpg:images/output/example.png
```

## Contribute
[CONTRIBUTUING](./CONTRIBUTING.md)