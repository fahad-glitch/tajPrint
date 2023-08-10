import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from '@react-native-community/slider';
import { GRADIENT_1 } from "../../Constants/Colors";


export const RangeFunc= ({name,value,onValueChange})=>{

    return (
      <View style={styles.rangeContainer}>
        <Text style={styles.rangeLabel}>{name}</Text>
        <View style={styles.slider}>

       
        <Slider
          minimumValue={0}
          maximumValue={name =='Opacity'?1:name=='Stroke'?20:100}
          step={name =='Opacity'?0.1:1}
          tapToSeek={true}
          minimumTrackTintColor={GRADIENT_1}
          thumbTintColor={GRADIENT_1}
          value={value}
          onValueChange={onValueChange}
        />
         </View>
        <Text style={{fontFamily: "Poppins-Regular",flex:0.2, textDecorationLine:"underline"}}>{value}</Text>
       
      </View>
    );
}

const styles=StyleSheet.create({
    
    rangeContainer: {
        flexDirection:"row",
        paddingHorizontal:24,
        paddingVertical:15,
        gap:20,
        alignItems: 'center',
      },
      rangeLabel: {
        flex:0.3,
        textAlign:"center",
        fontSize: 14,
        fontFamily: "Poppins-Regular",
      },
      slider: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'stretch',
        height: 40,
      },
})