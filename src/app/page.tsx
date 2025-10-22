import { Actions } from "@/components/Actions";
import { Time } from "@/components/Time";

export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl grid place-content-center py-16 px-8 bg-white dark:bg-black">
        <Time />
        <Actions />
      </main>
    </div>
  );
}
