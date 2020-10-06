<template>
  <div class="main">
    <img src="@/assets/intro1.png" width="100%" />
    <div class="logo">
      <img src="@/assets/logo.png" alt="혼자야" class="logo2" />

      <br />
      <br />

      <div class="description">
        유명 관광지는 항상 사람들이 많고 <br />
        좋은 사진을 남기기 위해 노력합니다.<br />
        하지만, 원치않는 피사체가 함께 담긴<br />
        사진이 갤러리 속 하나는 존재할 것입니다.<br />
        이를 위한, 편집 모바일 서비스를 기획하였습니다.
      </div>
    </div>
    <img src="@/assets/intro2.png" width="100%" />
    <img src="@/assets/intro3.png" width="100%" />

    <footer>Copyright © 2020 SSAFY 3기 서울 4반 9조</footer>
    <br />
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.logo2 {
  width: 40%;
}

.main {
  background-image: url("../assets/background2.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}
.description {
  font-family: "S-CoreDream-3Light";
  font-size: 2rem;
}

.logo {
  position: absolute;
  top: 15%;
  left: 7%;
}

footer {
  text-align: center;
  font-size: 1.5rem;
  font-family: "S-CoreDream-3Light";
}

@media (max-width: 1551px) {
  .description {
    font-size: 1.8rem;
  }
  .logo {
    top: 12%;
  }

  footer {
    font-size: 1.3rem;
  }
}
@media (max-width: 1360px) {
  .description {
    font-size: 1.45rem;
  }

  .logo {
    top: 10%;
  }

  .logo2 {
    width: 35%;
  }
}

@media (max-width: 1000px) {
  .description {
    font-size: 1.3rem;
  }

  .logo {
    top: 10%;
  }

  .logo2 {
    width: 30%;
  }

  footer {
    font-size: 1rem;
  }
}

@media (max-width: 860px) {
  .description {
    font-size: 1rem;
  }

  .logo {
    top: 7%;
  }

  .logo2 {
    width: 28%;
  }

  footer {
    font-size: 0.8rem;
  }
}
@media (max-width: 690px) {
  .description {
    font-size: 0.875rem;
  }

  .logo {
    top: 5%;
  }

  .logo2 {
    width: 28%;
  }
}

@media (max-width: 600px) {
  .description {
    font-size: 0.75rem;
  }

  .logo {
    top: 5%;
  }

  .logo2 {
    width: 28%;
  }
  footer {
    font-size: 0.6rem;
  }
}
@media (max-width: 495px) {
  .description {
    font-size: 0.65rem;
  }

  .logo {
    top: 5%;
  }

  .logo2 {
    width: 28%;
  }
  footer {
    font-size: 0.55rem;
  }
}

@media (max-width: 425px) {
  .description {
    font-size: 0.55rem;
  }

  .logo {
    top: 5%;
  }

  .logo2 {
    width: 28%;
  }

  footer {
    font-size: 10px;
  }
}

@media (max-width: 400px) {
  .description {
    font-size: 12px;
  }

  .logo {
    top: 3%;
  }

  .logo2 {
    width: 28%;
  }
}

@media (max-width: 375px) {
  .description {
    font-size: 10px;
  }

  .logo {
    top: 3%;
    left: 5%;
  }

  .logo2 {
    width: 28%;
  }
}

@font-face {
  font-family: "S-CoreDream-3Light";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
</style>
