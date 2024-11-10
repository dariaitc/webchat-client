import React, { useState, useCallback, useContext, useEffect, useRef } from 'react';
import styles from './Conversation.module.css';
// import { useTranslation } from "react-i18next";
import { BsEmojiSmile } from "react-icons/bs";
import { BsSend } from "react-icons/bs";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Modal from '../../components/ui/Modal/Modal';
import Message from '../../components/Message/Message';
import LoginDetailsContext from '../../context/LoginDetails/LoginDetailsContext';
import { getUserChatMsgsRequests } from '../../axios/requests/msgRequests'

function Conversation() {
    // const [t] = useTranslation('common')
    const [showEmojiModal, setShowEmojiModal] = useState(false)
    const [userInputValue, setUserInputValue] = useState('')
    const { loginDetails, onInitChatMsgs } = useContext(LoginDetailsContext)
    const messagesEndRef = useRef(null);
    const { socket, selectedChat: { _id: chatId }, user: { userIdentifierId }, selectedChatMsgs } = loginDetails

    useEffect(() => {
        if (chatId) {
            const fetchMsgs = async () => {
                const msgs = await getUserChatMsgsRequests(userIdentifierId, chatId, '+msgTime')
                onInitChatMsgs(msgs)
            }
            fetchMsgs()
            //TODO insert messages
        }
    }, [chatId, userIdentifierId, onInitChatMsgs])

    // Scroll to bottom when messages are loaded or new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [selectedChatMsgs]);

    const onUserInputHandler = useCallback((e) => {
        const newValue = e.target.value
        setUserInputValue(newValue)
    }, [])

    const onMsgBtnClicked = useCallback((value) => {
        if (value) {
            socket.emit('sendMsg', {
                chatId,
                msg: value,
                author: 'client'
            })
        }
    }, [socket, chatId])

    const addEmoji = useCallback((emoji) => {
        const nativeEmoji = emoji.native
        setUserInputValue((prevValue => `${prevValue}${nativeEmoji}`))
    }, [])

    const onSendMessageClickHandler = useCallback(() => {
        if (userInputValue) {
            socket.emit('sendMsg', {
                chatId,
                msg: userInputValue,
                author: 'client'
            }
            )
            setUserInputValue('')
        }
        else {
            console.log('Please enter message')
        }
    }, [socket, userInputValue, chatId])

    const msgElementList = selectedChatMsgs.map(msg => {
        return <Message key={msg._id} author={msg.author} datetime={msg.msgTime} formatedMsgTime={msg.formatedMsgTime} btnList={msg.btnList} onBtnClick={onMsgBtnClicked}>
            {msg.msg}
        </Message>
    })

    // Function to scroll to the bottom of the container
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Enter') {
            if (event.ctrlKey) {
                // Create a new line on Ctrl+Enter
                setUserInputValue((prevText) => prevText + '\n');
            } else {
                // Execute the function on Enter without Ctrl
                event.preventDefault(); // Prevents the default behavior of Enter in a textarea (creating a new line)
                onSendMessageClickHandler();
            }

        }
    }, [onSendMessageClickHandler]);



    return (
        <section className={styles['conv-section']}>
            <div className={styles['conv-messages-container-main']}>
                {msgElementList}
                <div ref={messagesEndRef} />
            </div>
            <div className={styles['conv-message-actions']}>
                <textarea onKeyDown={handleKeyDown} value={userInputValue} onChange={onUserInputHandler} className={styles['new-message-input']} />
                <button className={styles['emoji-btn']} onClick={() => setShowEmojiModal(true)}>
                    <Modal className={`${styles['emoji-modal-container']}`} showModal={showEmojiModal} onToggel={(status) => setShowEmojiModal(status)} modalBtn={<BsEmojiSmile className={styles['emoji-icon']} />}>
                        <Picker
                            showSearch={false}
                            emojiSize={20}
                            perLine={6}
                            data={data}
                            onEmojiSelect={addEmoji}
                            set="native"
                            previewPosition="none"  // Hides the preview section
                        />
                    </Modal>

                </button>
                <button onClick={onSendMessageClickHandler} className={styles['send-btn']}>
                    <BsSend className={styles['send-icon']} />

                </button>
            </div>
        </section>
    );
}

export default Conversation;
