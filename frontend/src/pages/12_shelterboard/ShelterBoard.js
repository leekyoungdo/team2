import dogpic from "./mdog.jpg";
import "./ShelterBoard.scss";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ShelterBoard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dogs, setDogs] = useState([]);

  const exampleDogs = [
    {
      견종: "골든 리트리버",
      성별: "수컷",
      발견일: "2023-12-25",
      구조지역: "서울특별시 강남구",
      설명: "친절한 골든 리트리버입니다.",
    },
    {
      견종: "시베리안 허스키",
      성별: "암컷",
      발견일: "2023-12-26",
      구조지역: "부산광역시 해운대구",
      설명: "활발한 시베리안 허스키입니다.",
    },
    {
      견종: "비글",
      성별: "암컷",
      발견일: "2023-12-27",
      구조지역: "대구광역시 서구",
      설명: "사람을 잘 따르는 비글입니다.",
    },
  ];

  useEffect(() => {
    setDogs(exampleDogs);
  }, []);

  useEffect(() => {
    axios
      .get("/dog/getapi") // 요청할 API의 주소를 입력해주세요.
      .then((res) => {
        setDogs(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const filterDogsByLocation = (dog) => {
    return dog.구조지역.includes(searchQuery);
  };

  return (
    <>
      <h3>홈버튼</h3>
      <h1>🐶유기견 공고</h1>

      <div className="ShelterBoardHead">
        <h3>🔍</h3>
        <form
          name="searchDogs"
          action=""
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            // 검색 버튼을 클릭하거나 엔터키를 눌렀을 때 검색 쿼리를 업데이트하고 결과를 필터링합니다.
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

      <div className="showDogs">
        {dogs.filter(filterDogsByLocation).map((dog, index) => (
          <div className="Dog" key={index}>
            <img
              className="ShelterBoardDogPic"
              src={dogpic}
              alt="강아지"
              title="주인을 기다리고 있어요"
            />
            <div className="Profile">
              견종: {dog.dog.kindCd}
              <br /> 성별: {dog.sexCd}
              <br /> 나이: {dog.age}
              <br /> 구조지역: {dog.happenPlace}
              <br />
              설명: {dog.specialMark}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3>네비게이션 바 위치</h3>
      </div>
    </>
  );
}
