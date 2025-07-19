import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToSecureStore = async (
  key: string,
  item: any[] | string | number | object
) => {
  try {
    const jsonValue = JSON.stringify(item);
    await AsyncStorage.setItem("my-key", jsonValue);
  } catch (error) {
    console.error("خطا در ذخیره‌سازی:", error);
  }
};

export const deleteSecureStore = async (key: string) => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("خطا در ذخیره‌سازی:", error);
  }
};

export const getFromSecureStore = async (key: string): Promise<any> => {
  try {
    const jsonValue = await AsyncStorage.getItem("my-key");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("خطا در خواندن داده:", error);
    return null;
  }
};
