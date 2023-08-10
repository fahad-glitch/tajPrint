import React, { useEffect, useState } from 'react'
import { View,StyleSheet, FlatList,Text, TouchableOpacity,Image, Modal } from 'react-native'
import { getData } from '../Services/storage';
import { getRequest } from '../Services/request';
import SimpleHeader from '../Components/SimpleHeader';
import Images from '../Constants/Images';
import { GREY } from '../Constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

export default function EmailNotification() {
    const navigation = useNavigation();
    const [email, setEmail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);


    const loadEmail = async () => {
        try {
            let token = await getData("TOKEN");
            let user = await getData("USER");
            user = JSON.parse(user);
            console.log("fahad", user._id);
            console.log(token);
            const response = await getRequest(
              `/api/secure/compose/get-email`,
              token,
              {userId:user._id}
            );
            if(response?.result?.status===200){
            console.log("email",response?.result?.data?.email);
            setEmail(response?.result?.data?.email);
            setLoading(false);
            }else{
                setMessage("No Email Found")
            }
          } catch (error) {
            console.log("Get email Error", error);
          }
    }

    useEffect(() => {
        loadEmail();
       
    },[])

    const renderEmailNotification=({item})=>{
        return(
            <TouchableOpacity style={styles.emailContainer} onPress={()=>{navigation.navigate("Email" , {email: item} )}}>
                <View style={styles.imageContainer}>
                    <Image source={Images.EmailBlack} style={{width:45,height:45}}/>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.heading}>{item.title}</Text>
                    <Text  style={styles.date}>{item.createdAt}   </Text>
                </View>
                
            </TouchableOpacity>
        )
    }

  return (
    <>
    
    <SimpleHeader/>
    {/* {loading ? */}
    <View style={styles.container}>
        
            <FlatList
            data={email}
            renderItem={renderEmailNotification}
            keyExtractor={item=>item._id}
            />
        
        
    </View>
        <Modal transparent={true} visible={loading} animationType="fade">
        <View
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      </Modal>
    {/* // : <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><ActivityIndicator  size="large"/></View>
        // } */}
    </>

    
    
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:20,
        alignItems:'stretch'
    },
    imageContainer:{
        flex:0.15,
        alignItems:'center',
        justifyContent:'center'
    },
    emailContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:7,
        paddingVertical:10,
        paddingHorizontal:10,
        borderWidth:1,
        borderColor:GREY,
        marginBottom:5,
    },
    containerText:{
        flex:0.80,
       
    },
    heading:{
        fontSize:16,
        fontFamily:'Poppins-SemiBold'
    },
    date:{
        fontSize:12,
        fontFamily:'Poppins-Regular'
    }
})
