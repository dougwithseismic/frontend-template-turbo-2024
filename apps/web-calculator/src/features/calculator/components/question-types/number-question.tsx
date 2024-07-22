import React from "react";
import { Control, Controller } from "react-hook-form";
import { Question } from "../../types";

interface NumberQuestionProps {
  question: Question;
  control: Control<any>;
}

const NumberQuestion: React.FC<NumberQuestionProps> = ({ question, control }) => {
  return (
    <Controller
      name={question.id}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          type="number"
          id={question.id}
          className="w-full p-2 border rounded"
          placeholder={`Enter ${question.shortTitle.toLowerCase()}`}
        />
      )}
    />
  );
};

export default NumberQuestion;
