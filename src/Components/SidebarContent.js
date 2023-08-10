import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import React from "react";
import LinearGradient from 'react-native-linear-gradient';
import { BLACK, GRADIENT_1, GRADIENT_2 } from "../Constants/Colors";
import { WHITE } from "./../Constants/Colors";
import { uploadURL } from "./../Services/request";
import { useState } from "react";
import Images from "../Constants/Images";
import { useNavigation } from "@react-navigation/native";
import { removeData } from "./../Services/storage";
const Height = Dimensions.get("window").height;

const SidebarContent = ({ User }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(JSON.parse(User));
  const handlePress = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleLogOut = async () => {
    await removeData("TOKEN");
    await removeData("ROLE");
    await removeData("USER");
    navigation.navigate("Login");
  };

  const handleShare = () => {
    // handle share action here
  };
  const deleteAccount = () => {
    // handle share action here
  };
  return (
    <>
      {user ? (
        <>
          <LinearGradient
            colors={[GRADIENT_1, GRADIENT_2]}
            style={styles.headerGradient}
          >
            <ImageBackground source={Images.sidebarheader} style={{ height:"100%",flex: 1,justifyContent:"flex-end" }}>
              <View style={styles.authHeaderContentCover}>
                <Image
                  source={{
                    uri: uploadURL + user?.profileImage,
                  }}
                  style={[styles.userProfile, { width: 55, height: 55 }]}
                />
                <View>
                  <Text style={styles.sidebarUsername}>{user?.firstName}</Text>
                  <Text style={styles.sidebarEmail}>{user?.email}</Text>
                </View>
              </View>
            </ImageBackground>
          </LinearGradient>
          <ScrollView>
            <View style={[styles.container, styles.containerCover]}>
              <Text style={styles.heading}>Account</Text>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handlePress("EditProfile")}
              >
                <Image source={Images.editProfile} style={styles.icon} />
                <Text style={styles.menuText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handlePress("ChangePassword")}
              >
                <Image source={Images.changePassword} style={styles.icon} />
                <Text style={styles.menuText}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => {handlePress("EmailNotification")}}>
                <Image source={Images.emailNotification} style={styles.icon} />
                <Text style={styles.menuText}>Email Notifications</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem} onPress={() => {handlePress("Download")}}>
                <Image source={Images.orderHistory} style={styles.icon} />
                <Text style={styles.menuText}>Download history</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.separator} /> */}
            {/* <View style={[styles.container, styles.containerCover]}>
              <Text style={styles.heading}>Payment</Text>
              <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
                <Image source={Images.subscriptionPlan} style={styles.icon} />
                <Text style={styles.menuText}>Subscription Plan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
                <Image source={Images.paymentPolicy} style={styles.icon} />
                <Text style={styles.menuText}>Payment policy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
                <Image source={Images.orderHistory} style={styles.icon} />
                <Text style={styles.menuText}>Order history</Text>
              </TouchableOpacity>
              
            </View> */}
            <View style={styles.separator} />
            <View style={[styles.container, styles.containerCover]}>
              <Text style={styles.heading}>Profile</Text>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handlePress("FAQs")}
              >
                <Image source={Images.faqs} style={styles.icon} />
                <Text style={styles.menuText}>FAQ's</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handlePress("Terms")}
              >
                <Image source={Images.terms} style={styles.icon} />
                <Text style={styles.menuText}>Term & Conditions</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handlePress("Privacy")}
              >
                <Image source={Images.terms} style={styles.icon} />
                <Text style={styles.menuText}>Privacy & Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handlePress("Disclaimer")}
              >
                <Image source={Images.terms} style={styles.icon} />
                <Text style={styles.menuText}>Disclaimer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handlePress("TermsOfUse")}
              >
                <Image source={Images.terms} style={styles.icon} />
                <Text style={styles.menuText}>Terms Of Use</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handlePress("AboutUs")}
              >
                <Image source={Images.aboutUs} style={styles.icon} />
                <Text style={styles.menuText}>About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={handleLogOut}>
                <Image source={Images.logout} style={styles.icon} />
                <Text style={styles.menuText}>Log Out</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={deleteAccount}>
                <Image source={Images.deleteAccount} style={styles.icon} />
                <Text style={styles.menuText}>Delete account</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            
            <View style={[styles.container, styles.containerCover]}>
            <TouchableOpacity style={styles.menuItem} onPress={()=> handlePress("ContactUs")}>
                <Image source={Images.shareApp} style={styles.icon} />
                <Text>Contact Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={handleShare}>
                <Image source={Images.shareApp} style={styles.icon} />
                <Text>Share</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    height: 150,
    alignItems: "flex-start",
    flexDirection: "row",
  },
  authHeaderContentCover: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 25,
    paddingHorizontal: 5,
    alignItems: "center",
  },
  authHeaderGoBackButton: {
    position: "absolute",
    left: 15,
    zIndex: 2,
  },
  userProfile: {
    borderRadius: 1000,
    marginRight: 10,
  },
  sidebarUsername: {
    color: WHITE,
    fontFamily: "Poppins-SemiBold",
    fontSize: 25,
    lineHeight: 31.5,
  },
  sidebarEmail: {
    color: WHITE,
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    // lineHeight: 31.5,
  },
  container: {
    padding: 22,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    width: 24,
    resizeMode: "contain",
    height: 24,
    marginRight: 20,
  },
  menuText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    // lineHeight: 24,
    textAlign: "center",
    color: BLACK,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  heading: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    lineHeight: 24,
    color: BLACK,
    marginBottom:20
  },
  containerCover: {
    paddingTop: 10,
  },
});
export default SidebarContent;
