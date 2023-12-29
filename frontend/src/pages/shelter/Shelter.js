import dogpic from "./mdog.jpg";
import "./Shelter.scss";
import { useState } from "react";

export default function Shelter() {
  const [searchQuery, setSearchQuery] = useState("");

  const dogs = [
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

  const filterDogsByLocation = (dog) => {
    return dog.구조지역.includes(searchQuery);
  };

  return (
    <>
      <h3>홈버튼</h3>
      <h1>🐶유기견 공고</h1>

      <div className="shelterHead">
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
              className="shelterDogPic"
              src={dogpic}
              alt="강아지"
              title="주인을 기다리고 있어요"
            />
            <div className="Profile">
              견종: {dog.견종}
              <br /> 성별: {dog.성별}
              <br /> 발견일: {dog.발견일}
              <br /> 구조지역: {dog.구조지역}
              <br />
              설명: {dog.설명}
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
