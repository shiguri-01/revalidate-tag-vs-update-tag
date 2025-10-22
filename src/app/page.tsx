import { Actions } from "@/components/Actions";
import { Time } from "@/components/Time";
import { cn } from "@/lib/utils";

export default async function Home() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background font-sans">
      <main
        className={cn(
          "min-h-dvh w-full max-w-3xl grid place-content-center",
          "px-4 py-6 sm:px-8 sm:py-16",
        )}
      >
        <Time />
        <Actions />
      </main>
    </div>
  );
}
