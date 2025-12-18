import { TrendingUp } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
  CardFooter,
} from "../ui/card";

interface StatisticCardProps {
  title: string;
  description?: string;
  value: string;
  percentage?: number;
}

export default function StatisticCard({
  title,
  description,
  value,
  percentage,
}: StatisticCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-6xl font-semibold tabular-nums">
          {value}
        </CardTitle>
        <CardAction>
          <div className="size-9 bg-muted grid place-items-center border rounded-full">
            <TrendingUp />
            {percentage}
          </div>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">{description}</div>
      </CardFooter>
    </Card>
  );
}
