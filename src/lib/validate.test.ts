import { describe, expect, test } from "vitest";
import { validate } from "./validate";
import type { Rule } from "@/content/forms";

const RULES: Rule[] = [
  { name: "name", label: "Name", required: true },
  { name: "email", label: "Email", required: true, kind: "email" },
  { name: "phone", label: "Phone", kind: "phone" },
];

const formOf = (values: Record<string, string>) => {
  const form = new FormData();
  Object.entries(values).forEach(([k, v]) => form.set(k, v));
  return form;
};

describe("validate", () => {
  test("returns no errors for valid input", () => {
    expect(validate(formOf({ name: "Ana", email: "ana@example.com", phone: "514 555 0100" }), RULES)).toEqual({});
  });

  test("flags missing required fields, including whitespace-only", () => {
    const errors = validate(formOf({ name: "   " }), RULES);
    expect(errors).toEqual({ name: "Name is required", email: "Email is required" });
  });

  test("skips optional empty fields", () => {
    expect(validate(formOf({ name: "Ana", email: "a@b.co" }), RULES)).toEqual({});
  });

  test("rejects malformed email and short phone", () => {
    const errors = validate(formOf({ name: "Ana", email: "not-an-email", phone: "123" }), RULES);
    expect(errors).toEqual({ email: "Enter a valid email", phone: "Enter a valid phone" });
  });
});
