import styles from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'
import { useContext, useEffect, useState } from 'react'

const HeaderCartButton = props => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const ctx = useContext(CartContext);

    const numberOfCartItems = ctx.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0) // because if we do this :ctx.items.length it will add the same meal as three different meals if we set the amount to 3 for example


    // const {items} = ctx;

    const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`

    useEffect(() => {
        if (ctx.items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 300);

        return () => {
            clearTimeout(timer)
        }
    }, [ctx.items]);

    return (
        <button onClick={props.onClick} className={btnClasses}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton
