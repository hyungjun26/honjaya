import {
  ImageBackground,
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import * as React from "react";

const backImage = require("../logo/back.jpg");

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={backImage} style={styles.image} blurRadius={2}>
        <View style={styles.imgContainer}>
          <Image
            style={{
              marginTop: 65,
            }}
            source={require("../logo/logo.png")}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Object Remove")}
          >
            {/* <Icon style={{ fontSize: 20, color: "#999" }} name="image" /> */}
            <Text style={styles.buttonText}>시작하기</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  imgContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
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
    backgroundColor: "#01A9DB",
    padding: 10,
    margin: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#01A9DB",
    width: 200,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});
