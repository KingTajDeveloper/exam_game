import { createSlice } from "@reduxjs/toolkit";

export interface QuestionsState {
  questions: string[];
  currentQuestionIndex: number;
  answersGiven: object;
  score: number;
  timeLeft: number;
  quizStatus: string;
  error: string | null;
}

const initialState: QuestionsState = {
  questions: [],
  currentQuestionIndex: 0,
  answersGiven: {},
  score: 0,
  timeLeft: 20,
  quizStatus: "not_started",
  error: null,
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    loadQuestions: (state, action) => {
      state.questions = action.payload;
      state.quizStatus = "started";
    },
    resetQuize: (state, action) => {
      Object.assign(state, initialState);
    },
  },
});

export const { loadQuestions, resetQuize } = questionsSlice.actions;

export default questionsSlice.reducer;
