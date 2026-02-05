import { Card, CardContent } from "@/components/ui/card";

export function ScrollCard({
  title,
  right,
  children,
  maxH = "max-h-[420px]",
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  maxH?: string;
}) {
  return (
    <Card className="border-border bg-bg-white">
      <CardContent className="p-0">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
          <p className="text-sm font-semibold text-primary">{title}</p>
          {right}
        </div>

        <div className={`overflow-auto ${maxH}`}>
          <div className="px-5 py-4">{children}</div>
        </div>
      </CardContent>
    </Card>
  );
}
