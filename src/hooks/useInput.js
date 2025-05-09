import { useState } from 'react';

function useInput(defaultValue = '', validate) {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);

  function onChange(e) {
    setValue(e.target.value);
    setTouched(true);
    setError(null); // Optional: clear error on typing
  }

  function onBlur() {
    let validationResult = null;

    if (typeof validate === 'function') {
      validationResult = validate(value);
      setError(!validationResult);
    }
  }

  function reset() {
    setValue(defaultValue);
    setError(null);
    setTouched(false);
  }

  return {
    value,
    onChange,
    onBlur,
    hasErrors: Boolean(error),
    error,
    touched,
    setValue,
    reset,
  };
}

export default useInput;
