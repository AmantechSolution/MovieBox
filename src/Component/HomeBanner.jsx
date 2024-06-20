import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hook/usefetch";
import { useSelector } from "react-redux";
import Img from "./Img";
import SearchBox from "./SearchBox";
import LocomotiveScroll from "locomotive-scroll";
const HomeBanner = () => {
  const locomotiveScroll = new LocomotiveScroll();
  const Img_url = "https://image.tmdb.org/t/p/original";
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const { data, loading } = useFetch("/movie/upcoming");
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  useEffect(() => {
    const bg =
      (url?.Backdrop || Img_url) +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

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
                  data-scroll
                  data-scroll-speed="0.19"
                />
              </div>
            )}
            <div className="layer" />
            <div className="content">
              <h1 className="title" data-scroll data-scroll-speed="0.02">
                Welcome ..
              </h1>
              <h5 className="subTitle">
                Millions of movies , tv Shows and people to discover. Explore
                now
              </h5>
            </div>
            <div className="search pt-3">
              {/* <input
                type="text"
                placeholder="search for a movie and tv shows..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchHandler}
              />
              <button onClick={subHandler} id="btn">
                search
              </button> */}
              <SearchBox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
