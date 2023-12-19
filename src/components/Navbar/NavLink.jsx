import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { links } from "./Links";
import { FaArrowLeft } from "react-icons/fa";
import rightArrow from "../../assets/right-arrow-icon.png";

export default function NavLink(props) {
  const [heading, setHeading] = useState({});
  const [childOpen, setchildOpen] = useState(false);
  const [parentOpen, setParentOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setParentOpen(props.openState);
    setchildOpen(false);
    setHeading({});
  }, [props]);

  function noSubmenu() {
    navigate(heading.link);
    props.onClose();
    setHeading({});
  }
  return (
    <>
      {links.map((link, key) => (
        <div id={key}>
          <div className="px-3 group ">
            <div
              className="flex justify-between"
              onClick={() => {
                heading !== link ? setHeading(link) : setHeading({});
                heading !== link ? setchildOpen(true) : setchildOpen(false);
                !link.submenu && noSubmenu();
              }}
            >
              <h1 className="py-3 md:text-[15px] text-[20px] md:cursor-pointer">
                {link.name.toUpperCase()}
              </h1>
              <button className="md:hidden block cursor-pointer outline-none">
                <img src={rightArrow} alt="Right" className="navbar-icons" />
              </button>
            </div>
            {link.submenu && (
              <div>
                <div className="absolute top-[8rem] w-full left-0 hidden group-hover:md:block hover:md:block">
                  <div className="bg-main-bg p-3 flex justify-between px-5">
                    {link.sublinks?.map((mysublinks, key) => (
                      <div id={key}>
                        <h1 className="text-[17px] leading-6">
                          {mysublinks.Head}
                        </h1>
                        {mysublinks.sublink.map((slink) => (
                          <p className="text-[15px] my-2.5 md:cursor-pointer">
                            <Link
                              to={slink.link}
                              className="hover:text-main-blue text-gray-600 no-underline"
                            >
                              {slink.name}
                            </Link>
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Mobile View */}
          {heading.submenu ? (
            <ul
              className={`
        md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 pl-4
        duration-500 ${childOpen && parentOpen ? "left-0" : "left-[-100%]"}
        `}
            >
              <div>
                <div className="sticky top-0">
                  <div className="h-10 absolute flex top-10 w-[85%] bg-white-main">
                    <button
                      className="md:hidden flex cursor-pointer outline-none text-[20px]"
                      onClick={() => {
                        setchildOpen(false);
                        setHeading({});
                      }}
                    >
                      <FaArrowLeft />
                    </button>
                    <div className="flex justify-center w-full">
                      <p className="text-[20px] font-semibold mb-1">
                        {heading.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-24">
                  {heading.sublinks?.map((slink, key) => (
                    <div id={key}>
                      <h1 className="py-3 pl-7 font-semibold md:pr-0 pr-5 text-[17px]">
                        {slink.Head}
                      </h1>
                      <div>
                        {slink.sublink.map((slink) => (
                          <li className="py-2 pl-14">
                            <Link
                              to={slink.link}
                              className="text-gray-600 no-underline"
                              onClick={() => {
                                props.onClose();
                                setHeading({});
                              }}
                            >
                              {slink.name}
                            </Link>
                          </li>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ul>
          ) : (
            <>
              <Navigate to={heading.link} replace={true} />
              {() => props.onClose()}
            </>
          )}
        </div>
      ))}
    </>
  );
}
