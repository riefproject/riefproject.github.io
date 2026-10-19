export function parseHighlightTags(text?: string | null): string[] {
  if (!text) return []
  return text
    .split(/[,·\|/]/)
    .map((tag) => tag.trim())
    .filter(Boolean)
}
