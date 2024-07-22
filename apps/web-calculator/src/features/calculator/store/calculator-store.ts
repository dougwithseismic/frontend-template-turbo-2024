// @@filename: src/features/calculator/store/calculator-store.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NewCalculator } from "../types";

interface CalculatorState {
  config: NewCalculator | null;
  currentQuestionIndex: number;
  answers: Record<string, any>;
  setConfig: (config: NewCalculator) => void;
  setAnswer: (questionId: string, answer: any) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  resetCalculator: () => void;
  setCurrentQuestionIndex: (index: number) => void;
  setAnswerAndNextQuestion: (questionId: string, answer: any) => void;
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      config: null,
      currentQuestionIndex: 0,
      answers: {},
      setConfig: config => set({ config, currentQuestionIndex: 0, answers: {} }),
      setAnswer: (questionId, answer) =>
        set(state => ({ answers: { ...state.answers, [questionId]: answer } })),
      setCurrentQuestionIndex: (index: number) => set({ currentQuestionIndex: index }),
      nextQuestion: () =>
        set(state => ({
          currentQuestionIndex: Math.min(
            state.currentQuestionIndex + 1,
            (state.config?.questions.length || 0) - 1,
          ),
        })),
      previousQuestion: () =>
        set(state => ({
          currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
        })),
      resetCalculator: () => set({ currentQuestionIndex: 0, answers: {} }),
      setAnswerAndNextQuestion: (questionId, answer) =>
        set(state => ({
          answers: { ...state.answers, [questionId]: answer },
          currentQuestionIndex: Math.min(
            state.currentQuestionIndex + 1,
            (state.config?.questions.length || 0) - 1,
          ),
        })),
    }),
    {
      name: "calculator-storage",
      getStorage: () => localStorage,
    },
  ),
);
