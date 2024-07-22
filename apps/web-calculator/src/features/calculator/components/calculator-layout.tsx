"use client";
import React from "react";
import { useCalculatorStore } from "../store/calculator-store";
import CalculatorSidebar from "./calculator-sidebar";
import CalculatorContent from "./calculator-content";
import CalculatorPreview from "./calculator-preview";

const CalculatorLayout: React.FC = () => {
  const { config } = useCalculatorStore();

  if (!config) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      <CalculatorSidebar />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6">{config.name}</h1>
        <CalculatorContent />
      </main>
      <CalculatorPreview />
    </div>
  );
};

export default CalculatorLayout;
