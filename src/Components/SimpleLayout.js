import {  ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import SimpleHeader from "./SimpleHeader";
import { WHITE } from "../Constants/Colors";

export default function SimpleLayout({ children }) {
  return (
    <View style={styles.simpleLayoutContainer}>
      <SimpleHeader />
      <ScrollView>
      {children}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  simpleLayoutContainer:{
    backgroundColor:WHITE,
    flex:1
  }
});
