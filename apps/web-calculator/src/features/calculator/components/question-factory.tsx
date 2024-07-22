import React from "react";
import { Control } from "react-hook-form";
import { Question } from "../types";
import TextQuestion from "./question-types/text-question";
import NumberQuestion from "./question-types/number-question";
import RadioQuestion from "./question-types/radio-question";
import CheckboxQuestion from "./question-types/checkbox-question";
import SelectQuestion from "./question-types/select-question";
import MultipleQuestion from "./question-types/multiple-question";

interface QuestionFactoryProps {
  question: Question;
  control: Control<any>; // The control object from react-hook-form
}

// This component decides which question type component to render based on the question type
const QuestionFactory: React.FC<QuestionFactoryProps> = ({ question, control }) => {
  switch (question.type) {
    case "text":
      return <TextQuestion question={question} control={control} />;
    case "number":
      return <NumberQuestion question={question} control={control} />;
    case "radio":
      return <RadioQuestion question={question} control={control} />;
    case "checkbox":
      return <CheckboxQuestion question={question} control={control} />;
    case "select":
      return <SelectQuestion question={question} control={control} />;
    case "multiple":
      return <MultipleQuestion question={question} control={control} />;
    default:
      return null;
  }
};

export default QuestionFactory;
