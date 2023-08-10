import {
  StyleSheet,
  View,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import SimpleLayout from "../Components/SimpleLayout";
import { BLACK } from "../Constants/Colors";
import { getRequest } from "../Services/request";
import Accordion from "../Components/Accordion";
import Heading from "../Components/Heading";


const FAQs = () => {
  const [loading, setLoading] = useState(true);
  const [faqList, setFaqList] = useState([]);

  const getPage = async (pageName) => {
    try {
      const res = await getRequest(
        `/api/secure/page/faqs`,
        "",
        {pageName}
      );
      if (res?.result?.status === 200) {
        setFaqList(res.result.data.faqsPage.questions);
        setLoading(false);
      }
    } catch (error) {
      console.log("Get Terms Page Issue", error);
    }
  };
  useEffect(() => {
    getPage("FAQs");
  }, []);
  return (
    <SimpleLayout>
      <View style={styles.content}>
        <Heading heading="FAQ's:"/>
        {loading && faqList ? (
          <Text
            style={{
              textAlign: "center",
            }}
          >
            Loading ...
          </Text>
        ) : (
          <>
            {faqList.map((faq, index) => (
              <Accordion
                key={index}
                title={faq.question}
                content={faq.answer}
              />
            ))}
          </>
        )}
      </View>
    </SimpleLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    margin: 10,
    marginVertical: 20,
  },
});

export default FAQs;
