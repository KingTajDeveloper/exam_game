import { Alert, ImageSourcePropType } from "react-native";

export type itemType = {
  id: number;
  image: ImageSourcePropType;
  coins: number;
};

export interface listType {
  list: itemType[];
  type: string;
}

export type subjectItemType = {
  title: string;
  value: string;
  image: any;
  category: string | "language" | "social_science" | "math" | "natural_science";
};

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

export const SubjectList = [
  // {
  //   title: "ریاضی",
  //   value: "mathematics",
  //   image: require("@/assets/images/subject_images/mathematics.png"),
  //   category: "math",

  // },
  // {
  //   title: "فزیک",
  //   value: "physics",
  //   image: require("@/assets/images/subject_images/physics.png"),
  //   category: "math",

  // },
  // {
  //   title: "کیمیا",
  //   value: "chemistry",
  //   image: require("@/assets/images/subject_images/chemistry1.png"),
  //   category: "math",

  // },
  {
    title: "بیولوژی",
    value: "biology",
    image: require("@/assets/images/subject_images/biology.png"),
    category: "natural_science",
  },
  {
    title: "دری",
    value: "dari",
    image: require("@/assets/images/subject_images/dari.png"),
    category: "language",
  },
  {
    title: "پشتو",
    value: "pashto",
    image: require("@/assets/images/subject_images/pashto.png"),
    category: "language",
  },
  {
    title: "تاریخ",
    value: "history",
    image: require("@/assets/images/subject_images/history1.png"),
    category: "social_science",
  },
  {
    title: "جغرافیه",
    value: "geography",
    image: require("@/assets/images/subject_images/geography1.png"),
    category: "social_science",
  },
  {
    title: "جیولوژی",
    value: "geology",
    image: require("@/assets/images/subject_images/geology.png"),
    category: "natural_science_value",
  },
  {
    title: "دینیات",
    value: "islamic_studies",
    image: require("@/assets/images/subject_images/islamic-studies.png"),
    category: "social_science",
  },
  {
    title: "ثقافت",
    value: "tafsir",
    image: require("@/assets/images/subject_images/tafsir.png"),
    first_color: "#CE93D8",
    last_color: "#6A1B9A",
    category: "social_science",
  },
];

export function getQuestions(subject: string) {
  switch (subject) {
    case "dari":
      return require("@/questions/dari.json");
    case "pashto":
      return require("@/questions/pashto.json");
    case "tafsir":
      return require("@/questions/tafsir.json");
    case "islamic_studies":
      return require("@/questions/islamic_studies.json");
    case "history":
      return require("@/questions/history.json");
    case "geography":
      return require("@/questions/geography.json");
    case "geology":
      return require("@/questions/geology.json");
    case "biology":
      return require("@/questions/biology.json");
    default:
      return "";
  }
}

export function questionReturnHandler(
  selectedGrade: string,
  quistionCount: string,
  questions: {}
) {
  switch (selectedGrade) {
    case "10":
      if (quistionCount > questions?.["10"].length) {
        Alert.alert("هشدار", "متسفانه به این تعداد سوال در سیستم وجود ندارد");
        return [];
      } else {
        return questions?.["10"].splice(0, quistionCount);
      }
    case "11":
      if (quistionCount > questions?.["11"].length) {
        Alert.alert("هشدار", "متسفانه به این تعداد سوال در سیستم وجود ندارد");
        return [];
      } else {
        return questions?.["11"].splice(0, quistionCount);
      }
    case "12":
      if (quistionCount > questions?.["12"].length) {
        Alert.alert("هشدار", "متسفانه به این تعداد سوال در سیستم وجود ندارد");
        return [];
      } else {
        return questions?.["12"].splice(0, quistionCount);
      }

    default:
      break;
  }
}
