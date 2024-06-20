import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../utility/Api";
import Spinner from "../Component/Spinner";
import { useParams } from "react-router-dom";
import MovieCard from "../Component/MovieCard";
const Search = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(null);
  const { query } = useParams();

  const fetchIntialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };
  useEffect(() => {
    fetchIntialData();
  }, [query]);

  return (
    <>
      <div className="searchResultsPage">
        {loading && <Spinner initial={true} />}
        {!loading && (
          <div className="container-fluid">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  {data?.results.length > 0 ? (
                    <>
                      <div className="pageTitle">
                        {`Search ${
                          data?.total_results > 1 ? "results" : "result"
                        } of '${query}'`}
                      </div>
                      <InfiniteScroll
                        className="content"
                        dataLength={data?.results?.length || []}
                        next={fetchNextPageData}
                        hasMore={pageNum <= data?.total_pages}
                        loader={<Spinner />}
                      >
                        {data?.results.map((item, i) => {
                          if (item.media_type === "person") return;
                          return (
                            <MovieCard key={i} data={item} fromSearch={true} />
                          );
                        })}
                      </InfiniteScroll>
                    </>
                  ) : (
                    <span className="resultNotFound">
                      Sorry , Result Not Found
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
