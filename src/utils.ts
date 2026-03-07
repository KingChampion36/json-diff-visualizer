/**
 * Aligns the key order of `updated` to preserve original order while showing additions in place.
 */
export function alignJsonKeyOrder(updated: unknown, original: unknown): unknown {
  if (updated === null || original === null) return updated;
  if (typeof updated !== "object" || typeof original !== "object") return updated;

  if (Array.isArray(updated)) {
    return updated.map((item, idx) => {
      const origItem = Array.isArray(original) ? original[idx] : undefined;
      return alignJsonKeyOrder(item, origItem);
    });
  }

  if (Array.isArray(original)) return updated;

  const updatedObj = updated as Record<string, unknown>;
  const originalObj = original as Record<string, unknown>;

  const originalKeys = Object.keys(originalObj);
  const updatedKeys = Object.keys(updatedObj);
  const aligned: Record<string, unknown> = {};
  const placedKeys = new Set<string>();

  let nextOrigIdx = 0;

  for (const uKey of updatedKeys) {
    if (uKey in originalObj) {
      const origPos = originalKeys.indexOf(uKey);
      // place any unplaced original keys that come before this one
      while (nextOrigIdx < origPos) {
        const oKey = originalKeys[nextOrigIdx];
        if (oKey in updatedObj && !placedKeys.has(oKey)) {
          aligned[oKey] = alignJsonKeyOrder(updatedObj[oKey], originalObj[oKey]);
          placedKeys.add(oKey);
        }
        nextOrigIdx++;
      }
      if (!placedKeys.has(uKey)) {
        aligned[uKey] = alignJsonKeyOrder(updatedObj[uKey], originalObj[uKey]);
        placedKeys.add(uKey);
        nextOrigIdx = origPos + 1;
      }
    } else {
      // new key — place it inline
      aligned[uKey] = updatedObj[uKey];
      placedKeys.add(uKey);
    }
  }

  // place any remaining original keys that are also in updated
  while (nextOrigIdx < originalKeys.length) {
    const oKey = originalKeys[nextOrigIdx];
    if (oKey in updatedObj && !placedKeys.has(oKey)) {
      aligned[oKey] = alignJsonKeyOrder(updatedObj[oKey], originalObj[oKey]);
      placedKeys.add(oKey);
    }
    nextOrigIdx++;
  }

  return aligned;
}

export function safeParseJson(input: string): { value: unknown; error: string | null } {
  if (!input.trim()) return { value: null, error: null };
  try {
    return { value: JSON.parse(input), error: null };
  } catch (e: unknown) {
    return { value: null, error: e instanceof Error ? e.message : String(e) };
  }
}

