import { useState } from "react";

const useInput = () => {

    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const inputIsValid = enteredValue.trim() !== '';
    const inputHasError = !inputIsValid && isTouched;

    const OnChangeHandler = e => {
        setEnteredValue(e.target.value);
    }

    const validateInput = () => {
        setIsTouched(false);
    }

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }

    return {
        enteredValue,
        inputIsValid,
        inputHasError,
        OnChangeHandler,
        validateInput,
        reset,

    }
}

export default useInput;
