import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CheckBox from "./CoustomCheckBox.js";
import Icon from "react-native-vector-icons/Feather";
import axios from "axios";
import DefualtLoading from "./DefualtLoading";

const initialState = [
  {
    id: 0,
    type: "people1",
    selected: false,
    file: require("../dummy-image/mask1.png"),
  },
  {
    id: 1,
    type: "people2",
    selected: false,
    file: require("../dummy-image/mask2.png"),
  },
];

function ObjectSelect({
  state,
  maskList,
  setMaskList,
  imageKey,
  setResultImg,
  onPressNext,
}) {
  const [loading, setLoading] = useState(false);
  const handleSelected = (idx) => {
    maskList[idx].selected = !maskList[idx].selected;
    setMaskList([...maskList]);
  };
  const renderCheckBox = (data) => {
    return (
      <CheckBox key={data.id} data={data} handleSelected={handleSelected} />
    );
  };
  const renderMask = (data) => {
    if (data.selected) {
      return (
        <Image
          source={{ uri: data.file }}
          style={styles.mask}
          resizeMode="contain"
          key={data.id}
        />
      );
    }
  };

  const handleRemove = () => {
    setLoading(true);
    const list = [];
    for (let idx = 0; idx < maskList.length; idx++) {
      if (maskList[idx].selected) {
        list.push(maskList[idx].id);
      }
    }

    axios({
      method: "post",
      url: "http://j3a409.p.ssafy.io/api/select",
      data: {
        key: imageKey,
        check: list,
      },
    })
      .then((res) => {
        const resultImage = `data:image/png;base64,${res.data.objects[0].image}`;
        setResultImg(resultImage);
        setLoading(false);
        onPressNext();
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        alert("오류가 발생했습니다.");
      });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <DefualtLoading state={loading} />
        <Image
          source={{ uri: state.uri }}
          style={styles.parent}
          resizeMode="contain"
        />
        {/* <Image source={BACKMASK} style={styles.mask} resizeMode="contain" /> */}
        {maskList.map((data) => renderMask(data))}

        <View style={styles.container}>
          <Text style={styles.instructions}>지울 오브젝트를 선택하세요.</Text>
          <View style={styles.item}>
            {maskList.map((data) => renderCheckBox(data))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRemove}>
            <Icon style={{ fontSize: 25, color: "#999" }} name="loader" />
            <Text style={styles.buttonText}>오브젝트 제거하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  parent: {
    width: 400,
    height: 300,
    marginBottom: 20,
    position: "relative",
    opacity: 0.9,
  },
  mask: {
    width: 400,
    height: 300,
    position: "absolute",
    top: 0,
    left: 5,
    marginBottom: 20,
    opacity: 0.75,
    //backgroundColor: "rgba(255, 0, 0, 0.1)",
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
  item: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 10,
    marginBottom: 5,
  },
  checkBoxTxt: {
    borderRadius: 30,
    marginLeft: 20,
  },
});

export default ObjectSelect;
