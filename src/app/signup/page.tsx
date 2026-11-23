import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";
import { signup } from "@/lib/auth-actions";

export const metadata: Metadata = { title: "Create an account", robots: { index: false } };

export default function SignupPage() {
  return (
    <AuthShell title="Create an account" intro="For DFS workers and clients.">
      <AuthForm
        action={signup} submitLabel="Create account"
        inputs={[
          { name: "fullName", label: "Full name", autoComplete: "name" },
          { name: "email", label: "Email", type: "email", autoComplete: "email" },
          { name: "password", label: "Password (min. 8 characters)", type: "password", autoComplete: "new-password", minLength: 8 },
          { name: "confirm", label: "Confirm password", type: "password", autoComplete: "new-password", minLength: 8 },
        ]}
      >
        <p className="text-center text-sm">Already have an account? <Link href="/login" className="underline">Log in</Link></p>
      </AuthForm>
    </AuthShell>
  );
}
