import React from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

export default function Result({ state, setState }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: "asset:/favicon.png" }} style={styles.logo} resizeMode="contain" />
      <Text style={styles.instructions}>완성되었습니다.</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => console.log("puff")} style={styles.button}>
          <Text style={styles.buttonText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("puff")} style={styles.button}>
          <Text style={styles.buttonText}>저장</Text>
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
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#999",
    width: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    color: "#999",
  },
});
