import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Select from "./Select";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => (
    <Select {...args} defaultValue="">
      <option value="" disabled>
        select a role...
      </option>
      <option value="student">Student</option>
      <option value="instructor">Instructor</option>
    </Select>
  ),
};
export const Disabled: Story = {
  render: (args) => (
    <Select {...args} disabled defaultValue="">
      <option value="" disabled>
        Select a role...
      </option>
      <option value="student">Student</option>
      <option value="instructor">Instructor</option>
    </Select>
  ),
};

export const Error: Story = {
  render: (args) => (
    <Select {...args} error="Please choose a valid role" defaultValue="">
      <option value="" disabled>
        Select a role...
      </option>
      <option value="student">Student</option>
      <option value="instructor">Instructor</option>
    </Select>
  ),
};
