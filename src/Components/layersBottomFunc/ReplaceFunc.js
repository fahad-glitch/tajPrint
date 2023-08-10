import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, TextInput} from "react-native";
import { Modal } from "react-native";
import { GRADIENT_1 } from "../../Constants/Colors";


export const ReplaceFunc = ({handleCancel,handleEdit}) => {

    const [text, setText] = useState('');

    return (
        <Modal
            transparent={true}
            animationType="slide">
            <View
                style={styles.modalContainer}>
                <View style={styles.textArea}>
                    <Text style={styles.modalHeading}>
                        Replace Text
                    </Text>
                    <View style={styles.modalTextField}>
                        <Text style={styles.modalText}>Add New</Text>
                        <TextInput style={styles.modalInput} placeholder="Add new Text" onChangeText={(e)=>{setText(e)}}/>
                    </View>

                    <View style={styles.modalButtonContainer}>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={handleCancel}
                            style={styles.modalButton}>
                            <Text style={{ color: GRADIENT_1,fontSize:17 }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={()=>handleEdit(text)}
                            style={styles.modalButton}>
                            <Text style={{ color: GRADIENT_1,fontSize:17  }}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles= StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textArea: {
        paddingVertical:25,
        paddingHorizontal:15,
        backgroundColor: 'white',
        marginVertical: 60,
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,
        elevation: 10,
        gap:10
    },
    modalTextField:{
        gap:6,
    },
    modalInput:{
        borderWidth:1,
        borderColor:"black",
        paddingLeft:4,
        borderRadius:5,
        height:40,
        fontSize:17 
    },
    modalHeading: {
        textAlign:"center",
        fontFamily: "Poppins-SemiBold",
        fontSize: 20,
    },
    modalButtonContainer: {
        flexDirection: "row",
        alignContent:"center",
        justifyContent:"flex-end"
    },
    modalButton:{
        padding:20,
    },
})