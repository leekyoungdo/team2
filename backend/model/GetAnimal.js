const axios = require("axios");

async function getAnimal(url) {
  try {
    const res = await axios.getAdapter(url);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const apikey =
  "bcZ6t8tNdNCSh2f196VOjqB92lRVIqnHR5RMTNWCCr7Y3cVXxX9vhDgnKUA6Hr6qEk7VkSH6%2BuRhDMQE6yO%2FeQ%3D%3D";
const apiurl = `https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20211201&endde=20211231&pageNo=1&numOfRows=50&serviceKey=${apikey}&_type=json`;

getAnimal(apiurl)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });

function parseAnimalData(data) {
  const animalData = data.res.body.items.item;
  const parsedData = animalData.map((item) => {
    return {
      kindCd: item.kindCd,
      happenPlace: item.happenPlace,
    };
  });
  return parsedData;
}

const data = parseAnimalData(apiurl);

module.exports = data;
