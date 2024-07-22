import React from "react";
import { Control, Controller } from "react-hook-form";
import { Question } from "../../types";

interface TextQuestionProps {
  question: Question;
  control: Control<any>;
}

const TextQuestion: React.FC<TextQuestionProps> = ({ question, control }) => {
  return (
    <Controller
      name={question.id}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          type="text"
          id={question.id}
          className="w-full p-2 border rounded"
          placeholder={`Enter ${question.shortTitle.toLowerCase()}`}
        />
      )}
    />
  );
};

export default TextQuestion;
