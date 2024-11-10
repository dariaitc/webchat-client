import React from "react"
import styles from './Button.module.css'

const Button = (props) => {
    const { value, onClick, className } = props
    return <button className={`${styles['btn']} ${className}`} onClick={() => onClick(value)}>
        {props.children}
    </button>
}

export default Button