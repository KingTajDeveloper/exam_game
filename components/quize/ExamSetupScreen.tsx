import {
  getQuestions,
  questionReturnHandler,
  subjectItemType,
} from "@/config/config";
import { loadQuestions } from "@/redux/slice/quistionSlice";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useDispatch } from "react-redux";


type QuestionsMap = {
  [grade: string]: any[]; 
};

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

const ExamSetupScreen = ({
  subject,
}: {
  subject: subjectItemType | undefined;
}) => {
  const dispatch = useDispatch();
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [questionCount, setQuestionCount] = useState<string>("10");
  const [customCount, setCustomCount] = useState<string>("");
  const [questoins, setQuestoins] = useState<QuestionsMap>({});
  const questionsSubject = getQuestions(subject?.value);

  useEffect(() => {
    setQuestoins({
      "10": questionsSubject?.["10"] ?? [],
      "11": questionsSubject?.["11"] ?? [],
      "12": questionsSubject?.["12"] ?? [],
    });
  }, [questionsSubject]);

  const gradeOptions = [
    { id: "10", name: "صنف ۱۰" },
    { id: "11", name: "صنف ۱۱" },
    { id: "12", name: "صنف ۱۲" },
    { id: "general", name: "عمومی" },
  ];

  const countOptions = ["10", "20", "30", "40", "custom"];

  const handleStartExam = () => {
    const finalCount =
      questionCount === "custom" ? Number(customCount) : Number(questionCount);

    const allQuestions = questionReturnHandler(
      selectedGrade,
      finalCount,
      questoins
    );

    // Randomize the questions
    const randomQuestions = shuffleArray(allQuestions).slice(0, finalCount);

    if (randomQuestions.length) {
      dispatch(loadQuestions(randomQuestions));
    }
  };

  const isStartEnabled =
    selectedGrade &&
    ((questionCount !== "custom" && Number(questionCount) > 0) ||
      (questionCount === "custom" && Number(customCount) > 0));

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      {/* عنوان و تصویر */}
      <Animated.View
        entering={FadeInDown.duration(500)}
        className="items-center mb-6"
      >
        <Image source={subject?.image} className="w-20 h-20 mb-3" />
        <Text className="text-2xl font-bold text-gray-900">
          {subject?.title}
        </Text>
      </Animated.View>

      {/* انتخاب تعداد سوال */}
      <Animated.View
        entering={FadeIn.delay(200).duration(500)}
        className="mb-8"
      >
        <Text className="text-lg font-semibold text-gray-700 mb-3 text-right">
          تعداد سوالات:
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {countOptions.map((count) => (
            <TouchableOpacity
              key={count}
              className={`w-[30%] p-3 mb-3 rounded-xl border-2 ${
                questionCount === count
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 bg-white"
              }`}
              onPress={() => setQuestionCount(count)}
            >
              <Text
                className={`text-center text-lg ${
                  questionCount === count
                    ? "text-indigo-700 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {count === "custom" ? "سفارشی" : count}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ورودی سفارشی */}
        {questionCount === "custom" && (
          <Animated.View entering={FadeIn.duration(300)} className="mt-2">
            <TextInput
              className="bg-white border-2 border-indigo-500 rounded-xl p-3 text-right"
              placeholder="تعداد سوالات را وارد کنید"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              value={customCount}
              onChangeText={setCustomCount}
            />
          </Animated.View>
        )}
      </Animated.View>

      {/* انتخاب صنف */}
      <Animated.View
        entering={FadeIn.delay(100).duration(500)}
        className="mb-8"
      >
        <Text className="text-lg font-semibold text-gray-700 mb-3 text-right">
          انتخاب صنف:
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {gradeOptions.map((grade) => (
            <TouchableOpacity
              key={grade.id}
              className={`w-[48%] p-3 mb-3 rounded-xl border-2 ${
                selectedGrade === grade.id
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 bg-white"
              }`}
              onPress={() => setSelectedGrade(grade.id)}
            >
              <Text
                className={`text-right text-lg ${
                  selectedGrade === grade.id
                    ? "text-indigo-700 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {grade.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* دکمه شروع امتحان */}
      <Animated.View
        className="mb-28 my-auto flex-1"
        entering={FadeIn.delay(500).duration(500)}
      >
        <TouchableOpacity
          className={`py-3 rounded-xl flex-row items-center justify-center ${
            isStartEnabled ? "bg-indigo-500" : "bg-gray-300"
          }`}
          disabled={!isStartEnabled}
          onPress={handleStartExam}
        >
          <Text className="text-white text-lg font-semibold ml-2">
            شروع امتحان
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

export default ExamSetupScreen;
