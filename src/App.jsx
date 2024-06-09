import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "../src/pages/Home";
import Explore from "../src/pages/Explore";
import Detail from "../src/pages/Detail";
import Search from "../src/pages/Search";
import Error from "../src/pages/Error";
import { fetchDataFromApi } from "./utility/Api";
import { useDispatch } from "react-redux";
import { getApiConfigration } from "./store/homeSlices";
import Header from "./Component/Header";

function App() {
  const dispatch = useDispatch();
  //const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchConfigData();
  }, []);

  const fetchConfigData = () => {
    fetchDataFromApi("/configuration").then((result) => {
      const url = {
        Backdrop: result.images.secure_base_url + "original",
        Poster: result.images.secure_base_url + "original",
        Profile: result.images.secure_base_url + "original",
      };
      dispatch(getApiConfigration(url));
    });
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Detail />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
