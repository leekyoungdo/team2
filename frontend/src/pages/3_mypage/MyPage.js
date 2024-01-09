import styles from "./MyPage.module.scss";
import React, { useState, useRef, useEffect } from "react";

export default function MyPage() {

  const [showWriteTable, setShowWriteTable] = useState(true);
    
  return(
        <>
        <div className={styles.mypageContainer}>
            <p className={styles.header}>마이페이지</p>
            <div className={styles.divisionLine}></div>

            <div className={styles.topBox}>
              <div className={styles.infoBox}>
                <div className={styles.picture}>
                  <img src="프로필 사진 URL" alt="프로필 사진" />
                </div>

                <div className={styles.info}>
                  <p className={styles.nickname}>닉네임</p>
                  <p className={styles.introduction}>강아지 이름</p>
                  <p className={styles.introduction}>강아지 소개</p>
                  <button className={styles.editButton}>정보수정</button>
                </div>
              </div>

              <div className={styles.comContainer}>
              <p className={styles.comP}>참여소모임</p>
                  <table class={styles.comlistTable}>
                      <tbody>
                        <tr>
                          <td>
                              <div className={styles.comPicture}>
                                  <img src="모임 URL" alt="모임 사진" />
                              </div>
                          </td>
                          <td>부산 플레이데이트</td>
                        </tr>
                        <tr>
                          <td>
                              <div className={styles.comPicture}>
                                  <img src="모임 URL" alt="모임 사진" />
                              </div>
                          </td>
                          <td>포실포실 대전</td>
                        </tr>
                        <tr>
                          <td>
                              <div className={styles.comPicture}>
                                  <img src="모임 URL" alt="모임 사진" />
                              </div>
                          </td>
                          <td>스파니얼 러버스</td>
                        </tr>
                      </tbody>
                  </table>                
              </div>
            </div>

           

            <br />

            <div className={styles.boardTableContainer}>
              <button className={styles.tableTab} onClick={() => setShowWriteTable(true)}>작성 글</button>
              <button className={styles.tableTab} onClick={() => setShowWriteTable(false)}>작성 댓글</button>

              {showWriteTable ? (
                <table className={styles.boardTable}>
                      <thead>
                        <tr>
                          <th>게시판</th>
                          <th>제목</th>
                          <th>조회수</th>
                          <th>날짜</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>일상</td>
                          <td>행복한 저녁 시간~</td>
                          <td>20</td>
                          <td>2024-01-05</td>
                        </tr>
                        <tr>
                          <td>자유</td>
                          <td>이럴 때는 어쩌죠?</td>
                          <td>2</td>
                          <td>2024-01-05</td>
                        </tr>
                        <tr>
                          <td>일상</td>
                          <td>꼬까옷 입고 폴짝!</td>
                          <td>205</td>
                          <td>2024-01-05</td>
                        </tr>
                      </tbody>
                  </table>
                  ) : (
                  <table className={styles.commentTable}>
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
                )}
            </div>
            

            <br />


            <div className={styles.dmListContainer}>
            <p className={styles.dmP}>쪽지함</p>
                <table class={styles.dmlistTable}>
                    <tbody>
                      <tr>
                        <td>
                            <div className={styles.dmPicture}>
                                <img src="프로필 사진 URL" alt="프로필 사진" />
                            </div>
                        </td>
                        <td>사랑이</td>
                        <td>사료는 어떤 게 좋을 까요???</td>
                        <td>11:09</td>
                      </tr>
                      <tr>
                        <td>
                            <div className={styles.dmPicture}>
                                <img src="프로필 사진 URL" alt="프로필 사진" />
                            </div>
                        </td>
                        <td>초코초코</td>
                        <td>대박 좋아요~~</td>
                        <td>2024-01-05</td>
                      </tr>
                      <tr>
                        <td>
                            <div className={styles.dmPicture}>
                                <img src="프로필 사진 URL" alt="프로필 사진" />
                            </div>
                        </td>
                        <td>불이멍멍</td>
                        <td>감사합니다^^</td>
                        <td>12024-01-05</td>
                      </tr>
                    </tbody>
                </table>                
            </div>

<br />

        </div>



        </> 
    );
  }
  