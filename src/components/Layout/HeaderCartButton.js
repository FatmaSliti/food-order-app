import styles from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'
import { useContext } from 'react'

const HeaderCartButton = props => {
    const ctx = useContext(CartContext);

    const numberOfCartItems = ctx.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0) // because if we do this :ctx.items.length it will add the same meal as three meals if we set the amount to 3 for example

    return (
        <button onClick={props.onClick} className={styles.button}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton
