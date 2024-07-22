"use client";
import React from "react";
import { useCalculatorStore } from "../store/calculator-store";
import CalculatorForm from "./calculator-form";

const CalculatorContent: React.FC = () => {
  const { config } = useCalculatorStore();

  if (!config) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <CalculatorForm />
    </div>
  );
};

export default CalculatorContent;
