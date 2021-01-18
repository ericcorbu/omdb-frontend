import React from "react";
import SearchBar from "./SearchBar";
const Movies = () => {
  const refetchSearch = (newSearch) => {
    // console.log(newSearch);
  };
  return (
    <div>
      <SearchBar onChange={Movies.refetchSearch} />
    </div>
  );
};

export default Movies;
