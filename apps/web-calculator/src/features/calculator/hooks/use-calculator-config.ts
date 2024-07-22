import { NewCalculator } from "../types";

export interface UseCalculatorProps {
  config: NewCalculator;
}
export interface UseCalculatorConfig {
  config: NewCalculator;
}

const useCalculatorConfig = ({ config }: UseCalculatorProps): UseCalculatorConfig => {
  return { config };
};

export default useCalculatorConfig;
