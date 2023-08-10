import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SearchHeader from "./SearchHeader";
import BottomBar from "./BottomBar";
import Sidebar from "./Sidebar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getData } from "../Services/storage";
import { WHITE } from "../Constants/Colors";

export default function Layout({ children,isShowBottomBar=true,isShowHeader=true ,isScroll=true}) {
  const navigation = useNavigation();
  const route = useRoute();
  const [screenName, setScreenName] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    console.log("workings");
    setShowSidebar(!showSidebar);
  };
  const [User, setUser] = useState(null);
  const getProfile = async () => {
    let data = await getData("USER");
    if (data) {
      setUser(JSON.parse(data));
    } else {
      navigation.navigate("Login");
    }
  };
  useEffect(() => {
    getProfile();
    setScreenName(route.name);
    console.log("route.name", route.name);
  }, [route]);
  return (
    <View style={styles.layoutContainer}>
      {isShowHeader &&<>
      <SearchHeader onPressDrawer={toggleSidebar} />
      <Sidebar
        show={showSidebar}
        user={JSON.stringify(User)}
        onTouchOverlay={() => {
          setShowSidebar(!showSidebar);
        }}
      />
      </>}
      
      {isScroll?<ScrollView >
        {children}
      </ScrollView>
      :<View style={{flex:1}}>
        {children}
        </View>}
     {isShowBottomBar&& <BottomBar activeRoute={screenName} />}
    </View>
  );
}

const styles = StyleSheet.create({
  layoutContainer:{
    flex: 1,
    backgroundColor: WHITE,
  },
});
