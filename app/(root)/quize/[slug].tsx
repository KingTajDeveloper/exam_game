// import { useSearchParams } from "expo-router/build/hooks";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Page = () => {
  const params = useLocalSearchParams();
  const subject = params?.slug;

  // const data = require(`@/questions/${subject}/11.json`);

  // console.log(data);

  return (
    <View>
      <Text>{params?.slug}</Text>
    </View>
  );
};

export default Page;
