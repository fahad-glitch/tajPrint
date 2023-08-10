import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Images from "../Constants/Images";
import { BLUE, WHITE } from "../Constants/Colors";
// import { getRequest } from "../Service/request";
const bannerWidth = Dimensions.get("window").width - 20;

const BannerSlider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [bannerData, setBannerData] = useState([
    { id: "1", source: Images.banner },
    { id: "2", source: Images.banner },
    { id: "3", source: Images.banner }]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);

  304684
  // const getBannerData = async () => {
  //   try {
  //     const response = await getRequest("/api/mobile/getDashboardSlider");
  //     console.log("response", response);
  //     if (response?.error?.response?.status == 500) {
  //       setBannerData([
  //         { id: "1", source: Images.banner },
  //         { id: "2", source: Images.banner },
  //         { id: "3", source: Images.banner},
  //       ]);
  //       setLoading(false);
  //     } else if (response?.result?.data) {
  //       const slides = response?.result?.data;
  //       console.log("slides", slides);
  //       if (slides.length) {
  //         setBannerData(slides);
  //       setLoading(false);
  //       } else {
  //         setBannerData([
  //           { id: "1", source: Images.banner },
  //           { id: "2", source: Images.banner },
  //           { id: "3", source: Images.banner },
  //         ]);
  //         setLoading(false);
  //       }
  //     }
  //   } catch (error) {
  //     console.log("Getting Banner Data Error: ", error);
  //   }
  // };

  const renderItem = ({ item }) => (
    <View style={styles.banner}>
      <View style={styles.container}>
        <View style={styles.containerItem}>
          <Text style={styles.tag}>Pro+</Text>
          <Text style={styles.heading}>Background Remover</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={item.source}
            resizeMode="contain"
            style={styles.bannerImage}
          />
        </View>
      </View>
    </View>
  );

  const snapToInterval = bannerWidth + 10; // 10 is the marginRight applied to each banner item
  // useLayoutEffect(() => {
  //   getBannerData();
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (bannerData) {
        setCurrentSlideIndex((currentSlideIndex + 1) % bannerData.length);
        flatListRef.current?.scrollToIndex({
          index: currentSlideIndex,
          animated: true,
        });
      }
    }, 3000); // specify the interval in milliseconds (3 seconds here)
    return () => clearInterval(interval);
  }, [currentSlideIndex]);

  return (
    <View>
      {!loading ? (
        <>
          <ActivityIndicator size="large" color="#afac4b" />
        </>
      ) : (
        <>
        <View style={{alignItems:"center"}}>

        
          <View style={styles.bannerContainer}>
            <FlatList
              ref={flatListRef}
              data={bannerData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={snapToInterval}
              decelerationRate={0}
              bounces={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              onMomentumScrollEnd={(event) => {
                const slideIndex = Math.floor(
                  event.nativeEvent.contentOffset.x / snapToInterval
                );
                setCurrentSlideIndex(slideIndex);
              }}
              onScrollToIndexFailed={() => { }}
              getItemLayout={(data, index) => ({
                length: snapToInterval,
                offset: snapToInterval * index,
                index,
              })}
              initialScrollIndex={currentSlideIndex}
            />
          </View>
          </View>
        </>
      )}
    </View>
  );
};
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  banner: {
    flex: 1,
    width: bannerWidth,
    alignItems: "center",
    marginRight:10
  },
  bannerContainer: {
    flex: 1,
    width: bannerWidth-25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: BLUE,
    borderRadius: 14,
    marginVertical:20,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent:"space-around",
  },
  heading: {
    fontFamily: "Poppins-SemiBold",
    color: WHITE,
    fontSize: 20,
    paddingVertical: 15,
  },
  tag: {
    fontFamily: "Poppins-Light",
    fontSize: 15,
    color: WHITE

  },
  containerItem: {
    flex: 1,
    // backgroundColor:"red",
  },
  button: {
    backgroundColor: WHITE,
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    fontSize: 15,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginRight:10
  },
  bannerImage: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
  }
});
export default BannerSlider;