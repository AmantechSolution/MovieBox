import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Img from "./Img";
import CircleRating from "./CircleRating";
import Genres from "./Genres";
import PosterFallback from "../assets/images/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? url.Poster + data.poster_path
    : PosterFallback;
  return (
    <div
      className="movieCard"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock">
        <Img className="posterImg" src={posterUrl} />
        {fromSearch && <React.Fragment></React.Fragment>}
      </div>
      <div className="textBlock">
        <CircleRating rating={data?.vote_average?.toFixed(1)} />
        <Genres data={data?.genre_ids?.slice(0, 2)} />
        <span className="title">{data?.title || data?.name}</span>
        <span className="date">
          {dayjs(data?.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
