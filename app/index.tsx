import OnBording from "@/components/onBoarding/OnBording";
import React from "react";
import { View } from "react-native";

const Index = () => {
  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    <View className="flex-1">
      <OnBording />
    </View>
    // </GestureHandlerRootView>
  );
};

export default Index;
