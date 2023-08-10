import { View, Text, StyleSheet } from "react-native";
import { GREY } from "../Constants/Colors";
import Images from "../Constants/Images";
import React from "react";
import Container from "../Components/Container";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { postRequestForm } from "../Services/request";

const ChangePassword = () => {
  const routes = useRoute();
  const navigation = useNavigation();
  let _id = "";
  if (routes.params) {
    _id = routes.params._id;
  } else {
    navigation.goBack();
  }
  const changePasswordValidationScheme = yup.object().shape({
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  const changePasswordHandler = async (values) => {
    try {
      const res = await postRequestForm(`/api/auth/reset-password`, "", {
        _id,
        password: values.password,
      });
      console.log('res',res)
      if (res?.result?.status === 200) {
        setTimeout(() => {
          navigation.navigate("Home");
        }, 3000);
      } else {
        setTimeout(() => {
          navigation.navigate("Home");
        }, 3000);
      }
    } catch (err) {
      console.log(`Error of Forget Password`, err.message);
    }
  };

  return (
    <Container
      isBackButtonInHeader={true}
      headerTitle={"Create new Password"}
      headerInfo={
        "Your new password must be different from previous used passwords."
      }
    >
      <Formik
        validationSchema={changePasswordValidationScheme}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={changePasswordHandler}
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
              <View style={styles.bodyItem}>
                <Input
                  inputIcon={Images.Lock}
                  inputLabel={"PASSWORD"}
                  inputDefaultValue={values.password}
                  inputPlaceholder={"********"}
                  inputBlurHandler={handleBlur("password")}
                  inputOnChangeHandler={handleChange("password")}
                  isPassword={true}
                />
                <Text style={styles.text}>Must contain 8 character</Text>
              </View>
              <View style={styles.bodyItem}>
                <Input
                  inputIcon={Images.Lock}
                  inputLabel={"CONFIRM PASSWORD"}
                  inputDefaultValue={values.confirmPassword}
                  inputPlaceholder={"********"}
                  inputBlurHandler={handleBlur("confirmPassword")}
                  inputOnChangeHandler={handleChange("confirmPassword")}
                  isPassword={true}
                />
                <Text style={styles.text}>Both passwords must match</Text>
              </View>
              <Button
                buttonText="RESET PASSWORD"
                buttonHandler={handleSubmit}
              />
            </View>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default ChangePassword;
const styles = StyleSheet.create({
  text: {
    color: GREY,
    marginBottom: 20,
    marginLeft: 17,
  },
});
