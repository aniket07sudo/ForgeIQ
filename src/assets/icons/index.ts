const icons = {
  bell: new URL("./bell.svg", import.meta.url).href,
  user: new URL("./user.svg", import.meta.url).href,
  chevron: new URL("./chevron.svg", import.meta.url).href,
} as const;

// Export individual icon URLs (safe for Vite)
export const planning = new URL("./planning.svg", import.meta.url).href;
export const breakdown = new URL("./breakdown.svg", import.meta.url).href;
export const estimate = new URL("./estimate.svg", import.meta.url).href;
export const chevron = new URL("./chevron.svg", import.meta.url).href;
export const dashboard = new URL("./dashboard.svg", import.meta.url).href;
export const projects = new URL("./projects.svg", import.meta.url).href;
export const sprint = new URL("./sprint.svg", import.meta.url).href;
export const releaseNotes = new URL("./release-notes.svg", import.meta.url)
  .href;
export const integrations = new URL("./integrations.svg", import.meta.url).href;
export const breakdownEmpty = new URL("./breakdown-empty.svg", import.meta.url)
  .href;
export const plus = new URL("./plus.svg", import.meta.url).href;
export const save = new URL("./save.svg", import.meta.url).href;
export const ai = new URL("./ai.svg", import.meta.url).href;
export const document = new URL("./document.svg", import.meta.url).href;
export const draft = new URL("./draft.svg", import.meta.url).href;
export const tick = new URL("./tick.svg", import.meta.url).href;
export const sync = new URL("./sync.svg", import.meta.url).href;

const allIcons = {
  ...icons,
  ai,
  save,
  tick,
  sync,
  document,
  draft,
  planning,
  breakdown,
  estimate,
  chevron,
  dashboard,
  projects,
  sprint,
  releaseNotes,
  integrations,
  breakdownEmpty,
  plus,
} as const;

export default allIcons;
