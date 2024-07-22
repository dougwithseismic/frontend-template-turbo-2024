import React from "react";
import { Control, Controller } from "react-hook-form";
import { Question } from "../../types";

interface MultipleQuestionProps {
  question: Question;
  control: Control<any>;
}

const MultipleQuestion: React.FC<MultipleQuestionProps> = ({ question, control }) => {
  return (
    <Controller
      name={question.id}
      control={control}
      render={({ field }) => (
        <select {...field} id={question.id} multiple className="w-full p-2 border rounded">
          {question.options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    />
  );
};

export default MultipleQuestion;
