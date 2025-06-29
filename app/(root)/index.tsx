import ProfileImage from "@/components/profile/ProfileImage";
import { SubjectList } from "@/config/config";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const profile = useSelector((store) => store.profile);
  const [history, setHistory] = useState([]);
  const [value, setValue] = useState("natural_science");
  const [category, setCategory] = useState([]);
  const courses = [
    // {
    //   title: "ریاضیات",
    //   value: "math",
    //   progress: 65,
    //   icon: "🧮",
    //   color: "bg-indigo-500",
    // },
    {
      title: "علوم طبیعی",
      value: "natural_science",
      progress: 40,
      icon: "🧪",
      color: "bg-emerald-500",
    },
    {
      title: "علوم دینی و اجتماعی",
      value: "social_science",
      progress: 85,
      icon: "📑",
      color: "bg-indigo-500",
    },
    {
      title: "السنه",
      value: "language",
      progress: 85,
      icon: "📚",
      color: "bg-amber-500",
    },
  ];

  useEffect(() => {
    const data =
      profile?.category.find((item) => item?.name === value)?.quize ?? [];
    setHistory(data);
  }, [value]);

  console.log(history, value);
  console.log(profile?.category);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={"white"}
        barStyle={"dark-content"}
      />
      <ScrollView
        style={{ direction: "rtl" }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row justify-between items-center px-5 pt-3 pb-2">
          <View>
            <Text className="text-2xl self-start font-bold text-gray-900">
              سلام شاگرد عزیز
            </Text>
            <Text className="text-base self-start text-gray-500">
              امروز می خواهی کدام سوالات را بپرسم؟
            </Text>
          </View>
          <ProfileImage size="sm" />
        </View>

        <Text className="text-lg self-start font-semibold text-gray-900 px-5 mb-3">
          فیصدی نمرات به شکل کتگوری
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pl-5 mb-6"
        >
          {courses.map((course, index) => (
            <TouchableOpacity
              onPress={() => setValue(course?.value)}
              key={index}
              className={`w-40 ${
                value == course?.value ? "bg-primary/50" : " bg-white"
              } mr-4 p-4 rounded-xl shadow-sm`}
            >
              <View
                className={`${course.color} w-12 h-12 rounded-2xl items-center justify-center mb-3`}
              >
                <Text className="text-2xl">{course.icon}</Text>
              </View>
              <Text className="text-base font-medium text-gray-900 mb-3">
                {course.title}
              </Text>
              <View className="flex-row items-center">
                <View className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                  <View
                    className={`h-full ${course.color} rounded-full`}
                    style={{ width: `${course.progress}%` }}
                  />
                </View>
                <Text className="text-xs font-medium text-gray-500">
                  {course.progress}%
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text className="text-lg self-start font-semibold text-gray-900 px-5 mb-3">
          امتحان های قبلی
        </Text>
        <View className="px-5 mb-8">
          {history?.map((activity, index) => (
            <View
              key={index}
              className="flex-row items-center justify-between bg-white p-4 rounded-xl mb-3 shadow-sm"
            >
              <View className="flex-1 self-start">
                <Text className="text-base font-medium self-start text-gray-900">
                  {activity?.quizeName}
                </Text>
                <Text className="text-sm self-start text-gray-500">
                  تعداد سوال جواب داده شده:{activity.questionsCount}
                </Text>
                <Text className="text-base font-medium self-start text-gray-900">
                  فیصدی: {activity?.percentage}
                </Text>
              </View>
              <View className="bg-red-100 w-10 h-10 rounded-full items-center justify-center mr-3">
                <Image
                  className="size-14"
                  source={
                    SubjectList?.find(
                      (item) => item?.title === activity?.quizeName
                    )?.image ?? ""
                  }
                />
                {activity?.icon}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
