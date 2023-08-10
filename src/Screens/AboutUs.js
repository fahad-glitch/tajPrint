import { View, Text,StyleSheet,Image,ScrollView } from "react-native";
import React,{useState,useEffect} from "react";
import SimpleLayout from "../Components/SimpleLayout";
import RenderHtml from "react-native-render-html";
import { getRequest, uploadURL } from "../Services/request";
import { BLACK, GREY, WHITE } from "../Constants/Colors";

const AboutUs = () => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");

  const getPage = async () => {
    try {
      const res = await getRequest(
        `/api/secure/page/about-us?pageName=About Us`,
        "",
        {}
      );
      if (res?.result?.status === 200) {
        console.log(res.result.data.aboutUs.content);
        setContent(res.result.data.aboutUs.content);
        setFeaturedImage(res.result.data.aboutUs.featuredImage);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    } catch (error) {
      console.log("Get About Page Issue", error);
    }
  };

  useEffect(() => {
    getPage();
  }, []);

  return (
    <SimpleLayout>
      {loading ? (
        <Text
          style={{
            textAlign: "center",
          }}
        >
          Loading ...
        </Text>
      ) : (
        <>
          <Image
            source={{
              uri: uploadURL + featuredImage,
            }}
            style={{ width: "100%", marginBottom: 20, height: 200 }}
          />
          <ScrollView style={styles.contentBox}>
            <RenderHtml
              source={{
                html: content,
              }}
            />
          </ScrollView>
        </>
      )}
    </SimpleLayout>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  contentBox: {
    marginHorizontal: 15,
    paddingHorizontal: 10,
    marginBottom: 40,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: BLACK,
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: WHITE,
  },
});
