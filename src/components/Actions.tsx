"use client";

import { BookIcon, ClockIcon } from "lucide-react";
import * as React from "react";
import { useFormStatus } from "react-dom";
import { revalidate, update } from "@/server";
import { Button } from "./ui/button";
import { CodeBlock } from "./ui/code-block";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemTitle,
} from "./ui/item";
import { Spinner } from "./ui/spinner";

type ServerAction = (formData: FormData) => Promise<void> | void;

type ActionItemProps = {
  title: string;
  description: string;
  docsHref: string;
  action: ServerAction;
  buttonLabel: string;
  code: string;
  storageKey: string;
};

function ActionRunButton({
  label,
  onRun,
}: {
  label: string;
  onRun?: () => void;
}) {
  const status = useFormStatus();
  return (
    <Button
      size="sm"
      disabled={status.pending}
      className="w-32"
      onClick={onRun}
    >
      {status.pending ? <Spinner /> : label}
    </Button>
  );
}

function ActionItem({
  title,
  description,
  docsHref,
  action,
  buttonLabel,
  code,
  storageKey,
}: ActionItemProps) {
  const [last, setLast] = React.useState<string | null>(null);

  // ローカルストレージから初期値を読み込む
  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setLast(stored);
    }
  }, [storageKey]);

  const markNow = React.useCallback(() => {
    const formatted = new Date().toLocaleTimeString("ja-JP");
    setLast(formatted);
    localStorage.setItem(storageKey, formatted);
  }, [storageKey]);

  return (
    <Item variant={"outline"}>
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
        <CodeBlock className="my-0.5" language={"typescript"}>
          {code.trim()}
        </CodeBlock>
        <ItemFooter className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <Button variant="link" size="sm" asChild>
              <a href={docsHref}>
                <BookIcon size={16} />
                Documentation
              </a>
            </Button>
          </div>

          <div className="inline-flex gap-2 items-center">
            <ClockIcon size={16} />
            last call: {last ?? "--:--:--"}
          </div>
        </ItemFooter>
      </ItemContent>

      <ItemActions>
        <form action={action}>
          <ActionRunButton label={buttonLabel} onRun={markNow} />
        </form>
      </ItemActions>
    </Item>
  );
}

export function Revalidate() {
  return (
    <ActionItem
      title="revalidateTag()"
      description="指定したタグのキャッシュデータを無効化し、次回のリクエスト時にバックグラウンドでデータの再検証が開始される。"
      docsHref="https://nextjs.org/docs/app/api-reference/functions/revalidateTag"
      action={revalidate as ServerAction}
      buttonLabel="revalidateTag()"
      code={`
"use server";
revalidateTag("time", "max");
          `}
      storageKey="lastCall:revalidateTag"
    />
  );
}

export function Update() {
  return (
    <ActionItem
      title="updateTag()"
      description="指定したタグのキャッシュデータを直ちに再検証する。"
      docsHref="https://nextjs.org/docs/app/api-reference/functions/updateTag"
      action={update as ServerAction}
      buttonLabel="updateTag()"
      code={`
"use server";
updateTag("time");
          `}
      storageKey="lastCall:updateTag"
    />
  );
}

export function Actions() {
  return (
    <ItemGroup className="gap-2">
      <Revalidate />
      <Update />
    </ItemGroup>
  );
}
