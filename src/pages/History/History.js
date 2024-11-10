import React, { useContext } from 'react';
import styles from './History.module.css';
// import { useTranslation } from "react-i18next";
// import avatarIcon from '../../assets/avatar-icon.png'
import HistoryConv from '../../components/HistoryConv/HistoryConv';
import LoginDetailsContext from '../../context/LoginDetails/LoginDetailsContext';


function History() {
    // const [t] = useTranslation('common')
    const { loginDetails } = useContext(LoginDetailsContext)
    const { chats } = loginDetails

    const chatElements = chats?.map(chat => (
        <HistoryConv key={chat._id} _id={chat._id} author={chat.latestAuthor} lastDateTime={chat.latestMsgTime} latestFormatedMsgTime={chat.latestFormatedMsgTime}>{chat.latestMsg}</HistoryConv>
    ))

    return (
        <section className={styles['history-section']}>
            {chatElements}
        </section>
    );
}

export default History;
