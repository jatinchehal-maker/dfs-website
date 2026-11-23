import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";
import { forgotPassword } from "@/lib/auth-actions";

export const metadata: Metadata = { title: "Forgot password", robots: { index: false } };

export default function ForgotPasswordPage() {
  return (
    <AuthShell title="Forgot password" intro="We'll email you a link to set a new password.">
      <AuthForm action={forgotPassword} submitLabel="Send reset link" inputs={[{ name: "email", label: "Email", type: "email", autoComplete: "email" }]}>
        <p className="text-center text-sm"><Link href="/login" className="underline">Back to log in</Link></p>
      </AuthForm>
    </AuthShell>
  );
}
