import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.svg";
import { useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useGSAP(() => {
    const Ham = document.querySelector(".ham");
    const menu = document.querySelector("ul.main-menu");
    const links = menu.querySelectorAll("li");
    const input = document.querySelector(".input");

    var tl = gsap.timeline({ paused: true });
    tl.to(menu, {
      duration: 1,
      opacity: 1,
      height: "70vh", // change this to 100vh for full-height menu
      ease: "expo.inOut",
    });
    tl.from(
      links,
      {
        duration: 1,
        opacity: 0,
        y: -20,
        stagger: 0.35,
        ease: "power2.inOut",
      },
      "-=0.5"
    ).from(
      input,
      {
        duration: 1,
        opacity: 0,
        y: -20,
        ease: "power2.inOut",
      },
      "-=0.5"
    );

    tl.reverse();

    Ham.addEventListener("click", () => {
      tl.reversed(!tl.reversed());
    });

    links.forEach((e) => {
      e.addEventListener("click", () => {
        tl.reversed(!tl.reversed());
      });
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
  return (
    <>
      <nav>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>

        <div className="ham">
          <span className="menu-toggle" onClick={toggleMenu}>
            {isOpen ? <IoCloseSharp /> : <CiMenuFries />}
          </span>
        </div>
        <div className="menu">
          <ul className="main-menu menu">
            <li>
              <a onClick={() => handleNav("movie")}>Movies</a>
            </li>
            <li>
              <a onClick={() => handleNav("tv")}>tv Show</a>
            </li>
            <div className="input">
              <input type="text" name="" id="" placeholder="Type Here" />
              <button id="btn">Search</button>
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
