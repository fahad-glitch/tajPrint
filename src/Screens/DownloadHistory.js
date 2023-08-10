import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
  } from "react-native";
import BottomBar from "../Components/BottomBar";
import Images from "../Constants/Images";
import { GREY } from "../Constants/Colors";
import { useEffect, useState } from "react";
import Container from "../Components/Container";
import { getRequest, uploadURL } from "../Services/request";
import { getData } from "../Services/storage";
import { useIsFocused } from "@react-navigation/native";

  
const DownloadHistory = () => {
    const [filedata, setfiledata] = useState([
    ]);
    const [loading, setLoading] = useState(true);
    const isFocus = useIsFocused();
    const loadDownloadFile = async () => {
      try {
          let token = await getData("TOKEN");
          let user= await getData("USER");
          console.log(token);
          const response = await getRequest(
              `/api/secure/project/get-project-download`,
              token,
              { userId: user._id}
          );
          const mappedOptions = response?.result?.data?.clonedTemplatesByDate;
          console.log(response?.result?.data?.clonedTemplatesByDate[0].clonedTemplates[0].thumbnail);
          setfiledata(mappedOptions);
          setLoading(false);
      } catch (error) {
          console.log("Get All Downlaod Error", error);
      }
  };

  const getDate = (date, maxDaysAgo = 365) => {
    const now = new Date();
    const dateObj = new Date(date);
    const timeDifference = now - dateObj;
    const secondsAgo = Math.floor(timeDifference / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const weeksAgo = Math.floor(daysAgo / 7);
    const monthsAgo = Math.floor(daysAgo / 30);
    const yearsAgo = Math.floor(daysAgo / 365);
  
    if (daysAgo === 0) {
      return "Today";
    } else if (daysAgo === 1) {
      return "1 day ago";
    } else if (weeksAgo === 1) {
      return "1 week ago";
    } else if (monthsAgo === 1) {
      return "1 month ago";
    } else if (yearsAgo === 1) {
      return "1 year ago";
    } else if (daysAgo <= maxDaysAgo) {
      return `${daysAgo} days ago`;
    } else {
      return dateObj.toISOString().slice(0, 10); // Show full date if beyond maxDaysAgo
    }
  };

  const sortedFileData = filedata.slice().sort((a, b) => {
    const dateA = new Date(a.Date);
    const dateB = new Date(b.Date);
    return dateB - dateA;
  });

  
  // const downloadThumbnail = async (name, thumbnail) => {
  //   try {
  //     const uri = `${uploadURL}`; // Assuming uploadURL is the base URL for thumbnails
  //     const { uri: downloadedUri } = await FileSystem.downloadAsync(uri, FileSystem.documentDirectory + thumbnail);
  
  //     // Request MEDIA_LIBRARY permissions
  //     const { status } = await ExpoPermissions.askAsync(ExpoPermissions.MEDIA_LIBRARY);
  
  //     if (status === 'granted') {
  //       if (Platform.OS === 'ios') {
  //         await CameraRoll.saveToCameraRoll(downloadedUri, 'photo');
  //       } else {
  //         await MediaLibrary.saveToLibraryAsync(downloadedUri);
  //       }
  
  //       console.log('Thumbnail saved to the media library.');
  //     } else {
  //       console.log('Permissions not granted for accessing media library.');
  //     }
  //   } catch (error) {
  //     console.error('Error while downloading and saving thumbnail:', error);
  //   }
  // };

    useEffect(()=>{
      loadDownloadFile();
    },[isFocus])
    const DownloadedFile = ({ data, date }) => {
      return (
        <>
          <Text style={styles.dates}>{getDate(date)}</Text>
  
          {data.map((item) =>{ {console.log(uploadURL+item.thumbnail)} return (
           
            <View style={styles.files}>
                <View style={styles.imageInFile} >
                   {item.thumbnail && <Image source={{uri:uploadURL+item.thumbnail}} style={{width:65,height:65,backgroundColor:"white" , borderRadius:10000}} resizeMode="contain" />}
                </View>
              <View style={styles.filedescrip}>
                <Text style={styles.fileHeading}>{item.name}</Text>
                <Text style={styles.fileHeadingText}>{date}</Text>
              </View>
  
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ flex:0.15,justifyContent: "center" }}
                onPress={()=>{downloadThumbnail(item.name,item.thumbnail)}}
     
              >
                <View style={styles.downloadIcon}>
                  <Image
                    style={styles.downloadImage}
                    source={Images.whiteDownload}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )})}
        </>
      );
    };
  
    return (
        <>
      <Container 
        headerTitle="Download History"
      >
        <View style={styles.headerContainter}>
            <Text style={styles.text}>Download file</Text>
            <View style={{ justifyContent: "center",flexDirection:"row",alignItems:"center"}}>
                <Text style={styles.sort}>Sort by</Text>
                <Text style={styles.date}> Date </Text>
                <Image source={Images.dropdown} />
            </View>
          </View>
          <View>
            {filedata&& sortedFileData.map((item, key) => (
              <DownloadedFile key={key} date={item.Date} data={item.clonedTemplates} />
            ))}
          </View>
            
    </Container>
    <BottomBar/>
    <Modal transparent={true} visible={loading} animationType="fade">
        <View
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      </Modal>
        </>

    );
  };
  
  export default DownloadHistory;
  
  const styles = StyleSheet.create({
    text: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 24,
      lineHeight: 36,
    },
    headerContainter: {
      flexDirection: "row",
      justifyContent:"space-between",
      paddingBottom: 10,
    },
    sort: {
      fontSize: 14,
      fontFamily: "Poppins-Regular",
      color: GREY,
    },
    date: {
      fontSize: 14,
      fontFamily: "Poppins-SemiBold",
    },
    files: {
      flexDirection: "row",
      borderRadius: 57,
      backgroundColor: "#F1F1FB",
      height: 100,
      paddingHorizontal:9,
      marginTop: 12,
    },
    imageInFile: {
      flex:0.25,
     justifyContent:"center",

    },
    fileHeading: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 20,
    },
    fileHeadingText: {
      fontSize: 15,
      fontFamily: "Poppins-Regular",
      color: GREY,
    },
    filedescrip: {
      flex:0.8,
      justifyContent: "center",
    },
    downloadIcon: {
      backgroundColor: "#1D69F2",
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    dates: {
      fontSize: 14,
      fontFamily: "Poppins-Regular",
      color: GREY,
      marginTop: 10,
    },
  });