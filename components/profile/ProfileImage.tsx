import { AvatarList, BorderList } from "@/config/config";
import React from "react";
import { Image, View } from "react-native";
import { useSelector } from "react-redux";

const ProfileImage = ({ size = "lg" }: { size: string }) => {
  const selector = useSelector((store) => store?.profile);
  return (
    <View className="bg-white justify-center items-center rounded-full relative p-3">
      <Image
        className={size == "lg" ? "size-24" : "size-20"}
        source={
          AvatarList?.list.find((item) => item.id === selector?.avatar_id)
            ?.image
        }
      />
      <Image
        style={{
          width: size == "lg" ? 105 : 95,
          height: size == "lg" ? 105 : 95,
        }}
        className=" absolute"
        source={
          BorderList?.list.find((item) => item.id === selector?.border_id)
            ?.image
        }
      />
    </View>
  );
};

export default ProfileImage;
