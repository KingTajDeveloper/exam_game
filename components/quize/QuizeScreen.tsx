import { subjectItemType } from "@/config/config";
import { addCategory, addTotalCoin } from "@/redux/slice/profileSlice";
import { resetQuize } from "@/redux/slice/quistionSlice";
import { saveToSecureStore } from "@/utils/secureStore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const QuizeScreen = ({ subject }: { subject: subjectItemType | undefined }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [coine, setCoine] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const [shakeAnimation] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));
  const quizData = useSelector((store) => store.questions).questions;
  const profile = useSelector((store) => store.profile);
  console.log("profile ----------------------- ", profile?.category);
  const dispatch = useDispatch();

  const currentQuestion = quizData[currentQuestionIndex];

  // Animation for incorrect answer
  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Fade in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }, [currentQuestionIndex]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!quizCompleted || !subject) return;

    const percentage = Math.round((score / quizData.length) * 100);
    const category = Array.isArray(profile?.category) ? profile.category : [];
    const categorySelect = category?.find(
      (item: any) => item?.name === subject?.category
    );

    const filteredCategories = category.filter(
      (item: any) => item?.name !== subject?.category
    );

    const updatedCategory = [
      ...filteredCategories,
      {
        name: subject?.category,
        quize: [
          ...(categorySelect?.quize ?? []),
          {
            quizeName: subject?.title,
            percentage,
            questionsCount: score,
          },
        ],
      },
    ];

    saveToSecureStore("category", updatedCategory).then(() =>
      console.log("ذخیره موفقانه انجام شد ✅")
    );
    saveToSecureStore("profile", {
      ...profile,
      total_coin: profile.total_coin + coine,
    }).then(() => console.log("ذخیره موفقانه انجام شد ✅"));

    dispatch(addCategory(updatedCategory));
    dispatch(addTotalCoin(coine));
  }, [quizCompleted]);

  const handleOptionPress = (optionIndex) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);

    // Check if answer is correct
    if (optionIndex === currentQuestion.correct_answer) {
      setScore(score + 1);
      setCoine(coine + currentQuestion.point);
    } else {
      shake();
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(async () => {
      // Move to next question or complete quiz
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setShowExplanation(false);
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      } else {
        setQuizCompleted(true);
      }
    });
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setQuizCompleted(false);
    setShowExplanation(false);
    dispatch(resetQuize());
  };

  const getOptionStyle = (optionIndex) => {
    if (selectedOption === null) return styles.option;

    if (optionIndex === currentQuestion.correct_answer) {
      return [styles.option, styles.correctOption];
    }

    if (
      optionIndex === selectedOption &&
      optionIndex !== currentQuestion.correct_answer
    ) {
      return [styles.option, styles.incorrectOption];
    }

    return styles.option;
  };

  const getOptionTextStyle = (optionIndex) => {
    if (selectedOption === null) return styles.optionText;

    if (optionIndex === currentQuestion.correct_answer) {
      return [styles.optionText, styles.correctOptionText];
    }

    if (
      optionIndex === selectedOption &&
      optionIndex !== currentQuestion.correct_answer
    ) {
      return [styles.optionText, styles.incorrectOptionText];
    }

    return styles.optionText;
  };

  const progressPercentage =
    ((currentQuestionIndex + (quizCompleted ? 1 : 0)) / quizData.length) * 100;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>درحال دریاف سوالات</Text>
      </SafeAreaView>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / quizData.length) * 100);

    let feedback = "";
    if (percentage === 100) {
      feedback = "تبریک تمام سوالات را موفقانه جواب دادید 🎖️";
    } else if (percentage >= 80) {
      feedback = "عالی شما توانستید که سوالات را موفقانه جواب بدهید 🏅";
    } else if (percentage >= 60) {
      feedback = "خوب بود اما باز هم کوشش نمایید 🥉";
    } else if (percentage >= 40) {
      feedback = "بد نبود اما تا حد توان باید کوشش نماید 🥱";
    } else {
      feedback = "تمرینات تان را ادامه بدهید و کوشش نماید 🤬";
    }

    return (
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        }}
        style={styles.resultContainer}
        blurRadius={3}
      >
        <SafeAreaView style={styles.resultOverlay}>
          <Text style={styles.resultTitle}>امتحان تکمیل شد</Text>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreText}>{percentage}%</Text>
          </View>
          <Text style={styles.resultText}>
            شما توانستید که {score} سوال را در بین {quizData.length}سوال جواب
            بدهید
            {/* You scored {score} out of {quizData.length}. */}
          </Text>
          <Text style={styles.feedbackText}>{feedback}</Text>
          <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
            <Text style={styles.restartButtonText}>تلاش مجدد</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          سوالات {currentQuestionIndex + 1}/{quizData.length}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${progressPercentage}%` }]}
          />
        </View>
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.questionText}>{currentQuestion?.question}</Text>

        <View style={styles.optionsContainer}>
          {currentQuestion?.answers?.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                getOptionStyle(index),
                selectedOption === index &&
                  selectedOption !== currentQuestion.correct_answer && {
                    transform: [{ translateX: shakeAnimation }],
                  },
              ]}
              onPress={() => handleOptionPress(index)}
              disabled={selectedOption !== null}
              activeOpacity={0.7}
            >
              <Text style={[{ direction: "rtl" }, getOptionTextStyle(index)]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* {showExplanation && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationText}>
              {currentQuestion.explanation}
            </Text>
          </View>
        )} */}

        {selectedOption !== null && (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextQuestion}
            activeOpacity={0.7}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex === quizData.length - 1
                ? "دیدن نتایج"
                : "سوال بعدی"}
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    direction: "rtl",
    color: "#64748b",
  },
  header: {
    padding: 16,
    direction: "rtl",
    backgroundColor: "#604AEC",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    color: "white",
    direction: "rtl",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    direction: "rtl",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    direction: "rtl",
    backgroundColor: "white",
    borderRadius: 3,
  },
  content: {
    flex: 1,
    direction: "rtl",
    padding: 20,
  },
  questionText: {
    fontSize: 22,
    direction: "rtl",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 30,
    lineHeight: 30,
  },
  optionsContainer: {
    marginBottom: 20,
    direction: "rtl",
  },
  option: {
    backgroundColor: "white",
    direction: "rtl",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: "transparent",
  },
  optionText: {
    fontSize: 16,
    color: "#1e293b",
    direction: "rtl",
  },
  correctOption: {
    backgroundColor: "#d1fae5",
    borderColor: "#10b981",
    direction: "rtl",
  },
  incorrectOption: {
    backgroundColor: "#fee2e2",
    direction: "rtl",
    borderColor: "#ef4444",
  },
  correctOptionText: {
    color: "#065f46",
    direction: "rtl",
    fontWeight: "600",
  },
  incorrectOptionText: {
    color: "#b91c1c",
    fontWeight: "600",
    direction: "rtl",
  },
  explanationContainer: {
    backgroundColor: "#e0f2fe",
    padding: 16,
    borderRadius: 12,
    direction: "rtl",
    marginBottom: 20,
  },
  explanationText: {
    fontSize: 15,
    color: "#0369a1",
    direction: "rtl",
    lineHeight: 22,
  },
  nextButton: {
    backgroundColor: "#4f46e5",
    padding: 16,
    borderRadius: 12,
    direction: "rtl",
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    direction: "rtl",
  },
  resultContainer: {
    flex: 1,
    resizeMode: "cover",
    direction: "rtl",
  },
  resultOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    direction: "rtl",
    alignItems: "center",
    padding: 20,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: "bold",
    direction: "rtl",
    color: "white",
    marginBottom: 30,
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#4f46e5",
    direction: "rtl",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  scoreText: {
    fontSize: 40,
    fontWeight: "bold",
    direction: "rtl",
    color: "white",
  },
  resultText: {
    fontSize: 20,
    direction: "rtl",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  feedbackText: {
    fontSize: 18,
    direction: "rtl",
    color: "white",
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  restartButton: {
    backgroundColor: "white",
    direction: "rtl",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  restartButtonText: {
    color: "#4f46e5",
    direction: "rtl",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default QuizeScreen;
