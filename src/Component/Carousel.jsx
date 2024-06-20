import React, { useState } from "react";
import Img from "./Img";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Navigation, Autoplay } from "swiper/modules";
import Genres from "./Genres";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CircleRating from "./CircleRating";
import Posterfalback from "../assets/images/no-poster.png";
const Carousel = ({ data, loading, endpoint, title }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const postTitle = (str) => {
    if (str !== undefined && str.length > 20) {
      return str.substring(0, 18) + "...";
    } else {
      return str;
    }
  };
  const SkItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="row mt-lg-2 pt-lg-2 pt-1 mt-2" id="carousel">
        {title && <div className="carouselTitle">{title}</div>}
        <Swiper
          // install Swiper modules
          modules={[Autoplay, Navigation]}
          spaceBetween={80}
          slidesPerView={1}
          navigation
          loop
          centeredSlidesBounds="true "
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          Navigation={{ clickable: true }}
          //onSlideChange={() => console.log("slide change")}
        >
          {!loading ? (
            data?.map((item, i) => {
              const carouselImg = item.poster_path
                ? url.Poster + item.poster_path
                : Posterfalback;

              return (
                <SwiperSlide
                  key={item.id}
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div className="Card">
                    <div className="img_sec">
                      <Img src={carouselImg} alt="card image" />
                    </div>

                    <div className="content">
                      <div className="rating">
                        <CircleRating rating={item.vote_average.toFixed(1)} />
                      </div>
                      {/* <div className="genres">
                       
                        <span>Action</span>
                        <span>Adventure</span>
                      </div> */}
                      <Genres data={item.genre_ids.slice(0, 2)} />
                      <h4 className="title">
                        {postTitle(item?.title) || postTitle(item.name)}
                      </h4>
                      <span className="date">
                        {dayjs(item.release_Date).format("MMM D YYYY")}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <div className="loadingSkeleton">
              {SkItem()}
              {SkItem()}
              {SkItem()}
              {SkItem()}
              {SkItem()}
              {SkItem()}
            </div>
          )}
        </Swiper>
      </div>
    </>
  );
};

export default Carousel;
