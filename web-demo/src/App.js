import React, { useState } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import { Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";

import img from "./img/unnamed.png";

function App() {
  const [state, setstate] = useState(img);
  const imageHandler = (e) => {
    const reader = new FileReader();
    console.log(reader);
    reader.onload = () => {
      if (reader.readyState === 2) {
        console.log(reader.result);
        setstate(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const detectionHandler = () => {
    if (state === "/static/media/unnamed.b23bc92e.png") {
      alert("이미지를 선택해주세요!");
      return;
    }
    axios({
      method: "post",
      url: "http://localhost:8000", // 추가해야할 영역
      data: { imgSrc: state },
    }).then((e) => {
      console.log(e);
    });
  };
  return (
    <div className="App">
      <Container>
        <Typography>Object Detection</Typography>
        <Grid container justify="center">
          <img src={state} style={{ width: "40%", height: "40%" }} />
        </Grid>
        <Grid container justify="center">
          <input
            type="file"
            name="image upload"
            id="input"
            accept="image/*"
            onChange={imageHandler}
          />
        </Grid>
        <Grid container justify="center">
          <Button
            variant="contained"
            color="primary"
            onClick={detectionHandler}
          >
            Detection
          </Button>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
