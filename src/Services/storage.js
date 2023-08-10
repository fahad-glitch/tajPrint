import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    var result = await AsyncStorage.setItem(key, jsonValue);
    console.log("result of storing Data in local storage", result);
  } catch (e) {
    console.log("eError in storing Data in local storage", e);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Error in getting Data from local storage", e);
  }
};

export const removeData = async (storedKey) => {
  try {
    await AsyncStorage.removeItem(storedKey);
  } catch (e) {
    console.log("Error in Removing Data form local storage", e);
  }
};
