import React from 'react'
import classes from './Card.module.css';

const Card = props => {
    return (
        <div className={classes.card}>
            {props.children} {/* to get access to the wrapped content */}
        </div>
    )
}

export default Card
