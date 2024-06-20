import React, { useState } from "react";
import TabSwitch from "../TabSwitch";
import Carousel from "../Carousel";
import useFetch from "../../hook/usefetch";

const Trending = () => {
  const tabChange = (tab) => {
    setEndpoint(tab === "day" ? "day" : "week");
  };
  const [endpoint, setEndpoint] = useState("day");
  const { data, loading } = useFetch(`/trending/all/${endpoint}`);
  return (
    <>
      <section className="container-fluid py-lg-5 pt-1" id="carousel_section">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-lg-0 mb-4">
              <h1>Trending</h1>
            </div>
            <div className="col-md-9">
              <TabSwitch data={["day", "week"]} tabChange={tabChange} />
            </div>
          </div>
          <Carousel data={data?.results} loading={loading} />
        </div>
      </section>
    </>
  );
};

export default Trending;
