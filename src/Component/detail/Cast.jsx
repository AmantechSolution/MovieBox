import React from "react";
import { useSelector } from "react-redux";
import Img from "../Img";
import avatar from "../../assets/images/avatar.png";
import LocomotiveScroll from "locomotive-scroll";
const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);
  const locomotiveScroll = new LocomotiveScroll();
  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="container-fluid" id="cast_section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="castSection">
              <div className="sectionHeading">Top Cast</div>
              {!loading ? (
                <div className="listItems">
                  {data?.map((item) => {
                    let imgurl = item.profile_path
                      ? url.Profile + item.profile_path
                      : avatar;
                    return (
                      <div key={item.id} className="listItem">
                        <div className="profileImg">
                          <Img src={imgurl} />
                        </div>
                        <div className="name">{item.name}</div>
                        <div className="character">{item.character}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="castSkeleton">
                  {skeleton()}
                  {skeleton()}
                  {skeleton()}
                  {skeleton()}
                  {skeleton()}
                  {skeleton()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cast;
