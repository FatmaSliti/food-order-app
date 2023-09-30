import { useContext, useState, Fragment } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
// import Chekout from "./Chekout";
import Chekout from "./Chekout";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        await fetch('https://react-http-ba0a5-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
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

    const cartModalContent = <Fragment>
        {cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>

        {isCheckout && <Chekout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />}
        {!isCheckout && <div className={styles.actions}>
            <button className={styles["button--alt"]} onClick={props.onHideCart}>
                Close
            </button>
            {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
        </div>}
    </Fragment>

    const isSubmittingModalContent = <p>Sending order data... </p>

    const didSubmitModalContent = <p style={{ color: 'green' }}>Successfully sent the order!</p>

    return (
        <Modal onHideCart={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;
