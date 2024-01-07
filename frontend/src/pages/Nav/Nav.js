import styles from './_Nav.module.scss';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
// import { useSelector } from 'react-redux';

export default function Nav() {
  // const isLoggedIn = useSelector(state => state.nicknameReducer !== '');

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.navContainer}>
          <ul>
            <div className={styles.logo}>
              <a href="/">멍멍투게더</a>
            </div>
            <li>
              <a className={styles.home} href="/">
                홈
              </a>
            </li>
            <li>
              <a href="/board">게시판</a>
            </li>
            <li>
              <a href="/communityboard">소모임</a>
            </li>
            <li>
              <a href="/shelterboard">유기견 공고</a>
            </li>
            {/* 
              {isLoggedIn ? (
                <li className={styles.signin}>
                  <a href="/user/logout">로그아웃</a>
                </li>
              ) : (
                <li className={styles.signin}>
                  <a href="/user/signin">로그인</a>
                </li>
              )} */}
          </ul>
        </div>
        <div className={styles.navShadow} />
      </div>
    </>
  );
}
