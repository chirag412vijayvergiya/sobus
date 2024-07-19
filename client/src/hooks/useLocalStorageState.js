import { useEffect, useState } from 'react';

export function useLocalStorageState(initialState, key) {
  // If there is stored value in localstorage corresponding to that "key" then it will set the (value) of storedValue other wise it will set initialState value
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    // console.log(storedValue);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // ******************************************************************************* //
  // Whenever key or value will change then it will update the corresponding value
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key, value],
  );
  // ******************************************************************************* //

  return [value, setValue];
}
