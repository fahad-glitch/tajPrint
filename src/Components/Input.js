import React, { useState } from "react";
import { GREY } from "../Constants/Colors";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Images from "../Constants/Images";

export default function Input({
  inputIcon,
  inputLabel,
  inputDefaultValue,
  inputPlaceholder,
  inputBlurHandler,
  inputOnChangeHandler,
  isPassword = false,
  extraStyle = {},
  multiline = false,
}) {
  const [showPassowrd, setShowPassowrd] = useState(false);

  const passwordShower = () => {
    setShowPassowrd(!showPassowrd);
    console.log("showPassowrd", showPassowrd);
  };
  return (
    <View style={[styles.input, extraStyle, multiline && { flex: 1,alignItems:"flex-start" }]}>
      {inputIcon && <Image style={styles.inputIcon} source={inputIcon} />}
      <Text style={styles.topInput}>{inputLabel}</Text>
      {isPassword ? (
        <>
          <TextInput
            placeholder={inputPlaceholder}
            onChangeText={inputOnChangeHandler}
            onBlur={inputBlurHandler}
            value={inputDefaultValue}
            secureTextEntry={!showPassowrd}
            style={styles.inputText}
          />

          <View style={styles.pass}>
            <TouchableOpacity onPress={passwordShower}>
              {!showPassowrd ? (
                <Image
                  source={Images.Hide}
                  style={[{ width: 20, height: 16 }]}
                />
              ) : (
                <Image
                  source={Images.Hide}
                  style={[{ width: 20, height: 15 }]}
                />
              )}
            </TouchableOpacity>
          </View>
        </>
      ) : (
        inputLabel === "Email"?
        <TextInput
          placeholder={inputPlaceholder}
          onChangeText={inputOnChangeHandler}
          onBlur={inputBlurHandler}
          value={inputDefaultValue}
          autoCapitalize="none"
          style={[styles.inputText, multiline && { flex: 1 }]}
          multiline={multiline}
        />:<TextInput
        placeholder={inputPlaceholder}
        onChangeText={inputOnChangeHandler}
        onBlur={inputBlurHandler}
        value={inputDefaultValue}
        style={[styles.inputText, multiline && { flex: 1 }]}
        multiline={multiline}
      />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputIcon: {
    alignItems: "center",
  },
  input: {
    marginVertical: 15,
    borderColor: GREY,
    borderWidth: 1,
    flexDirection: "row",
    borderRadius: 6,
    paddingLeft: 18,
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
  },
  inputText: {
    fontSize: 16,
    width: "100%",
    overflow: "hidden",
    paddingRight: 40,
    fontFamily: "Poppins-Medium",
  },
  topInput: {
    fontSize: 16,
    color: GREY,
    position: "absolute",
    top: -12,
    left: 15,
    paddingLeft: 3,
    paddingRight: 10,
    backgroundColor: "white",
    fontFamily: "Poppins-Regular",
  },
  pass: {
    position: "absolute",
    right: 15,
  },
});
