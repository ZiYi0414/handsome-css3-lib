import { useState } from 'react';

const useLocalStorage = (key: string, initialValue?: any) => {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setLocalStorageState = (newState: (state: any) => void | string) => {
    try {
      const newStateValue =
        typeof newState === 'function' ? newState(state) : newState;
      setState(newStateValue);
      window.localStorage.setItem(key, JSON.stringify(newStateValue));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Unable to store new value for ${key} in localStorage.`);
    }
  };

  return [state, setLocalStorageState];
};

export default useLocalStorage;
