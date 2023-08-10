import React, { useEffect, useState } from 'react';
import { StyleSheet,  View } from 'react-native';
import LayersBotttom from './LayersBottom';
import { WHITE } from '../Constants/Colors';
import LayersHeader from './LayersHeader';
import Layer from './Layer';
import { useRoute } from '@react-navigation/native';

export default function LayersLayout() {
    const [contentType, setContentType] = useState(null);
    const [type, setType] = useState(null);
    const [active, setActive] = useState(false);
    const [pressType, setPressType] = useState(null);
    const [prop, setProp] = useState('');
    const route = useRoute();
    const [design, setDesign] = useState(null);
    const [saveDesign, setSaveDesign] = useState(null);
    const [object, setObject] = useState(null);
    

    const handleResponse = (name) => {
        setContentType(name);
        
    };
    const handleLayer = (name,object) => {
        setType(name);
       
        // console.log("object",object)
        object && setObject(object);
    };


    useEffect(() => {
        setContentType(route.params.type);
        setDesign(route.params.design);
        setActive(true);
    }, [route])

    const bottomButtonHandler = (press,prp) => {
       
        if(press=="replaceImage"){
            if(active){
                setActive(false);
                console.log("ramnu bacha 89",press,active);
            }else{
                setActive(true);
                console.log("ramnu bacha sb sy acha",press,active);
            }

        }else{
            setActive(!active);
        }
        setPressType(press);
        setProp(prp);
        console.log("ramnu bacha45",pressType,active);
        
    }

    const removeProperties =(arr)=> {
        // Create a new array with modified objects
        const newArr = arr.map((item) => {
          // Destructure the object to omit the properties
          const { checked, customStyle, id, ...rest } = item;
          // Return the modified object without the omitted properties
          return rest;
        });
      
        return newArr;
      }

    const handleUpdate= (item)=>{
        const array = removeProperties(item);
        // console.log("hello",design)
        const modifieDesign = JSON.parse(design.design);
        // console.log("modifieDesign",modifieDesign.version)
        setSaveDesign({
            version:modifieDesign.version,
            objects:array,
        })
    }


    return (
        <View style={styles.layoutContainer}>
            {design&&contentType&&
               
            <>
            {console.log(contentType)}
            <LayersHeader handleButton={handleResponse} type={contentType} saveDesign={saveDesign} />
            <Layer handleType={handleLayer} headType={contentType} action={active}  pressType={{pressType,prop}} designData={design} handleSave={handleUpdate}/>
            {type && <LayersBotttom ContentType={type} initialValues={object} handleButton={handleResponse} handleBottomFunc={(pressType,prop)=>bottomButtonHandler(pressType,prop)} />}
            </>
            }          
        </View>
    );
}

const styles = StyleSheet.create({
    layoutContainer: {
        flex: 1,
        backgroundColor: WHITE,

    }
});
