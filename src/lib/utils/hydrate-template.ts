export type TemplateReplacements = Record<string, string | undefined>;

export function hydrateTemplate(template: string, replacements: TemplateReplacements) {
  return template.replaceAll(/\{\{([A-Z_]+)\}\}/g, (match, group1) => {
    if (!(typeof group1 === "string")) {
      return match;
    }

    return replacements[group1] ?? match;
  });
}
