import React, { useState, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";

const NavBar = () => {
  const [show, setShow] = useState("top");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };
  const openMobileMenu = () => {
    setMobileMenu(!mobileMenu);
    setShowSearch(false);
  };
  const handleNav = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
      setMobileMenu(false);
      setShowSearch(false);
    } else {
      navigate("/explore/tv");
      setMobileMenu(false);
      setShowSearch(false);
    }
  };
  const searchHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setQuery("");
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  return (
    <>
      <header
        className={`container-fluid header ${
          mobileMenu ? "mobileView" : "slideOut"
        } ${show}`}
      >
        <nav className="container">
          <div className="logo">
            <img src={Logo} alt="Logo" onClick={() => navigate("/")} />
          </div>
          <div className="menu">
            <ul className="menuItems">
              <li className="menuItem">
                <a onClick={() => handleNav("movie")}>Movies</a>
              </li>
              <li className="menuItem">
                <a onClick={() => handleNav("tv")}>Tv Show</a>
              </li>
              <li className="menuItem">
                <HiOutlineSearch onClick={openSearch} />
              </li>
            </ul>
            <div className="mobileMenuItems">
              <HiOutlineSearch onClick={openSearch} />
              <span onClick={openMobileMenu} className="ham">
                {mobileMenu ? <VscChromeClose /> : <SlMenu />}
              </span>
            </div>
          </div>
        </nav>
        {showSearch && (
          <div className="searchBar">
            <div className="searchInput">
              <input
                type="text"
                value={query}
                placeholder="Search any movie and tv show.."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default NavBar;
