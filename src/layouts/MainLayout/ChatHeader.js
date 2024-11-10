import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import styles from './ChatHeader.module.css';
// import { IoHomeOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

import { NavLink } from 'react-router-dom'
import LoginDetailsContext from "../../context/LoginDetails/LoginDetailsContext";
function ChatHeader({ isHeaderMinimized, isNavMinimized }) {
  const [t] = useTranslation('common')
  const { loginDetails } = useContext(LoginDetailsContext)
  const { company, page } = loginDetails
  const { themeType, iconUrl, iconLabel, iconDesc } = company
  const { pageSelected, prevPage } = page
  return (
    <header className={`${styles['chat-details']} ${isHeaderMinimized && styles['chat-details--minimized']} ${styles[`chat-details-theme--${themeType}`]}`}>
      <div className={`${styles['chat-details--main']} ${isHeaderMinimized && styles['chat-details--main--minimized']}`}>
        {isHeaderMinimized && isNavMinimized &&
          <NavLink to={`/${prevPage}`} className={styles['navitem']}>
            <button className={styles['home-btn']}>
              <IoIosArrowForward className={styles['home-icon']} />
            </button>
          </NavLink>}
        {(!isHeaderMinimized || !isNavMinimized) &&
          <div className={`${styles['chat-details-icons']} ${isHeaderMinimized && styles['chat-details-icons--minimized']}`}>
            {pageSelected==='home'&& <div className={styles['icon-image-container']}>
              <img src={iconUrl} className={`${styles['chat-details-icon']} ${styles['chat-details-icon--first']}`} alt={`${iconLabel} First Icon`} />
            </div>}
          </div>}
        {!isHeaderMinimized && <h1 className={styles['chat-details-header']}>{iconLabel}</h1>}
      </div>

      {/* {isHeaderMinimized && <p className={styles['chat-page-selected']}><GrRadialSelected style={{fontSize:'2rem'}}/> {t(pageSelected)}</p>} */}
      {isHeaderMinimized && <p className={styles['chat-page-selected']}>{t(pageSelected)}</p>}
      {isHeaderMinimized && !isNavMinimized && <div style={{ width: '5.5rem' }}></div>}
      {isHeaderMinimized && isNavMinimized && <div style={{ 'width': '5.5rem' }} />}
      {!isHeaderMinimized && <p className={`${styles['chat-details-desc']} ${isHeaderMinimized && styles['chat-details-desc--minimized']}`}>{iconDesc}</p>}
    </header>
  );
}

export default ChatHeader;
