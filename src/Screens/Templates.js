import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import Layout from "../Components/Layout";
import Images from "../Constants/Images";
import { WHITE } from "../Constants/Colors";
import Template from "../Components/Template";
import { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getRequest, uploadURL } from "../Services/request";
import { getData } from "../Services/storage";
import Categories from "../Components/Categories";
import AllTemplates from "./AllTemplates";
const Templates = () => {

  const navigate = useNavigation();
  const isFocus = useIsFocused();

  const [yml, setYml] = useState([]);
  const [trending, setTrending] = useState([]);
  const [lastDesign, setlastDesign] = useState([]);
  const [cat, setCat] = useState("all");
  const [ymlLoading, setYmlLoading] = useState(true);
  const [lastdLoading, setLastdLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all'); // Initial active category

  const handleCategoryChange = (newCategory) => {
    setActiveCategory(newCategory);
  };
  // API Calls


  const loadYMLTemplates = async () => {
    try {
      let token = await getData("TOKEN");
      let user = await getData("USER");
      user = JSON.parse(user);
      console.log("fahad", user._id);
      console.log(token);
      const response = await getRequest(
        `/api/secure/template/get-templates-yml`,
        token,
        { userId: user._id }
      );

      console.log("trending", response);
      setYml(response?.result?.data?.trendingTemplates);
      setYmlLoading(false);
    } catch (error) {
      console.log("Get All Categories Error", error);
    }
  };
  const loadLastDesignTemplates = async () => {
    try {
      let token = await getData("TOKEN");
      let user = await getData("USER");
      user = JSON.parse(user);
      console.log("fahad", user._id);
      console.log(token);
      const response = await getRequest(
        `/api/secure/template/get-templates-by-last-design`,
        token,
        { userId: user._id }
      );
      console.log("trending", response);
      setlastDesign(response?.result?.data?.trendingTemplates);
      setLastdLoading(false);
    } catch (error) {
      console.log("Get All Categories Error", error);
    }
  };
  const loadMostTrending = async () => {

    try {
      let token = await getData("TOKEN");
      const response = await getRequest(
        `/api/secure/template/get-templates-most-trending`,
        token,
      );
      setTrending(response?.result?.data?.trendingTemplates);
      setTrendingLoading(false);
    } catch (error) {
      console.log("Get All Users Error", error);
    }
  }

  //UseEffect

  useEffect(() => {

    loadYMLTemplates();
    loadLastDesignTemplates();
    loadMostTrending();
  }, [Layout, isFocus])



  return (
     <Layout isScroll={false}>
      <Categories activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        handleChange={(item) => setCat(item)}
      />
     {cat == "all" ?
     <ScrollView>
      <View style={styles.cover}>
        <Text style={styles.coverHeading}>
          Preserve style, remove noise
        </Text>
        <Text style={styles.coverText}>
          Remove image backgrounds automatically in just one click
          without losing quality.
        </Text>
        <TouchableOpacity activeOpacity={0.6} style={styles.buttonContainer}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.buttonText}>Explore Background Remover</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.template}>
        <Text style={styles.Heading}>You May Like</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.templateSection}>
            {
              yml && !ymlLoading ? yml.map((item, key) => {
                return (
                  <>
                    {item?.thumbnail !== undefined && <Template key={key} TemplateImage={uploadURL + item?.thumbnail} handlePress={() => { navigate.navigate("CustomizeTemplate", { id: item._id }) }} />}
                  </>
                )
              }) : <>
                <Template isLoading={true} />
                <Template isLoading={true} />
                <Template isLoading={true} />
                <Template isLoading={true} />
              </>
            }
          </View>
        </ScrollView>
        <Text style={styles.Heading}>Inspired By Your Last Design</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.templateSection}>
            {
              lastDesign && !lastdLoading ? lastDesign.map((item, key) => {
                return (
                  <>
                    {item?.thumbnail !== undefined && <Template key={key} TemplateImage={uploadURL + item?.thumbnail} handlePress={() => { navigate.navigate("CustomizeTemplate", { id: item._id }) }} />}
                  </>
                )
              }) : <>
                <Template isLoading={true} />
                <Template isLoading={true} />
                <Template isLoading={true} />
                <Template isLoading={true} />
              </>
            }
          </View>
        </ScrollView>
        <Text style={styles.Heading}>Trending Near You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.templateSection}>
            {
              trending && !trendingLoading ? trending.map((item, key) => {
                return (
                  <>
                    {item?.thumbnail !== undefined && <Template key={key} TemplateImage={uploadURL + item?.thumbnail} handlePress={() => { navigate.navigate("CustomizeTemplate", { id: item._id }) }} />}
                  </>
                )
              }) : <>
                <Template isLoading={true} />
                <Template isLoading={true} />
                <Template isLoading={true} />
                <Template isLoading={true} />
              </>
            }
          </View>
        </ScrollView>
      </View>
      </ScrollView>:
      <AllTemplates categoryId={cat} />}
    </Layout> 
  );
};


export default Templates;



const styles = StyleSheet.create({

  cover: {
    flex: 1,
    backgroundColor: "#FFE3DD",
    gap: 10,
    paddingHorizontal: 28,
    paddingVertical: 23,
  },
  coverHeading: {
    fontSize: 25,
    fontFamily: "Poppins-SemiBold",
  },
  coverText: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
  },
  buttonContainer: {
    paddingVertical: 10,
    backgroundColor: "#FD685A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: WHITE,
  },
  Heading: {
    marginVertical: 15,
    fontFamily: "Poppins-Medium",
    fontSize: 20,
  },
  templateSection: {
    flexDirection: "row",
    height: 90,
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
  template: {
    paddingHorizontal: 23,
    marginBottom: 30,
  }
});