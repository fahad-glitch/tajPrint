import { Text,StyleSheet,ScrollView} from "react-native";
import React,{ useState,useEffect} from "react";
import SimpleLayout from "../Components/SimpleLayout";
import RenderHtml from "react-native-render-html";
import { getRequest } from "../Services/request";
import { BLACK, WHITE } from "../Constants/Colors";
import Heading from "../Components/Heading";

const TermsOfUse= () => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");

  const getPage = async (pageName) => {
    try {
      const res = await getRequest(
        `/api/secure/page/terms-of-use`,
        "",
        {
          pageName
        }
      );
      console.log(res.result.data.termsOfUsePage.content);
      if (res?.result?.status === 200) {
        console.log(res.result.data.termsOfUsePage.content);
        setContent(res.result.data.termsOfUsePage.content);
        setLoading(false);
      }
    } catch (error) {
      console.log("Get terms of use Issue", error);
    }
  };
  useEffect(() => {
    getPage("Terms Of Use");
  }, []);

  return (
    <SimpleLayout>
      {loading ? (
        <>
        <Heading heading="Terms Of Use"/>
        <Text
          style={{
            textAlign: "center",
          }}
        >
          Loading ...
        </Text>
        </>
      ) : (
        <>

          <Heading heading="Terms Of Use"/>
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
const styles = StyleSheet.create({
  contentBox: {
    marginHorizontal: 23,
    marginBottom: 40,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: BLACK,
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: WHITE,
  },
});
export default TermsOfUse;
