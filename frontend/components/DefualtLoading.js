import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

function DefualtLoading({ state }) {
  return (
    <View>
      <Modal isVisible={state}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: "#fff" }}>loading...</Text>
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,

    borderColor: "rgba(0, 0, 0, 0.3)",
  },
});

export default DefualtLoading;
