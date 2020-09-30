import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CheckBox } from "native-base";
import Icon from "react-native-vector-icons/Feather";

function ObjectSelect({ state }) {
  const [objectList, setObjectList] = useState({
    selectedLang1: false,
    selectedLang2: false,
    selectedLang3: false,
    selectedLang4: false,
  });
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: state.uri }}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.container}>
        <View style={styles.item}>
          <CheckBox
            checked={objectList.selectedLang1}
            color="#fc5185"
            onPress={() =>
              setObjectList({
                ...objectList,
                selectedLang1: !objectList.selectedLang1,
              })
            }
          />
          <Text
            style={{
              ...styles.checkBoxTxt,
              color: objectList.selectedLang1 ? "#fc5185" : "gray",
              fontWeight: objectList.selectedLang1 ? "bold" : "normal",
            }}
          >
            People
          </Text>
          <CheckBox
            checked={objectList.selectedLang2}
            color="#fc5185"
            onPress={() =>
              setObjectList({
                ...objectList,
                selectedLang2: !objectList.selectedLang2,
              })
            }
          />
          <Text
            style={{
              ...styles.checkBoxTxt,
              color: objectList.selectedLang2 ? "#fc5185" : "gray",
              fontWeight: objectList.selectedLang2 ? "bold" : "normal",
            }}
          >
            Bike
          </Text>
          <CheckBox
            checked={objectList.selectedLang3}
            color="#fc5185"
            onPress={() =>
              setObjectList({
                ...objectList,
                selectedLang3: !objectList.selectedLang3,
              })
            }
          />
          <Text
            style={{
              ...styles.checkBoxTxt,
              color: objectList.selectedLang3 ? "#fc5185" : "gray",
              fontWeight: objectList.selectedLang3 ? "bold" : "normal",
            }}
          >
            Car
          </Text>
          <CheckBox
            checked={objectList.selectedLang4}
            color="#fc5185"
            onPress={() =>
              setObjectList({
                ...objectList,
                selectedLang4: !objectList.selectedLang4,
              })
            }
          />
          <Text
            style={{
              ...styles.checkBoxTxt,
              color: objectList.selectedLang4 ? "#fc5185" : "gray",
              fontWeight: objectList.selectedLang4 ? "bold" : "normal",
            }}
          >
            Bird
          </Text>
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
  logo: {
    width: 400,
    height: 300,
    marginBottom: 20,
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
