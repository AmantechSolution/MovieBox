import React from "react";
import usefetch from "../hook/usefetch";
import { useParams } from "react-router-dom";
import DetailBanner from "../Component/detail/DetailBanner";
import Cast from "../Component/detail/Cast";
import VideoSection from "../Component/detail/VideoSection";
import Similar from "../Component/detail/Similar";
import Recom from "../Component/detail/Recom";

const Detail = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = usefetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = usefetch(
    `/${mediaType}/${id}/credits`
  );
  return (
    <>
      <DetailBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideoSection data={data} loading={loading} />
      <div className="container-fluid" id="Detailcar">
        <div className="container">
          <Similar mediaType={mediaType} id={id} />
          <Recom mediaType={mediaType} id={id} />
        </div>
      </div>
    </>
  );
};

export default Detail;
