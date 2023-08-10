import { View } from "react-native";
import Images from "../Constants/Images";
import { Formik } from "formik";
import * as yup from "yup";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Container from "../Components/Container";
import { postRequestForm } from "../Services/request";

const ForgetPassword = () => {
  const navigation = useNavigation();

  const resetPasswordValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
  });

  const resetPasswordHandler = async (values) => {
    try {
      const res = await postRequestForm(`/api/auth/forget-password`, "", values);
      if (res?.result?.status === 200) {
        const response = res?.result?.data;
        if (response?.user) {
          const user = response?.user;
          navigation.navigate("OTP", { _id: user._id, pathToGo: "ChangePassword" });
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
      headerTitle={"Forget Password"}
      headerInfo={"Enter your email account to reset password"}
    >
      <Formik
        validationSchema={resetPasswordValidationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          email: "",
        }}
        onSubmit={resetPasswordHandler}
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
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <Input
                inputIcon={Images.Mail}
                inputLabel="Email"
                inputDefaultValue={values.email}
                inputPlaceholder="abc@email.com"
                inputBlurHandler={handleBlur("email")}
                inputOnChangeHandler={handleChange("email")}
              />
              <Button
                buttonText="CONTINUE"
                buttonHandler={handleSubmit}
              />
            </View>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default ForgetPassword;