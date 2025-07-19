import ExamSetupScreen from "@/components/quize/ExamSetupScreen";
import QuizeScreen from "@/components/quize/QuizeScreen";
import { SubjectList } from "@/config/config";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { useSelector } from "react-redux";

const ExamScreen = () => {
  const params = useLocalSearchParams();
  const subjectValue = params?.slug;

  const subject = SubjectList.find((item) => item?.value === subjectValue);
  const selector = useSelector((store) => store.questions);
  console.log(subject);

  return (
    <>
      {selector?.quizStatus === "not_started" && (
        <ExamSetupScreen subject={subject} />
      )}
      {selector?.quizStatus === "started" && <QuizeScreen subject={subject} />}
    </>
  );
};

export default ExamScreen;
