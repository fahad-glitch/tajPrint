import React, { useEffect, useState } from 'react'
import { View,Text,Image,TouchableOpacity ,StyleSheet } from 'react-native'
import Images from '../Constants/Images';
import { GRADIENT_1, WHITE } from '../Constants/Colors';
import { useNavigation } from '@react-navigation/native';

const LayersHeader =({handleButton,type,saveDesign}) =>{
    const [activeItem, setActiveItem] = useState(0);
    

    const navHandler = (name,index)=>{
        setActiveItem(index);
        handleButton(name);
    }
    const navigate= useNavigation();
    const NavButton = ({ name, active,onPress }) => {
        return (
            <TouchableOpacity style={[styles.navigation,active?styles.activeNavigation:null]} onPress={onPress}>
                <Text style={[styles.navText,active?styles.activeNavText:null]}>{name}</Text>
            </TouchableOpacity>
        );
    }

    useEffect(()=>{
        if(type=='image')
        {
            setActiveItem(2);
        }else if(type=='text'){
            setActiveItem(1);
        }else if(type=='other')
        {
            setActiveItem(3);
        }else if(type=='all'){
            setActiveItem(0);
        }
    },[type])
   
  return (
    <>
    <View style={styles.headerContainer}>
        <View style={styles.containerItem}>
            <Text style={styles.text}>Layers</Text>
            <View style={styles.containerChildItem}>
                
                <TouchableOpacity onPress={()=>navigate.goBack()}>
                    <Image source={Images.Cancel}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.containerItem,styles.borderLine]}>
            <NavButton 
                name="All"
                active={activeItem === 0}
                onPress={()=>{navHandler("all",0)}}/>
            <NavButton name="Text" active={activeItem === 1} onPress={()=>{navHandler("text",1)}}/>
            <NavButton name="Image" active={activeItem === 2} onPress={()=>{navHandler("image",2)}}/>
            <NavButton name="Other" active={activeItem === 3} onPress={()=>{navHandler("other",3)}}/>
        </View>
        {/* <View style={{alignItems:"center"}}>
        <View style={styles.input}>
          <Image style={styles.inputIcon} source={Images.search} />
          <TextInput
            placeholder="Search your Page"
            value=""
            style={styles.inputText}
          />
        </View>
        </View> */}
    </View>
    </>
  )
}

const styles=StyleSheet.create({
    headerContainer:{
        paddingHorizontal:23,
        paddingBottom:20,
        borderBottomWidth:4,
        borderBottomColor:"#DDDDDD",
        backgroundColor:WHITE
    },
    containerItem: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingVertical:20,
    },
    containerChildItem: {
        flexDirection:"row",
        alignItems:"center",
        gap:20,
    }, text:{
        fontFamily:"Poppins-Regular",
        fontSize:19,
    },
    inputIcon: {
        alignItems: "center",
      },
      input: {
        flexDirection: "row",
        borderRadius: 6,
        paddingLeft: 18,
        alignItems: "center",
        gap: 12,
        paddingVertical: 10,
        width: "90%",
        backgroundColor: "#F5F5F5",
      },
      inputText: {
        fontSize: 16,
        width: "100%",
        overflow: "hidden",
        paddingRight: 40,
        fontFamily: "Poppins-Medium",
      },
      navigation:{
        width:"20%",
        paddingBottom:10,
    },
    navText:{
        textAlign:"center"
    },
    activeNavigation:{
        borderBottomColor:GRADIENT_1,
        borderBottomWidth:1,
        width:"20%",
        paddingBottom:10,
    },
    activeNavText:{
        color:GRADIENT_1,
        textAlign:"center"
    },
    
      
});

export default LayersHeader;
