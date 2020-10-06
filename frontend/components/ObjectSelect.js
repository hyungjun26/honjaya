import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CheckBox from "./CoustomCheckBox.js";
import Icon from "react-native-vector-icons/Feather";
import axios from "axios";

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

function ObjectSelect({ state, maskList, setMaskList, imageKey }) {
  // const ORIGINAL = require("../dummy-image/original.jpg");
  // const MASK1 = require("../dummy-image/mask1.png");
  // const MASK2 = require("../dummy-image/mask2.png");
  // const BACKMASK = require("../dummy-image/backgroundcolor_black.png");
  // const [objectList, setObjectList] = useState(initialState);
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
          source={data.file}
          style={styles.mask}
          resizeMode="contain"
          key={data.id}
        />
      );
    }
  };

  const handleRemove = () => {
    const list = [],
    for (let idx = 0; idx < maskList.length; idx++) {
      if(maskList[idx].selected){
        list.push(maskList[idx].id);
      }      
    }
    axios({
      method:"post",
      url:"http://10.0.2.2:8000/select",
      data:{
        key:imageKey,
        check:list,
      }
    }).then(()=>{
      console.log("checklist transfer success");
    }).catch((e)=>{
      console.log(e);
    })
  };
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: state.uri }}
        style={styles.parent}
        resizeMode="contain"
      />
      {/* <Image source={BACKMASK} style={styles.mask} resizeMode="contain" /> */}
      {maskList.map((data) => renderMask(data))}

      <View style={styles.container}>
        <View style={styles.item}>
          {maskList.map((data) => renderCheckBox(data))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRemove}>
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
