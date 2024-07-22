import React from "react";
import { Control, Controller } from "react-hook-form";
import { Question } from "../../types";

interface CheckboxQuestionProps {
  question: Question;
  control: Control<any>;
}

const CheckboxQuestion: React.FC<CheckboxQuestionProps> = ({ question, control }) => {
  return (
    <Controller
      name={question.id}
      control={control}
      render={({ field }) => (
        <div className="space-y-2">
          {question.options?.map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`${question.id}-${option.value}`}
                value={option.value}
                checked={(field.value || []).includes(option.value)}
                onChange={e => {
                  const updatedValue = e.target.checked
                    ? [...(field.value || []), option.value]
                    : (field.value || []).filter((item: string) => item !== option.value);
                  field.onChange(updatedValue);
                }}
                className="form-checkbox"
              />
              <label htmlFor={`${question.id}-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
      )}
    />
  );
};

export default CheckboxQuestion;
