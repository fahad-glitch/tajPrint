import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, ScrollView, FlatList,} from "react-native";
import Images from "../../Constants/Images";
import { Dimensions } from "react-native";

import { getData } from "../../Services/storage";

export const FontFunc = ({handleCancel,handleFont})=>{

    const [font, setFont] = useState([
        'Arial','Times New Roman','Copperplate','Courier New','Georgia','Helvetica','Impact','Palatino','Trebuchet MS','Verdana'
    ]);
    
//     const loadFont = async () => {
   
//             const family = await getData("FONT");
//             console.log(family)
//             setFont(family);
            
//     }

//   useEffect(() => {
//     loadFont();
//   }, []);



    const renderFont = ({item})=>{
        return (
            <View>
                
                    
                            <TouchableOpacity style={styles.fontFamilyText} onPress={()=>handleFont(item)}> 
                                <Text  style={{fontSize:16,fontFamily:item}}>{item}</Text>
                            </TouchableOpacity>
                       
            </View>
        )
    }
    return ( 
        <View style={styles.fontContainer}>
            <TouchableOpacity style={styles.cancelButton } onPress={handleCancel}>
                <Image source={Images.Cancel}/>
            </TouchableOpacity>
            <View>
                <FlatList
                data={font}
                renderItem={renderFont}
                keyExtractor={(item)=>item}
                />
            </View>
        </View>
    )
} 


const styles=StyleSheet.create({

fontContainer:{
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