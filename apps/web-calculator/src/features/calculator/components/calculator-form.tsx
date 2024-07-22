// @@filename: src/features/calculator/components/calculator-form.tsx

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCalculatorStore } from "../store/calculator-store";
import { Question } from "../types";
import QuestionFactory from "./question-factory";

const CalculatorForm: React.FC = () => {
  const {
    config,
    currentQuestionIndex,
    answers,
    setAnswer,
    setAnswerAndNextQuestion,
    previousQuestion,
  } = useCalculatorStore();

  const currentQuestion: Question | undefined =
    config?.questions[currentQuestionIndex] ?? config?.questions[0];

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(currentQuestion?.validation.schema),
    defaultValues: currentQuestion?.id ? { [currentQuestion.id]: answers[currentQuestion.id] } : {},
  });

  useEffect(() => {
    if (currentQuestion?.id) {
      const subscription = watch((value, { name }) => {
        if (name === currentQuestion.id) {
          setAnswer(currentQuestion.id, value[currentQuestion.id]);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [currentQuestion, watch, setAnswer]);

  const onSubmit = (data: Record<string, any>) => {
    if (currentQuestion?.id) {
      setAnswerAndNextQuestion(currentQuestion.id, data[currentQuestion.id]);
    }
  };

  const handlePrevious = () => {
    previousQuestion();
  };

  if (!currentQuestion) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">{currentQuestion.title}</h2>
      {currentQuestion.description && (
        <p className="mb-4 text-gray-600">{currentQuestion.description}</p>
      )}
      <QuestionFactory question={currentQuestion} control={control} />
      {errors[currentQuestion.id] && (
        <p className="text-red-500 mt-2">{currentQuestion.validation.errorMessage}</p>
      )}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50">
          Previous
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {currentQuestionIndex === (config?.questions.length ?? 0) - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;
