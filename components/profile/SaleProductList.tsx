import { itemType, listType } from "@/config/config";
import {
  addActiveAvatar,
  addActiveBorder,
  addAvatarId,
  addBorderId,
  subtractTotalCoin,
} from "@/redux/slice/profileSlice";
import { store } from "@/redux/store";
import { saveToSecureStore } from "@/utils/secureStore";
import Fontisto from "@expo/vector-icons/Fontisto";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const SaleProductList = ({ productList }: { productList: listType }) => {
  return (
    <View className="flex-1">
      <FlatList
        data={productList?.list}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        renderItem={(data) => (
          <AvatarItem item={data?.item} type={productList?.type} />
        )}
      />
    </View>
  );
};

const AvatarItem = ({ item, type }: { item: itemType; type: string }) => {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store?.profile);

  const submitHundler = async (id: number) => {
    if (
      (type === "avatar" && profile?.active_avatar.includes(id)) ||
      (type === "border" && profile?.active_borders.includes(id))
    ) {
      if (type === "avatar") {
        await dispatch(addAvatarId(id));
        console.log("avatar");
      } else {
        await dispatch(addBorderId(id));
        console.log("border");
      }
      const updatedProfile = store.getState().profile;
      await saveToSecureStore("profile", updatedProfile);
    } else {
      if (item?.coins <= profile?.total_coin) {
        Alert.alert(
          "خریداری ",
          `ایا می خواهید به تعداد ${item?.coins} سکه را برای خریداری این مصرف کنید`,
          [
            {
              text: "تأیید",
              onPress: async (e) => {
                await dispatch(subtractTotalCoin(item?.coins));
                if (type === "avatar") {
                  await dispatch(addActiveAvatar(id));
                } else {
                  await dispatch(addActiveBorder(id));
                }
                const updatedProfile = store.getState().profile;
                await saveToSecureStore("profile", updatedProfile);
              },
            },
            {
              text: "لغو",
              onPress: () => console.log("کاربر لغو کرد"),
              style: "cancel",
            },
          ]
          // "plain-text"
        );
      } else {
        Alert.alert(
          "هشدار",
          `شما به مقدار پول "${item?.coins - profile?.total_coin}" نیاز دارید`
        );
      }
    }
  };
  return (
    <Pressable onPress={() => submitHundler(item?.id)} className="flex-1">
      <LinearGradient
        style={[
          {
            flex: 1,
            margin: 10,
            padding: 5,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          },
          type === "avatar"
            ? profile?.avatar_id === item.id && {
                borderWidth: 3,
                borderColor: "purple",
              }
            : profile?.border_id === item.id && {
                borderWidth: 3,
                borderColor: "purple",
              },
        ]}
        colors={
          type === "avatar" ? ["#FFE29F", "#FFAACF"] : ["#6A1B9A", "#CE93D8"]
        }
      >
        <Image className="size-24" source={item?.image} />
        {type === "avatar" ? (
          !profile?.active_avatar.includes(item?.id) ? (
            <View className="absolute bg-black/70 inset-0 gap-2 justify-center items-center">
              <Fontisto name="locked" size={24} color="white" />
              <View className="flex-row gap-1">
                <Text className="text-white">{item?.coins}</Text>
                <Image
                  className="size-5"
                  source={require("@/assets/images/gold.png")}
                />
              </View>
            </View>
          ) : null
        ) : !profile?.active_borders.includes(item?.id) ? (
          <View className="absolute bg-black/70 inset-0 gap-2 justify-center items-center">
            <Fontisto name="locked" size={24} color="white" />
            <View className="flex-row gap-1">
              <Text className="text-white">{item?.coins}</Text>
              <Image
                className="size-5"
                source={require("@/assets/images/gold.png")}
              />
            </View>
          </View>
        ) : null}
      </LinearGradient>
    </Pressable>
  );
};

export default SaleProductList;
