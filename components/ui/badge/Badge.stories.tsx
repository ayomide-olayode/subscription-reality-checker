import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Badge from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  args: {
    children: "Badge",
    variant: "neutral",
    size: "sm",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "neutral", "success", "warning", "danger"],
    },
    size: { control: "select", options: ["sm", "md"] },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Neutral: Story = {};
export const Default: Story = { args: { variant: "default" } };
export const Success: Story = { args: { variant: "success" } };
export const Warning: Story = { args: { variant: "warning" } };
export const Danger: Story = { args: { variant: "danger" } };
