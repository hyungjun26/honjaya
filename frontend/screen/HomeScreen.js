import {
  Button,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as React from "react";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Object Remove"
        onPress={() => navigation.navigate("Object Remove")}
      />
    </View>
  );
}
