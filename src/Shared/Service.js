import axios from "axios";

const formatResult = (res) => {
  let result = [];
  let finalresult = [];
  res.forEach((item) => {
    const listingId = item.carListing?.id;
    if (!result[listingId]) {
      result[listingId] = {
        car: item.carListing,
        images: [],
      };
    }
    if (item.carImages) {
      result[listingId].images.push(item.carImages);
    }
  });
  result.forEach((item) => {
    finalresult.push({
      ...item.car,
      images: item.images,
    });
  });

  return finalresult;
};

const SendBirdAppId = import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdAppApi = import.meta.env.VITE_SENDBIRD_API_Key;
// console.log(SendBirdAppApi);
// console.log(SendBirdAppId);

const createSendBirdUser = async (userId, nickname, profileUrl) => {
  try {
    return await axios.post(
      "https://api-" + SendBirdAppId + ".sendbird.com/v3/users",
      {
        user_id: userId,
        nickname: nickname,
        profile_url: profileUrl,
        issue_access_token: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Api-Token": SendBirdAppApi,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const createSendBirdChannel = async (users, title) => {
  return axios.post(
    `https://api-${SendBirdAppId}.sendbird.com/v3/group_channels`,
    {
      user_ids: users,
      is_distinct: true,
      name: title,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": SendBirdAppApi,
      },
    }
  );
};

export default {
  formatResult,
  createSendBirdUser,
  createSendBirdChannel
};
