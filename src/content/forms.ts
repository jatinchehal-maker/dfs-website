import { JOB_TYPES } from "./jobs";

export type Rule = { name: string; label: string; required?: boolean; kind?: "email" | "phone" };
export type FormField = Rule & { type?: "text" | "email" | "tel" | "textarea" | "select" | "checkboxes"; options?: string[]; wide?: boolean };

// Fields match the forms on deltafacilitiessolutions.com/careers and /contact.
export const APPLICATION_FORM: FormField[] = [
  { name: "fullName", label: "Full name", required: true },
  { name: "email", label: "Email", required: true, kind: "email", type: "email" },
  { name: "phone", label: "Phone", required: true, kind: "phone", type: "tel" },
  { name: "city", label: "City you live in", required: true },
  { name: "workType", label: "Type of work", required: true, type: "select", options: [...JOB_TYPES, "Any"] },
  { name: "availability", label: "When can you work?", type: "checkboxes", options: ["Days", "Evenings", "Nights", "Weekends"] },
  { name: "experience", label: "Tell us about your experience", type: "textarea", wide: true },
];

export const CONSULTATION_FORM: FormField[] = [
  { name: "name", label: "Your name", required: true },
  { name: "company", label: "Company", required: true },
  { name: "email", label: "Work email", required: true, kind: "email", type: "email" },
  { name: "phone", label: "Phone", kind: "phone", type: "tel" },
  { name: "work", label: "What work do you need covered?", required: true, type: "textarea", wide: true },
];
