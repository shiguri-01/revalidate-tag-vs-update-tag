"use client";

import { BookIcon, ClockIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { revalidate, update } from "@/server";
import { Button } from "./ui/button";
import { CodeBlock } from "./ui/code-block";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
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
      className="w-full"
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
  const [last, setLast] = useState<string | null>(null);

  // ローカルストレージから初期値を読み込む
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setLast(stored);
    }
  }, [storageKey]);

  const markNow = useCallback(() => {
    const formatted = new Date().toLocaleTimeString("ja-JP");
    setLast(formatted);
    localStorage.setItem(storageKey, formatted);
  }, [storageKey]);

  return (
    <Item variant={"outline"} className="grid md:grid-cols-[1fr_8rem]">
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <div className="grid grid-cols-2 text-sm mt-1">
          <div>
            <a
              href={docsHref}
              className="inline-flex gap-2 items-center hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              <BookIcon size={14} />
              Documentation
            </a>
          </div>
          <div className="inline-flex gap-2 items-center">
            <ClockIcon size={14} />
            last call: {last ?? "--:--:--"}
          </div>
        </div>

        <ItemDescription className="line-clamp-none text-wrap">
          {description}
        </ItemDescription>
        <CodeBlock className="my-0.5" language={"typescript"}>
          {code.trim()}
        </CodeBlock>
      </ItemContent>

      <ItemActions>
        <form action={action} className="w-full">
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
      description="指定したタグのキャッシュを無効化し、次回リクエスト時に非同期で再検証を始める。"
      docsHref="https://nextjs.org/docs/app/api-reference/functions/revalidateTag"
      action={revalidate as ServerAction}
      buttonLabel="revalidateTag()"
      code={'revalidateTag("time", "max");'}
      storageKey="lastCall:revalidateTag"
    />
  );
}

export function Update() {
  return (
    <ActionItem
      title="updateTag()"
      description="指定したタグのキャッシュをただちに再検証する。"
      docsHref="https://nextjs.org/docs/app/api-reference/functions/updateTag"
      action={update as ServerAction}
      buttonLabel="updateTag()"
      code={'updateTag("time");'}
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
