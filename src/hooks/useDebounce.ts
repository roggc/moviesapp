import { useRef } from "react";

export const useDebounce = () => {
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

  return (fn: (...args: any[]) => void, time: number) =>
    (...args: any[]) => {
      timeoutIdRef.current && clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(fn, time, ...args);
    };
};
