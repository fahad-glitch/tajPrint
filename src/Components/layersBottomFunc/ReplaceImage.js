import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, ScrollView, FlatList,} from "react-native";
import Images from "../../Constants/Images";
import { Dimensions } from "react-native";
import Template from "../Template";
import * as ImagePicker from 'react-native-image-picker';

export default function ReplaceImage({handleCancel,src,handleImage}) {

    const [image, setImage] = useState([]);

    const pickImage =  () => {
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
                console.log(response.assets[0].includeBase64)
              setImage([...image,'data:image/png;base64,'+response.assets[0].includeBase64]);
            }
          },
        );
      };

      useEffect(() => {

        setImage([src]);
        
      }, []);

    return ( 
        <View style={styles.replaceContainer}>
            <TouchableOpacity style={styles.cancelButton } onPress={handleCancel}>
                <Image source={Images.Cancel}/>
            </TouchableOpacity>
            <View>
                <TouchableOpacity style={styles.fontFamilyText} onPress={pickImage}>
                    <Text>Upload Image</Text>
                </TouchableOpacity>
                <View style={{flexDirection:"row",gap:5 ,flexWrap:"wrap"}}>

                
                {
                    image?image.map((item)=>{
                        return  <Template TemplateImage={item} handlePress={()=>handleImage(item, "image ka papa")}/>
                    }):null
                }
                </View>
            </View>
        </View>
    )
}


const styles=StyleSheet.create({

    replaceContainer:{
        height:Dimensions.get('window').height*0.3,
        paddingTop:14,
        paddingHorizontal:20,
        
    },
    fontFamilyText:{
        borderBottomColor:"#0000000F",
        borderBottomWidth:1,
        paddingVertical:9,
        alignItems:"center",
        justifyContent:"center"
    },
    })