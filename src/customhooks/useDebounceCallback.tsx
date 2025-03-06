import { useCallback, useEffect, useRef } from "react";

function useDebounceCallback<Args extends Array<unknown>>(
  callback: (...args: Args) => void,
  delay: number
): (...args: Args) => void {
  // timeoutRef's job is to store the timeout id
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // callbackRef's job is to store the callback function to be called in the timeout
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useCallback(
    (...args: Args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );

  useEffect(() => {
    // cleanup
    // When unmounting, clear the timeout
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}
export default useDebounceCallback;
