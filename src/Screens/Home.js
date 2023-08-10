import { View, Text,StyleSheet, TouchableOpacity ,Image , ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import Images from '../Constants/Images'
import { BLACK, GRADIENT_1, GRADIENT_2, WHITE } from '../Constants/Colors'
import BannerSlider from '../Components/BannerSlider'
import Template from '../Components/Template'
import { useNavigation } from '@react-navigation/native'
import { getRequest, uploadURL } from '../Services/request'
import { getData } from '../Services/storage'
import LinearGradient from 'react-native-linear-gradient'

const Home = () => {
  const navigation = useNavigation();
  const [instagramPost, setInstagramPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadInstaPost = async () => {
    try {

        let token = await getData("TOKEN");
        console.log(token);
        const response = await getRequest(
            `/api/secure/template/get-templates-by-category`,
            token,
            { categoryId: "64cb3df69fdbeedf7a83c133"}
        );
        if(response?.result?.status === 200){
        const mappedOptions = response?.result?.data?.templates;
        console.log(response?.result?.data?.templates);
       
            setInstagramPost(mappedOptions);
            setLoading(false);
       
        }  
    } catch (error) {
        console.log("Get All Categories Error", error);
    }
};
  useEffect(()=>{
    loadInstaPost();
  },[])
  return (
    <Layout>
      
      <BannerSlider/>
      <View style={styles.body}>
      <View style={styles.mainSection}>
        <View style={styles.sectionItem}>
          <TouchableOpacity style={styles.sectionChildItem}>
              <Image source={Images.editorIcon}/>
          </TouchableOpacity>
          <Text style={styles.sectionChildText}>Photo editor</Text>
        </View>
        <View style={styles.sectionItem}>
          <TouchableOpacity style={[styles.sectionChildItem,{backgroundColor:"#E8FFF4"}]} onPress={() => navigation.navigate("Templates")}>
              <Image source={Images.templateIcon}/>
          </TouchableOpacity>
          <Text style={styles.sectionChildText}>All templates</Text>
        </View>
      </View>
      <Text style={styles.Heading}>Get started</Text>
      <View style={styles.section}>
        <LinearGradient 
          colors={[GRADIENT_1, GRADIENT_2]}
          style={styles.sectionContainerItem}
          >
          <Text style={styles.sectionContainerText}>Getting Started with taj Print</Text>
          <View style={{alignItems:"flex-end",paddingRight:10}}>
          <Image source={Images.tajWhite} />
          </View>
        </LinearGradient>
        <TouchableOpacity style={[styles.sectionContainerItem,styles.shadow]} onPress={() => navigation.navigate("Templates")}>
          <Image source={Images.createTemplate} style={{alignSelf:"center"}}/>
          <View  style={styles.sectionContainerChildItem}>
            <Text style={[styles.sectionContainerText,{width:120,color:BLACK}]}>Create Your first Project</Text>
            <View style={styles.addIcon}>
              <Image source={Images.addBlue}/>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.Heading}>Instagram Posts</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.templateSection}>
            {
               instagramPost && !loading ? instagramPost.map((item, key) => {
                return (
                  <>
                    {item?.thumbnail !== undefined && <Template key={key} TemplateImage={uploadURL+ item?.thumbnail} handlePress={() => { navigation.navigate("CustomizeTemplate", { id: item._id }) }} />}
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
        <Text style={styles.Heading}>Email Header</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.templateSection}>
            {
               instagramPost && !loading ? instagramPost.map((item, key) => {
                return (
                  <>
                    {item?.thumbnail !== undefined && <Template key={key} TemplateImage={uploadURL+ item?.thumbnail} handlePress={() => { navigation.navigate("CustomizeTemplate", { id: item._id }) }} />}
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
      {/* <Text style={styles.Heading}>Email Headers</Text>
      <View style={styles.templateSection}>
      <Template TemplateImage={Images.templateImage}/>
        <Template TemplateImage={Images.templateImage}/>
        <Template TemplateImage={Images.templateImage}/>
        <Template TemplateImage={Images.templateImage}/>
      </View> */}
      </View>
      
      
    </Layout>
  )
}

export default Home

const styles= StyleSheet.create({
   body:{
    paddingHorizontal:23,
    marginBottom:50,
   },
    mainSection:{
      flex:1,
      flexDirection:"row",
      justifyContent:"space-between",
      gap:10,
    },
    sectionItem : {
      flex:1,
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"stretch",
      gap:10,
      backgroundColor:"white"
    },
    sectionChildItem:{
      backgroundColor:"#FEEDEC",
      // paddingHorizontal:0,
      paddingVertical:25,
      borderRadius:9,
      alignItems:"center"
    },
    sectionChildText:{
      fontFamily:"Poppins-Regular",
      fontSize:15,
      textAlign:"center"
    },
    Heading:{
      marginVertical:15,
      fontFamily:"Poppins-Medium",
      fontSize:20,
    },
    section:{
      flex:1,
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      gap:10,
      marginBottom:20,
    },
    shadow:{
      shadowRadius:10,
      shadowOffset:{
        width:10,
        height:10
      },
      shadowColor:BLACK,
      shadowOpacity:0.25,
      elevation:8,
    },

    sectionContainerItem:{
      flex:1,
      flexDirection:"column",
      gap:16,
      justifyContent:"center",
      alignItems:"stretch",
      paddingVertical:16,
      borderRadius:9,
      backgroundColor:WHITE
    },

    sectionContainerText:{
      alignSelf:"center",
      fontFamily:"Poppins-Medium",
      width:140,
      color:WHITE,
      fontSize:18,
    },

    sectionContainerChildItem:{
      flex:1,
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"flex-end"
    },
    addIcon:{
      borderColor:GRADIENT_1,
      borderWidth:1,
      borderRadius:1000,
      height:20,
      width:20,
      justifyContent:"center",
      alignItems:"center",
      alignSelf:"center",
    },
    templateSection:{
      flex:1,
      flexDirection:"row",
      alignItems:"center",
      gap:10,
      height: 90,
      justifyContent:"space-between",
    },
});