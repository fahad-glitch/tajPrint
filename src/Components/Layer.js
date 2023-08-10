import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Images from '../Constants/Images';
import { CheckBox } from 'react-native-elements';
import { GRADIENT_1 } from '../Constants/Colors';

export default function Layer({ handleType, headType, action, pressType, designData,handleSave ,cancelButton}) {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);


  const flatListRef = useRef(null);
  const [permit, setPermit] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const filterDataByType = (type) => {
    if (type === 'other') {
      return allData.filter((item) => item.type === 'circle' || item.type === 'rect' || item.type === 'line');
    } else {
      return allData.filter((item) => item.type === type);
    }
  };

  const handleCheckboxToggle = (id) => {
    const updatedData = data.map((item) => {
      return { ...item, checked: item.id === id ? !item.checked : false };
    });
    setData(updatedData);
  };

  function addCheckedProperty(objectsArray) {
    return objectsArray.map((obj,index) => {
      if(obj.type=='text'){
      return { ...obj, 
              checked: false,
              id:index,
              customStyle: {
                opacity: parseFloat(obj.opacity),
                color: obj.fill , 
                fontFamily : obj.fontFamily,
                fontSize : parseInt(obj.fontSize),
                fontWeight : obj.fontWeight,
                fontStyle : obj.fontStyle,
                textDecorationLine : obj.underline? 'underline' : 'none',
                textAlign : obj.textAlign,
                backgroundColor: obj.backgroundColor==""? "transparent": obj.backgroundColor,
                // lineHeight : parseFloat(obj.lineHeight),
                letterSpacing : parseInt(obj.charSpacing),
              } 
            };
      }else{
        return { ...obj, 
          checked: false,
          id:index,
        };
      }
    });
  }
  useEffect(() => {
    loadData();
  }, [])

  useEffect(() => {
    permit && contentTypeSelect(headType);
  }, [headType, permit])


  const loadData = () => {

    const content = JSON.parse(designData.design);
    if(content.backgroundImage){
      setBackgroundImage(content.backgroundImage);
    }
    setAllData(addCheckedProperty(content.objects));
    setPermit(true);
  }


  const contentTypeSelect = (contentType) => {
    // console.log(contentType == 'all');

    if (contentType === 'text') {
      setData(filterDataByType('text'));
    }
    else if (contentType == 'all') {
      setData(allData);
    }
    else if (contentType == 'image') {
      setData(filterDataByType('image'));
    }
    else if (contentType == 'other') {
      setData(filterDataByType('other'));
    }
  }

  useEffect(() => {
    handlePress(); 
  },  [action,pressType.pressType])

  useEffect(() => {
    handleNav();
  }, [handleCheckboxToggle])


  // useEffect(() => {
  //   handleSave(allData);
  // },[cancelButton])


  const handleArray =(id,prop,array)=>{
    const updatedStyle = array.map((item) => {
      if (item.id=== id) {
        if (prop.color) {
          return { ...item, customStyle: { ...item.customStyle, ...prop }, fill: prop.color };
        }else if(prop.textDecorationLine){
          return { ...item, customStyle: { ...item.customStyle, ...prop },  underline : prop.textDecorationLine=='none'? false : true};
        }
         else {
          return { ...item, customStyle: { ...item.customStyle, ...prop }, ...prop };
        }
      }
      return item;
    });

    return updatedStyle;
  }

  const handleStyle = (prop, id) => {
    
    setData(handleArray(id,prop,data));
    setAllData(handleArray(id,prop,allData));
    handleSave(allData);
    // console.log("data",allData);
   
  }


  const handlePress = () => {
    const id = data.find((item) => item.checked === true);
    // const id2 = allData.findIndex((item) => item.checked === true);
    // console.log(id2);
    // console.log("id",id);
    // console.log(pressType);
    // console.log("select object",data);
    // console.log("select object all",allData);
    if (id!==undefined) {
      switch (pressType.pressType) {
        case 'delete': 
          const updatedData = data.filter((item) => item.id !== id.id);
          const updatedData1 = allData.filter((item) => item.id !== id.id);
          setData(updatedData);
          setAllData(updatedData1);
          // handleSave(allData);
          // updatedData1 && console.log("data",updatedData1);
          break;
        case 'edit':
          const updatedText = data.map((item) => {
            if (item.id=== id.id) {
              return { ...item, text: pressType.prop };
            }
            return item;
          });
          const updatedText1 = allData.map((item) => {
            if (item.id === id.id) {
              return { ...item, text: pressType.prop };
            }
            return item;
          });
          setData(updatedText);
          setAllData(updatedText1);
          // handleSave(allData);
          break;
        case 'textColor':
          handleStyle({ color: pressType.prop }, id.id);
          break;
        case 'color':
          handleStyle({ backgroundColor: pressType.prop }, id.id);
          break;
        case 'size':
          typeof pressType.prop === "number"?
          handleStyle({ fontSize: pressType.prop }, id.id):null
          break;
        case 'opacity':
          // const roundedValue= parseFloat(pressType.prop).toFixed(1);
          // console.log("pressType",pressType.prop, pressType.pressType);
          typeof pressType.prop === "number"?
          pressType.prop && handleStyle({ opacity: pressType.prop}, id.id):null
          break;
        case 'letterSpacing':
          typeof pressType.prop === "number"?
          pressType.prop && handleStyle({ letterSpacing: parseFloat((pressType.prop)) }, id.id):null
          break;
        // case 'lineHeight':
        //   typeof pressType.prop === "number"?
        //   pressType.prop && handleStyle({ lineHeight: parseFloat((pressType.prop)) }, id.id):null
        //   break;
        case 'font':
          handleStyle({ fontFamily: pressType.prop }, id.id);
          break;
        case 'Bold':
          if (id.customStyle.fontWeight === 'bold' ) {
            handleStyle({ fontWeight: 'normal' }, id.id);
          } else {
            handleStyle({ fontWeight: 'bold' }, id.id);
          }
          break;
        case 'Italic':
          if (id.customStyle.fontStyle === 'italic') {
            handleStyle({ fontStyle: 'normal' }, id.id);
          } else {
            handleStyle({ fontStyle: 'italic' }, id.id);
          }
          break;
        case 'Underline':
          if (id.customStyle.textDecorationLine === "underline") {
            handleStyle({ textDecorationLine: "none" }, id.id);
          } else {
            handleStyle({ textDecorationLine: "underline" }, id.id);
          }
          break;
        case 'Center':
          handleStyle({ textAlign: "center" }, id.id);
          break;
        case 'Right':
          handleStyle({ textAlign: "right" }, id.id);
          break;
        case 'Justify Left':
          handleStyle({ textAlign: "left" }, id.id);
          break;
        case 'Justify Right':
          handleStyle({ textAlign: "right" }, id.id);
          break;
        case 'Justify Center':
          handleStyle({ textAlign: "center" }, id.id);
          break;
        case 'strokeColor':
          handleStyle({ textShadowColor: pressType.prop }, id.id);
          break;
        case 'strokeWidth':
          handleStyle({ textShadowRadius: pressType.prop }, id.id);
          break;
        case 'replaceImage':
          console.log("hello from replace Imasge");
          const updatedImage = data.map((item) => {
            if (item.id=== id.id) {
              return { ...item, src: pressType.prop };
            }
            return item;
          });
          const updatedImage1 = allData.map((item) => {
            if (item.id === id.id) {
              return { ...item, src: pressType.prop };
            }
            return item;
          });
          setData(updatedImage);
          setAllData(updatedImage1);
          break;
        default:
          console.log("default");
          break;
      }


    }
  }

  const handleNav = () => {
    if (data.every((item) => item.checked === false)) {
      handleType(null);
    } else {
      data.forEach((item) => {
        if (item.type === 'text' && item.checked) {
          handleType("text", item.customStyle);
        } else if (item.type === 'image' && item.checked) {
          handleType("image", item.src);
        } else if (item.type === 'circle' ||item.type === 'rect' || item.type === 'line' && item.checked) {
          handleType("other");
        }
      });
    }
  }

  const renderItem = ({ item, index }) => {
    // console.log("item",item);
    return (
      <View style={styles.layer}>
        <View style={styles.layerItem}>
          <CheckBox
            checked={item.checked}
            onPress={() => { handleCheckboxToggle(item.id) }}
          />
        </View>
        {
          item.type== 'text' ? <TouchableOpacity
            style={item.checked ? [styles.layerItemText, { borderWidth: 1, borderColor: GRADIENT_1 }] : styles.layerItemText}
            onPress={() => { handleCheckboxToggle(item.id) }}
          >
            <Text style={[styles.layerItemChild, item.customStyle ? item.customStyle : null]}>{item.text}</Text>
          </TouchableOpacity> : item.type == 'image'?
            <TouchableOpacity
              style={item.checked ? [styles.layerItemText, { borderWidth: 1, borderColor: GRADIENT_1 }] : styles.layerItemText}
              onPress={() => { handleCheckboxToggle(item.id) }}
            >
              <View style={{ alignItems: "center" }}>

                {<Image source={{ uri: item.src }} style={{ height: 100, width: 100 }} resizeMode='contain' />}
              </View>
            </TouchableOpacity>:<TouchableOpacity
              style={item.checked ? [styles.layerItemText, { borderWidth: 1, borderColor: GRADIENT_1 }] : styles.layerItemText}
              onPress={() => { handleCheckboxToggle(item.id) }}
            >
              <View style={{ alignItems: "center" }}>
              <Text style={[styles.layerItemChild]}>{item.type}</Text>
              </View>
            </TouchableOpacity>
        }
        
      </View>
    )
  };
  return (
    <View style={styles.layerContainer}>
       <FlatList
        ref={flatListRef}
        data={data}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item,index) => index}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </View>

  );
}
const styles = StyleSheet.create({

  layerContainer: {
    flex: 1,
   
  },
  layer: {
    flexDirection: "row",
    alignItems: "center",
    
    paddingBottom: 15,
    paddingHorizontal: 10
  },
  layerItemText: {
    width:"80%",
    backgroundColor: "#DDDDDD",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DDDDDD",

  },
  
  layerItemChild: {
    fontFamily: "Poppins-Regular",
    fontSize: 25,
    textAlign: "center",
    textShadowOffset: { width: 1, height: 1 }, // Adjust the offset for the thickness of the stroke
  },
  layerItem: {
    // justifyContent: "center",
    // alignItems: "center",
  }
});
