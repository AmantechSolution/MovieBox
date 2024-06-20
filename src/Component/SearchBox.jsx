import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const searchHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  const subHandler = (e) => {
    e.preventDefault();
    if (query?.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="search for a movie and tv shows..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={searchHandler}
      />
      <button onClick={subHandler} id="btn">
        search
      </button>
    </>
  );
};

export default SearchBox;
