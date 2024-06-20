import React, { useState } from "react";
import TabSwitch from "../TabSwitch";
import Carousel from "../Carousel";
import useFetch from "../../hook/usefetch";

const Popular = () => {
  const tabChange = (tab) => {
    setEndpoint(tab === "movies" ? "movie" : "tv");
  };
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/popular`);

  return (
    <>
      <section className="container-fluid" id="carousel_section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-lg-0 mb-4">
              <h1>What's Popular </h1>
            </div>
            <div className="col-md-6">
              <TabSwitch data={["movies", "tv Show"]} tabChange={tabChange} />
            </div>
          </div>
          <Carousel
            data={data?.results}
            endpoint={endpoint}
            loading={loading}
          />
        </div>
      </section>
    </>
  );
};

export default Popular;
