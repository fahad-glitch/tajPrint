import React from "react";
import { GREEN, WHITE } from "../Constants/Colors";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
export default function Button({
  buttonText,
  buttonHandler = () => {},
  extraStyle = {},
}) {
  return (
    <View style={extraStyle}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={buttonHandler}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: GREEN,
    padding: 15,
    fontSize: 22,
    borderRadius: 5,
    width: "100%",
    fontFamily: "Poppins-Medium",
  },
  buttonText: {
    color: WHITE,
    fontSize: 22,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
});
