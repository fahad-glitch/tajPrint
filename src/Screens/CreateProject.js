import React, { useEffect, useState } from 'react'
import Container from '../Components/Container'
import Input from '../Components/Input'
import Button from '../Components/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getData } from '../Services/storage'
import { postRequestForm } from '../Services/request'
import { ActivityIndicator, Modal, View } from 'react-native'

export default function CreateProject() {
    const [name,setName]=useState();
    const navigate = useNavigation();
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [content,setContent]=useState(null);


    useEffect(() => {
        if (content) {
            setLoading(false);
            navigate.navigate("Editor", { id: content });
        }
    }, [content]);


    const projectCreateHandler = async () => {
        let token = await getData("TOKEN");
        let user = await getData("USER");
        const formData = new FormData()
        formData.append("name", name);
        formData.append("originalTemplateId", route?.params?.id);
        formData.append("ownerId", JSON.parse(user)._id);

        console.log("formdata && ",formData);
        setLoading(true);
        try {
          
          const res = await postRequestForm(
            `/api/secure/project/create-project`, 
            token, 
            {
                name:name,
                originalTemplateId:route?.params?.id,
                ownerId:JSON.parse(user)._id
            }
          );
          
          console.log(res);

          if (res?.result?.status === 200) {
            setContent(res?.result?.data?.project?._id);
          }
         
          
        } catch (err) {
          
          console.log(`Error of create project`, err.message);
        }
      };

    return (
        <>
       
        <Container
            isBackButtonInHeader={true}
            isHeaderImage={false}
            headerTitle={"New Project"}
            headerInfo={"Create your own Project"}
        >
            <Input inputLabel="Project Name" inputPlaceholder="Name" inputOnChangeHandler={(e)=>{setName(e)}}/>
            <Button buttonText="Edit Template" buttonHandler={projectCreateHandler} />
            
        </Container>
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
