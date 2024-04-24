import React from "react";
import footerLogo from "../../assets/footer-logo.png";
import {
  FaCopyright,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";

export default function Footer() {
  const navigate = useNavigate();
  const countries = [
    { value: "US", label: "United States" },
    { value: "IN", label: "India" },
    { value: "HK", label: "Hong Kong" },
    { value: "AU", label: "Australia" },
  ];
  const handleChange = (selectedOption) => {
    navigate(selectedOption.value);
    console.log("Selected Country:", selectedOption);
  };
  const CustomOption = ({ innerProps, label, data }) => (
    <div {...innerProps}>
      <ReactCountryFlag
        countryCode={data.value}
        svg
        style={{ marginRight: "8px" }}
      />
      {label}
    </div>
  );
  return (
    <div className="bg-gray-800">
      <div className=" md:flex block justify-between md:px-32">
        <div className="py-4 px-4 md:w-[30%]">
          <div className="flex justify-center">
            <img src={footerLogo} alt="footer-logo" className="py-4" />
          </div>
          <p className="text-gray-500 text-center py-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's
          </p>
          <div className="flex py-2 justify-center">
            <div className="flex">
              <div className="px-4">
                <Link to="/">
                  <FaFacebook size={30} className="text-gray-500" />
                </Link>
              </div>
              <div className="px-4">
                <Link to="/">
                  <FaInstagram size={30} className="text-gray-500" />
                </Link>
              </div>
              <div className="px-4">
                <Link to="/">
                  <FaTwitter size={30} className="text-gray-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="md:block flex text-center justify-center py-3">
          <div className="md:py-20">
            <div className="py-1">
              <Link
                to="/"
                className="hover:text-main-blue no-underline text-gray-500"
              >
                Sitemap
              </Link>
            </div>
            <div className="py-1">
              <Link
                to="/"
                className="hover:text-main-blue no-underline text-gray-500"
              >
                FAQ's
              </Link>
            </div>
            <div className="py-1">
              <Link
                to="/"
                className="hover:text-main-blue no-underline text-gray-500"
              >
                Contact us
              </Link>
            </div>
            <div className="py-1">
              <Link
                to="/"
                className="hover:text-main-blue no-underline text-gray-500"
              >
                Find us
              </Link>
            </div>
            <div className="py-1">
              <Link
                to="/"
                className="hover:text-main-blue no-underline text-gray-500"
              >
                Career
              </Link>
            </div>
            <div className="py-1">
              <Link
                to="/"
                className="hover:text-main-blue no-underline text-gray-500"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
        <div className="md:block flex text-center justify-center py-3">
          <div className="text-gray-500 md:py-20">
            <div className="py-1">
              <Link
                to="/"
                className="hover:text-main-blue no-underline text-gray-500"
              >
                Privacy Policy
              </Link>
            </div>
            <div className="py-1">
              <Link
                to="/"
                className="hover:text-main-blue no-underline text-gray-500"
              >
                Terms & Condition
              </Link>
            </div>
            <div className="py-1">
              <Link
                to="/"
                className="hover:text-main-blue no-underline text-gray-500"
              >
                Expert Advice
              </Link>
            </div>
            <div className="py-1">
              <Link
                to="/"
                className="hover:text-main-blue no-underline text-gray-500"
              >
                Delivery & Returns
              </Link>
            </div>
            <div className="py-1">
              <Link
                to="/"
                className="hover:text-main-blue no-underline text-gray-500"
              >
                Fun Facts
              </Link>
            </div>
          </div>
        </div>
        <div className="md:block flex text-center justify-center py-3">
          <div className="text-gray-500 md:py-20">
            <p>24H LINE</p>
            <h2>852-52482000</h2>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center">
        <Select
          options={countries}
          components={{ Option: CustomOption }}
          placeholder="Region"
          isSearchable
          onChange={handleChange}
          className="cursor-pointer"
        />
      </div> */}
      <div className="flex justify-center py-4 ">
        <FaCopyright size={30} className="text-gray-500" />
        <p className="text-gray-500 px-4">
          Kayra Creation All Rights Reserved 2023
        </p>
      </div>
    </div>
  );
}
