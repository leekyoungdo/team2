const axios = require("axios");

async function apiAnimal() {
  const data = [];
  const apiKey =
    "bcZ6t8tNdNCSh2f196VOjqB92lRVIqnHR5RMTNWCCr7Y3cVXxX9vhDgnKUA6Hr6qEk7VkSH6%2BuRhDMQE6yO%2FeQ%3D%3D";
  const apiUrl = `https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20211201&endde=20211231&pageNo=1&numOfRows=100&serviceKey=${apiKey}&_type=json`;

  try {
    const getApi = await axios.get(apiUrl);
    const originData = getApi.data.response.body.items.item;
    const parsedData = originData.map((item) => {
      return {
        kindCd: item.kindCd,
        sexCd: item.sexCd,
        age: item.age,
        happenPlace: item.happenPlace,
        popfile: item.popfile,
        specialMark: item.specialMark,
      };
    });
    data.push(...parsedData);
  } catch (error) {
    throw error;
  }

  return { data };
}

module.exports = apiAnimal;
