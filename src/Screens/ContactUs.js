import { View, StyleSheet, Modal, Image, Text } from "react-native";
import Images from "../Constants/Images";
import { Formik } from "formik";
import * as yup from "yup";
import React,{useState,useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Container from "../Components/Container";
import { getData } from "../Services/storage";
import { postRequestForm } from "../Services/request";

const ContactUs = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const messageValidationScheme = yup.object().shape({
    message: yup.string().required("Message is Required"),
  });

  const loadData= async ()=>{
    let res = await getData("USER");
    var data = JSON.parse(res);
    console.log("data", data);
    if (data) {
      setFirstName(data?.firstName);
      setLastName(data?.lastName);
      setEmail(data?.email);
      setPhone(data?.phone);
    } else {
      // navigation.navigate("Login");
    }
  }

  const messageHandler = async (values) => {
    try {
      // const formData = new FormData()
      // formData.append("firstName", firstName ? firstName : "");
      // formData.append("lastName", lastName ? lastName : "");
      // formData.append("message", values.message);
      // formData.append("email", email ? email : "");
      // formData.append("phone", phone ? phone : "");
      let data= {
        "firstName":firstName,
        "lastName":lastName,
        "email":email,
        "phone":phone,
        "message":values.message
      };
      console.log(data);
      const res = await postRequestForm(`/api/secure/contact/send-contact-query`, 
      "", data);
      console.log("res?.result",res)
      if (res?.result?.status === 200) {
        const response = res?.result?.data;
        if (response) {
          console.log("values", response.message);
        } else {
          console.log("Enexpected Contact Error.");
        }
      }
      // console.log(values);
      
    } catch (err) {
      setError("Signup Request Error: " + err.message);
      console.log(`Error of contact`, err.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <Container
      isBackButtonInHeader={true}
      headerTitle={"Contact Us"}
      headerInfo={"We’d love to hear from you"}
    >
      <Formik
        validationSchema={messageValidationScheme}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          message: "",
        }}
        onSubmit={messageHandler}
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
                inputLabel="Message"
                inputDefaultValue={values.message}
                inputPlaceholder=""
                inputBlurHandler={handleBlur("message")}
                inputOnChangeHandler={handleChange("message")}
                multiline={true}
              />
              <Button
                buttonText="SUBMIT"
                buttonHandler={handleSubmit}
                // buttonHandler={() => {
                //   // navigation.navigate("OTP")
                // }}
              />
            </View>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default ContactUs;

const styles = StyleSheet.create({});
