import React from "react"
import styles from './Backdrop.module.css'

const Backdrop = (props)=>{
    const clickHandler =(e)=>{
        e.stopPropagation()
        props.onClick()
    }
    return props.show ? <div className={styles['backdrop']} onClick={(e)=>clickHandler(e)}></div> : null
}

export default Backdrop