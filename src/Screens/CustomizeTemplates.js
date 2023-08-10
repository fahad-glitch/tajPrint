import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Modal,
} from "react-native";
import Images from "../Constants/Images";
import Button from "../Components/Button";
import Layout from "../Components/Layout";
import {  useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { getRequest, uploadURL } from "../Services/request";
import { useEffect, useState } from "react";
import { getData } from "../Services/storage";



const CustomizeTemplates = () => {
    const navigate = useNavigation();
    const route = useRoute();
    const [template, setTemplate] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)
    const [project, setProject] = useState(null)
    const [id, setId] = useState('')
    const [loading, setLoading] = useState(true)
    const isFocus= useIsFocused()
    const loadTemplate = async () => {
        try {
            let token = await getData("TOKEN");
            console.log(id)
            const response = await getRequest(
                `/api/secure/template/get-project-template`,
                token,
                { templateId: id }
            );

            console.log("template", response?.result?.data?.template);
            setTemplate(response?.result?.data?.template);
            setThumbnail(response?.result?.data?.template?.thumbnail);
            setLoading(false)
        } catch (error) {
            console.log("Get template Error", error);
        }
    };

    const loadProject = async () => {
        try {
            let token = await getData("TOKEN");
            console.log(id)
            const response = await getRequest(
                `/api/secure/project/get-project`,
                token,
                { projectId: id}
            );

            console.log("template", response?.result?.data?.project);
            setProject(response?.result?.data?.project);
            setTemplate(response?.result?.data?.project?.templateId);
            setThumbnail(response?.result?.data?.project?.templateId?.thumbnail);
            setLoading(false)
        } catch (error) {
            console.log("Get template Error", error);
        }
    };

    useEffect(() => {
        setLoading(true);
        console.log("route",route.params.project)
        if(!route.params.project){
            setProject(null);
            setId(route?.params?.id);
            id && loadTemplate();
        }else {
            
            setId(route?.params?.id);
            id && loadProject();
        }
        //  console.log("route",route?.params?.content)
    }, [id,route.params.project,isFocus])
    return (
        <>
        <Layout isShowHeader={false}>
            <View>
                <View style={styles.crossContainer}>
                    <TouchableOpacity activeOpacity={0.6} style={styles.cross} onPress={() => { navigate.goBack() }}>
                        <Image style={styles.crossImage} source={Images.close} />
                    </TouchableOpacity>
                </View>

                <View style={styles.imageContainer}>
                    {
                        loading ?
                            <View style={[styles.image,{justifyContent:"center"}]}></View>
                            : thumbnail && <Image style={styles.image} source={{ uri: uploadURL + thumbnail }} resizeMode="contain" />
                    }
                </View>
                <View style={styles.body}>


                    <View style={styles.textContiner}>
                        {loading ?
                            <><Text style={styles.heading}>
                            Loading.....
                        </Text>
                            <Text style={styles.text}>Loading......</Text>
                        </>
                            : 
                            template && 
                            <>
                                <Text style={styles.heading}>{project ? project?.name :template?.name}</Text>
                                <Text style={styles.text}>{template.categoryId.name} . 1080 X 1920 px</Text>
                            </>
                        }
                    </View>

                    <View style={styles.descrip}>

                        <View style={styles.icons}>
                            <Image source={Images.colorBoard} />
                            <Text style={styles.descripText}>100% fully customizable </Text>
                        </View>

                        <View style={styles.icons}>
                            <Image source={Images.editDownload} />
                            <Text style={styles.descripText}>Edit and download on the go</Text>
                        </View>
                        <View style={styles.icons}>
                            <Image source={Images.Download} />
                            <Text style={[{ paddingLeft: 10 }, styles.descripText]}>
                                Share and publish anywhere
                            </Text>
                        </View>
                    </View>

                    <Button
                        buttonHandler={() => {project ? navigate.navigate("Editor", { id: project?._id }):navigate.navigate("CreateProject", { id: template._id }) }}
                        buttonText="Customize this template"
                        extraStyle={styles.loginButtonExtraStyle}
                    />
                </View>
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
    );
};
export default CustomizeTemplates;

const styles = StyleSheet.create({
    crossContainer: {
        flex: 1,
        marginVertical: 20,
        paddingHorizontal: 20,

    },
    crossImage: {
        width: "40%",
        height: "40%",
    },
    cross: {
        backgroundColor: "#2B8DFF",
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
    },
    image: {
        width: "100%",
        height: 432,
        borderRadius: 10,
        borderColor: "#DDDDDD",
        borderWidth: 1,
    },
    imageContainer: {
        alignItems: "center",
        paddingHorizontal: 61,
    },
    body: {
        paddingHorizontal: 23,
    },
    heading: {
        paddingTop: 30,
        fontSize: 18,
        fontFamily: "Poppins-SemiBold",
        lineHeight: 30,
    },
    text: {
        fontSize: 16,
        fontFamily: "Poppins-Light",
        paddingVertical: 10,
    },
    icons: {
        flex: 1,
        flexDirection: "row",
        gap: 10,
        justifyContent: "flex-start",
        paddingBottom: 20,
    },
    descrip: {
        marginVertical: 20,
    },
    textContiner:{
        height: 100,
    },
    descripText: {
        fontSize: 18,
        fontFamily: "Poppins-Regular",
    },
    loginButtonExtraStyle: {
        marginBottom: 40,
    },
});
