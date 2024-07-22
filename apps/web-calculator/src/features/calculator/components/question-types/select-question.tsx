import React from "react";
import { Control, Controller } from "react-hook-form";
import { Question } from "../../types";

interface SelectQuestionProps {
  question: Question;
  control: Control<any>;
}

const SelectQuestion: React.FC<SelectQuestionProps> = ({ question, control }) => {
  return (
    <Controller
      name={question.id}
      control={control}
      render={({ field }) => (
        <select
          {...field}
          id={question.id}
          onChange={field.onChange}
          className="w-full p-2 border rounded">
          <option value="">Select an option</option>
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

export default SelectQuestion;
