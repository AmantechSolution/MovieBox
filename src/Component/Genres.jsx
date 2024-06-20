import React from "react";
import { useSelector } from "react-redux";
const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <>
      <div className="genres">
        {data?.map((g) => {
          if (!genres[g]?.name) return;
          return <span key={g}>{genres[g]?.name}</span>;
        })}
      </div>
    </>
  );
};

export default Genres;
