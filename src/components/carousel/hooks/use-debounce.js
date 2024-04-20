import { useEffect, useRef, useState } from "react";

export const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);
  let argValue = 0;
  let counter = 0;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debounce = (...args) => {
    let val = args?.[0];
    counter += 1;

    if (val !== 0) {
      argValue = val;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (counter < 2 && argValue > 0) {
        callback(1);
      } else if (counter < 2 && argValue < 0) {
        callback(-1);
      } else {
        callback(argValue);
      }
      argValue = 0;
      counter = 0;
    }, delay);
  };

  return debounce;
};
