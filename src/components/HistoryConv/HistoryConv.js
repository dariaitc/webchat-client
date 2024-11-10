import React, { useContext, useCallback } from "react"
import styles from './HistoryConv.module.css'
import clientIcon from '../../assets/avatar-icon.png'
import agentIcon from '../../assets/avatar-icon2.jpg'
import LoginDetailsContext from "../../context/LoginDetails/LoginDetailsContext"
import { NavLink } from 'react-router-dom'

const HistoryConv = (props) => { //author=[client,agent]
    const { author = 'client', _id, latestFormatedMsgTime } = props
    const { loginDetails, onNewChatSelectedHandler } = useContext(LoginDetailsContext)
    const { company, chats } = loginDetails
    const { themeType } = company
    const avatar = author === 'client' ? clientIcon : agentIcon

    const onHistoryChatClickHandler = useCallback(() => {
        const chatObj = chats.find(chat => chat._id === _id)
        if (chatObj) {
            onNewChatSelectedHandler(chatObj)
        }
        else {
            onNewChatSelectedHandler({ _id: null })
        }
    }, [onNewChatSelectedHandler, _id, chats])

    return (
        <NavLink to='/chat' className={styles['navitem']}>
            <button onClick={onHistoryChatClickHandler} className={`${styles['message-btn']} ${styles[`message-btn-theme--${themeType}`]}`}>
                <div className={styles['message-icon-container']}>
                    <div className={styles['btn-icon-container']}>
                        <img src={avatar} className={styles['btn-icon-image']} alt={`${author} avatar`} />
                    </div>
                </div>
                <div className={styles['message-info-container']}>
                    <p className={styles['message-text']}>{props.children}</p>
                </div>
                <div className={styles['message-time-container']}>
                    <time className={styles['message-time']}>{latestFormatedMsgTime}</time>
                </div>
            </button>
        </NavLink>
    )
}

export default HistoryConv