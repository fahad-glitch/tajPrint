import { Text,StyleSheet,ScrollView} from "react-native";
import React,{ useState,useEffect} from "react";
import SimpleLayout from "../Components/SimpleLayout";
import RenderHtml from "react-native-render-html";
import { getRequest } from "../Services/request";
import { BLACK, WHITE } from "../Constants/Colors";
import Heading from "../Components/Heading";

const Disclaimer= () => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");

  const getPage = async (pageName) => {
    try {
      const res = await getRequest(
        `/api/secure/page/disclaimer`,
        "",
        {
          pageName
        }
      );
      console.log(res.result.data.disclaimerPage.content);
      if (res?.result?.status === 200) {
        console.log(res.result.data.disclaimerPage.content);
        setContent(res.result.data.disclaimerPage.content);
        setLoading(false);
      }
    } catch (error) {
      console.log("Get Disclaimer Issue", error);
    }
  };
  useEffect(() => {
    getPage("Disclaimer");
  }, []);

  return (
    <SimpleLayout>
      {loading ? (
        <>
        <Heading heading="Disclaimer"/>
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

          <Heading heading="Disclaimer"/>
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
    // <SimpleLayout>
    //   <View>
    //     <Text>Privacy Policy</Text>
    //   </View>
    // </SimpleLayout>
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
export default Disclaimer;
