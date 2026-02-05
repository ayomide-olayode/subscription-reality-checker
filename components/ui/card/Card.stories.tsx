import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Short supporting text.</CardDescription>
          </div>
          <Badge>New</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-neutral-700">
          This card shows composition: small subcomponents combine into a layout
          without adding extra props.
        </p>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};
