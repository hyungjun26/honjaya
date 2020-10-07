import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import DefualtLoading from "./DefualtLoading";

export default function ObjectDetect({
  state,
  onPressNext,
  setMaskList,
  setImageKey,
}) {
  const [loading, setLoading] = useState(false);
  const detectHandler = () => {
    //console.log(String(state.uri).length);
    setLoading(true);
    if (state.uri === "noimage") {
      alert("이미지를 선택해주세요!!");
      return;
    }
    const formData = new FormData();
    let key = null;
    let localUri = state.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append("img", { uri: localUri, name: filename, type });
    //console.log(formData);
    axios({
      method: "post",
      url: "http://1.233.63.235:8000",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.request);
        setImageKey(res.data.key);
        const temp = [];
        const array = res.data.objects;
        for (let idx = 0; idx < array.length; idx++) {
          const element = array[idx];
          temp.push({
            id: element.id,
            type: element.type,
            selected: false,
            file: `data:image/png;base64,${array[idx].image}`,
          });
        }
        setLoading(false);
        setMaskList(temp);
        onPressNext();
      })
      .catch(() => {
        setLoading(false);
        alert("오류가 발생했습니다.");
      });
  };
  return (
    <View style={styles.container}>
      <DefualtLoading state={loading} />
      <Image
        source={{ uri: state.uri }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.instructions}>오브젝트 디텍션을 실행해주세요.</Text>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={detectHandler}>
          <Icon style={{ fontSize: 25, color: "#999" }} name="target-account" />
          <Text style={styles.buttonText}>오브젝트 디텍션</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 400,
    height: 300,
    marginBottom: 20,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#999",
    width: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    color: "#999",
  },
});
