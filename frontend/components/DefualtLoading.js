import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

function DefualtLoading({ state }) {
  return (
    <View>
      <Modal isVisible={state}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color="black" />
          <Text style={{ color: "black" }}>loading...</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  content: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    width: 150,
    height: 150,
    borderColor: "rgba(0, 0, 0, 0.3)",
  },
});

export default DefualtLoading;
