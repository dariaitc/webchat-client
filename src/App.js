import React, {  useEffect, useContext } from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { io } from "socket.io-client";
// import styles from './App.module.css';
import Layout from './layouts/MainLayout/Layout';
import Home from './pages/Home/Home';
import History from './pages/History/History';
import Conversation from './pages/Conversation/Conversation';
import LoginDetailsContext from './context/LoginDetails/LoginDetailsContext';
import generateCrossBrowserUserId from './util/generateUserId'
// import { setCookie, checkCookieExists } from './util/Cookies'
import { getCompanyDetailsRequest } from './axios/requests/companyRequests'
import { loginRequest } from './axios/requests/authRequests'
import { getUserChatsRequests } from './axios/requests/chatRequests'

// Define your server URL
const Socket_SERVER_URL = process.env.REACT_APP_SOCKETIO_SERVER_URL || 'http://localhost:5718';

function App() {
  const location = useLocation();
  const { loginDetails, onNewPageSelectedHandler, onInitCompany, onInitUser, onInitPage, onInitSocket, onNewChatSelectedHandler, onInitChats, onInsertNewChat, onInsertNewChatMsg, onUpdateChat } = useContext(LoginDetailsContext)
  const { socket, company, user } = loginDetails
  // const { parentHost } = page
  const { _id: companyId } = company
  // Init page settings
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('company') || '670f7b81da32b58985313506';
    console.log('companyId', companyId)
    const getCompanyDetails = async () => {
      const company = await getCompanyDetailsRequest(companyId)
      onInitCompany(company)
      onInitPage({ pageSelected: 'home' })
    }
    getCompanyDetails()
  }, [onInitPage, onInitCompany])

  // Init User
  useEffect(() => {
    if (!companyId) return
    const userLogin = async () => {
      const crosWebUserId = await generateCrossBrowserUserId()
      console.log(`crosWebUserId=${crosWebUserId}`)
      const cookieName = `effective-user-${companyId}-${crosWebUserId}`

      const user = await loginRequest(cookieName)
      if (!user) {
        //Todo Login Error handler
        return
      }
      onInitUser(user)
      const chats = await getUserChatsRequests(cookieName, '-latestMsgTime')
      onInitChats(chats)
      // setCookie(cookieName, '1', 7)


    }
    userLogin()
  }, [companyId, onInitUser, onInitChats])

  // Init socket settings
  useEffect(() => {
    if (user.decToken && user.userIdentifierId) {
      // Connect to the server with Bearer token authentication
      const newSocket = io(Socket_SERVER_URL, {
        auth: {
          userIdentifierId: user.userIdentifierId,
          [user.userIdentifierId]: `Bearer ${user.decToken}` // Replace with your actual Bearer token
        }
      });
      onInitSocket(newSocket)
    }
  }, [onInitSocket, user.decToken, user.userIdentifierId]);

  // handle switch on pages
  useEffect(() => {
    onNewPageSelectedHandler(location.pathname.split('/')[1])
  }, [location.pathname, onNewPageSelectedHandler])

  // Socket events
  useEffect(() => {
    if (!socket) return // if their was some problem with setting up the socket
    // Connection event
    socket.on('connect', () => {
      console.log(`Connected to server with socket ID: ${socket.id}`);
    });

    //disconnection event
    socket.on('disconnect', (reason) => {
      console.log(`Disconnected from server. Reason: ${reason}`);
    });

    // Listen for the response to the custom event
    socket.on('newMessageRecived', (data) => {
      const { msg, chat, isNewChat } = data
      if (isNewChat) {
        onNewChatSelectedHandler(chat)
        onInsertNewChat(chat)
      }
      else {
        onUpdateChat(chat)
      }
      onInsertNewChatMsg(msg)
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket, onInsertNewChat, onInsertNewChatMsg, onNewChatSelectedHandler, onUpdateChat])

  const RedirectToHome = () => {
    const location = useLocation();

    // Extract the query params from the current location
    const searchParams = location.search; // Includes the "?" prefix

    return <Navigate replace to={`/home${searchParams}`} />;
  }

  return (
    <Layout>
      <Routes>
        <Route path='*' element={<RedirectToHome />} />
        <Route path='/home' element={<Home />} />
        <Route path='/chat' element={<Conversation />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </Layout>
  );
}

export default App;
