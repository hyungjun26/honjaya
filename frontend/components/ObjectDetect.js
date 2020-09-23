import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ObjectDetect({ state }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: state }} style={styles.logo} resizeMode="contain" />
      <Text style={styles.instructions}>오브젝트 디텍션을 실행해주세요.</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>오브젝트 디텍션 실행</Text>
      </TouchableOpacity>
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
