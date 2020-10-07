import { CheckBox } from "native-base";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";

function CoustomCheckBox({ data, handleSelected }) {
  const [selected, setSelected] = useState(false);
  const handleCheckBox = () => {
    handleSelected(data.id);
    setSelected(!selected);
  };
  return (
    <>
      <CheckBox checked={selected} color="#fc5185" onPress={handleCheckBox} />
      <Text
        style={{
          ...styles.checkBoxTxt,
          color: selected ? "#fc5185" : "gray",
          fontWeight: selected ? "bold" : "normal",
        }}
      >
        {data.type}
        {data.id + 1}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  checkBoxTxt: {
    borderRadius: 30,
    marginLeft: 20,
  },
});

export default CoustomCheckBox;
