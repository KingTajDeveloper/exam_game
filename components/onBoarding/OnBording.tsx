import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  SlideInLeft,
  SlideOutRight,
} from "react-native-reanimated";

const onBoardingSteps = [
  {
    title: "به اپلیکیشن درس‌پرس خوش آمدید",
    descriptoin: `با درس‌پرس می‌تانی در هر زمان سوالات مکتب را تمرین کنی و خود را برای امتحانات آماده بسازی.`,
    image: require("@/assets/onboarding/onboard1.webp"),
  },
  {
    title: "پیشرفت خود را دنبال کنید",
    descriptoin: `رشد و بهبود خود را ببینید و در جمع شاگردان برتر قرار بگیرید`,
    image: require("@/assets/onboarding/onboard21.webp"),
  },
  {
    title: "بی‌نهایت سوال برای تمرین",
    descriptoin: `هیچ محدودیتی نیست! تا هر قدر که بخواهی می‌تانی سوال حل کنی و توانایی‌ات را بالا ببری.`,
    image: require("@/assets/onboarding/onboard3.webp"),
  },
];

const OnBording = () => {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const data = onBoardingSteps[index];
  const nextHandler = () => {
    const isLastScreen = index === onBoardingSteps.length - 1;
    if (isLastScreen) {
      endBoarding();
    } else {
      setIndex(index + 1);
    }
  };
  const preivewHandler = () => {
    const isLastScreen = index === 0;
    if (isLastScreen) {
      // endBoarding();
      setIndex(index);
    } else {
      setIndex(index - 1);
    }
  };

  const endBoarding = () => {
    router.push("/(root)");
    setIndex(0);
  };

  const swipe = Gesture.Simultaneous(
    Gesture.Fling()
      .direction(Directions.RIGHT)
      .onEnd(() => runOnJS(nextHandler)()),
    Gesture.Fling()
      .direction(Directions.LEFT)
      .onEnd(() => runOnJS(preivewHandler)())
  );

  const fling = Gesture.Fling()
    .direction(Directions.RIGHT | Directions.LEFT)
    .onEnd((e) => router.push("/(root)"));
  return (
    <View style={{ direction: "rtl" }} className="bg-blue-500 flex-1">
      <StatusBar style="light" />
      <View className="flex-1" key={index}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            alignItems: "center",
            padding: 10,
            direction: "rtl",
            //   justifyContent: "space-between",
          }}
          colors={["#6A5AE0", "#C0BBF0"]}
        >
          <View className="flex-row mt-5 gap-3 self-center">
            {onBoardingSteps.map((_, i) => (
              <View
                key={i}
                className={`p-1 rounded-full ${index == i && "w-7"} bg-white`}
              ></View>
            ))}
          </View>
          <GestureDetector gesture={swipe}>
            <View className="flex-1 justify-around mb-9 items-center">
              <View className=" gap-7 mt-9">
                {data?.image && (
                  <Animated.Image
                    entering={FadeIn}
                    exiting={FadeOut}
                    source={data?.image}
                    className="size-80"
                  />
                )}
              </View>
              <View className="text-white gap-2">
                <Animated.Text
                  entering={SlideInLeft}
                  exiting={SlideOutRight}
                  className="text-white rtl:text-left text-center font-black text-4xl"
                >
                  {data?.title}
                </Animated.Text>
                <Animated.Text
                  entering={SlideInLeft.delay(50)}
                  exiting={SlideOutRight}
                  className="text-white rtl:text-left text-center text-2xl leading-7"
                >
                  {data?.descriptoin}
                </Animated.Text>
              </View>
            </View>
          </GestureDetector>
          <View className="flex-row gap-8 mb-3 px-2 items-center">
            <Pressable onPress={endBoarding}>
              <Text className="text-white text-xl font-bold">رد شدن</Text>
            </Pressable>
            <Pressable
              className="rounded-full hover:bg-primary/60 bg-primary flex-1 justify-center items-center"
              onPress={nextHandler}
            >
              <Text className="text-white text-xl font-bold p-4">ادامه</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default OnBording;
