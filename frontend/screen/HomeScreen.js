import {
  Button,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as React from "react";

import tutorial from "../img/tutorial.png";

export default function HomeScreen({ navigation }) {
  const [state, setstate] = React.useState(require("../img/tutorial.png"));
  window.onload = function () {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      var draw = canvas.getContext("2d");

      var img = new Image();
      img.src = tutorial;
      img.onload = function () {
        draw.drawImage(img, 0, 0, 728, 549);
      };
    }
  };
  const tryHandler = () => {
    setstate(require("../img/prediction_result.png"));
  };
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Object Detection</Text>
      <Image source={state} style={{ width: 300, height: 200 }} />
      <Button title="try it" onPress={tryHandler} />
    </SafeAreaView>
  );
}
