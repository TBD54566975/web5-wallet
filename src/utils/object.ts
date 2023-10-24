function safeSpread<T>(obj: T | null | undefined) {
  return obj ?? {};
}

export const ObjectUtils = { safeSpread };
