import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "../src/pages/Home";
import Explore from "../src/pages/Explore";
import Detail from "../src/pages/Detail";
import Search from "../src/pages/Search";
import PageNotFound from "../src/pages/PageNotFound";
import { fetchDataFromApi } from "./utility/Api";
import { useDispatch } from "react-redux";
import { getApiConfigration, getGenres } from "./store/homeSlices";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import NavBar from "./Component/NavBar";
import LocomotiveScroll from "locomotive-scroll";
import DarkMode from "./Component/DarkMode";
function App() {
  const dispatch = useDispatch();
  const locomotiveScroll = new LocomotiveScroll();
  useEffect(() => {
    fetchConfigData();
    getGenresData();
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

  const getGenresData = async () => {
    let promises = [];
    let endpoint = ["movie", "tv"];
    let allGenres = {};
    endpoint.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Detail />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <DarkMode />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
