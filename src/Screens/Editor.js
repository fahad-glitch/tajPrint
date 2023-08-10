import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, Text, ActivityIndicator } from 'react-native';
import { GREY, WHITE } from '../Constants/Colors';
import LayersBotttom from '../Components/LayersBottom';
import { useNavigation, useRoute } from '@react-navigation/native';
import SimpleHeader from '../Components/SimpleHeader';
import { getRequest, putRequest, uploadURL } from '../Services/request';
import { getData } from '../Services/storage';

export default function Editor() {
  const nav = useNavigation();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const [id,setId]=useState(null);
  const [name,setName]=useState(null);
  const [categoryId,setCategoryId]=useState(null);
  const [design,setDesign]=useState(null);

  const route = useRoute();

  const updateTemplate = async()=>{
    const formData = new FormData();
      formData.append("name", 'fahad updated'); 

      formData.append("_id", id);
  
      
        formData.append("categoryId", categoryId);
      
      
        formData.append("design", design);

        console.log("formdata",formData)
    try {
      
      
      let token = await getData("TOKEN");
      const response = await putRequest(
        "/api/secure/template/update-template",
        token,
        formData
      );
      if (response?.result?.status === 200) {

        console.log("Create Template APi response", response?.result?.data?.template);
        setContent(response?.result?.data?.template)
        setLoading(true);
      }
    } catch (error) {
      console.log("Create Template APi error", error.message);
    }
  }


  const loadProject = async () => {
    try {
      let token = await getData("TOKEN");
      const response = await getRequest(
        `/api/secure/project/get-edit-project`,
        token,
        { projectId: route.params.id}
      );
      if (response?.result?.status === 200) {
        console.log("Create Template APi response", response?.result?.data?.project?.templateId);
        setContent(response?.result?.data?.project?.templateId);
        setId(response?.result?.data?.project?.templateId?._id);
        setName(response?.result?.data?.project?.name);
        setCategoryId(route?.params?.content?.templateId?.categoryId?._id);
        setLoading(true);
      }
    } catch (error) {
      console.log("Create Template APi error", error.message);
    }
  }
  useEffect(() => {
      // if(route?.params?.updatedDesign){
      //   setDesign(JSON.stringify(route?.params?.updatedDesign));
      //  design && console.log("updated design",design)
      //   // updateTemplate();
      // }else{
        loadProject();
      //   // setContent(route?.params?.content);
        
      // }
  }, [route])
  return (
    <View style={styles.simpleLayoutContainer}>
      <SimpleHeader isEditor={true}/>
     <View style={styles.imageContainer}>
        {loading?<Image source={{ uri: uploadURL + content.thumbnail }}  style={styles.imageStyle}
        resizeMode="contain"
        />:<ActivityIndicator size="large"/>}
      </View>
      
      {content && <LayersBotttom ContentType="all" handleButton={(name) => nav.navigate("Add", { type: name, design: content })} />}
      
    </View>
  )
}
const styles = StyleSheet.create({
  simpleLayoutContainer: {
    backgroundColor: WHITE,
    flex: 1
  }
  ,
  imageContainer: {
    borderTopWidth: 2,
    borderTopColor: GREY,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle:{
    width: "90%",
    height: "90%",
    borderRadius: 10,
    borderColor: "#DDDDDD",
    borderWidth: 1,
  }

});