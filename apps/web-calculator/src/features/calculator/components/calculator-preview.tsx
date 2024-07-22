"use client";
import React from "react";
import { useCalculatorStore } from "../store/calculator-store";

const CalculatorPreview: React.FC = () => {
  const { answers } = useCalculatorStore();

  return (
    <aside className="w-1/4 bg-white shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Preview</h2>
      <pre className="whitespace-pre-wrap">{JSON.stringify(answers, null, 2)}</pre>
    </aside>
  );
};

export default CalculatorPreview;
