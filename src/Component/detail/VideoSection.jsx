import React, { useState } from "react";
import { PlayButton } from "./PlayButton";
import VideoPopup from "./VideoPopup";
import Img from "../Img";

const VideoSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="skItem">
            <div className="thumb skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row2 skeleton"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid" id="videos">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="videosSection">
              <div className="sectionHeading">Official Videos</div>
              {!loading ? (
                <div className="videos">
                  {data?.results?.map((video) => (
                    <div
                      className="videoItem"
                      key={video.id}
                      onClick={() => {
                        setVideoId(video.key);
                        setShow(true);
                      }}
                    >
                      <div className="videoThumbnail">
                        <Img
                          src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                        />
                        <PlayButton />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="videoSkeleton">
                  {loadingSkeleton()}
                  {loadingSkeleton()}
                  {loadingSkeleton()}
                  {loadingSkeleton()}
                </div>
              )}

              <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
