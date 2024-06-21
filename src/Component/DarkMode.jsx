import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../store/homeSlices";
const DarkMode = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.home.isDarkMode);
  //add dark mode to app
  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);
  return <></>;
};

export default DarkMode;
