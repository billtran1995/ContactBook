import { useState } from "react";

const useInputState = (defaultValue = "") => {
  const [input, setInput] = useState(defaultValue);

  const handleInputChange = value => {
    setInput(value);
  };

  return [input, handleInputChange];
};

export default useInputState;
