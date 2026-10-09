import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    if (!savedValue) {
      return initialValue;
    }

    try {
      return JSON.parse(savedValue);
      
    } catch (error) {
      console.error("Invalid localStorage data:", error);
      return initialValue;
    }
  });

  const updateValue = (newValue) => {
    setValue((currentValue) => {
      const updatedValue =
        typeof newValue === "function"
          ? newValue(currentValue)
          : newValue;

      localStorage.setItem(
        key,
        JSON.stringify(updatedValue)
      );

      return updatedValue;
    });
  };

  return [value, updateValue];
};

export default useLocalStorage;