import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Container from "../Components/Container";
import Images from "../Constants/Images";
import { BLACK, GRADIENT_1, GREY } from "../Constants/Colors";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "../Components/Button";
import moment from "moment";
import { postRequestForm } from "../Services/request";
import { storeData } from "../Services/storage";

const OTP = () => {
  const routes = useRoute();
  const navigation = useNavigation();
  let { _id, pathToGo } = "";
  // console.log(routes);
  if (routes.params) {
    _id = routes.params._id;
    pathToGo = routes.params.pathToGo;
  } else {
    navigation.goBack();
  }
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(120); // Timer set to 2 minutes (120 seconds)
  const [resendDisabled, setResendDisabled] = useState(true); // Disable the Resend button by default

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setResendDisabled(false); // Enable the Resend button when the timer stops
    }
  }, [timer]);

  const handleCodeChange = (code) => {
    setOTP(code);
  };

  const otpHandler = async () => {
    try {
      const res = await postRequestForm(`/api/auth/verifyOTP`, "", {
        _id,
        otp,
      });
      console.log('res?.result?',res?.result)
      if (res?.result?.status === 200) {
        const response = res.result.data;
        const user = response?.user;
        const token = response?.token;
        if (response?.user) {
          setTimer(0);
          setResendDisabled(true);
          if (pathToGo === "Home") {
            await storeData("TOKEN", token);
            await storeData("ROLE", user.role);
            await storeData("USER", JSON.stringify(user, null, 2));
          }
          navigation.navigate(pathToGo, { _id: user._id });
        } else {
          setError("You are not allowed to login.");
          navigation.navigate("Login");
        }
      }
    } catch (err) {
      setError("Please enter correct email or password");
      console.log(`Error of verify OTP`, err.message);
    }
  };

  const handleResend = async () => {
    try {
      setTimer(120);
      setResendDisabled(true);
      const res = await postRequestForm(`/api/auth/resendOTP`, "", {
        _id,
      });
      console.log('res?.result?',res)
    } catch (err) {
      console.log(`Error of resend OTP`, err.message);
    }
  };

  return (
    <Container
      isBackButtonInHeader={true}
      isHeaderImage={true}
      headerImage={Images.otpHeader}
    >
      <View>
        <Text style={styles.loginHeading}>
          Enter your{"\n"} verification code
        </Text>
        <Text style={styles.loginText}>Enter your OTP code here</Text>
        <View style={styles.otpInputsContainers}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <OTPInputView
              style={{
                width: "100%",
                height: 70,
              }}
              autoFocusOnLoad={false}
              pinCount={6}
              selectedIndex={0}
              codeInputFieldStyle={styles.borderStyleBase}
              codeInputHighlightStyle={styles.borderStyleHighLighted}
              onCodeChanged={handleCodeChange}
            />

            {error !== "" && <Text style={styles.errorText}>{error}</Text>}
          </View>
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.loginText}>Didn’t get code?</Text>
          <View style={styles.timerContainer}>
            {timer > 0 && (
              <Text style={[styles.loginText, styles.forgetPasswordButton]}>
                {moment.duration(timer, "seconds").minutes()}:
                {moment.duration(timer, "seconds").seconds()}{" "}
              </Text>
            )}
            <TouchableOpacity onPress={handleResend} disabled={resendDisabled}>
              <Text style={[styles.loginText]}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Button
          buttonText="VERIFY"
          buttonHandler={otpHandler}
          extraStyle={styles.loginButtonExtraStyle}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  loginHeading: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 25,
    lineHeight: 37.5,
    textAlign: "center",
    color: BLACK,
  },
  loginText: {
    fontFamily: "Poppins-Regular",
    fontSize: 17,
    textAlign: "center",
    color: GREY,
    marginBottom: 20,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
    borderRadius: 5,
    backgroundColor: "rgba(236, 240, 243, 0.46)",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    width: 50,
    height: 47,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    color: BLACK,
  },
  borderStyleHighLighted: {
    borderColor: GRADIENT_1,
  },
  errorText: {
    color: "red",
  },
  forgetPasswordButton: {
    color: GRADIENT_1,
  },
  resendContainer: {
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    marginRight: 10,
  },
  resendButton: {
    paddingHorizontal: 10,
  },
});

export default OTP;
