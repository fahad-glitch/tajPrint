import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import Header from "./Header";
import { WHITE } from "../Constants/Colors";

export default function Container({
  isBackButtonInHeader = true,
  isHeaderImage = false,
  headerImage,
  headerTitle,
  headerInfo,
  children,
  editor=false,
  extraStyle,
  isChildContainFlateList=true
}) {
  return (
    <ScrollView style={styles.scrollViewContent} contentContainerStyle={editor?extraStyle:styles.scrollViewContent}>
      <Header
        isBackButton={isBackButtonInHeader}
        isBackgroundImage={isHeaderImage}
        backgroundImage={headerImage}
        heading={headerTitle}
        headingText={headerInfo}
      />
      {
        editor?children: <View style={editor?null:styles.body}>{children}</View>
      }
     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    // flex: 1,
    backgroundColor: WHITE,
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
    justifyContent: "space-between",
  },
});
