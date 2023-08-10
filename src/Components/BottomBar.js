import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import Images from "../Constants/Images";
import { BLACK, GRADIENT_1, GRADIENT_2 } from "../Constants/Colors";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';

const BottomBar = ({ activeRoute }) => {
  const navigation = useNavigation();
  const isActive = (routeName) => {
    return activeRoute === routeName;
  };

  const BottomBarButton = ({ name, active, onPress }) => {
    let imageSource;
    switch (name) {
      case "Home":
        imageSource = active ? Images.homeActive : Images.homeInActive;
        break;
      case "Projects":
        imageSource = active
          ? Images.projectsInActive
          : Images.projectsInActive;
        break;
      case "Add":
        imageSource = active
          ? Images.addTemplateInActive
          : Images.addTemplateInActive;
        break;
      case "Templates":
        imageSource = active
          ? Images.templatesActive
          : Images.templatesInActive;
        break;
      case "Download":
        imageSource = active ? Images.imagesInActive : Images.imagesInActive;
        break;
      default:
        break;
    }
    return (
      <TouchableOpacity
        style={[
          styles.button,
          name == "Add" ? styles.addButton : null,
          name == "Add" && active ? styles.activeButton : null,
        ]}
        onPress={onPress}
      >
        {name == "Add" ? (
          <LinearGradient
            colors={[GRADIENT_1, GRADIENT_2]}
            style={{
              height: "100%",
              borderRadius: 1000,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={imageSource}
              style={[styles.icon, name == "Add" ? styles.addIcon : null]}
            />
          </LinearGradient>
        ) : (
          <>
            <Image source={imageSource} style={styles.icon} />
            <Text style={[styles.text, active ? styles.activeText : null]}>
              {name}
            </Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.bottomBarContainer}>
      <View style={styles.bottomBar}>
        <BottomBarButton
          name="Home"
          active={isActive("Home")}
          onPress={() => navigation.navigate("Home")}
        />
        <BottomBarButton
          name="Projects"
          active={isActive("Projects")}
          onPress={() => navigation.navigate("Projects")}
        />
        <BottomBarButton
          name="Add"
          active={isActive("Add")}
          onPress={() => navigation.navigate("Templates")}
        />
        <BottomBarButton
          name="Templates"
          active={isActive("Templates")}
          onPress={() => navigation.navigate("Templates")}
        />
        {/* Download History */}
        <BottomBarButton
          name="Download"
          active={isActive("Download")}
          onPress={() => navigation.navigate("Download")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBarContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    // position: "absolute",
    width: "100%",
    bottom: 0,
  },
  bottomBar: {
    flexDirection: "row",
    height: 80,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  button: {
    width: "20%",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#00E3B0",
  },
  addButton: {
    height: 75,
    width: 75,
    borderRadius: 1000,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "stretch",
    borderColor: "#EEEEEE",
    borderWidth: 1,
    marginTop: -80,
  },
  addIcon: {
    height: 45,
  },
  icon: {
    height: 20,
    resizeMode: "contain",
  },
  text: {
    marginTop: 5,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    color: BLACK,
  },
  activeText: {
    color: GRADIENT_1,
  },
});

export default BottomBar;
