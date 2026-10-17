import { useState, useCallback } from "react";
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setAndPersist = useCallback(
    (nextValue) => {
      setValue((prev) => {
        const resolved =
          typeof nextValue === "function" ? nextValue(prev) : nextValue;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, setAndPersist];
}
