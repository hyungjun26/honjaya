import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import StepIndicator from "react-native-step-indicator";
import Swiper from "react-native-swiper";
import PhotoPick from "../components/PhotoPick";
import Result from "../components/Result";

const thirdIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#7eaec4",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#7eaec4",
  stepStrokeUnFinishedColor: "#dedede",
  separatorFinishedColor: "#7eaec4",
  separatorUnFinishedColor: "#dedede",
  stepIndicatorFinishedColor: "#7eaec4",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: "transparent",
  stepIndicatorLabelFinishedColor: "transparent",
  stepIndicatorLabelUnFinishedColor: "transparent",
  labelColor: "#999999",
  labelSize: 10,
  currentStepLabelColor: "#7eaec4",
};
const STEP = [0];

function ResultScreen() {
  const [currentPage, setCurrentPage] = useState(3);
  const [targetImg, setTargetImg] = useState("../images/picture-plus.png");

  const onStepPress = (position) => {
    console.log(position);
    setCurrentPage(position);
  };

  const renderViewPage = (data) => {
    if (data === 3) {
      return (
        <View key={data} style={styles.container}>
          <Result state={targetImg} setState={setTargetImg} />
        </View>
      );
    }
  };

  const renderStepIndicator = (params) => <MaterialIcons {...getStepIndicatorIconConfig(params)} />;

  const renderLabel = ({ position, label, currentPosition }) => {
    return <Text style={position === currentPosition ? styles.stepLabelSelected : styles.stepLabel}>{label}</Text>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          stepCount={4}
          customStyles={thirdIndicatorStyles}
          currentPosition={currentPage}
          labels={["사진\n가져오기", "오브젝트 선택", "추가이미지\n가져오기", "완료"]}
        />
      </View>

      <Swiper
        style={{ flexGrow: 1 }}
        loop={false}
        index={currentPage}
        autoplay={false}
        showsButtons
        onIndexChanged={(page) => {
          setCurrentPage(page);
        }}
      >
        {renderViewPage(3)}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  stepIndicator: {
    marginVertical: 50,
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stepLabel: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#999999",
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#4aae4f",
  },
});

export default ResultScreen;
