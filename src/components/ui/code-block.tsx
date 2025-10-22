import SyntaxHighlighter from "react-syntax-highlighter";
import { irBlack } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { cn } from "@/lib/utils";

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
    <SyntaxHighlighter
      language={language}
      className={cn("w-full overflow-x-scroll font-mono border-border rounded-sm text-sm leading-snug", className)}
      style={irBlack}
    >
      {children}
    </SyntaxHighlighter>
  );
}
