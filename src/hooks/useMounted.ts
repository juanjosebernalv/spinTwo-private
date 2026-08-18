import { useSyncExternalStore } from "react";

function subscribe() {
  // No external store to subscribe to - this hook only distinguishes the
  // server-rendered pass from the first client render.
  return () => {};
}

/**
 * Returns `false` during server rendering (and the initial client render
 * used for hydration), then `true` once the component has mounted on the
 * client. Useful for deferring rendering of client-only state (like a
 * resolved theme) without causing a hydration mismatch, without resorting
 * to `useState` + `useEffect`.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
