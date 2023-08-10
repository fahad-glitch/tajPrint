import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import { getRequest, uploadURL } from '../Services/request';
import { getData } from '../Services/storage';
import Template from '../Components/Template';
import { ActivityIndicator, FlatList, Modal, StyleSheet } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const isFocused = useIsFocused();
    const navigate = useNavigation();
    const [loading, setLoading] = useState(true);
    const loadProject = async () => {
        let token = await getData("TOKEN");
        let user = await getData("USER");
        user = JSON.parse(user);
        try {


            const response = await getRequest(
                `/api/secure/project/get-all-projects`,
                token,
                {
                    ownerId: user._id
                }
            );
            const mappedOptions = response?.result?.data?.projects.map((item) => {
                return {
                    _id : item._id,
                    thumbnail : item?.templateId?.thumbnail
                }
            });
            setProjects(mappedOptions);
            //   console.log("Get projects",projects);
            setLoading(false);
        } catch (error) {
            console.log("Get All p Error", error);
        }
    }

    useEffect(() => {
       
        loadProject();
    }, [isFocused])


    const renderItem = ({ item }) => {
        console.log("item", item._id)

        return (item?.thumbnail && <Template TemplateImage={uploadURL + item?.thumbnail} story={true}  handlePress={() => { navigate.navigate("CustomizeTemplate", { id: item?._id,project:true }) }} />
        )
    }
    return (
        <>

            <Layout isScroll={false}>
                <View style={styles.container}>
                    {projects && <FlatList
                        data={projects}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                        numColumns={4}
                        columnWrapperStyle={{ margin:5}}
                    />}
                </View>
            </Layout>
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

    container : {
        flex: 1,
        paddingHorizontal: 23,
        marginVertical:20,
    }
    

});
