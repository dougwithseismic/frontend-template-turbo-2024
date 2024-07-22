import React from "react";
import { Control, Controller } from "react-hook-form";
import { Question } from "../../types";

interface RadioQuestionProps {
  question: Question;
  control: Control<any>; // The control object from react-hook-form
}

const RadioQuestion: React.FC<RadioQuestionProps> = ({ question, control }) => {
  return (
    // Controller is a wrapper component from react-hook-form that makes it easy to use
    // custom form inputs with the form library
    <Controller
      name={question.id} // The name of the field in the form
      control={control} // Pass the control object to the Controller
      render={({ field }) => (
        // The 'field' object contains methods and properties for managing the input
        <div className="space-y-2">
          {question.options?.map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`${question.id}-${option.value}`}
                value={option.label}
                // Use the field object to manage the checked state
                checked={field.value === option.value}
                // Use the field object's onChange method to update the form state
                onChange={() => field.onChange(option.value)}
                className="form-radio"
              />
              <label htmlFor={`${question.id}-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
      )}
    />
  );
};

export default RadioQuestion;
