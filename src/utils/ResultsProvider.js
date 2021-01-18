import apiConfig from "./apikey.json";
const DEFAULT_TYPE = "movie";

const getSearchResults = async (searchTerm, page) => {
  const queryString =
    apiConfig.url +
    "?apikey=" +
    apiConfig.key +
    "&s=" +
    searchTerm +
    "&page=" +
    page +
    "&type=" +
    DEFAULT_TYPE;
  const response = await fetch(queryString, { mode: "cors" });
  const data = await response.json();
  return data;
};

const getMovieById = async (id) => {
  const queryString =
    apiConfig.url + "?apikey=" + apiConfig.key + "&i=" + id + "&plot=full";
  const response = await fetch(queryString, { mode: "cors" });
  const data = await response.json();
  return data;
};
export { getSearchResults, getMovieById };
