import React from 'react'

import { useState } from "react";
import slider1 from "../assets/home-banner.png";
import slider2 from "../assets/logo.png";
import slider3 from "../assets/home-banner.png";
import slider4 from "../assets/logo.png";
import slider5 from "../assets/home-banner.png";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { RxDotFilled } from "react-icons/rx";
import { GoHeart, GoHeartFill } from "react-icons/go";

import { Link } from "react-router-dom";
import diamondVideo from "../assets/production ID_5106444.mp4";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { bestSeller } from "./data/BestSeller";
import { products } from "./data/Products";
import { diamonds } from "./data/Diamonds";
import { diamondSetting } from "./data/DiamondSettings";
import { testimonials } from "./data/Testimonials";
import { Category } from "./data/Category";
import GallertImage from "../assets/home-gellery-img.png";
import testimonialBG from "../assets/Testimonial_background.webp";

import customiseImage from "../assets/customize-img.png";

import homeLocateUs from "../assets/home-locate-us-bg.png";

import Gia from "../assets/gia-certificate-img.png";
import homepromo from "../assets/home-promo-img.png";

export default function Dashboard() {
  // const autoplayInterval = 5000; // Change slide every 5 seconds
  // const startAutoplay = () => setInterval(() => nextSlide(), autoplayInterval);
  const [selection, setSelection] = useState("Ring");

  const slides = [
    { url: slider1 },
    { url: slider2 },
    { url: slider3 },
    { url: slider4 },
    { url: slider5 },
  ];

  const handleHeartClick = (ID) => {
    const index = bestSeller.findIndex((item) => item.ID === ID);
    setBestSellerArr((prevArr) => {
      const newArr = [...prevArr];
      newArr[index].Like = !newArr[index].Like;
      return newArr;
    });
  };

  const [bestSellerArr, setBestSellerArr] = useState(bestSeller);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 2688,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const TestimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div>
      {/* Home */}
      <div className="max-w-[100vw] h-[550px] flex pt-2 flex-col md:flex-row">
        <div className="block1 relative group">
          <div
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
            className="w-full h-full bg-center bg-cover duration-500"
          >
            {/* Left Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactLeft size={30} onClick={prevSlide} />
            </div>
            {/* Right Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactRight size={30} onClick={nextSlide} />
            </div>
            <div className="absolute flex md:left-[40%] left-[35%] top-[90%]">
              {slides?.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className="text-2xl cursor-pointer"
                >
                  <RxDotFilled />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="block2 flex justify-center items-center">
          <div>
            <h5 className="px-4 md:py-1 my-4 md:text-[25px] text-[15px]">
              Collection 2021
            </h5>
            <h1 className="px-4 md:py-1 my-4 md:text-[50px] text-[35px]">
              Jewellery a way of keeping memories alive
            </h1>
            <p className="px-4 md:py-1 my-4">
              Sign up and get 5% discount and few others like shop our new
              arrivals.
            </p>
          </div>
        </div>
      </div>

      {/* Rings */}
      <div>
        <Slider {...settings} className="md:m-20 m-10">
          {products?.map((item, key) => (
            <div className="rounded-lg">
              <Link to="/" className="no-underline group flex justify-center">
                <div>
                  <img src={item.Image} alt="productimage" />
                  <p className="text-center text-[17px] font-semibold group-hover:text-main-blue no-underline text-gray-700">
                    {item.Name}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      {/* Video */}
      <div>
        <video id="myVideo" autoPlay loop muted width="100%">
          <source src={diamondVideo} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>

      {/* Shop Diamonds by Shape */}
      <div className="my-4">
        <h6 className="text-main-blue text-center">OUR COMPANY</h6>
        <h2 className="text-center">Shop by natural diamonds by shapes</h2>
        <Slider {...settings} className="md:m-20 p-10">
          {diamonds?.map((item, key) => (
            <div className="rounded-lg">
              <Link to="/" className="no-underline group flex justify-center">
                <div>
                  <div className="flex justify-center">
                    <img src={item.Image} alt="productimage" />
                  </div>
                  <p className="text-center py-4 text-[17px] font-semibold group-hover:text-main-blue no-underline text-gray-700">
                    {item.Name}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      {/* Shop Diamonds Setting by shapes */}
      <div className="my-4">
        <h2 className="text-center">Shop by diamond setting by shapes</h2>
        <Slider {...settings} className="md:m-20 m-10">
          {diamondSetting?.map((item, key) => (
            <div className="rounded-lg">
              <Link to="/" className="no-underline group flex justify-center">
                <div>
                  <div className="flex justify-center">
                    <img src={item.Image} alt="productimage" />
                  </div>
                  <p className="text-center py-4 text-[17px] font-semibold group-hover:text-main-blue no-underline text-gray-700">
                    {item.Name}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      {/* Best Seller */}
      <div>
        <div className="md:flex justify-between md:px-32 px-10 py-4">
          <div className="text-center">
            <h2>Best Sellers</h2>
          </div>
          <div className="flex justify-around">
            <p
              className={`md:mx-3 cursor-pointer ${
                selection === "Ring" ? "selection-underline" : ""
              }`}
              onClick={() => setSelection("Ring")}
            >
              RINGS
            </p>
            <p
              className={`md:mx-3 cursor-pointer ${
                selection === "Earring" ? "selection-underline" : ""
              }`}
              onClick={() => setSelection("Earring")}
            >
              EARRINGS
            </p>
            <p
              className={`md:mx-3 cursor-pointer ${
                selection === "Necklace" ? "selection-underline" : ""
              }`}
              onClick={() => setSelection("Necklace")}
            >
              NECKLACES
            </p>
          </div>
        </div>

        <div className="md:mx-32 mx-10 pb-16">
          <Slider {...settings}>
            {bestSellerArr
              .filter((e) => e.Category === selection)
              ?.map((item, key) => (
                <div className="px-2 cursor-pointer">
                  <div className="max-w-sm rounded overflow-hidden border-2">
                    <div
                      className="absolute mx-3 my-3"
                      onClick={() => handleHeartClick(item.ID)}
                    >
                      {item.Like ? <GoHeartFill /> : <GoHeart />}
                    </div>

                    <img
                      className="w-full"
                      src={item.Image}
                      alt="Sunset in the mountains"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-l mb-2">
                        {item.Category}
                      </div>
                      <div className="font-bold text-l mb-2">{item.Title}</div>
                    </div>
                    <div className="px-6 pb-2">
                      <div className="flex justify-between">
                        <p>Net weight: </p>
                        <p>{item.NetWeight}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Dia weight: </p>
                        <p>{item.DiaWeight}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Gold: </p>
                        <p>{item.Gold}</p>
                      </div>
                    </div>
                    <div className="mx-4 mb-4">
                      <CiCirclePlus className="text-[30px]" />
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>

        <div className="md:ml-32 pb-4 md:block flex justify-center ">
          <button class="bg-main-blue hover:opacity-75 text-white font-bold py-2 px-4 rounded-full">
            SHOW MORE
          </button>
        </div>
      </div>

      {/* Shop by Category */}
      <div className="py-10">
        <div className="text-center p-4 ">
          <h2>Shop by Category</h2>
          <p>Brilliant design and unparalleled craftsmanship</p>
        </div>

        <div className="flex gap-4 justify-center md:p-4 p-2 md:flex-wrap flex-wrap">
          {Category.map((category, key) => (
            <Link key={key} to={category.link} className="no-underline group">
              <div className="h-[175px] w-[175px] flex items-center border-2 shadow-sm rounded-2xl">
                <img
                  src={category.Image}
                  alt={category.Name}
                  className="rounded-2xl object-cover group-hover:opacity-75"
                />
              </div>
              <p className="group-hover:text-main-blue text-center text-gray-600">
                {category.Name}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Our Gallery */}
      <div className="max-w-[100vw] h-[550px] flex pt-2 flex-col md:flex-row">
        <div className="block1 flex justify-center p-4">
          <img src={GallertImage} alt="" />
        </div>
        <div className="block2 flex items-center p-4">
          <div>
            <p className="text-main-blue font-semibold">OUR GALLERY</p>
            <h2>Diamond Ring Guide</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <p>
              Morbi hendrerit, mi at luctus feugiat, orci eros finibus nisl, vel
              ultricies odio quam quis diam. Sed vitae ullamcorper sem.
            </p>
          </div>
        </div>
      </div>

      {/* Our Different Collection */}
      <div className="md:px-32 px-10 py-10">
        <div className="text-center pb-4">
          <h2>Our Different Collection</h2>
        </div>
        <Slider {...settings}>
          {bestSellerArr?.map((item, key) => (
            <div className="px-2 cursor-pointer pb-10" id={key}>
              <div className="max-w-sm rounded overflow-hidden border-2">
                <div
                  className="absolute mx-3 my-3"
                  onClick={() => handleHeartClick(item.ID)}
                >
                  {item.Like ? <GoHeartFill /> : <GoHeart />}
                </div>

                <img
                  className="w-full"
                  src={item.Image}
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-l mb-2">{item.Category}</div>
                  <div className="font-bold text-l mb-2">{item.Title}</div>
                </div>

                <div className="mx-4 mb-4">
                  <CiCirclePlus className="text-[30px]" />
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <div className="pt-14 md:block flex justify-center ">
          <button class="bg-main-blue hover:opacity-75 text-white font-bold py-2 px-4 rounded-full">
            SHOW MORE
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <div className="flex m-4 flex-col md:flex-row">
          <div className="flex justify-center items-center block2">
            <div>
              <p className="text-main-blue md:text-left text-center font-semibold">
                Testimonials
              </p>
              <h2>Customer Stories</h2>
            </div>
          </div>
          <div className="flex justify-center block1 gap-1">
            <Slider
              {...TestimonialSettings}
              className="md:w-[600px] w-[350px] m-4"
            >
              {testimonials?.map((test, key) => (
                <div className="relative rounded-3xl p-6 border-2">
                  <img
                    src={testimonialBG}
                    alt="testimonialBG"
                    className="absolute px-10 opacity-50"
                  />
                  <p className="relative">{test.Message}</p>
                  <h5 className="relative">{test.Name}</h5>
                  <h6 className="relative">{test.Location}</h6>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* Customise */}
      <div className="relative">
        <img
          src={customiseImage}
          alt="customiseImage"
          className="h-[400px] object-cover w-full"
        />
        <div className="absolute text-center text-white w-full md:top-16 top-4 p-4">
          <p>CUSTOMIZE</p>
          <h1 className="pb-8">Customize Your Products</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <p>
            Morbi hendrerit, mi at luctus feugiat, orci eros finibus nisl, vel
            ultricies odio quam quis diam. Sed vitae ullamcorper
          </p>
          <div className="py-3">
            <button class="bg-white hover:opacity-75 text-black font-bold py-2 px-4 rounded-full">
              CUSTOMIZE
            </button>
          </div>
        </div>
      </div>

      {/* Locate */}
      <div className="relative m-4">
        <img
          src={homeLocateUs}
          alt="locate"
          className="w-full md:object-none object-cover h-[300px] rounded-2xl"
        />

        <div className="absolute text-center text-black w-full top-16">
          <h2>See our designs in person</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <div className="py-4">
            <button class="bg-white hover:opacity-75 text-black font-bold py-2 px-4 rounded-full">
              LOCATE US
            </button>
          </div>
        </div>
      </div>

      {/* GIA */}
      <div className="flex md:flex-row flex-col gap-5 justify-center p-4">
        <img src={homepromo} alt="home promo" />
        <img src={Gia} alt="Gia" />
      </div>
    </div>
  );
}
