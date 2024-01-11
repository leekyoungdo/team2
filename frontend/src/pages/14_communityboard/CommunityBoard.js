import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CommunityBoard.module.scss';
import commupic from './commupic.png';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const imageFiles = [
  'c_pic (1).png',
  'c_pic (2).png',
  'c_pic (3).png',
  'c_pic (4).png',
  'c_pic (5).png',
  'c_pic (6).png',
  'c_pic (7).png',
  'c_pic (8).png',
];
export default function CommunityBoard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [hotGroups, setHotGroups] = useState([]);
  const [Group, setGroup] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [groupsPerPage] = useState(4); // 페이지당 표시할 그룹의 개수를 5개로 설정
  const totalPages = Math.ceil(filteredGroups.length / groupsPerPage);
  const [images, setImages] = useState([]);
  const { nickname } = useSelector((state) => state.user);

  useEffect(() => {
    // 이미지 파일을 동적으로 import 합니다.
    Promise.all(imageFiles.map((file) => import(`./c_pic_f/${file}`))).then(
      (images) => setImages(images.map((image) => image.default))
    );
  }, []);

  const navigate = useNavigate();

  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = filteredGroups.slice(
    indexOfFirstGroup,
    indexOfLastGroup
  ); // 현재 페이지에 표시할 그룹들

  const handleClick = () => {
    if (!nickname) {
      // 로그인하지 않은 경우 로그인 페이지로 이동
      alert('소모임을 만들기 전에 로그인을 해주세요!');
      navigate(`/user/signin`);
    } else {
      // 로그인한 경우 '/createcommunity' 경로로 이동
      navigate(`/communityboard/makecommunity`);
    }
  };

  useEffect(() => {
    setFilteredGroups(
      Group.filter((group) => group.community_local.includes(searchQuery))
    );
  }, [searchQuery, Group]);

  // 기존의 코드에서 변경
  const nextPage = () => {
    if (currentPage < totalPages) {
      // 총 페이지 수보다 작을 때만 다음 페이지로 이동
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      // 1페이지보다 클 때만 이전 페이지로 이동
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const sortedGroups = [...Group].sort((a, b) => b.groupNum - a.groupNum);
    setHotGroups(sortedGroups.slice(0, 3));
  }, [Group]);

  const handleSearch = (e) => {
    e.preventDefault();

    const query = e.target.where.value;
    setSearchQuery(query);

    axios
      .get(
        `${process.env.REACT_APP_HOST}/community/getcommunities?region=${query}`
      )
      .then((response) => {
        setFilteredGroups(response.data.data); // API 응답에 따라 적절히 수정해야 합니다.
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST}/community/getcommunities`)
      .then((response) => {
        console.log(response.data.data);
        setGroup(response.data.data); // API 응답에 따라 적절히 수정해야 합니다.
        setHotGroups(response.data.data.slice(0, 3));
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.S_1}>
          <div className={styles.CommunityBoardHead}>
            👨‍👩‍👧‍👦 소모임 리스트
            <form
              name="searchGroups"
              action=""
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
                setSearchQuery(e.target.where.value);
              }}
            >
              <input
                type="text"
                name="where"
                placeholder="지역명을 입력해주세요"
              ></input>
              <button type="submit">검색</button>
            </form>
          </div>
          <div className={styles.Hotbar_1}>
            <h4 className={styles.Hotbar_1_t}>
              인기 모임탭(참여율(인원) 높은 소모임)
            </h4>
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              className={styles.hotzone}
              autoplay={true}
              autoplaySpeed={4000}
            >
              {searchQuery === '' &&
                hotGroups.map((group, index) => {
                  const randomIndex = Math.floor(Math.random() * images.length);
                  return (
                    <Link
                      to={`/communityboard/community/${group.community_id}`}
                      key={index}
                    >
                      <div className={styles.Hotbar_2}>
                        <div className={styles.Hotbar_3}>
                          <img
                            className={styles.CommuPic}
                            src={images[randomIndex]}
                            alt="모임사진"
                            title="모임 프로필"
                          />
                          <div className={styles.Profile}>
                            지역: {group.community_local} <br />
                            모임명: {group.community_name} <br />
                            소개: {group.introduce} <br />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </Slider>
          </div>
        </div>

        <div className={styles.S_2}>
          <div className={styles.c_buttons}>
            <div className={styles.pagination}>
              <button onClick={prevPage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16 모임 ㄹ"
                  fill="currentColor"
                  class="bi bi-chevron-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                  이전
                </svg>
              </button>

              <span>{currentPage}</span>
              <button onClick={nextPage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                  다음
                </svg>
              </button>
            </div>
            <button onClick={handleClick} className={styles.MakeGroup}>
              새 모임 만들기 +
            </button>
          </div>
          {currentGroups.map(
            (
              group,
              index // currentGroups를 사용하여 렌더링
            ) => {
              // 랜덤 인덱스를 생성합니다.
              const randomIndex = Math.floor(Math.random() * images.length);
              return (
                <Link
                  to={`/communityboard/community/${group.community_id}`}
                  key={index}
                >
                  <div className={styles.Groupbar}>
                    <img
                      className={styles.CommuPic}
                      src={images[randomIndex]}
                      alt="모임사진"
                      title="모임 프로필"
                    />
                    <div className={styles.Profile}>
                      지역: {group.community_local} <br />
                      모임명: {group.community_name} <br />
                      소개: {group.introduce} <br />
                      참여인원: {group.groupNum}
                    </div>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}
