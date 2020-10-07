<template>
  <div class="main">
    <img src="@/assets/intro1.png" width="100%" />
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

.main {
  background-image: url("../assets/background2.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}
footer {
  text-align: center;
  font-size: 1.5rem;
  font-family: "S-CoreDream-3Light";
}

@media (max-width: 1551px) {
  footer {
    font-size: 1.3rem;
  }
}

@media (max-width: 1000px) {
  footer {
    font-size: 1rem;
  }
}

@media (max-width: 860px) {
  footer {
    font-size: 0.8rem;
  }
}

@media (max-width: 600px) {
  footer {
    font-size: 0.6rem;
  }
}
@media (max-width: 495px) {
  footer {
    font-size: 0.55rem;
  }
}

@media (max-width: 425px) {
  footer {
    font-size: 10px;
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
