import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CheckBox from "./CoustomCheckBox.js";
import Icon from "react-native-vector-icons/Feather";

const initialState = [
  {
    no: 0,
    name: "people1",
    selected: false,
    file: require("../dummy-image/mask1.png"),
  },
  {
    no: 1,
    name: "people2",
    selected: false,
    file: require("../dummy-image/mask2.png"),
  },
];

function ObjectSelect({ state }) {
  const ORIGINAL = require("../dummy-image/original.jpg");
  // const MASK1 = require("../dummy-image/mask1.png");
  // const MASK2 = require("../dummy-image/mask2.png");
  const [objectList, setObjectList] = useState(initialState);
  const handleSelected = (idx) => {
    objectList[idx].selected = !objectList[idx].selected;
    setObjectList([...objectList]);
  };
  const renderCheckBox = (data) => {
    return (
      <CheckBox key={data.no} data={data} handleSelected={handleSelected} />
    );
  };
  const renderMask = (data) => {
    if (data.selected) {
      return (
        <Image
          source={data.file}
          style={styles.mask}
          resizeMode="contain"
          key={data.no}
        />
      );
    }
  };
  return (
    <View style={styles.container}>
      <Image source={ORIGINAL} style={styles.parent} resizeMode="contain" />
      {objectList.map((data) => renderMask(data))}

      <View style={styles.container}>
        <View style={styles.item}>
          {objectList.map((data) => renderCheckBox(data))}
        </View>
        <TouchableOpacity style={styles.button}>
          <Icon style={{ fontSize: 25, color: "#999" }} name="loader" />
          <Text style={styles.buttonText}>오브젝트 제거하기</Text>
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
  item: {
    flexDirection: "column",
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
  },
  checkBoxTxt: {
    borderRadius: 30,
    marginLeft: 20,
  },
});

export default ObjectSelect;
