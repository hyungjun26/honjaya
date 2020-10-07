import React, { useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import StepIndicator from "react-native-step-indicator";
import Swiper from "react-native-swiper";

import PhotoPick from "../components/PhotoPick";
import ObjectDetect from "../components/ObjectDetect";
import Result from "../components/Result";
import ObjectSelect from "../components/ObjectSelect";

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
const STEP = [0, 1, 2, 3];

function ObjectRemoveScreen({ navigation }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [maskList, setMaskList] = useState([]);
  const [imageKey, setImageKey] = useState(null);
  const [resultImg, setResultImg] = useState(null);
  const [targetImg, setTargetImg] = useState({
    uri:
      "https://crestaproject.com/demo/lontano-pro/wp-content/themes/lontano-pro/images/no-image-slide.png",
  });
  const swiper = useRef(null);
  const onStepPress = (position) => {
    console.log(position);
    setCurrentPage(position);
  };

  const renderViewPage = (data) => {
    if (data === 0) {
      return (
        <View key={data} style={styles.container}>
          <PhotoPick
            state={targetImg}
            setState={setTargetImg}
            navigation={navigation}
            onPressNext={onPressNext}
          />
        </View>
      );
    } else if (data === 1) {
      return (
        <View key={data} style={styles.container}>
          <ObjectDetect
            state={targetImg}
            onPressNext={onPressNext}
            setMaskList={setMaskList}
            setImageKey={setImageKey}
            navigation={navigation}
          />
        </View>
      );
    } else if (data === 2) {
      return (
        <View key={data} style={styles.container}>
          <ObjectSelect
            state={targetImg}
            onPressNext={onPressNext}
            maskList={maskList}
            imageKey={imageKey}
            setMaskList={setMaskList}
            setResultImg={setResultImg}
          />
        </View>
      );
    } else if (data === 3) {
      return (
        <View key={data} style={styles.container}>
          <Result
            navigation={navigation}
            resultImg={resultImg}
            onPressNext={onPressNext}
          />
        </View>
      );
    }
  };

  const renderStepIndicator = (params) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );

  const renderLabel = ({ position, label, currentPosition }) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }
      >
        {label}
      </Text>
    );
  };

  const onPressNext = () => {
    swiper.current.scrollBy(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          stepCount={4}
          customStyles={thirdIndicatorStyles}
          currentPosition={currentPage}
          labels={[
            "사진\n가져오기",
            "오브젝트 디텍션",
            "오프젝트 선택",
            "완료",
          ]}
        />
      </View>

      <Swiper
        ref={swiper}
        style={{ flexGrow: 1 }}
        loop={false}
        index={currentPage}
        autoplay={false}
        showsPagination={false}
        scrollEnabled={false}
        onIndexChanged={(page) => {
          setCurrentPage(page);
        }}
      >
        {STEP.map((step) => renderViewPage(step))}
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

export default ObjectRemoveScreen;
