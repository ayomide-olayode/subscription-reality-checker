import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Textarea from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  args: {
    placeholder: "Write a message...",
    disabled: false,
  },
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "Hello from textarea" },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Disabled" },
};

export const Error: Story = {
  args: { defaultValue: "Wrong input", error: "Please add more detail" },
};
