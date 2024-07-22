"use client";
import React from "react";
import { useCalculatorStore } from "../store/calculator-store";

const CalculatorSidebar: React.FC = () => {
  const { config, currentQuestionIndex, setCurrentQuestionIndex } = useCalculatorStore();

  return (
    <aside className="w-64 bg-white shadow-md">
      <nav className="p-4">
        <ul>
          {config?.questions.map((question, index) => (
            <li key={question.id} className="mb-2">
              <button
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-full text-left p-2 rounded ${
                  index === currentQuestionIndex ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                }`}>
                {index + 1}. {question.shortTitle}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default CalculatorSidebar;
