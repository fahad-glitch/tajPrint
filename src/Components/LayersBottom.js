import React, { useEffect, useMemo, useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, FlatList } from "react-native";
import Images from "../Constants/Images";
import { BLACK, GRADIENT_1 } from "../Constants/Colors";
import _ from 'lodash'
import { DeleleFunc } from "./layersBottomFunc/DeleteFunc";
import { FontFunc } from "./layersBottomFunc/FontFunc";
import { ReplaceFunc } from "./layersBottomFunc/ReplaceFunc";
import { TextColorFunc } from "./layersBottomFunc/TextColorFunc";
import { RangeFunc } from "./layersBottomFunc/RangeFunc";
import TextStyleFunc from "./layersBottomFunc/TextStyleFunc";
import ReplaceImage from "./layersBottomFunc/ReplaceImage";

const LayersBotttom = ({ ContentType, handleButton, handleBottomFunc ,initialValues}) => {
    const [maincontent, setMainContent] = useState([]);
    const [activeFunction, setActiveFunction] = useState(null);
    const [range, setRange] = useState(50);
    const [opacity, setOpacity] = useState(1.0);
    const [line, setLine] = useState(20.00);
    const [letter, setLetter] = useState(50);
    const [stroke, setStroke] = useState(20);
    const [color, setColor] = useState(null);
    const [backColor, setBackColor] = useState(null);
    const [image, setImage] = useState(null);


    const loadContent = () => {
        switch (ContentType) {
            case 'all':
                setMainContent([{
                    name: "Element",
                    source: Images.Element,
                    func: () => {
                        handleButton("all")
                    }
                },
                {
                    name: "Images",
                    source: Images.Photo,
                    func: () => {
                        handleButton("image")
                    }
                },
                {
                    name: "Text",
                    source: Images.Text,
                    func: () => {
                        handleButton("text")
                    }
                },

                {
                    name: "Other",
                    source: Images.Page,
                    func: () => {
                        handleButton("other")
                    }
                },
                ]);
                break;
            case 'text':
                setMainContent([{
                    name: "Delete",
                    source: Images.Del,
                },
                {
                    name: "Edit Text",
                    source: Images.editText,
                },
                {
                    name: "Text Color",
                    color:color
                    // source: Images.color,
                },
                {
                    name: "Font",
                    source: Images.Font,
                },
                {
                    name: "Font Size",
                    source: Images.Text,
                },
                {
                    name: "Opacity",
                    source: Images.Opacity,
                },
                {
                    name: "Text Style",
                    source: Images.TextStyle,
                },
                {
                    name: "Text Alignment",
                    source: Images.jLeft,
                },
                {
                    name: "Highlight Color",
                    // source: Images.highlightPen,
                    color:backColor
                },
                {
                    name: "Spacing",
                    source: Images.Spacing,
                },
                // {
                //     name: "Rotate",
                //     source: Images.Rotate,
                // },
                // {
                //     name: "Align",
                //     source: Images.Align,
                // },
                {
                    name: "Stroke Color",
                    source: Images.color,
                },
                {
                    name: "Stroke",
                    source: Images.stroke,
                },
                ]);
                break;
            case 'image':
                setMainContent([{
                    name: "Delete",
                    source: Images.Del,
                },
                {
                    name: "Replace Image",
                    source: Images.replaceImg,
                },
                // {
                //     name: "Color",
                //     source: Images.color,
                // },
                ]);
                break;
            case 'other':
                setMainContent([{
                    name: "Delete",
                    source: Images.Del,
                },
                ]);
                break;
            default:

                break;
        }
    }
    const handleButtonClick = (functionName) => {
        if (activeFunction === functionName) {
            setActiveFunction(null);
        } else {
            setActiveFunction(functionName);
        }
    };

    const handleCancel = () => {
        setActiveFunction(null)

    }

    const renderActiveFunction = useMemo(() => {
        switch (activeFunction) {
            case 'Delete':
                return <DeleleFunc handleCancel={handleCancel} handleDelete={() =>{ handleBottomFunc('delete');console.log("hello delete")}} />;
            case 'Edit Text':
                return <ReplaceFunc handleCancel={handleCancel} handleEdit={(text) => { handleBottomFunc('edit', text); handleCancel() }} />;
            case 'Text Color':
                return <TextColorFunc handleCancel={handleCancel} handleColor={(color) => { handleBottomFunc('textColor', color); handleCancel()}} />;
            case 'Color':
                return <TextColorFunc handleCancel={handleCancel} handleColor={(color) => { handleBottomFunc('color', color); handleCancel()}} />;

            case 'Font':
                return (
                    <FontFunc handleCancel={handleCancel} handleFont={(font) => { handleBottomFunc('font', font); handleCancel() }} />
                );
            case 'Font Size':
                return (
                    <RangeFunc name='Size' value={range} onValueChange={_.debounce((newValue) => { setRange(parseInt(newValue)); handleBottomFunc('size', parseInt(newValue)) })} />
                )
            case 'Spacing':
                return (
                    <>
                        <RangeFunc name='Line Spacing' value={line} onValueChange={_.debounce((newValue) => {setLine(parseInt(newValue));handleBottomFunc('lineHeight', line) })} />
                        <RangeFunc name='Letter Spacing' value={letter} onValueChange={_.debounce((newValue) => {setLetter(parseFloat(newValue).toFixed(2)); handleBottomFunc('letterSpacing', parseFloat(letter))})} />
                    </>
                );
            case 'Highlight Color':
                return <TextColorFunc handleCancel={handleCancel} handleColor={(color) => { handleBottomFunc('color', color); handleCancel() }} />;
            case 'Opacity':
                return (
                    <RangeFunc name='Opacity' value={opacity} onValueChange={_.debounce((newValue) => { setOpacity(parseFloat(newValue).toFixed(1));console.log("opacity",newValue) ;handleBottomFunc('opacity', parseFloat(opacity)) })} />
                )
            case 'Text Style':
                return <TextStyleFunc type='Text Style' handleStyle={(style) => { handleBottomFunc(style); handleCancel() }} />
            case 'Text Alignment':
                return <TextStyleFunc type='Text Alignment' handleStyle={(style) => { handleBottomFunc(style); handleCancel() }} />
            case 'Rotate':
                return <TextStyleFunc type='Rotate' />
            case 'Align':
                return <TextStyleFunc type='Align' />
            case 'Stroke Color':
                return <TextColorFunc handleCancel={handleCancel} handleColor={(color) => { handleBottomFunc('strokeColor', color); handleCancel() }} />;
            case 'Stroke':
                return (
                    <RangeFunc name='Stroke' value={stroke} onValueChange={_.debounce((newValue) => { setStroke(parseInt(newValue)); handleBottomFunc('strokeWidth', parseInt(newValue)) })} />
                );
            case 'Replace Image':
                return <ReplaceImage handleCancel={handleCancel} src={image} handleImage={(image,name)=> {handleBottomFunc('replaceImage',image);console.log("image after",name )}} />;
            default:
                return null;
        }
    }, [activeFunction, range, opacity, line, letter, stroke]);


    const loadInitialValues = () => {
        
        setRange(initialValues.fontSize);
        setOpacity(initialValues.opacity);
        setLetter(initialValues.letterSpacing);
        setLine(initialValues.lineHeight);
        setImage(initialValues);
        
    }
    const loadColor = () => {
        setBackColor(initialValues.backgroundColor);
        setColor(initialValues.color);
       
    }
    useEffect(() => {
        loadContent();
        initialValues&&loadInitialValues();
    }, [ContentType,color,backColor])
    useEffect(() => {
        initialValues&&loadColor();
    }, [initialValues,color,backColor])
    

    const BottomBarButton = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={ContentType === 'all' ? item.func : () => handleButtonClick(item.name)}
            >
                {item.source?<Image source={item.source} style={styles.icon} />:
                <View style={{borderRadius:1000,height:20,width:20,alignSelf:"center",borderWidth:1,backgroundColor:item.color}}></View>}
                <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <>

            <View style={styles.bottomBarContainer}>
                
                {renderActiveFunction}
                
                {
                    ContentType == "all" ?
                        <View style={[styles.bottomBarMain]}>
                            {

                                <FlatList
                                    scrollEnabled={false}
                                    horizontal
                                    data={maincontent}
                                    renderItem={BottomBarButton}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            }
                        </View>
                        :
                        <View style={styles.bottomBar}>
                            <FlatList
                                horizontal
                                data={maincontent}
                                renderItem={BottomBarButton}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    bottomBarContainer: {
        backgroundColor: "#fff",
        borderTopWidth: 4,
        borderTopColor: "#ddd",
        // position: "absolute",
        width: "100%",
        bottom: 0,
    },
    bottomBar: {
        width: "100%",
        height: 80,
        justifyContent: "center",
        alignItems: "stretch",
        paddingHorizontal: 15,
    },
    bottomBarMain: {
        width: "100%",
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    button: {

        width: 75,
        justifyContent: "center",
        alignItems: "stretch",
    },
    activeButton: {
        backgroundColor: "#00E3B0",
    },
    icon: {
        height: 20,
        resizeMode: "contain",
        alignSelf: "center"
    },
    text: {
        marginTop: 5,
        fontFamily: "Poppins-Medium",
        fontSize: 12,
        lineHeight: 16,
        textAlign: "center",
        color: BLACK,
    },
    activeText: {
        color: GRADIENT_1,
    },
});

export default LayersBotttom;
