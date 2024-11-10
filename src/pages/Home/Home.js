import React, { useContext, useCallback } from "react"
import styles from './Home.module.css';
import { NavLink } from 'react-router-dom'
import { RiChatNewLine } from "react-icons/ri";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import LoginDetailsContext from "../../context/LoginDetails/LoginDetailsContext";

function Home() {
    const [t] = useTranslation('common')
    const { loginDetails, onNewChatSelectedHandler } = useContext(LoginDetailsContext)
    const { company, lastUserChat } = loginDetails
    const { themeType } = company

    const onNewChatClickHandler = useCallback(() => {
        onNewChatSelectedHandler({ _id: null })
    }, [onNewChatSelectedHandler])

    const onlatestChatClickHandler = useCallback(() => {
        if (lastUserChat) {
            onNewChatSelectedHandler(lastUserChat)
        }
    }, [onNewChatSelectedHandler, lastUserChat])

    let latestUserChatElement = null
    if (lastUserChat) {
        latestUserChatElement =
            <NavLink to='/chat' className={styles['navitem']}>
                <button onClick={onlatestChatClickHandler} className={`${styles['chat-section-btn']} ${styles['regular-btn']} ${styles[`chat-section-btn-theme--${themeType}`]}`}>
                    <div className={styles['btn-icon-container']}>
                        <FaRegArrowAltCircleLeft className={styles['btn-icon']} />
                    </div>
                    <div className={styles['btn-info-container']}>
                        <h2 className={styles['btn-title']}>
                            <span>
                                {t('Recent message')}
                            </span>
                            <time className={styles['btn-time']} >{lastUserChat.latestFormatedMsgTime}•</time>
                        </h2>
                        <p className={styles['btn-desc']}>{lastUserChat.latestMsg}</p>
                    </div>
                </button>
            </NavLink>
    }


    return (
        <section className={styles['chat-main-section']}>
            {latestUserChatElement}
            <NavLink to='/chat' className={styles['navitem']}>
                <button onClick={onNewChatClickHandler} className={`${styles['chat-section-btn']} ${styles['regular-btn']}`}>
                    <div className={styles['btn-icon-container']}>
                        <RiChatNewLine className={`${styles['btn-icon']} ${styles[`btn-icon-theme--${themeType}`]}`} />
                    </div>
                    <div className={styles['btn-info-container']}>
                        <h2 className={styles['btn-title']}>{t('Ask a question')}</h2>
                        <p className={styles['btn-desc']}>{t('Our team will be happy to help')}</p>
                    </div>
                </button>
            </NavLink>
            {/* <button className={`${styles['chat-section-btn']} ${styles['regular-btn']}`}>
                <div className={styles['btn-icon-container']}>
                    <GoHistory className={styles['btn-icon']} />
                </div>
                <div className={styles['btn-info-container']}>
                    <h2 className={styles['btn-title']}>{t('Viewing history')}</h2>
                    <p className={styles['btn-desc']}>{t('Previous chat history')}</p>
                </div>
            </button> */}
        </section>
    );
}

export default Home;
