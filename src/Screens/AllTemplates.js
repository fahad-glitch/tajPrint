import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Modal, StyleSheet, Text, View } from 'react-native'
import Template from '../Components/Template'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getRequest, uploadURL } from '../Services/request'
import { getData } from '../Services/storage'
import { GREY } from '../Constants/Colors'


export default function AllTemplates({categoryId}) {
    const navigate = useNavigation();
    const [templateData, setTemplateData] = useState([]);
    const [loading, setLoading] = useState();
    const [message, setMessage] = useState(null);
    const loadCategory = async () => {
        try {

            let token = await getData("TOKEN");
            console.log(token);
            const response = await getRequest(
                `/api/secure/template/get-templates-by-category`,
                token,
                { categoryId: categoryId}
            );
            if(response?.result?.status === 200){
            const mappedOptions = response?.result?.data?.templates;
            console.log(response?.result?.data?.templates);
           
            if(mappedOptions.length === 0){
                console.log("No Templates Found")
                setMessage("No Templates Found");
                setLoading(false);
            }else{
                setMessage(null);
                setTemplateData(mappedOptions);
                setLoading(false);
            }
           
            }  
        } catch (error) {
            console.log("Get All Categories Error", error);
        }
    };



    useEffect(() => {
        setLoading(true);
        loadCategory();
       
    },[categoryId]);


    const renderItem = ({ item }) => {
        return (
            item.thumbnail && <Template TemplateImage={uploadURL + item.thumbnail } handlePress={() => { navigate.navigate("CustomizeTemplate", { content: item }) }} />
        );
    }
    return (
        <>
                {!message? <FlatList
                    data={templateData}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    numColumns={4}
                    columnWrapperStyle={{ justifyContent: "flex-start" }}
                    contentContainerStyle={styles.templateSection}
                />:<View style={{flex:1 , justifyContent:"center", alignItems:"center"}}>
                        <Text style={{fontFamily:"Poppins-Regular",color:GREY}}>{message}</Text>
                    </View>}
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
        </>
                
                
    )
}

const styles = StyleSheet.create({
    templateSection: {
        paddingHorizontal: 23,
        paddingVertical: 20,
        
    },
}) 
