import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Input from "../Components/Input";
import Images from "../Constants/Images";
import Button from "../Components/Button";
import { Formik } from "formik";
import { BLACK, GRADIENT_1, GREEN, GREY } from "../Constants/Colors";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import Container from "../Components/Container";
import { postRequestForm } from "../Services/request";

const Login = () => {
  const navigation = useNavigation();
  const loginValidationScheme = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  const loginHandler = async (values) => {
    
    try {
      console.log("values", values)
      const res = await postRequestForm(`/api/auth/login`, "", values);
      console.log("response", res)
      if (res?.result?.status === 200) {
        const response = res?.result?.data;
        if (response?.user) {
          const user = response?.user;
          console.log(
            "hello"
          );
          navigation.navigate("OTP", { _id: user._id, pathToGo: "Home" });
        } else {
          setError("Enexpected Signup Error.");
        }
      }
    } catch (err) {
      setError("Signup Request Error: " + err.message);
      console.log(`Error of login`, err.message);
    }
  };

  return (
    <Container
      isBackButtonInHeader={false}
      isHeaderImage={true}
      headerImage={Images.loginHeader}
    >
      <View>
        <Text style={styles.loginHeading}>Welcome Back</Text>
        <Text style={styles.loginText}>
          Design social graphics, ads, poster, flyers & more
        </Text>
        <Formik
          validationSchema={loginValidationScheme}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={loginHandler}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldValue,
          }) => (
            <>
              <Input
                inputIcon={Images.Mail}
                inputLabel={"Email"}
                inputDefaultValue={values.email}
                inputPlaceholder={"User123@gmail.com"}
                inputBlurHandler={handleBlur("email")}
                inputOnChangeHandler={handleChange("email")}
                isPassword={false}
              />
              <Input
                inputIcon={Images.Lock}
                inputLabel={"Password"}
                inputDefaultValue={values.password}
                inputPlaceholder={"********"}
                inputBlurHandler={handleBlur("password")}
                inputOnChangeHandler={handleChange("password")}
                isPassword={true}
              />
              <View style={styles.forgetPasswordButtonCover}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgetPassword")}
                >
                  <Text
                    style={[
                      styles.forgetPasswordButton,
                      styles.loginButtonText,
                    ]}
                  >
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              <Button
                buttonText="LOGIN"
                buttonHandler={handleSubmit}
                // buttonHandler={() => {
                //   navigation.navigate("OTP");
                // }}
                extraStyle={styles.loginButtonExtraStyle}
              />

              <View style={styles.signInbuttonContainer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text
                    style={[styles.signUpButtonCover, styles.loginButtonText]}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
      <View style={[styles.signInbuttonContainer, styles.footerContainer]}>
        <Text style={[styles.loginButtonText, styles.loginFooterText]}>
          By continuing, you agree to the{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
          <Text style={[styles.footerButtonCover, styles.loginButtonText]}>
            Terms of Services
          </Text>
        </TouchableOpacity>
        <Text style={[styles.loginButtonText, styles.loginFooterText]}>
          {" "}
          and{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Privacy")}>
          <Text style={[styles.footerButtonCover, styles.loginButtonText]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <Text style={[styles.loginButtonText, styles.loginFooterText]}>.</Text>
      </View>
    </Container>
  );
};

export default Login;

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
    // lineHeight: 19.5,
    textAlign: "center",
    color: GREY,
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  signInbuttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    flexWrap: "wrap",
  },
  footerContainer: {
    marginTop: 30,
  },
  signUpButtonCover: {
    color: GREEN,
  },
  footerButtonCover: {
    color: BLACK,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
  forgetPasswordButton: {
    color: GRADIENT_1,
  },
  forgetPasswordButtonCover: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  loginButtonExtraStyle: {
    marginVertical: 20,
  },
  loginFooterText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
});
