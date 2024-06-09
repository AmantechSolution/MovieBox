import axios from "axios";
const Base_url = "https://api.themoviedb.org/3";
const Img_url = "https://image.tmdb.org/t/p/original";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
  Authorization: "Bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(Base_url + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    return error;
  }
};
