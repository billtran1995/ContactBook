import { useState } from "react";

const useInputsGroupState = groupDefault => {
  const [inputsGroup, setInputsGroup] = useState([]);

  const addInput = () => {
    let index = 1;

    inputsGroup.length &&
      (index = inputsGroup[inputsGroup.length - 1]["index"] + 1);
    setInputsGroup([...inputsGroup, { ...groupDefault, index }]);
  };

  const removeInput = index => {
    setInputsGroup(inputsGroup.filter(entry => entry.index !== index));
  };

  const handleInputChange = (e, index) => {
    setInputsGroup(
      inputsGroup.map(entry => {
        if (entry.index === index) {
          return { ...entry, [e.target.name]: e.target.value };
        }

        return entry;
      })
    );
  };
  return [inputsGroup, addInput, removeInput, handleInputChange];
};

export default useInputsGroupState;
