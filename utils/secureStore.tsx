import * as SecureStore from "expo-secure-store";

export const saveToSecureStore = async (
  key: string,
  item: any[] | string | number | object
) => {
  try {
    const jsonValue = JSON.stringify(item);
    await SecureStore.setItemAsync(key, jsonValue);
  } catch (error) {
    console.error("خطا در ذخیره‌سازی:", error);
  }
};

export const deleteSecureStore = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("خطا در ذخیره‌سازی:", error);
  }
};

export const getFromSecureStore = async (key: string): Promise<any> => {
  try {
    const jsonValue = await SecureStore.getItemAsync(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("خطا در خواندن داده:", error);
    return null;
  }
};
