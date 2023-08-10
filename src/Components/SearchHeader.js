import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Images from "../Constants/Images";
import { GRADIENT_1, GRADIENT_2, WHITE } from "../Constants/Colors";
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
export default function SearchHeader({ onPressDrawer = () => {} }) {
  return (
    <LinearGradient colors={[GRADIENT_1, GRADIENT_2]}>
      <View style={styles.searchHeaderContainer}>
      <View>
          <TouchableOpacity
            onPress={onPressDrawer}
            style={styles.sidebarToggler}
          >
            <Octicons name="three-bars" size={35} color={WHITE} />
          </TouchableOpacity>
        </View>
        <View style={styles.input}>
          <Image style={styles.inputIcon} source={Images?.searchIcon} />
          <TextInput
            placeholder="Search your content"
            value=""
            style={styles.inputText}
          />
        </View>
        
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  searchHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sidebarToggler: {
    
    alignItems: "center",
  },
  inputIcon: {
    alignItems: "center",
  },
  input: {
    flexDirection: "row",
    borderRadius: 6,
    paddingLeft: 18,
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    width: "80%",
    backgroundColor: WHITE,
  },
  inputText: {
    fontSize: 16,
    width: "100%",
    overflow: "hidden",
    paddingRight: 40,
    fontFamily: "Poppins-Medium",
  },
});
