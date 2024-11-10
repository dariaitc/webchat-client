import React, { useReducer, useCallback } from 'react'
import { convertDateTimeToApplicationTime } from '../../util/helperFuns'


const LoginDetailsContext = React.createContext({
    loginDetails: {},
    onNewPageSelectedHandler: () => { },
    onInitCompany: () => { },
    onInitUser: () => { },
    onInitPage: () => { },
    onInitSocket: () => { },
    onInitChats: () => { },
    onNewChatSelectedHandler: () => { },
    onInitChatMsgs: () => { },
    onInsertNewChatMsg: () => { },
    onInsertNewChat: () => { },
    onUpdateChat: () => { }
})

const loginDetailsReducerFunc = (state, action) => {
    if (action.type === 'NEW_PAGE_SELECTED') {
        const page = { ...state.page }
        page.prevPage = page.pageSelected
        page.pageSelected = action.pageSelected
        return { ...state, page }
    }
    if (action.type === 'NEW_CHAT_SELECTED') {
        return { ...state, selectedChatMsgs: [], selectedChat: action.selectedChat, }
    }
    if (action.type === 'INIT_COMPANY') {
        return { ...state, company: { ...state.company, ...action.company } }
    }
    if (action.type === 'INIT_USER') {
        return { ...state, user: { ...state.user, ...action.user } }
    }
    if (action.type === 'INIT_PAGE') {
        return { ...state, page: { ...state.page, ...action.page } }
    }
    if (action.type === 'INIT_CHATS') {
        const additionObj = {}
        action.chats.forEach(chat => {
            chat.latestFormatedMsgTime = convertDateTimeToApplicationTime(chat.latestMsgTime)
            if (additionObj.lastUserChat) {
                if (chat.latestClientMsgTime && chat.latestClientMsgTime > additionObj.lastUserChat.latestClientMsgTime) {
                    additionObj.lastUserChat = chat
                }
            }
            else {
                if (chat.latestClientMsgTime) additionObj.lastUserChat = chat
            }
        })
        return { ...state, ...additionObj, chats: action.chats }
    }
    if (action.type === 'INSERT_CHAT') {
        action.chat.latestFormatedMsgTime = convertDateTimeToApplicationTime(action.chat.latestMsgTime)
        const chats = [action.chat, ...state.chats]
        return { ...state, chats, lastUserChat: action.chat }
    }
    if (action.type === 'UPDATE_CHAT') {
        action.chat.latestFormatedMsgTime = convertDateTimeToApplicationTime(action.chat.latestMsgTime)
        const updateState = {}
        const chats = [...state.chats]
        const foundChatIndex = chats.findIndex(chat => chat._id === action.chat?._id)
        if (foundChatIndex > -1) {
            chats.splice(foundChatIndex, 1, action.chat)
        }
        if (action.chat?._id === state.lastUserChat?._id) {
            updateState.lastUserChat = action.chat
        }
        if (action.chat?._id === state.selectedChat?._id) {
            updateState.selectedChat = action.chat
        }
        chats.sort((a, b) => a.latestMsgTime < b.latestMsgTime ? 1 : -1)
        updateState.chats = chats
        return { ...state, ...updateState }
    }
    if (action.type === 'INIT_CHAT_MSGS') {
        const formatedMsgs = action.selectedChatMsgs.map(msg => ({ ...msg, formatedMsgTime: convertDateTimeToApplicationTime(msg.msgTime) }))
        return { ...state, selectedChatMsgs: formatedMsgs }
    }
    if (action.type === 'INSERT_CHAT_MSG') {
        action.msg.formatedMsgTime = convertDateTimeToApplicationTime(action.msg.msgTime)
        if (state.selectedChat?._id === action.msg?.chatId) {
            const selectedChatMsgs = [...state.selectedChatMsgs, action.msg]
            return { ...state, selectedChatMsgs }
        }
    }
    if (action.type === 'INIT_SOCKET') {
        return { ...state, socket: action.socket }
    }

    return state
}

const loginDetailsReducerInitState = {
    company: {
        _id: null,
        iconUrl: '',
        iconLabel: '',
        iconDesc: '',
        themeType: 'blue'
    },
    user: {
        token: ''
    },
    page: {
        prevPage: 'home',
        pageSelected: 'home',
        // parentHost: null
    },
    chats: [],
    selectedChat: {
        _id: null
    },
    selectedChatMsgs: [

    ],
    socket: null,
    lastUserChat: null
}

export const LoginDetailsContextProvider = (props) => {
    const [loginDetails, loginDetailsDispatch] = useReducer(loginDetailsReducerFunc, loginDetailsReducerInitState)

    const onNewPageSelectedHandler = useCallback((pageSelected) => {
        loginDetailsDispatch({
            type: 'NEW_PAGE_SELECTED',
            pageSelected
        })
    }, [])

    const onNewChatSelectedHandler = useCallback((selectedChat) => {
        loginDetailsDispatch({
            type: 'NEW_CHAT_SELECTED',
            selectedChat
        })
    }, [])

    const onInitCompany = useCallback((company) => {
        loginDetailsDispatch({
            type: 'INIT_COMPANY',
            company
        })
    }, [])

    const onInitUser = useCallback((user) => {
        loginDetailsDispatch({
            type: 'INIT_USER',
            user
        })
    }, [])

    const onInitPage = useCallback((page) => {
        loginDetailsDispatch({
            type: 'INIT_PAGE',
            page
        })
    }, [])

    const onInitChats = useCallback((chats) => {
        loginDetailsDispatch({
            type: 'INIT_CHATS',
            chats
        })
    }, [])

    const onInsertNewChat = useCallback((chat) => {
        loginDetailsDispatch({
            type: 'INSERT_CHAT',
            chat
        })
    }, [])

    const onUpdateChat = useCallback((chat) => {
        loginDetailsDispatch({
            type: 'UPDATE_CHAT',
            chat
        })
    }, [])


    const onInitChatMsgs = useCallback((selectedChatMsgs) => {
        loginDetailsDispatch({
            type: 'INIT_CHAT_MSGS',
            selectedChatMsgs
        })
    }, [])

    const onInsertNewChatMsg = useCallback((msg) => {
        loginDetailsDispatch({
            type: 'INSERT_CHAT_MSG',
            msg
        })
    }, [])

    const onInitSocket = useCallback((socket) => {
        loginDetailsDispatch({
            type: 'INIT_SOCKET',
            socket
        })
    }, [])

    return <LoginDetailsContext.Provider value={{ loginDetails, onNewPageSelectedHandler, onInitCompany, onInitUser, onInitPage, onInitSocket, onInitChats, onNewChatSelectedHandler, onInitChatMsgs, onInsertNewChat, onInsertNewChatMsg, onUpdateChat }}>
        {props.children}
    </LoginDetailsContext.Provider>
}


export default LoginDetailsContext