import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Camera } from "expo-camera";
import Icon from "react-native-vector-icons/Feather";

function CameraView({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const cam = useRef().current;

  const _takePicture = async () => {
    const option = { quality: 0.5, base64: true, skipProcessing: false };
    try {
      const picture = await cam.takePictureAsync(option);

      if (picture.source) {
        console.log(picture.source);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Camera ref={cam} style={styles.camera} type={type}>
      <SafeAreaView></SafeAreaView>
      <SafeAreaView style={{ padding: 30 }}>
        <View style={styles.footer}>
          <TouchableOpacity>
            <Icon
              name="x"
              style={styles.iconButton}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={_takePicture}>
            <View style={styles.snapButton}>
              <Icon color="#fff" style={styles.innerSnapButton} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="rotate-ccw"
              style={styles.iconButton}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  snapButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  innerSnapButton: {
    backgroundColor: "red",
    padding: 13.5,
    width: 52,
    height: 52,
    borderRadius: 25.5,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
  },
  iconButton: {
    fontSize: 35,
    color: "#fff",
  },
});

export default CameraView;
