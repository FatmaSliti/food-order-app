import styles from './Chekout.module.css';
import useInput from '../../hooks/use-input';

const Chekout = props => {
    const { enteredValue: enteredName, inputIsValid: nameIsValid, inputHasError: nameHasError, OnChangeHandler: nameChangeHandler, validateInput: validateName, reset: resetName } = useInput();
    const { enteredValue: enteredStreet, inputIsValid: streetIsValid, inputHasError: streetHasError, OnChangeHandler: streetChangeHandler, validateInput: validateStreet, reset: resetStreet } = useInput();
    const { enteredValue: enteredCode, inputIsValid: codeIsValid, inputHasError: codeHasError, OnChangeHandler: codeChangeHandler, validateInput: validateCode, reset: resetCode } = useInput();
    const { enteredValue: enteredCity, inputIsValid: cityIsValid, inputHasError: cityHasError, OnChangeHandler: cityChangeHandler, validateInput: validateCity, reset: resetCity } = useInput();

    const confirmHandler = event => {
        event.preventDefault();

        let formIsValid =false;

        if (enteredName && enteredStreet && enteredCode && enteredCity) {
            formIsValid = true;
        } else {
            return;
        }

        console.log(enteredName + enteredStreet + enteredCode + enteredCity);

        resetName()
        resetStreet()
        resetCode()
        resetCity();
    }

    const nameClasses = nameHasError ? 'control invalid' : 'control';

    return (
        <form onSubmit={confirmHandler} className={styles.form}>
            <div className={styles.control}>
                <label htmlFor='name'>Your name</label>
                <input type="text" id='name' value={enteredName} onChange={nameChangeHandler} onBlur={validateName} />
            </div>
            <div className={styles.control}>
                <label htmlFor='street'>Street</label>
                <input type="text" id='street' value={enteredStreet} onChange={streetChangeHandler} onBlur={validateStreet} />
            </div>
            <div className={styles.control}>
                <label htmlFor='postal'>Postal code</label>
                <input type="text" id='postal' value={enteredCode} onChange={codeChangeHandler} onBlur={validateCode} />
            </div>
            <div className={styles.control}>
                <label htmlFor='city'>City</label>
                <input type="text" id='city' value={enteredCity} onChange={cityChangeHandler} onBlur={validateCity} />
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={props.onCancel} >Cancel</button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Chekout
