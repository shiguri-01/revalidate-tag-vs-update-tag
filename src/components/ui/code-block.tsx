import SyntaxHighlighter from "react-syntax-highlighter";
import { irBlack } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "./scroll-area";

export function CodeBlock({
  children,
  className,
  language,
}: {
  children: string;
  className?: string;
  language?: string;
}) {
  return (
    <ScrollArea className={cn("min-w-0 w-full rounded-sm", className)}>
      <SyntaxHighlighter
        language={language}
        className="w-max min-w-full font-mono text-sm leading-snug"
        style={irBlack}
      >
        {children}
      </SyntaxHighlighter>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
