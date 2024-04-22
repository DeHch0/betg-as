import axios from "axios";

const APIKey = process.env.REACT_APP_UNSPLASH_API_KEY;
const fetchUrl = process.env.REACT_APP_PICTURES_MOCK_API;

export const getAllMockImages = async (page) => {
  let pageParam = ``;

  if (page >= 1) {
    pageParam = `&page=${page}`;
  }
  const resp = await axios.get(
    `${fetchUrl}photos?client_id=${APIKey}${pageParam}`
  );

  if (resp?.status === 200) {
    return resp?.data;
  } else {
    return;
  }
};
