import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT_1, GRADIENT_2, WHITE } from "../Constants/Colors";
import Images from "../Constants/Images";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Header({
  heading,
  headingText,
  isBackButton = true,
  isBackgroundImage = false,
  backgroundImage,
}) {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={[GRADIENT_1, GRADIENT_2]}
      style={[styles.header, isBackgroundImage && { height: 280 }]}
    >
      {!isBackgroundImage && isBackButton && (
        <View
          style={[
            styles.headerItem,
            isBackgroundImage && isBackButton && { position: "absolute" },
          ]}
        >
          {isBackButton && (
            <View style={styles.BackButton}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Image source={Images.Back} />
              </TouchableOpacity>
            </View>
          )}
          {(heading || headingText) && (
            <View>
              {heading && <Text style={styles.heading}>{heading}</Text>}
              {headingText && <Text style={styles.text}>{headingText}</Text>}
            </View>
          )}
        </View>
      )}

      {isBackgroundImage && (
        <Image source={backgroundImage} style={styles.headerBackgroundImage} />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerBackgroundImage: {
    flex: 1,
    // width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignSelf: "stretch",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  header: {
    width: "100%",
    height: 200,
  },
  loginPage: {
    flex: 1,
    padding: 10,
    height: "100%",
    flexDirection: "column",
  },
  headerItem: {
    padding: 23,
  },
  BackButton: {
    // paddingTop: 40,
  },
  text: {
    fontSize: 15,
    paddingTop: 10,
    color: WHITE,
    fontFamily: "Poppins-Regular",
  },
  heading: {
    paddingTop: 50,
    fontSize: 28,
    color: WHITE,
    fontFamily: "Poppins-SemiBold",
  },
});
