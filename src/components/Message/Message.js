import React, { useContext } from "react"
import styles from './Message.module.css'
import clientIcon from '../../assets/avatar-icon.png'
import agentIcon from '../../assets/avatar-icon2.jpg'
import LoginDetailsContext from "../../context/LoginDetails/LoginDetailsContext"
import Button from "../ui/Button/Button"

const Message = (props) => { //author=[client,agent]
    const { author = 'client', formatedMsgTime, btnList, onBtnClick } = props
    const { loginDetails } = useContext(LoginDetailsContext)
    const { company } = loginDetails
    const { themeType } = company
    const icon = author === 'client' ? clientIcon : agentIcon

    let btnsContainer
    if (btnList?.length > 0) {
        btnsContainer = (
            <div className={styles['btn-container']}>
                {btnList.map((btn) => <Button value={btn.value} onClick={onBtnClick}>{btn.label}</Button>)}
            </div>
        )
    }
    return (
        <div className={`${styles['conv-messages-container']} ${styles[`conv-messages-container--${author}`]}`}>
            <div className={`${styles['message-icon-container']}`}>
                <div className={styles['btn-icon-container']}>
                    <img src={icon} className={styles['btn-icon-image']} alt={`${author} avatar`} />
                </div>
            </div>
            <article className={`${styles['message-container']} ${styles[`message-container--${author}`]} ${styles[`message-container--${author}-theme--${themeType}`]}`}>
                <p className={styles['message-text']}>
                    {props.children}
                </p>
                {btnsContainer}
                <div className={`${styles['message-time-container']} ${styles[`message-time-container--${author}`]}`}>
                    <time>{formatedMsgTime}</time>
                </div>
            </article>
        </div>
    )
}

export default Message