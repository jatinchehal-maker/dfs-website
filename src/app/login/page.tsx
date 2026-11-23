import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";
import { login } from "@/lib/auth-actions";

export const metadata: Metadata = { title: "Log in", robots: { index: false } };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next, error } = await searchParams;
  return (
    <AuthShell title="Log in" intro={error === "link" ? "That link has expired or was already used. Please try again." : "Welcome back to DFS."}>
      <AuthForm
        action={login} submitLabel="Log in" hidden={{ next: typeof next === "string" ? next : "/dashboard" }}
        inputs={[
          { name: "email", label: "Email", type: "email", autoComplete: "email" },
          { name: "password", label: "Password", type: "password", autoComplete: "current-password" },
        ]}
      >
        <div className="flex flex-wrap justify-between gap-2 text-sm">
          <Link href="/forgot-password" className="underline">Forgot password?</Link>
          <Link href="/signup" className="underline">Create an account</Link>
        </div>
      </AuthForm>
    </AuthShell>
  );
}
