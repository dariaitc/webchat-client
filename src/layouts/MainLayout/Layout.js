import React, { useContext } from "react";
import styles from './Layout.module.css';
import ChatHeader from './ChatHeader'
// import ChatMain from './ChatMain/ChatMain';
import ChatBottom from './ChatBottom';
import LoginDetailsContext from "../../context/LoginDetails/LoginDetailsContext";

function Layout(props) {
    const { loginDetails } = useContext(LoginDetailsContext)
    const {page} = loginDetails
    const isHeaderMinimized = page.pageSelected !== 'home'
    const isNavMinimized = page.pageSelected === 'chat'
    return (
        <div className={`${styles['layout-container']}`}>
            <ChatHeader isHeaderMinimized={isHeaderMinimized} isNavMinimized={isNavMinimized} />
            <main className={`${styles['main-section']}  ${styles['main-section-minimized-header']} ${isNavMinimized && isHeaderMinimized && styles['main-section-minimized-nav-and-header']}`}>
                {props.children}
            </main>
            <ChatBottom isNavMinimized={isNavMinimized} />
        </div>
    );
}

export default Layout;
