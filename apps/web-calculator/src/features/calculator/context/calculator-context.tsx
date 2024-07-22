"use client";
import React, { createContext, useContext } from "react";
import { NewCalculator } from "../types";
import { useCalculatorStore } from "../store/calculator-store";

interface ICalculatorContext {
  calculatorConfig: NewCalculator | null;
  // eslint-disable-next-line no-unused-vars -- voidy.
  setCalculatorConfig: (config: NewCalculator) => void;
}

export const CalculatorContext = createContext<ICalculatorContext | undefined>(undefined);

export const CalculatorProvider: React.FC<{ config: NewCalculator; children: React.ReactNode }> = ({
  config,
  children,
}) => {
  const { setConfig } = useCalculatorStore();

  // Initialize the store with the provided config
  React.useEffect(() => {
    setConfig(config);
  }, [config, setConfig]);

  const contextValue: ICalculatorContext = {
    calculatorConfig: config,
    setCalculatorConfig: setConfig,
  };

  return <CalculatorContext.Provider value={contextValue}>{children}</CalculatorContext.Provider>;
};

export const useCalculatorContext = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error("useCalculatorContext must be used within a CalculatorProvider");
  }
  return context;
};
