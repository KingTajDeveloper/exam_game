import Header from "@/components/subject_list/header";
import { subjectItemType, SubjectList } from "@/config/config";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

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
        backgroundColor={"#604AEC"}
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
            return <RenderItem item={item.item} />;
          }}
          entering={FadeIn.duration(500)}
          ListEmptyComponent={
            <Animated.View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                padding: 32,
              }}
              entering={FadeIn.duration(500)}
            >
              <Text style={{ color: "#6b7280", fontSize: 16 }}>
                مضمون به این اسم پیدا نشد
              </Text>
            </Animated.View>
          }
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
    router.push(`/(root)/quize/[${item?.value}]`);
  };
  return (
    <TouchableOpacity className="mx-2" onPress={pressHandler}>
      <Animated.View entering={FadeIn.duration(500)}>
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
      </Animated.View>
    </TouchableOpacity>
  );
}

const RenderItem = ({ item }: { item: subjectItemType }) => {
  const router = useRouter();

  const pressHandler = () => {
    console.log("object");
    router.push(`/(root)/quize/${item?.value}`);
  };
  return (
    <TouchableOpacity className="mx-2" onPress={pressHandler}>
      <Animated.View
        className="bg-white p-4 rounded-xl shadow-sm mb-3 mx-4"
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(200)}
        layout={Layout.springify()}
      >
        <View className="flex-row items-center">
          <View className=" rounded-full bg-gray-100 items-center justify-center mr-3">
            <Image
              source={item.image}
              className="size-20"
              resizeMode="contain"
            />
          </View>
          <Text className="flex-1 text-lg font-medium text-gray-900">
            {item.title}
          </Text>
          <View className="size-10 rounded-full bg-indigo-100 items-center justify-center">
            <Text className="text-indigo-500 text-lg">→</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};
