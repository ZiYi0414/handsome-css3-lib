import { useState } from 'react';

const useLocalStorage = <T,>(
  key: string,
  initialValue?: T
): [T, (newState: T | ((state: T) => T)) => void] => {
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setLocalStorageState = (newState: T | ((state: T) => T)) => {
    try {
      const newStateValue =
        typeof newState === 'function'
          ? (newState as (state: T) => T)(state)
          : newState;
      setState(newStateValue);
      window.localStorage.setItem(key, JSON.stringify(newStateValue));
    } catch (error) {
      console.error(`Unable to store new value for ${key} in localStorage.`);
    }
  };

  return [state, setLocalStorageState];
};

export default useLocalStorage;
