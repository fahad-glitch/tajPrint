import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {BLACK, GREY} from '../Constants/Colors';
import React, {useEffect, useState} from 'react';
import Images from '../Constants/Images';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import * as mime from 'mime';
import Container from '../Components/Container';
import Input from '../Components/Input';
import Button from '../Components/Button';
import { getData, storeData } from '../Services/storage';
import { putRequestForm, uploadURL } from '../Services/request';

const EditProfile = () => {
  const [image, setImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [User, setUser] = useState(null);
  const [userId, setUserId] = useState();
  const [country, setCountry] = useState("");

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        maxWidth: 480,
        maxHeight: 640,
        includeBase64: true,
      },
      response => {
        if (!response.didCancel) {
          setImage(response.assets[0].uri);
          uriToFile(response.assets[0].uri).then(file => {
            setProfileImage(file);
          });
        }
      },
    );
      

  };

  async function uriToFile(uri) {
    const fileInfo = await RNFS.stat(uri);
    const mimeType = mime.getType(uri);
    const fileContents = await RNFS.readFile(uri, 'base64');
    return {
      uri,
      name: fileInfo.name,
      type: mimeType,
      data: fileContents,
    };
  }
  const handleSubmit = async () => {
    // Handle form submission
    try {
      const formData = new FormData()
      if (profileImage != null) {
        formData.append("profileImage", profileImage);
      }
      formData.append("firstName", firstName ? firstName : "");
      formData.append("lastName", lastName ? lastName : "");
      formData.append("country", country ? country : "");
      formData.append("email", email ? email : "");
      formData.append("phone", phone ? phone : "");
      formData.append("_id", userId);
      // console.log("formData", Object.fromEntries(formData));
      const response = await putRequestForm(
        "/api/secure/user/edit-profile",
        "",
        formData
      );

      if (response?.result?.status === 200) {
        const res = response.result.data;
        const user = res?.user;
        await storeData("USER", JSON.stringify(user, null, 2));
        alert('Updated')
        // navigation.navigate("Dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    let res = await getData("USER");
    var data = JSON.parse(res);
    console.log("data", data);
    if (data) {
      setFirstName(data?.firstName);
      setLastName(data?.lastName);
      setEmail(data?.email);
      setPhone((data?.phone).toString());
      setCountry(data?.country);
      setImage(uploadURL + data?.profileImage);
      setUser(data);
      setUserId(data?._id);
    } else {
      // navigation.navigate("Login");
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <Container
      isBackButtonInHeader={true}
      isHeaderImage={false}
      headerTitle={'Edit Profile'}>
      <View>
        {image ? (
          <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
            <Image source={{uri: image}} style={styles.image} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
            <Text style={styles.imagePlaceholder}>Add Image</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Text style={styles.accountHeading}>About you</Text>
      </View>
      <Input
        inputIcon={Images.Person}
        inputLabel="First Name"
        inputDefaultValue={firstName}
        inputOnChangeHandler={setFirstName}
        inputPlaceholder="Faizan Shamas"
      />
      <Input
        inputIcon={Images.Person}
        inputLabel="Last Name"
        inputDefaultValue={lastName}
        inputOnChangeHandler={setLastName}
        inputPlaceholder="Shamas Iqbal"
      />
      <Input
        inputLabel="Country"
        inputDefaultValue={country}
        inputOnChangeHandler={setCountry}
        inputPlaceholder="India"
      />

      <View>
        <Text style={styles.accountHeading}>Account Details</Text>
      </View>
      <Input
        inputIcon={Images.Mail}
        inputLabel="Email"
        inputDefaultValue={email}
        inputOnChangeHandler={setEmail}
        inputPlaceholder="abc@email.com"
      />
      <Input
        inputIcon={Images.Phone}
        inputLabel="Phone"
        inputDefaultValue={phone}
        inputOnChangeHandler={setPhone}
        inputPlaceholder="1800878123"
      />
      <Button
        buttonText="UPDATE"
        buttonHandler={handleSubmit}
        // buttonHandler={() => {
        //   navigation.navigate("OTP");
        // }}
      />
    </Container>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  body: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },

  inputDivision: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    marginBottom: 30,
    fontFamily: 'Poppins-SemiBold',
  },
  imagePlaceholder: {
    color: '#777',
    textAlign: 'center',
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: GREY,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  accountHeading: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: BLACK,
    marginBottom: 10,
    marginTop: 20,
  },
});
