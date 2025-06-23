import SaleProductList from "@/components/profile/SaleProductList";
import { AvatarList, BorderList } from "@/config/config";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";

const Profile = () => {
  const selector = useSelector((store) => store?.profile);
  const [tabValue, setTabValue] = useState("avatar");
  return (
    <View className="flex-1">
      <View className="bg-primary p-3 justify-center items-center">
        <View className="flex-row w-full justify-between items-center">
          <View className="flex-row gap-1 justify-center items-center">
            <Image
              className="size-10"
              source={require("@/assets/onboarding/coins.webp")}
            />
            <Text className="text-xl text-white">{selector.total_coin}</Text>
          </View>
          <Text className="text-2xl text-white font-black">پروفایل</Text>
        </View>
        <View className="bg-white justify-center items-center rounded-full relative p-3">
          <Image
            className="size-28"
            source={
              AvatarList?.list.find((item) => item.id === selector?.avatar_id)
                ?.image
            }
          />
          <Image
            style={{ width: 120, height: 120 }}
            className=" absolute"
            source={
              BorderList?.list.find((item) => item.id === selector?.border_id)
                ?.image
            }
          />
        </View>
        <View className="py-2 justify-center items-center">
          <Text className="text-xl font-bold text-white">
            {selector?.first_name + " " + selector?.last_name}
          </Text>
          <Text className="text-white">{selector?.job}</Text>
        </View>
      </View>
      <View className="flex-row rounded-full bg-slate-200 p-1 gap-2 m-2">
        <TabButton
          tabValue={tabValue}
          setTabValue={setTabValue}
          value="avatar"
          title="لست کارکتر"
        />
        <TabButton
          tabValue={tabValue}
          setTabValue={setTabValue}
          title="لست تاج"
          value="crown"
        />
      </View>
      {tabValue === "avatar" ? (
        <SaleProductList productList={AvatarList} />
      ) : (
        <SaleProductList productList={BorderList} />
      )}
    </View>
  );
};

export default Profile;

type tabButtonProps = {
  value: string;
  title: string;
  tabValue: string;
  setTabValue: Dispatch<SetStateAction<string>>;
};

function TabButton({ title, setTabValue, tabValue, value }: tabButtonProps) {
  return (
    <Pressable
      onPress={() => setTabValue(value)}
      className={`flex-1 p-1 justify-center items-center rounded-full ${
        tabValue === value && "bg-primary"
      } `}
    >
      <Text className={`text-lg ${tabValue === value && "text-white"}`}>
        {title}
      </Text>
    </Pressable>
  );
}
