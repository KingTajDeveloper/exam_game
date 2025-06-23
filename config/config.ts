import { ImageSourcePropType } from "react-native";

export type itemType = {
  id: number;
  image: ImageSourcePropType;
  coins: number;
};

export interface listType {
  list: itemType[];
  type: string;
}

export const AvatarList: listType = {
  type: "avatar",
  list: [
    {
      id: 1,
      image: require("@/assets/avatar/avatar1.webp"),
      coins: 0,
    },
    {
      id: 2,
      image: require("@/assets/avatar/avatar2.webp"),
      coins: 500,
    },
    {
      id: 3,
      image: require("@/assets/avatar/avatar3.webp"),
      coins: 1000,
    },
    {
      id: 4,
      image: require("@/assets/avatar/avatar4.webp"),
      coins: 1500,
    },
    {
      id: 5,
      image: require("@/assets/avatar/avatar5.webp"),
      coins: 2000,
    },
    {
      id: 6,
      image: require("@/assets/avatar/avatar6.webp"),
      coins: 3000,
    },
    {
      id: 7,
      image: require("@/assets/avatar/avatar7.webp"),
      coins: 5000,
    },
    {
      id: 8,
      image: require("@/assets/avatar/avatar8.webp"),
      coins: 10000,
    },
    {
      id: 9,
      image: require("@/assets/avatar/avatar9.webp"),
      coins: 15000,
    },
    {
      id: 10,
      image: require("@/assets/avatar/avatar10.webp"),
      coins: 25000,
    },
    {
      id: 11,
      image: require("@/assets/avatar/avatar11.webp"),
      coins: 35000,
    },
    {
      id: 12,
      image: require("@/assets/avatar/avatar12.webp"),
      coins: 50000,
    },
  ],
};

export const BorderList: { type: string; list: itemType[] } = {
  type: "border",
  list: [
    {
      id: 1,
      image: require("@/assets/border/border1.png"),
      coins: 0,
    },
    {
      id: 2,
      image: require("@/assets/border/border2.png"),
      coins: 1000,
    },
    {
      id: 3,
      image: require("@/assets/border/border3.png"),
      coins: 3000,
    },
    {
      id: 4,
      image: require("@/assets/border/border4.png"),
      coins: 5000,
    },
    {
      id: 5,
      image: require("@/assets/border/border5.png"),
      coins: 10000,
    },
    {
      id: 6,
      image: require("@/assets/border/border6.png"),
      coins: 15000,
    },
    {
      id: 7,
      image: require("@/assets/border/border7.png"),
      coins: 20000,
    },
    {
      id: 8,
      image: require("@/assets/border/border8.png"),
      coins: 25000,
    },
    {
      id: 9,
      image: require("@/assets/border/border9.png"),
      coins: 50000,
    },
  ],
};
