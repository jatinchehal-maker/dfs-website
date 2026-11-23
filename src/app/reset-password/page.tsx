import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";
import { resetPassword } from "@/lib/auth-actions";

export const metadata: Metadata = { title: "Set a new password", robots: { index: false } };

export default function ResetPasswordPage() {
  return (
    <AuthShell title="Set a new password">
      <AuthForm
        action={resetPassword} submitLabel="Save new password"
        inputs={[
          { name: "password", label: "New password (min. 8 characters)", type: "password", autoComplete: "new-password", minLength: 8 },
          { name: "confirm", label: "Confirm new password", type: "password", autoComplete: "new-password", minLength: 8 },
        ]}
      />
    </AuthShell>
  );
}
