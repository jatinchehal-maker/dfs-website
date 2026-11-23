import Section from "@/components/ui/Section";
import GlassFolder, { type ArtPreset } from "@/components/ui/glass-folder-cards";
import { HOW_IT_WORKS } from "@/content/home";

const FOLDER_WIDTH = 250;
const STAGGER_MS = 140;

export default function HowItWorks() {
  return (
    <Section id={HOW_IT_WORKS.id} eyebrow={HOW_IT_WORKS.eyebrow} title={HOW_IT_WORKS.title}>
      <ol className="dfs-folders grid gap-x-8 gap-y-14 md:grid-cols-3">
        {HOW_IT_WORKS.steps.map((step, index) => (
          <li key={step.title} className="flex flex-col items-center text-center md:items-start md:text-left">
            <GlassFolder
              label={`${index + 1}. ${step.title}`}
              meta={step.folderMeta}
              tone="light"
              art={step.art as ArtPreset}
              seed={index + 3}
              files={step.files}
              action="none"
              width={FOLDER_WIDTH}
              appearDelay={index * STAGGER_MS}
            />
            <p className="mt-6 max-w-sm text-neutral-700">{step.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-center text-xs font-semibold uppercase tracking-widest text-neutral-500 md:text-left">{HOW_IT_WORKS.hint}</p>
    </Section>
  );
}
