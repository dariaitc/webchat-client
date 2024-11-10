import React, { useContext, useCallback } from "react";
import styles from './ChatBottom.module.css';
import { useTranslation } from "react-i18next";
import { IoHomeOutline } from "react-icons/io5";
import { GoHistory } from "react-icons/go";
import { BiMessageDetail } from "react-icons/bi";
import { NavLink } from 'react-router-dom'
import LoginDetailsContext from "../../context/LoginDetails/LoginDetailsContext";
function ChatBottom({ isNavMinimized }) {
    const [t] = useTranslation('common')
    const { loginDetails, onNewChatSelectedHandler } = useContext(LoginDetailsContext)
    const { company, lastUserChat } = loginDetails
    const { themeType } = company

    const onlatestChatClickHandler = useCallback(() => {
        if (lastUserChat) {
            onNewChatSelectedHandler(lastUserChat)
        }
    }, [onNewChatSelectedHandler, lastUserChat])

    return (
        <footer className={`${styles['chat-footer']} ${isNavMinimized && styles['chat-footer--minimized']}`}>
            {!isNavMinimized && <nav >
                <ul className={`${styles['bottom-nav']} ${styles[`bottom-nav-theme--${themeType}`]}`}>
                    <li className={styles['nav-ul-left']}>
                        <NavLink to='/home' className={(navData) => navData.isActive ? `${styles['navitem']} ${styles[`navitem--selected-them--${themeType}`]}` : `${styles['navitem']}`}>
                            <IoHomeOutline className={styles['nav-ul-icon']} />
                            <p>{t('home')}</p>
                        </NavLink>
                    </li >
                    <li onClick={onlatestChatClickHandler} className={styles['nav-ul-regular']}>
                        <NavLink to='/chat' className={(navData) => navData.isActive ? `${styles['navitem']} ${styles[`navitem--selected-them--${themeType}`]}` : `${styles['navitem']}`}>
                            <BiMessageDetail className={styles['nav-ul-icon']} />
                            <p>{t('Recent message')}</p>
                        </NavLink>
                    </li>
                    <li className={styles['nav-ul-right']}>
                        <NavLink to='/history' className={(navData) => navData.isActive ? `${styles['navitem']} ${styles[`navitem--selected-them--${themeType}`]}` : `${styles['navitem']}`}>
                            <GoHistory className={styles['nav-ul-icon']} />
                            <p>{t('history')}</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>}
            <a href={process.env.REACT_APP_CREATOR_URL} target="_blank" rel="noreferrer">
                <div className={`${styles['creator-container']} ${styles[`creator-container-theme--blue`]}`}>
                    <span className={styles['creator-title']}>{t('Powered by')}</span>
                    <div className={styles['creator-icon-container']}>
                        <img src={process.env.REACT_APP_CREATOR_ICON_URL} alt={process.env.REACT_APP_CREATOR_NAME} className={styles['creator-icon']} />
                    </div>
                </div>
            </a>
        </footer>
    );
}

export default ChatBottom;
