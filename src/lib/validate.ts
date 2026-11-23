import type { Rule } from "@/content/forms";

const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s()+.-]{10,}$/,
};

// Pure: returns a new errors object keyed by field name.
export function validate(data: FormData, rules: Rule[]): Record<string, string> {
  return rules.reduce<Record<string, string>>((errors, rule) => {
    const value = String(data.get(rule.name) ?? "").trim();
    if (!value) return rule.required ? { ...errors, [rule.name]: `${rule.label} is required` } : errors;
    if (rule.kind && !PATTERNS[rule.kind].test(value)) return { ...errors, [rule.name]: `Enter a valid ${rule.label.toLowerCase()}` };
    return errors;
  }, {});
}
