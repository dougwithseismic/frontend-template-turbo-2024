// @@filename: apps/web/turbo/generators/plop-templates/item.stories.tsx.hbs

import type { Meta, StoryObj } from "@storybook/react";
import { ProductItem } from "./product-item";

const meta: Meta<typeof ProductItem> = {
  title: "Features/Product/ProductItem",
  component: ProductItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    product: { control: "object" },
    onUpdate: { action: "onUpdate" },
    onDelete: { action: "onDelete" },
  },
};

export default meta;

type Story = StoryObj<typeof ProductItem>;

export const Default: Story = {
  args: {
    product: { id: "1", name: "Example Product" },
  },
};
