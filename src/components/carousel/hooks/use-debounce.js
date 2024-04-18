import { useEffect, useRef, useState } from "react";

export const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);
  let argValue = 0;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debounce = (...args) => {
    let val = args?.[0];

    if (val !== 0) {
      argValue = val;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(argValue);
    }, delay);
  };

  return debounce;
};
