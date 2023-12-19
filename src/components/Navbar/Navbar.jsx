import React, { useEffect, useState } from "react";
import searchIcon from "../../assets/search-icon.png";
import companyLogo from "../../assets/logo.png";
import calanderIcon from "../../assets/calendar-icon.png";
import profileIcon from "../../assets/user-icon.png";
import bagIcon from "../../assets/bag-icon.png";
import contactIcon from "../../assets/contact-icon.png";
import ".././Style.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchToggle } from "../../state/actions/searchToggle";
import NavLink from "./NavLink";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [searchedList, setSearchedList] = useState([]);
  const [open, setOpen] = useState(false);
  const search = useSelector((state) => state.searchToggle.toggle);
  const dispatch = useDispatch();

  const item_list = [
    "ring",
    "necklace",
    "pendant",
    "bracelets",
    "earrings",
    "charms",
  ];

  useEffect(() => {
    dispatch(setSearchToggle(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearchToggle() {
    if (!search) {
      dispatch(setSearchToggle(true));
    } else {
      dispatch(setSearchToggle(false));
      setSearchedList([]);
    }
  }

  function handleSearchInput(e) {
    console.log(e);
    if (e === "") {
      setSearchedList([]);
    } else {
      setSearchedList(
        item_list.filter((item) => item.toLowerCase().includes(e.toLowerCase()))
      );
      console.log(searchedList);
    }
  }

  return (
    <nav>
      <div className="flex justify-between p-1">
        <div className="flex justify-start gap-14 ml-5 mt-[30px]">
          <div className="md:block hidden">
            <img
              src={searchIcon}
              alt="search"
              className="navbar-icons"
              onClick={handleSearchToggle}
            />
          </div>
          <button
            className="md:hidden flex cursor-pointer outline-none text-[20px]"
            onClick={() => setOpen(true)}
          >
            <FaBars />
          </button>
          <div className="md:block hidden">
            <img
              src={contactIcon}
              alt="search"
              className="navbar-icons"
              // onClick={handleSearchToggle}
            />
          </div>
          <div></div>
        </div>
        <div>
          <Link to="/">
            <img
              src={companyLogo}
              alt="kayra creation"
              className="navbar-logo cursor-pointer h-[75px] mb-[10px]"
            />
          </Link>
          {open ? (
            <button
              className="md:hidden flex nav-btn nav-close-btn p-1 cursor-pointer outline-none text-[20px] items-center absolute top-9 right-4 z-20"
              onClick={() => setOpen(false)}
            >
              <FaTimes />
            </button>
          ) : (
            <></>
          )}
        </div>

        <div>
          <div className="flex justify-end gap-5 mt-[30px] mr-5">
            <img
              src={calanderIcon}
              alt="calendar"
              className="md:block hidden navbar-icons"
            />
            <img src={profileIcon} alt="profile" className="navbar-icons" />
            <img src={bagIcon} alt="bag" className="navbar-icons" />
          </div>
        </div>
      </div>
      {search ? (
        <div className="search-box active">
          <div className="relative w-[450px] z-10 h-[40px]">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Search Kayra Creation"
              onChange={(e) => {
                handleSearchInput(e.target.value);
              }}
            />
            <img
              src={searchIcon}
              alt="close"
              className="absolute top-[2px] right-[5px] h-[20px] mt-2 mr-1 opacity-50"
            />
            {searchedList.map((item, i) => (
              <div id={i} className="search-item">
                {item}
              </div>
            ))}
          </div>
          <div onClick={handleSearchToggle} className="close-popup"></div>
        </div>
      ) : (
        <div className="search-box"></div>
      )}
      <div className="md:flex hidden justify-center">
        <NavLink />
      </div>
      {/* Mobile View */}
      <ul
        className={`
        md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
      >
        <li>
          <NavLink openState={open} onClose={() => setOpen(false)} />
        </li>
      </ul>
      <div>
        <div>
          <input
            className="appearance-none border rounded w-[90%] ml-5 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline md:hidden block indent-5"
            placeholder="Search Kayra Creation"
            onChange={(e) => {
              handleSearchInput(e.target.value);
            }}
          />
          <img
            src={searchIcon}
            alt="close"
            className="h-[20px] top-[100px] left-7 absolute opacity-40 md:hidden block"
          />
        </div>
        <div
          className={`${
            searchedList.length > 0
              ? "h-[80vh] block overflow-y-auto"
              : "h-full hidden"
          } py-4`}
        >
          {searchedList.map((item, i) => (
            <div id={i} className="px-4 py-2 text-[17px]">
              {item}
            </div>
          ))}
          <div className="mt-5 px-4">
            <p className="font-semibold">Need Help?</p>
            <p>
              Contact{" "}
              <Link to="/" className="text-gray-500">
                Client Care
              </Link>
            </p>
            <p>Call 852-52482000</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
