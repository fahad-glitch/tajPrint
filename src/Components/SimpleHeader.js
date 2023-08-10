import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Images from "../Constants/Images";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BLACK } from "../Constants/Colors";
export default function SimpleHeader( {isEditor=false}) {
  const navigation = useNavigation()
  return (
    <View style={styles.simpleHeaderContainer}>
      <TouchableOpacity
        onPress={() => {
          if(isEditor){
            navigation.navigate("Templates");
          }else{
          navigation.goBack();
          }
        }}
      >
        <MaterialCommunityIcons name="keyboard-backspace" size={35} color={BLACK} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  simpleHeaderContainer:{
    paddingHorizontal:20,
    paddingVertical:20,
  }
});