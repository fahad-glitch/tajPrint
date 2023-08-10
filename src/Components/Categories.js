import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import {  TouchableOpacity, View } from 'react-native';
import { GRADIENT_1,} from '../Constants/Colors';
import { getData } from '../Services/storage';
import { getRequest } from '../Services/request';

export default function Categories({activeCategory, onCategoryChange ,handleChange}) {
    const [category, setCategory] = useState([]);
    const [catLoading, setCatLoading] = useState(true);
    const dataWithAllTemplates = [
        // Add the "All templates" option as the first item
        { value: 'all', label: 'All templates' },
        ...category, // Add the rest of the categories
      ];
      const loadCategory = async () => {
        try {
          let token = await getData("TOKEN");
          console.log(token);
          const response = await getRequest(
            `/api/secure/category/get-all-categories`,
            token
          );
          const mappedOptions = response?.result?.data?.categories.map(
            (option) => ({
              value: option._id,
              label: option.name,
            })
          );
          console.log(response?.result?.data?.categories);
          setCategory(mappedOptions);
          setCatLoading(false);
        } catch (error) {
          console.log("Get All Categories Error", error);
        }
      };

      useEffect(() => {
        loadCategory();
      },[])
      
    const renderCatogories = ({item}) => {
        const handleCategoryChange = () => {
            onCategoryChange(item.value)
            if(item.value=='all'){
               handleChange(item.value);
            }else{
                handleChange(item.value);
            }
          }
        return (
           
            <TouchableOpacity activeOpacity={0.6} style={[styles.headerItem ,item.value === activeCategory && styles.activeHeaderItem]} onPress={handleCategoryChange}>
            {/* {item.value=='all'&& <Image
                style={{ alignSelf: "center" }}
                source={Images.templateIconGrey}
                />} */}
                <Text style={[styles.headerItemText,item.value === activeCategory && styles.activeItemText]}>{item.label}</Text>
            </TouchableOpacity>
            
        )
    }
    return (
        
           
            
        <View style={styles.header}>
                {category && !catLoading?
                <FlatList
                data={dataWithAllTemplates}
                renderItem={renderCatogories}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.value}
                contentContainerStyle={{ gap:10 }}
                />
                :<View style={styles.headerItem}>
                    <View style={styles.headerItemText}>
                    <ActivityIndicator />
                    </View>
                </View>}
            </View>
           
       
    )
}
const styles = StyleSheet.create({

    header: {

        paddingHorizontal: 23,
        marginVertical: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
      },
      headerItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "nowrap",
        padding: 10,
        gap: 10,
        flexGrow: 1,
        backgroundColor: "#ECECEC",
        borderRadius: 5,
      },
      headerItemText: {
        fontFamily: "Poppins-ExtraLight",
        fontSize: 18,
        textAlign: "center",
      },
      activeHeaderItem:{
        backgroundColor: GRADIENT_1,
      },
      activeItemText:{
        color: "white",
        fontFamily: "Poppins-Regular",
      }

});

