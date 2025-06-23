import Header from "@/components/subject_list/header";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const SubjectList = [
  // {
  //   title: "ریاضی",
  //   value: "mathematics",
  //   image: require("@/assets/images/subject_images/mathematics.png"),
  //   first_color: "#5D9CEC",
  //   last_color: "#2C3E50",
  // },
  // {
  //   title: "فزیک",
  //   value: "physics",
  //   image: require("@/assets/images/subject_images/physics.png"),
  //   first_color: "#7B8DFF",
  //   last_color: "#2E2F49",
  // },
  // {
  //   title: "کیمیا",
  //   value: "chemistry",
  //   image: require("@/assets/images/subject_images/chemistry1.png"),
  //   first_color: "#FF8A65",
  //   last_color: "#BF360C",
  // },
  {
    title: "بیولوژی",
    value: "biology",
    image: require("@/assets/images/subject_images/biology.png"),
    first_color: "#81C784",
    last_color: "#388E3C",
  },
  {
    title: "دری",
    value: "dari",
    image: require("@/assets/images/subject_images/dari.png"),
    first_color: "#F48FB1",
    last_color: "#880E4F",
  },
  {
    title: "پشتو",
    value: "pashto",
    image: require("@/assets/images/subject_images/pashto.png"),
    first_color: "#4DB6AC",
    last_color: "#004D40",
  },
  {
    title: "تاریخ",
    value: "history",
    image: require("@/assets/images/subject_images/history1.png"),
    first_color: "#A1887F",
    last_color: "#4E342E",
  },
  {
    title: "جغرافیه",
    value: "geography",
    image: require("@/assets/images/subject_images/geography1.png"),
    first_color: "#64B5F6",
    last_color: "#1A237E",
  },
  {
    title: "جیولوژی",
    value: "geology",
    image: require("@/assets/images/subject_images/geology.png"),
    first_color: "#FFD54F",
    last_color: "#F57F17",
  },
  {
    title: "دینیات",
    value: "islamic_studies",
    image: require("@/assets/images/subject_images/islamic-studies.png"),
    first_color: "#AED581",
    last_color: "#33691E",
  },
  {
    title: "ثقافت",
    value: "tafsir",
    image: require("@/assets/images/subject_images/tafsir.png"),
    first_color: "#CE93D8",
    last_color: "#6A1B9A",
  },
];

type subjectItemType = {
  title: string;
  value: string;
  image: any;
  first_color: string;
  last_color: string;
};

// const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const HEADER_HEIGHT = 116;

export default function Index() {
  const scrollY = useSharedValue(0);
  const [filterText, setFilterText] = useState("");

  const filteredSubjects = SubjectList.filter((item) =>
    item.title.includes(filterText)
  );

  const isScrolling = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => (scrollY.value = event.contentOffset.y),
    onBeginDrag: () => (isScrolling.value = true),
    onEndDrag: () => (isScrolling.value = false),
  });

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={"yellow"}
        barStyle={"dark-content"}
      />

      <View>
        <Header
          filterText={filterText}
          setFilterText={setFilterText}
          headerHeight={HEADER_HEIGHT}
          scrollY={scrollY}
        />
        <Animated.FlatList
          // className="bg-white"
          contentContainerStyle={{
            paddingVertical: HEADER_HEIGHT + 8,
            gap: 10,
          }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          data={filteredSubjects}
          renderItem={(item) => {
            return <SubjectItem item={item.item} />;
          }}
          keyExtractor={(item) => item?.title}
        />
      </View>
    </>
  );
}

function SubjectItem({ item }: { item: subjectItemType }) {
  const router = useRouter();

  const pressHandler = () => {
    console.log("object");
    router.push(`/(root)/quize/${item?.value}`);
  };
  return (
    <TouchableOpacity className="mx-3" onPress={pressHandler}>
      <LinearGradient
        style={{
          flexDirection: "row",
          borderRadius: 16,
        }}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[item?.first_color, item?.last_color]}
      >
        <View className="flex-1 flex-row justify-between items-center p-3">
          <Image source={item?.image} className="size-28" />
          <Text className="text-white text-center font-black text-2xl">
            {item?.title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
