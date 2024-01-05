import styles from "./UserProfile.module.scss";
import React, { useState, useRef, useEffect } from "react";

export default function UserProfile() {

    return(
        <>
        <div className={styles.profileContainer}>
            <h2 className={styles.header}>프로필</h2>

            <div className={styles.picture}>
              <img src="프로필 사진 URL" alt="프로필 사진" />
            </div>

            <div className={styles.info}>
              <p className={styles.nickname}>닉네임</p>
              <p className={styles.introduction}>슈나우져 5세</p>
              <button className={styles.messageButton}>쪽지 보내기</button>
            </div>


            <table class={styles.boardTable}>

              <thead>
                <tr>
                  <th>게시판</th>
                  <th>제목</th>
                  <th>날짜</th>
                  <th>조회수</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>일상</td>
                  <td>행복한 저녁 시간~</td>
                  <td>2024-01-05</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>자유</td>
                  <td>이럴 때는 어쩌죠?</td>
                  <td>2024-01-05</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>일상</td>
                  <td>꼬까옷 입고 폴짝!</td>
                  <td>2024-01-05</td>
                  <td>100</td>
                </tr>
              </tbody>
            </table>
            
            <br />

            <table class={styles.commentTable}>

              <thead>
                <tr>
                  <th>게시판</th>
                  <th>제목</th>
                  <th>댓글</th>
                  <th>날짜</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>일상</td>
                  <td>행복한 저녁 시간~</td>
                  <td>맛있겠다~~</td>
                  <td>2024-01-05</td>
                </tr>
                <tr>
                  <td>자유</td>
                  <td>이럴 때는 어쩌죠?</td>
                  <td>저도 그런 경험이....</td>
                  <td>2024-01-05</td>
                </tr>
                <tr>
                  <td>일상</td>
                  <td>꼬까옷 입고 폴짝!</td>
                  <td>너무 이뻐요~~</td>
                  <td>2024-01-05</td>
                </tr>
              </tbody>
            </table>

        </div>
        </> 
    );
  }
  