import CalculatorLayout from "@/features/calculator/components/calculator-layout";
import { findConfig } from "@/features/calculator/configs";
import { CalculatorProvider } from "@/features/calculator/context/calculator-context";

export default function CalculatorPage({ params }: { params: { "calculator-slug": string } }) {
  const config = findConfig(params["calculator-slug"]);

  return (
    <CalculatorProvider config={config}>
      <CalculatorLayout />
    </CalculatorProvider>
  );
}
