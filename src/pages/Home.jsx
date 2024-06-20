import React from "react";
import HomeBanner from "../Component/HomeBanner";
import Trending from "../Component/trending/Trending";
import Popular from "../Component/popular/Popular";
import TopRated from "../Component/toprated/TopRated";
import LocomotiveScroll from "locomotive-scroll";
const Home = () => {
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <>
      <div className="container-fluid" id="hero">
        <HomeBanner />
      </div>
      <Trending />
      <Popular />
      <TopRated />
    </>
  );
};

export default Home;
