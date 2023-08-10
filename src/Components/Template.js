import React from 'react'
import { View,StyleSheet,Dimensions,Image, TouchableOpacity } from 'react-native'
import { GREY } from '../Constants/Colors';
import { ActivityIndicator } from 'react-native';

export default function Template({TemplateImage,story,handlePress,isLoading=false}) {
  return (
    <View>
    {isLoading?<View style={[styles.image,{backgroundColor:"#ECECEC",alignItems:"center",justifyContent:"center"}]}><ActivityIndicator/></View>:<TouchableOpacity  style={styles.container} onPress={handlePress}>
        <Image source={{uri:TemplateImage}} resizeMode='contain' style={story ? styles.storyImage : styles.image}/>
    </TouchableOpacity>}
    </View>
  )
}


const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        
        borderColor:GREY,
        borderWidth:1,
        borderRadius:7,
        marginLeft:4,
        
    },
    image: {
        width: screenWidth * 0.2,
        height: screenWidth * 0.2,
        borderRadius:7,
      },
      storyImage: {
        width: screenWidth * 0.2,
        height: screenWidth * 0.4,
        borderRadius:7,
      },
});
