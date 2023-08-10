import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { GREEN, GREY } from "../Constants/Colors";
import Images from "../Constants/Images";
import { Formik } from "formik";
import * as yup from "yup";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Container from "../Components/Container";
import { postRequestForm } from "../Services/request";

const SignUp = () => {
  const navigation = useNavigation();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const signUpValidationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is Required"),
    lastName: yup.string().required("Last Name is Required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is Required")
      .min(10, "Phone number is too short")
      .max(10, "Phone number is too long"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  const signupHandler = async (values) => {
    try {
      const formData = new FormData()
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      const res = await postRequestForm(`/api/auth/register`, "", formData);
      console.log("res?.result",res?.result)
      if (res?.result?.status === 200) {
        const response = res?.result?.data;
        if (response?.user) {
          const user = response?.user;
          navigation.navigate("OTP", { _id: user._id, pathToGo: "Home" });
        } else {
          setError("Enexpected Signup Error.");
        }
      }
      console.log("values", values);
    } catch (err) {
      setError("Signup Request Error: " + err.message);
      console.log(`Error of login`, err.message);
    }
  };

  return (
    <Container
      isBackButtonInHeader={true}
      headerTitle={"Register"}
      headerInfo={"Create your Account"}
    >
      <Formik
        validationSchema={signUpValidationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone: "",
        }}
        onSubmit={signupHandler}
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
              inputIcon={Images.Person}
              inputLabel="First Name"
              inputDefaultValue={values.firstName}
              inputPlaceholder="Faizan Shamas"
              inputBlurHandler={handleBlur("firstName")}
              inputOnChangeHandler={handleChange("firstName")}
            />
            <Input
              inputIcon={Images.Person}
              inputLabel="Last Name"
              inputDefaultValue={values.lastName}
              inputPlaceholder="Shamas Iqbal"
              inputBlurHandler={handleBlur("lastName")}
              inputOnChangeHandler={handleChange("lastName")}
            />
            <Input
              inputIcon={Images.Mail}
              inputLabel="Email"
              inputDefaultValue={values.email}
              inputPlaceholder="abc@email.com"
              inputBlurHandler={handleBlur("email")}
              inputOnChangeHandler={handleChange("email")}
            />
            <Input
              inputIcon={Images.Phone}
              inputLabel="Phone"
              inputDefaultValue={values.phone}
              inputPlaceholder="1800878123"
              inputBlurHandler={handleBlur("phone")}
              inputOnChangeHandler={handleChange("phone")}
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
            <Button
              buttonText="SIGN UP"
              buttonHandler={handleSubmit}
            />

            <View
              style={[
                { justifyContent: "center" },
                styles.signInbuttonContainer,
              ]}
            >
              <Text style={styles.footerText}>I have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={styles.signInButtonCover}
              >
                <Text style={[styles.signInButtonCover, styles.footerText]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerEnd}></View>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  footerText: {
    paddingTop: 20,
    fontSize: 14,
  },
  signInbuttonContainer: {
    flexDirection: "row",
  },
  signInButtonCover: {
    color: GREEN,
  },
  footerEnd: {
    marginHorizontal: "22%",
    paddingTop: 20,
    borderBottomWidth: 2,
    borderColor: GREY,
  },
});
