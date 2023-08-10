import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Images from "../../Constants/Images";

export const DeleleFunc = ({handleCancel,handleDelete}) => {
    const Height = Dimensions.get('window').height;
    const insets = useSafeAreaInsets();
    return (
        <View style={[{ alignItems: "center", height: (Height / 3)+insets.bottom, justifyContent: "center" }, styles.bottom]}>
            <View style={styles.delContainer}>
                <View style={styles.containerItem}>
                    <Image source={Images.redDel} />
                </View>
                <View>
                    <Text style={styles.heading}>Are you Sure?</Text>
                    <Text style={styles.contentText}>Do you really want to delete these records?</Text>
                    <Text style={styles.contentText}>This process cannot be undone</Text>
                </View>
            </View>
            <View style={styles.subContainer}>
                <TouchableOpacity style={[styles.delButton, { backgroundColor: "#F5F5F5" }]} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.delButton, { backgroundColor: "#E54335" }]} onPress={handleDelete}>
                    <Text style={[styles.buttonText, { color: "white" }]}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    delContainer: {
    justifyContent: "center",
    alignItems: "center",
    
},

containerItem: {
    borderColor: "red",
    borderRadius: 10000,
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderWidth: 1,
},
subContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center"
},
heading: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    paddingVertical: 5,
}, contentText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#7A7A7A",
    textAlign: "center"
},
delButton: {
    marginTop: 10,
    paddingVertical: 13,
    borderRadius: 7,
    paddingHorizontal: 50,
},
buttonText: {
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
},
})