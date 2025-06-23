import { TabBar } from "@/components/TabBar";
import { addProfile } from "@/redux/slice/profileSlice";
import { getFromSecureStore } from "@/utils/secureStore";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const Layout = () => {
  const dispatch = useDispatch();
  // const selector = useSelector((store) => store.profile);
  getFromSecureStore("profile").then((data) => {
    if (data) {
      dispatch(addProfile(data));
      console.log(data);
    }
  });

  return (
    <SafeAreaView className="flex-1">
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen
          name="index"
          options={{
            title: "صفحه اصلی",
            tabBarIcon: ({ focused }: { focused: boolean }) => {
              return (
                <TabButton
                  icon={"home-outline"}
                  selectIcon={"home"}
                  isSelect={focused}
                  label="صفحه"
                  iconName="Ionicons"
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="quize"
          options={{
            headerShown: false,
            // tabBarIcon: ({ focused: any }) => <TabButton />,
            tabBarIcon: ({ focused }: { focused: boolean }) => {
              return (
                <TabButton
                  icon={"book-outline"}
                  selectIcon={"book"}
                  isSelect={focused}
                  label="آزمون"
                  iconName="Ionicons"
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="rank"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => {
              return (
                <TabButton
                  icon={"trophy-outline"}
                  selectIcon={"trophy"}
                  isSelect={focused}
                  label="رتبه بندی"
                  iconName="Ionicons"
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "پروفایل",
            headerShown: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => {
              return (
                <TabButton
                  icon={"user"}
                  selectIcon={"user-alt"}
                  isSelect={focused}
                  label="پروفایل"
                  iconName="FontAwesome5"
                />
              );
            },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default Layout;

interface TabButtonProps {
  icon: any;
  iconName: any;
  selectIcon?: any;
  isSelect?: boolean;
  label: string;
}

function TabButton({
  icon,
  selectIcon,
  iconName,
  isSelect,
  label,
}: TabButtonProps) {
  return (
    <View
      className={`gap-1 p-1 px-3 justify-center items-center ${
        isSelect && "border-t-4 border-primary rounded-md"
      }`}
    >
      {iconName === "Ionicons" && (
        <Ionicons
          name={isSelect ? selectIcon ?? icon : icon}
          size={35}
          color={isSelect ? "#604AEC" : "#707070"}
        />
      )}
      {iconName === "FontAwesome5" && (
        <FontAwesome5
          name={isSelect ? selectIcon ?? icon : icon}
          size={35}
          color={isSelect ? "#604AEC" : "#707070"}
        />
      )}

      <Text
        className={`font-bold ${isSelect ? "text-primary" : "text-slate-500"}`}
      >
        {label}
      </Text>
    </View>
  );
}
