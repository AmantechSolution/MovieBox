import React, { useState } from "react";
import Logo from "../assets/Logo.svg";
import { useNavigate } from "react-router-dom";
import { CiMenuFries, CiSearch } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SearchBox from "./SearchBox";

const Header = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useGSAP(() => {
    const Ham = document.querySelector("#header .Hmenu");
    const menu = document.querySelector("#header .mobilemenu ul.main-menu");
    const links = menu.querySelectorAll("#header li");
    const input = document.querySelector("#header input");
    const inputbtn = document.querySelector("#header .Sbtn");
    const inputbtn1 = document.querySelector("#header .btn");
    var tl = gsap.timeline({ paused: true });
    let tween = gsap.from(".searchInput input", {
      y: "-100%",
      duration: 1,
      ease: "elastic",
      paused: true,
    });
    tl.to(menu, {
      duration: 1,
      opacity: 1,
      height: "40vh", // change this to 100vh for full-height menu
      ease: "expo.inOut",
    }).from(
      links,
      {
        duration: 0.75,
        opacity: 0,
        y: -20,
        stagger: 0.35,
        ease: "power2.inOut",
      },
      "-=0.5"
    );

    tl.reverse();

    Ham?.addEventListener("click", () => {
      tl.reversed(!tl.reversed());
    });

    links?.forEach((e) => {
      e.addEventListener("click", () => {
        tl.reversed(!tl.reversed());
      });
    });

    inputbtn?.addEventListener("click", () => {
      tween.play();
    });
  });
  const navigate = useNavigate();
  const handleNav = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
      setIsOpen(false);
    } else {
      navigate("/explore/tv");
      setIsOpen(false);
    }
  };
  const searchHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setQuery("");
      setIsOpen(false);
      setTimeout(() => {
        tween.reversed();
      }, 1000);
    }
  };

  return (
    <>
      {/* <div className=""> */}
      <nav id="header">
        <div className="logo">
          <img src={Logo} alt="Logo" onClick={() => navigate("/")} />
        </div>
        <div className="mobilemenu d-block d-md-none">
          <ul className={`main-menu `}>
            <li>
              <a onClick={() => handleNav("movie")}>Movies</a>
            </li>
            <li>
              <a onClick={() => handleNav("tv")}>tv Show</a>
            </li>
          </ul>
        </div>
        <div className="menu d-none d-md-block">
          <ul className={`main-menu `}>
            <li>
              <a onClick={() => handleNav("movie")}>Movies</a>
            </li>
            <li>
              <a onClick={() => handleNav("tv")}>tv Show</a>
            </li>
            <li>
              <span className="search btn">
                <CiSearch />
              </span>
            </li>
          </ul>
        </div>

        <div className="hamberger d-flex d-md-none">
          <span className="mx-3 search Sbtn">
            <CiSearch />
          </span>
          <span onClick={toggleMenu} className="Hmenu">
            {isOpen ? <IoCloseSharp /> : <CiMenuFries />}
          </span>
        </div>
      </nav>
      <div className="searchInput">
        <input
          type="text"
          placeholder="search for a movie and tv shows..."
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={searchHandler}
        />
        <span className="close">
          <IoCloseSharp />
        </span>
      </div>
      {/* </div> */}
    </>
  );
};

export default Header;
