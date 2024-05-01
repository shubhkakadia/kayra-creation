
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { links } from "../data/Links";
import { FaArrowLeft } from "react-icons/fa";
import rightArrow from "../../assets/right-arrow-icon.png";
import { useDispatch } from "react-redux";
import { setSelectedShop } from "../../state/actions/selected_shop";

export default function NavLink(props) {
  const [heading, setHeading] = useState({});
  const [childOpen, setchildOpen] = useState(false);
  const [parentOpen, setParentOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const dispatch = useDispatch();

  useEffect(() => {
    setParentOpen(props?.openState);
    setchildOpen(false);
    setHeading({});
  }, [props]);

  function noSubmenu() {
    navigate(heading.link);
    // console.log(heading);
    props?.onClose();
    setHeading({});
  }
  function handleNevigation(link) {
    if (isMobile) {
      console.log(link);
      heading !== link ? setHeading(link) : setHeading({});
      heading !== link ? setchildOpen(true) : setchildOpen(false);
      !link.submenu && noSubmenu();
      dispatch(setSelectedShop(link.name));
    } else {
      if (link.name !== "Jewellery") {
        dispatch(setSelectedShop(link.name));
        console.log(link);
        navigate(link.link);
      }
    }
  }
  return (
    <>
      {links?.map((link, key) => (
        <div key={key}>
          <div className="px-3 group ">
            <div
              className="flex justify-between"
              onClick={() => {
                handleNevigation(link);
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
                <div className="absolute top-[8rem] w-full left-0 hidden group-hover:md:block hover:md:block z-10">
                  <div className="bg-main-bg p-3 flex justify-between px-5">
                    {link.sublinks?.map((mysublinks, key) => (
                      <div key={key}>
                        <h1 className="text-[17px] font-semibold leading-6">
                          <Link
                            to={mysublinks.link}
                            className="hover:text-main-blue text-gray-600 no-underline"
                            onClick={() =>
                              dispatch(setSelectedShop(mysublinks.productType))
                            }
                          >
                            {mysublinks.head}
                          </Link>
                        </h1>
                        {mysublinks.sublink.map((slink, key) => (
                          <p key={key} className="text-[15px] my-2.5 md:cursor-pointer">
                            <Link
                              to={slink.link}
                              className="hover:text-main-blue text-gray-600 no-underline"
                              onClick={() =>
                                dispatch(setSelectedShop(slink.name))
                              }
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
        md:hidden bg-white z-50 fixed w-full top-0 overflow-y-auto bottom-0 pl-4
        duration-500 ${childOpen && parentOpen ? "left-0" : "left-[-100%]"}
        `}
            >
              <div>
                <div className="sticky top-0 z-[5] ">
                  <div className="h-[15%] fixed flex w-[85%] bg-white">
                    <button
                      className="md:hidden flex cursor-pointer outline-none text-[20px] mt-10"
                      onClick={() => {
                        setchildOpen(false);
                        setHeading({});
                      }}
                    >
                      <FaArrowLeft />
                    </button>
                    <div className="flex justify-center w-full mt-10">
                      <p className="text-[20px] font-semibold mb-1">
                        {heading.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-24">
                  {heading.sublinks?.map((mysublinks, key) => (
                    <div key={key}>
                      <Link
                        to={mysublinks.link}
                        onClick={() => {
                          props?.onClose();
                          setHeading({});
                          dispatch(setSelectedShop(mysublinks.productType));
                        }}
                        className="py-3 pl-7 font-semibold md:pr-0 pr-5 text-[17px] text-gray-600 no-underline"
                      >
                        {mysublinks.head}
                      </Link>
                      <div>
                        {mysublinks.sublink.map((slink, key) => (
                          <li key={key} className="py-2 pl-14">
                            <Link
                              to={slink.link}
                              className="text-gray-600 no-underline"
                              onClick={() => {
                                props?.onClose();
                                setHeading({});
                                dispatch(setSelectedShop(slink.name));
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
