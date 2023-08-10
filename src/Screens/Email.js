import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SimpleHeader from '../Components/SimpleHeader'
import { useRoute } from '@react-navigation/native'
import { GREY } from '../Constants/Colors';
import moment from 'moment';

export default function Email() {
    route = useRoute();
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setContent(route?.params?.email);
        setLoading(true);
    }, [route])
    return (
        <View style={styles.container}>
            <SimpleHeader />
            {
                loading ?
                    <View style={styles.childContainer}>
                        <View style={styles.bodyContainer}>
                            <Text style={styles.heading}>{content.title}</Text>
                            <Text style={styles.date}>{moment(content.createdAt).format('DD-MM-YYYY')}</Text>
                        </View>
                        <Text style={styles.body}>{content.details}</Text>
                        
                    </View>
                    : <View>
                        <Text>Loading...</Text>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    childContainer:{
        paddingHorizontal:20,
    },
    title:{
        fontSize:30,
        fontFamily:'Poppins-SemiBold',
        paddingBottom:10,
        textAlign:'center'
    },
    body:{
        fontSize:16,
        height:'100%',
        fontFamily:'Poppins-Regular',

    },
    heading:{
        fontSize:30,
        fontFamily:'Poppins-SemiBold',
       
    },
    date:{
        fontSize:18,
        paddingTop:5,
        fontFamily:'Poppins-Light',
    },
    bodyContainer:{ 
        marginBottom:20,
        borderBottomWidth:1,
        paddingVertical:20,
        borderBottomColor:GREY,
    }

})
