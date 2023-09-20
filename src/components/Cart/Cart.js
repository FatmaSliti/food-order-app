import { useContext } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }

    // const cartItems = <ul className={props['cart-items']}>{[{ id: 'c1', name: 'Sushi', amount: 2, price: 12.99 }].map(item => <li key={item.id}>{item.name}</li>)}</ul>
    const cartItems = (
        <ul className={styles["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)} //bind pre-configure the argument that the function will receive when it's being excecuted
                //bind : to ensure that the functions above do receive the id and the item
                />
            ))}
        </ul>
    );

    return (
        <Modal onHideCart={props.onHideCart}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles["button--alt"]} onClick={props.onHideCart}>
                    Close
                </button>
                {hasItems && <button className={styles.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;
