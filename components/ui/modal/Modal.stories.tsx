import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="p-6">
        <Button onClick={() => setOpen(true)}>Open modal</Button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Example modal"
          footer={
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </div>
          }
        >
          <p className="text-sm text-neutral-700">
            This modal is controlled by parent state. Press ESC or click outside to close.
          </p>
        </Modal>
      </div>
    );
  },
};
