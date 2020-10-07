import React from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

export default function Result({ navigation, resultImg }) {
  const HomeScreen = async () => {
    navigation.navigate("Home");
  };

  const saveImg = async () => {
    const save = resultImg.split("data:image/png;base64,")[1];
    const today = new Date();
    const timestamp = String(
      "honjaya_" +
        today.getFullYear() +
        today.getMonth() +
        today.getDate() +
        "_" +
        today.getHours() +
        today.getMinutes() +
        today.getSeconds() +
        ".png"
    );
    console.log(timestamp);
    const filename = FileSystem.documentDirectory + timestamp;
    //console.log(filename);
    await FileSystem.writeAsStringAsync(filename, save, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);

    Alert.alert("저장되었습니다", "갤러리를 확인해주세요!", [
      {
        text: "ok",
        onPress: HomeScreen,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: resultImg }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.instructions}>완성되었습니다.</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={HomeScreen} style={styles.button}>
          <Text style={styles.buttonText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveImg} style={styles.button}>
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
