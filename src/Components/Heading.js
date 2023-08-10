import React from 'react'
import { StyleSheet,Text } from 'react-native'

export default function Heading({heading}) {
  return (
    <Text style={styles.text}>{heading}</Text>
  )
}

const styles = StyleSheet.create({
    text:{
        paddingHorizontal:23,
        fontSize:28,
        fontFamily:"Poppins-Medium",
        marginBottom:15,
      }
})