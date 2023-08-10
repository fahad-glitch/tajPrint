import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, ScrollView, Dimensions, TextInput, FlatList } from "react-native";
import Images from "../../Constants/Images";


export default function TextStyleFunc ({type,handleStyle}) {

    const [content, setContent] = useState([])
    const loadContent = (type) => {
        switch (type) {
            case 'Text Alignment':
                setContent([
                    {
                        text:"Center",
                        Image:Images.Center
                    },
                    {
                        text:"Right",
                        Image:Images.Right
                    },
                    {
                        text:"Justify Left",
                        Image:Images.jLeft
                    },
                    {
                        text:"Justify Center",
                        Image:Images.jCenter
                    },
                    {
                        text:"Justify Right",
                        Image:Images.jRight
                    },
                ]);
                break;
            case 'Rotate':
                setContent([
                    {
                        text:"Rotate Right",
                        Image:Images.rotateText
                    },
                    {
                        text:"Rotate Left",
                        Image:Images.rotateText
                    },
                ]);
                break;
            case 'Text Style':
                setContent([
                    {
                        text:"Bold",
                        Image:Images.Bold
                    },
                    {
                        text:"Italic",
                        Image:Images.Italic
                    },
                    {
                        text:"Underline",
                        Image:Images.underLine
                    },
                ]);
                break;
            case 'Align':
                setContent([
                    {
                        text:"Bring to front",
                        Image:Images.Bold
                    },
                    {
                        text:"Bring to back",
                        Image:Images.Italic
                    },
                    {
                        text:"Send to top",
                        Image:Images.underLine
                    },
                    {
                        text:"Send to bottom",
                        Image:Images.underLine
                    },


                ]);
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        loadContent(type);
    },[type])
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

           
            {
                content.map((item,key) => {
                    return (
                        <TouchableOpacity key={key} style={styles.containerItem} onPress={()=>handleStyle(item.text)}>
                            <Image source={item.Image} />
                            <Text style={styles.text}>{item.text}</Text>
                        </TouchableOpacity>
                    )
                })
            }
            </ScrollView>  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 23,
        gap: 10,
        paddingVertical: 20,
       
    },
    containerItem: {
        flex:1,
        paddingRight:40,
        alignItems: "center"
    },
    text: {
        paddingTop:7,
        fontSize: 12,
        fontFamily: "Poppins-Regular",
    }
})
