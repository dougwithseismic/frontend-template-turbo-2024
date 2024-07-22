import type { Meta, StoryObj } from "@storybook/react";
import { ProductList } from "./product-list";

const meta: Meta<typeof ProductList> = {
  title: "Features/Product/ProductList",
  component: ProductList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isLoading: { control: "boolean" },
    hasError: { control: "boolean" },
    products: { control: "object" },
  },
};

export default meta;

type Story = StoryObj<typeof ProductList>;

export const Default: Story = {
  args: {
    isLoading: false,
    hasError: false,
    products: [
      { id: "1", name: "Example 1" },
      { id: "2", name: "Example 2" },
      { id: "3", name: "Example 3" },
    ],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    hasError: false,
    products: [],
  },
};

export const Error: Story = {
  args: {
    isLoading: false,
    hasError: true,
    products: [],
  },
};

export const Empty: Story = {
  args: {
    isLoading: false,
    hasError: false,
    products: [],
  },
};
