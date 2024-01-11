import dogpic from './mdog.jpg';
import styles from './ShelterBoard.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ShelterBoard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dogs, setDogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
  const [loading, setLoading] = useState(false);

  const filteredDogs = dogs.filter(
    (dog) => dog.happenPlace && dog.happenPlace.includes(searchQuery)
  ); // 검색된 개 리스트
  const totalPages = Math.ceil(filteredDogs.length / dogsPerPage); // 검색된 개에 대한 총 페이지 수

  // 검색 쿼리가 변경될 때마다 페이지를 1로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const getApi = () => {
    setLoading(true); // API 호출 시작 시 로딩 상태를 true로 설정
    axios
      .get(`${process.env.REACT_APP_HOST}/dog/getapi`) // 요청할 API의 주소를 입력해주세요.
      .then((res) => {
        console.log(res.data);
        setDogs(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false); // API 호출이 끝나면 로딩 상태를 false로 설정
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  // 계속 불러오지 않고 한번만 자료 받아서 반영해야함.

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

  const filterDogsByLocation = (dog) => {
    if (!dog.happenPlace) {
      return false;
    }
    return dog.happenPlace.includes(searchQuery);
  };

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.shelterHead}>
          🐶 유기견 공고
          <div className={styles.Serch}>
            <form
              name="searchDogs"
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
                placeholder="지역명을 입력해주세요."
              ></input>
              <button type="submit">검색</button>
            </form>
          </div>
          <div className={styles.pagination}>
            <button onClick={prevPage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
        </div>

        <div className={styles.showDogs}>
          {loading ? (
            <div>로딩 중...</div>
          ) : (
            <>
              {currentDogs.filter(filterDogsByLocation).map((dog, index) => (
                <div className={styles.Dog} key={index}>
                  <img
                    className={styles.ShelterBoardDogPic}
                    src={dog.popfile || dogpic}
                    alt="강아지"
                    title="주인을 기다리고 있어요"
                  />
                  <div className={styles.Profile}>
                    견종: {dog.kindCd}
                    <br /> 성별: {dog.sexCd}
                    <br /> 나이: {dog.age}
                    <br /> 구조지역: {dog.happenPlace}
                    <br />
                    설명: {dog.specialMark}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
