import { cookies } from "next/headers";
import type { ServerToastEnum } from "./server-toast.type";

export async function serverToast(
  message: string,
  type: ServerToastEnum = "info"
) {
  const cookieStore = await cookies();
  const id = crypto.randomUUID();
  cookieStore.set(`toast-${id}`, JSON.stringify({ message, type }), {
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
}
