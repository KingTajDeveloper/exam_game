import ProfileImage from "@/components/profile/ProfileImage";
import SaleProductList from "@/components/profile/SaleProductList";
import { AvatarList, BorderList } from "@/config/config";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Image, Pressable, StatusBar, Text, View } from "react-native";
import { useSelector } from "react-redux";

const Profile = () => {
  const selector = useSelector((store) => store?.profile);
  const [tabValue, setTabValue] = useState("avatar");
  return (
    <View className="flex-1">
      <StatusBar
        translucent
        backgroundColor={"#604AEC"}
        barStyle={"dark-content"}
      />
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
        <ProfileImage />
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
