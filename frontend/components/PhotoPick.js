import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import DefualtLoading from "./DefualtLoading";
import * as FileSystem from "expo-file-system";

export default function PhotoPick({
  state,
  setState,
  navigation,
  onPressNext,
}) {
  const [loading, setLoading] = useState(false);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (pickerResult.cancelled) {
      return;
    }
    console.log(pickerResult);
    const uri = pickerResult.uri;
    const info = await FileSystem.getInfoAsync(uri);
    console.log(info);
    if (info.size > 1500000) {
      Alert.alert(
        "사진 크기 제한!",
        "크기가 1.5mb 이하인 사진을 선택해주세요.",
        [
          {
            text: "ok",
          },
        ]
      );
      return;
    }
    setLoading(true);

    setTimeout(function () {
      setLoading(false);
      setState(pickerResult);
      onPressNext();
    }, 500);
  };

  const openCamera = async () => {
    navigation.navigate("Camera");
  };

  return (
    <View style={styles.container}>
      <DefualtLoading state={loading} />
      <Image
        source={{ uri: state.uri }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.instructions}>수정할 사진을 선택하세요.</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Icon style={{ fontSize: 20, color: "#999" }} name="image" />
          <Text style={styles.buttonText}>가져오기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openCamera} style={styles.button}>
          <Icon style={{ fontSize: 20, color: "#999" }} name="camera" />
          <Text style={styles.buttonText}>촬영하기</Text>
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
    width: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    color: "#999",
  },
});
