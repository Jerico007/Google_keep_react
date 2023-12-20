import React from 'react';
import { useState } from 'react';
const useLocalStorage = (key,data) => {
   
    // useState to store the current data/value
    const [storedValue, setStoredValue] = useState(data);

    // Function to store the value in localeStorage and useState
    const setValue = (value) => {
        localStorage.setItem(key, JSON.stringify(value));
        setStoredValue(value);
    };

    return [storedValue,setValue];
}

export default useLocalStorage;
