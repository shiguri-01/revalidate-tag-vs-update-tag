"use server";
import { revalidateTag, updateTag } from "next/cache";

export async function revalidate() {
  revalidateTag("time", "max");
}

export async function update() {
  updateTag("time");
}
