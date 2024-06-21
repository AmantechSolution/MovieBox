import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../store/homeSlices";
import Sun from "./Sun";
import Moon from "./Moon";
const DarkMode = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.home.isDarkMode);
  //add dark mode to app
  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);
  return (
    <>
      <span className="Mode-btn" onClick={() => dispatch(toggleDarkMode())}>
        {isDarkMode ? <Moon /> : <Sun />}
      </span>
    </>
  );
};

export default DarkMode;
