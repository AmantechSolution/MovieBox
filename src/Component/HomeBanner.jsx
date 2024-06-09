import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hook/usefetch";
import { useSelector } from "react-redux";
import Img from "./Img";
const HomeBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const { data, loading } = useFetch("/movie/popular");
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const searchHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/serch/${query}`);
    }
  };
  useEffect(() => {
    const bg =
      url.Backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const subHandler = (e) => {
    e.preventDefault();
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {!loading && (
              <div className="backdrop_image">
                <Img
                  src={background}
                  alt="this is a background image for hero section"
                />
              </div>
            )}
            <div className="layer" />
            <div className="content">
              <h1 className="title">Welcome ..</h1>
              <h5 className="subTitle">
                Millions of movies , tv Shows and people to discover. Explore
                now
              </h5>
            </div>
            <div className="search pt-3">
              <input
                type="text"
                placeholder="search for a movie and tv shows..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchHandler}
              />
              <button onClick={subHandler} id="btn">
                search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
