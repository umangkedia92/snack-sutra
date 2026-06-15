import { cookies } from "next/headers";
import { createHmac } from "crypto";

const COOKIE_NAME = "snacksutra_admin";
const SECRET = process.env.ADMIN_PASSWORD || "admin";

function generateToken(): string {
  return createHmac("sha256", SECRET)
    .update("snacksutra-admin")
    .digest("hex");
}

export function checkPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD;
}

export function getAdminCookie(): { name: string; value: string; options: Record<string, unknown> } {
  return {
    name: COOKIE_NAME,
    value: generateToken(),
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 60 * 60 * 24,
      path: "/",
    },
  };
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (!token) return false;
  return token.value === generateToken();
}
