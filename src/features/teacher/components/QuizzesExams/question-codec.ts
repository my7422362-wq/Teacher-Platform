/** Defensive read-side normalizer for the `questions[]` field — the real
 *  backend returns plain objects, but this tolerates a JSON-stringified
 *  item too (harmless either way, and it's what earlier backend versions
 *  used before questions got dedicated REST endpoints for quizzes). */
export function decodeQuestions<T>(raw: unknown[] | null | undefined): T[] {
  if (!raw) return [];
  return raw
    .map((item) => {
      if (typeof item === 'string') {
        try {
          return JSON.parse(item) as T;
        } catch {
          return null;
        }
      }
      return item as T;
    })
    .filter((q): q is T => q !== null);
}
