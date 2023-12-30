import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommunityBoard.scss";
import commupic from "./commupic.png";

export default function CommunityBoard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [hotGroups, setHotGroups] = useState([]);
  const [Group, setGroup] = useState([]);

  useEffect(() => {
    setFilteredGroups(
      exampleDogGroups.filter((group) => group.region.includes(searchQuery))
    );
  }, [searchQuery]);

  useEffect(() => {
    const sortedGroups = [...Group].sort((a, b) => b.groupNum - a.groupNum);
    setHotGroups(sortedGroups.slice(0, 3));
  }, [Group]);

  const handleSearch = (e) => {
    e.preventDefault();

    const query = e.target.where.value;
    setSearchQuery(query);

    axios
      .get(`your-api-endpoint?region=${query}`)
      .then((response) => {
        setFilteredGroups(response.data); // API 응답에 따라 적절히 수정해야 합니다.
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const exampleDogGroups = [
    {
      region: "부산 해운대구",
      groupName: "부산 플레이데이트",
      groupIntro:
        "푸들 사랑하는 해운대구의 강아지 친구들을 모아요. 우리 같이 놀아봐요!",
      groupNum: 57,
    },
    {
      region: "대전 중구",
      groupName: "포실포실 대전",
      groupIntro: "코기를 사랑하는 대전 중구 주민들, 코기의 매력에 빠져보세요!",
      groupNum: 20,
    },
    {
      region: "서울 강남구",
      groupName: "스파니얼 러버스",
      groupIntro:
        "강남에서 스파니얼을 가진 가족들의 친목을 도모하는 모임입니다.",
      groupNum: 12,
    },
    {
      region: "인천 남동구",
      groupName: "썰매개",
      groupIntro:
        "인천 남동구의 시베리안 허스키를 사랑하는 모임, 같이 산책하고 경험을 공유해요!",
      groupNum: 14,
    },
    {
      region: "광주 북구",
      groupName: "동그란맘",
      groupIntro:
        "광주 북구에서 먹보 강쥐를 키우는 주인들의 친목을 위한 모임입니다.",
      groupNum: 37,
    },
    {
      region: "서울 성동구",
      groupName: "쪼꼬미 서울숲",
      groupIntro: "주말 점심 소형견주 산책 모아라!",
      groupNum: 86,
    },
  ];

  useEffect(() => {
    setGroup(exampleDogGroups);
  }, []);

  return (
    <>
      <h3>홈버튼</h3>
      <h1>👨‍👩‍👧‍👦 소모임 리스트</h1>

      {/* <h4>지역 검색탭</h4> */}
      <div className="CommunityBoardHead">
        <h3>🔍</h3>
        <form
          name="searchGroups"
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

      <h4>인기 모임탭(참여율(인원) 높은 소모임)</h4>
      {/* <h4>소모임 개시글 버튼 : 모임사진, 모임제목, 모임소개 줄줄이 내려옴</h4> */}
      {searchQuery === "" && (
        <div className="Hotzone">
          {hotGroups.map((group, index) => (
            <div className="Hotbar" key={index}>
              <img
                className="CommuPic"
                src={commupic}
                alt="모임사진"
                title="모임 프로필"
              />
              <div className="Profile">
                {" "}
                지역: {group.region} <br />
                모임명: {group.groupName} <br />
                소개: {group.groupIntro} <br />
                참여인원: {group.groupNum}
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredGroups.map((group, index) => (
        <div className="Groupbar" key={index}>
          <img
            className="CommuPic"
            src={commupic}
            alt="모임사진"
            title="모임 프로필"
          />
          <div className="Profile">
            {" "}
            지역: {group.region} <br />
            모임명: {group.groupName} <br />
            소개: {group.groupIntro} <br />
            참여인원: {group.groupNum}
          </div>
        </div>
      ))}

      {/* <h4>소모임 만들기 버튼</h4> */}
      <div className="MakeGroup">+</div>
      <div>
        <h3>네비게이션 바 위치</h3>
      </div>
    </>
  );
}
