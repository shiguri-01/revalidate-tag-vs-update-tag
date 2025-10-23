import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";
import { Clock } from "./Clock";
import { Card, CardContent, CardFooter } from "./ui/card";
import { CodeBlock } from "./ui/code-block";

const getTime = async () => {
  "use cache";
  cacheTag("time");
  cacheLife("max");
  return new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
};

const code = `
const getTime = async () => {
  "use cache";
  cacheTag("time");
  cacheLife("max");
  return new Date().toLocaleString("ja-JP"); // 実際はDBや外部APIからデータフェッチ
};
`;

export async function FetchedTime() {
  const time = await getTime();
  return <div className="text-4xl">{time}</div>;
}

export function Time() {
  return (
    <Card className="w-full bg-inherit border-none shadow-none">
      <CardContent className="grid gap-2">
        <div>
          <p className="text-sm">Fetched time</p>
          <Suspense
            fallback={<div className="text-4xl text-muted">Fetching time…</div>}
          >
            <FetchedTime />
          </Suspense>
        </div>

        <CodeBlock language={"typescript"}>{code.trim()}</CodeBlock>
      </CardContent>
      <CardFooter>
        <div className="grid grid-cols-[auto_1fr] gap-2 text-muted-foreground text-sm">
          <div>Local (live)</div>
          <Clock />
        </div>
      </CardFooter>
    </Card>
  );
}
