import React, { useEffect, useMemo, useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, ScrollView, Dimensions, TextInput, FlatList } from "react-native";

import Images from "../../Constants/Images";

export const TextColorFunc = ({handleCancel,handleColor})=>{

    const [color,setColor] = useState();
    const COLORS=[
        '#d73964',
        '#d23440',
        '#db643a',
        '#e88334',
        '#e2a71e',
        '#e25241',
        '#d0da59',
        '#4053ae',
        '#70b949',
        '#73564a',
        '#67ab5a',
        '#8f36aa',
        '#f6c244',
        '#52b9d0',
        '#4595ec',
        '#009688',
        '#5abeA7',
        '#59bccd',
        '#4a97e4',
        '#2d68cd',
        '#9946c7',
        '#d9639e',
        '#6d6f74',
        '#939287',
        '#868ea3',
      ]
    return (
        <View style={styles.textColorContainer}>
            <TouchableOpacity style={styles.cancelButton } onPress={handleCancel}>
                <Image source={Images.Cancel}/>
            </TouchableOpacity>

        
            <View style={styles.textColorContainerItem}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    COLORS.map((item)=>
                    {
                        return(
                            <TouchableOpacity style={[styles.colorItem,{backgroundColor:item}]} onPress={()=>handleColor(item)}>
                            </TouchableOpacity>
                        )
                    })
                }
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textColorContainer:{
        paddingBottom:10,
        paddingTop:15,
        paddingHorizontal:10,
    },
    textColorContainerItem:{
        justifyContent:"space-between",
        flexDirection:"row",
        paddingVertical:30,
    },
    colorItem:{
        padding:15,
        marginHorizontal:5,
        borderRadius:1000,
    },
    cancelButton:{
        alignItems:"flex-end",
    },
    //font 

    fontContainer:{
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