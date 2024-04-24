import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import Loader from "./Loader";
import { ringCategoryLinks } from "./data/ringShopHighlights";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import defaultImage from "../assets/upload-Image.png";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import axios from "axios";
import Loader from "./Loader";
import { setSelectedProduct } from "../state/actions/selected_product";

export default function Shop() {
  const serverApi = process.env.REACT_APP_API_URL;
  const selected_shop = useSelector((state) => state.selectedShop.selected);
  const [allproducts, setAllproducts] = useState({
    load: false,
    success: [],
    error: [],
  });
  const [sortByIsOpen, setSortByIsOpen] = useState(false);
  const [sortBySelectedOption, setSortBySelectedOption] =
    useState("Recommendations");

  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedMetal, setSelectedMetal] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMetalColorOpen, setIsMetalColorOpen] = useState(false);
  const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(false);
  const [priceOptions, setPriceOptions] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceRange, setPriceRange] = useState([]);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);
  // Assume these states track the selected options
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const options = [
    "Recommendations",
    "Newly added",
    "Price Low to High",
    "Price High to Low",
  ];

  function generatePriceOptions(allproducts) {
    const maxPrice = Math.max(
      ...allproducts.map((product) => product.priceUSD)
    );
    const roundedMaxPrice = Math.ceil(maxPrice / 100) * 100;
    const numberOfRanges = 4;
    const rangeStep = Math.ceil(roundedMaxPrice / numberOfRanges / 100) * 100;

    let priceOptions = [];
    for (let i = 0; i < numberOfRanges; i++) {
      const start = rangeStep * i;
      const end =
        i === numberOfRanges - 1 ? roundedMaxPrice : start + rangeStep - 1;
      // priceOptions.push(`USD ${start} - USD ${end}`);
      priceOptions.push({ start: start, end: end });
    }

    return priceOptions;
  }

  const categoryOptions = useMemo(() => {
    const categories = new Set();
    allproducts?.success?.forEach((product) =>
      categories.add(product.category)
    );
    return Array.from(categories);
  }, [allproducts]);

  const uniqueMetalColors = useMemo(() => {
    const colors = new Set();
    allproducts?.success?.forEach((product) => colors.add(product.metalColor));
    return Array.from(colors);
  }, [allproducts]);

  console.log(selected_shop);

  useEffect(() => {
    getallproducts(selected_shop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getallproducts = (product) => {
    setAllproducts({ ...allproducts, load: true });
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${serverApi}${product}/getall`,
      headers: {},
    };

    console.log(config.url);

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setAllproducts({ ...allproducts, success: response.data, load: false });
        // dispatch(success(response.data));
      })
      .catch((err) => {
        console.log(err);
        setAllproducts({ ...allproducts, error: err, load: false });
        // dispatch(error(err.response.data));
      });
  };

  const [isLiked, setIsLiked] = useState(false);
  const handleLike = (index) => {
    setIsLiked(!isLiked);
  };

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

  // Sorting by newly added (most recent first)
  const sortByNewlyAdded = (products) => {
    return [...products].sort(
      (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
    );
  };

  // Sorting by price (low to high)
  const sortByPriceLowToHigh = (products) => {
    return [...products].sort((a, b) => a.priceUSD - b.priceUSD);
  };

  // Sorting by price (high to low)
  const sortByPriceHighToLow = (products) => {
    return [...products].sort((a, b) => b.priceUSD - a.priceUSD);
  };

  const handleCategoryChange = (selected) => {
    if (selectedCategory.includes(selected)) {
      // If the category is already selected, remove it from the array
      setSelectedCategory(selectedCategory.filter((item) => item !== selected));
    } else {
      // If the category is not selected, add it to the array
      setSelectedCategory([...selectedCategory, selected]);
    }
  };

  const handlePriceChange = (selected) => {
    let newPriceRange;
    const index = priceRange.findIndex(
      (item) => item.start === selected.start && item.end === selected.end
    );

    if (index !== -1) {
      // If the price range is already selected, remove it from the array
      newPriceRange = priceRange.filter((_, i) => i !== index);
    } else {
      // If the price range is not selected, add it to the array
      newPriceRange = [...priceRange, selected];
    }

    // Update the priceRange state
    setPriceRange(newPriceRange);

    // Now, update minPrice and maxPrice based on the newPriceRange
    if (newPriceRange.length > 0) {
      // Sort the ranges to ensure the first index has the lowest start value and the last index has the highest end value
      newPriceRange.sort((a, b) => a.start - b.start);

      const min = newPriceRange[0].start; // Min price of the first index
      const max = newPriceRange[newPriceRange.length - 1].end; // Max price of the last index

      setMinPrice(min.toString()); // Assuming you want to keep the state as a string
      setMaxPrice(max.toString());
    } else {
      // Reset minPrice and maxPrice if no price range is selected
      setMinPrice("");
      setMaxPrice("");
    }

    console.log("Updated priceRange", newPriceRange);
  };

  const handleMetalChange = (selected) => {
    if (selectedMetal.includes(selected)) {
      // If the category is already selected, remove it from the array
      setSelectedMetal(selectedMetal.filter((item) => item !== selected));
    } else {
      // If the category is not selected, add it to the array
      setSelectedMetal([...selectedMetal, selected]);
    }
  };

  const useProductFilters = (
    allproducts,
    sortBySelectedOption,
    selectedCategory,
    selectedMetal,
    priceRange,
    minPrice,
    maxPrice
  ) => {
    const handleSortSelection = (products) => {
      let sortedProducts;

      switch (sortBySelectedOption) {
        case "Newly added":
          sortedProducts = sortByNewlyAdded(products);
          break;
        case "Price Low to High":
          sortedProducts = sortByPriceLowToHigh(products);
          break;
        case "Price High to Low":
          sortedProducts = sortByPriceHighToLow(products);
          break;
        default:
          // Recommendations or default case, keep the array as is
          sortedProducts = products;
      }

      return sortedProducts;
      // Update the state with the sorted products
      // setProducts(sortedProducts);
    };

    const handleCategoryFilter = (product) => {
      if (selectedCategory.length > 0) {
        return product.filter((product) =>
          selectedCategory.includes(product.category)
        );
      }
      return product;
    };

    const handleMetalFilter = (product) => {
      if (selectedMetal.length > 0) {
        return product.filter((product) =>
          selectedMetal.includes(product.metalColor)
        );
      }
      return product;
    };

    const handlePriceFilter = (product, minPrice, maxPrice) => {
      if (priceRange?.length > 0) {
        return product.filter((product) => {
          // const price = ;
          const min = minPrice ? parseFloat(minPrice) : 0;
          const max = maxPrice ? parseFloat(maxPrice) : Number.MAX_SAFE_INTEGER;
          return product.priceUSD >= min && product.priceUSD <= max;
        });
      }
      return product;
    };

    const filteredData = useMemo(() => {
      let results = allproducts.success || [];

      results = handleSortSelection(results);
      results = handleMetalFilter(results);
      results = handleCategoryFilter(results);
      setPriceOptions(generatePriceOptions(results));
      results = handlePriceFilter(results, minPrice, maxPrice);

      console.log("maxPrice", maxPrice);
      console.log("minPrice", minPrice);

      return results;

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      allproducts,
      sortBySelectedOption,
      selectedCategory,
      selectedMetal,
      priceRange,
      minPrice,
      maxPrice,
    ]);

    return filteredData;
  };

  const products = useProductFilters(
    allproducts,
    sortBySelectedOption,
    selectedCategory,
    selectedMetal,
    priceRange,
    minPrice,
    maxPrice
  );

  const swiperRef = useRef(null);

  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0); // Go to the first slide
      swiperRef.current.autoplay.start(); // Start autoplay from the beginning
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop(); // Stop autoplay when the mouse leaves
    }
  };
  
  // Function to check if click is outside the dropdown
  // const handleClickOutside = (event) => {
  //   if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //     setIsMetalColorOpen(false);
  //     setIsCategoryOpen(false);
  //     setSortByIsOpen(false);
  //   }
  // };
  // const handleScroll = () => {
  //   setIsMetalColorOpen(false);
  //   setIsCategoryOpen(false);
  //   setSortByIsOpen(false);
  // };

  // useEffect(() => {
  //   // Add event listener when component mounts
  //   document.addEventListener("mousedown", handleClickOutside);
  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   // Remove event listener on cleanup
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  console.log(products);

  return (
    <div>
      <h1 className="font-quicksand text-center text-[30px]">
        {selected_shop}
      </h1>
      {/* category links */}
      <div className="m-4">
        <div className="flex overflow-x-auto gap-4 md:justify-center hide-scrollbar">
          {ringCategoryLinks.map((link, key) => (
            <div onClick={() => navigate(link.link)} className="min-w-[150px]">
              <div class="rounded overflow-hidden shadow-md cursor-pointer">
                <img
                  className="md:w-[150px] md:h-[120px] object-cover"
                  src={link.image}
                  alt={link.name}
                />
              </div>
              <div class="py-2">
                <div class="text-center text-[15px]">{link.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Sort */}
      <div className="md:block hidden">
        <div className="flex justify-between mx-16">
          <div className="flex w-2/6 justify-around">
            <h6 className="text-slate-500">Filter</h6>
            <div>
              <div
                className="flex cursor-pointer items-center w-[100px] justify-around"
                onClick={() => setIsMetalColorOpen(!isMetalColorOpen)}
              >
                <h6>Metal</h6>
                <h6>{isMetalColorOpen ? <FaAngleUp /> : <FaAngleDown />}</h6>
              </div>
              {isMetalColorOpen && (
                <div className="absolute z-10 mt-2 rounded-lg bg-white shadow-lg border border-gray-200">
                  {uniqueMetalColors.map((option) => (
                    <label
                      key={option}
                      className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-50 rounded-lg"
                      onClick={() => handleMetalChange(option)}
                    >
                      {/* <input
                      type="checkbox"
                      value={option}
                      checked={category.includes(option)}
                      onChange={() => handleCategoryChange(option)}
                      className="h-5 w-5 cursor-pointer"
                    /> */}
                      <span
                        className={`ml-2 text-sm ${
                          selectedMetal.includes(option)
                            ? "text-purple-500"
                            : "text-gray-700"
                        } `}
                      >
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div
                className="flex cursor-pointer items-center w-[100px] justify-around"
                onClick={() => setIsPriceRangeOpen(!isPriceRangeOpen)}
              >
                <h6>Price</h6>
                <h6>{isPriceRangeOpen ? <FaAngleUp /> : <FaAngleDown />}</h6>
              </div>
              {isPriceRangeOpen && (
                <div className="flex absolute z-10 mt-2 rounded-lg bg-white shadow-lg border border-gray-400 w-[750px] h-[200px] justify-around p-4">
                  <div>
                    {priceOptions.map((option) => (
                      <label
                        key={option}
                        className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-50 rounded-lg"
                        onClick={() => handlePriceChange(option)}
                      >
                        {/* <input
                      type="checkbox"
                      value={option}
                      checked={category.includes(option)}
                      onChange={() => handleCategoryChange(option)}
                      className="h-5 w-5 cursor-pointer"
                    /> */}
                        <span
                          className={`ml-2 text-sm ${
                            priceRange.some(
                              (item) =>
                                JSON.stringify(item) === JSON.stringify(option)
                            )
                              ? "text-purple-500"
                              : "text-gray-700"
                          } `}
                        >
                          {`USD ${option.start} - USD ${option.end}`}
                        </span>
                      </label>
                    ))}
                  </div>
                  <div class="p-6 flex flex-col items-center">
                    <div class="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Min Price $USD"
                        onChange={(e) => setMinPrice(e.target.value)}
                        class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 transition duration-150"
                      />
                      <span>to</span>
                      <input
                        type="text"
                        placeholder="Max Price"
                        onChange={(e) => setMaxPrice(e.target.value)}
                        class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 transition duration-150"
                      />
                    </div>
                    {/* <button class="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-150">
                    Apply
                  </button> */}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div
                className="flex cursor-pointer items-center w-[100px] justify-around"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <h6>Category</h6>
                <h6>{isCategoryOpen ? <FaAngleUp /> : <FaAngleDown />}</h6>
              </div>

              {isCategoryOpen && (
                <div className="absolute z-10 mt-2 rounded-lg bg-white shadow-lg border border-gray-200">
                  {categoryOptions.map((option) => (
                    <label
                      key={option}
                      className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-50 rounded-lg"
                      onClick={() => handleCategoryChange(option)}
                    >
                      {/* <input
                      type="checkbox"
                      value={option}
                      checked={category.includes(option)}
                      onChange={() => handleCategoryChange(option)}
                      className="h-5 w-5 cursor-pointer"
                    /> */}
                      <span
                        className={`ml-2 text-sm ${
                          selectedCategory.includes(option)
                            ? "text-purple-500"
                            : "text-gray-700"
                        } `}
                      >
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex">
            <h6 className="text-slate-500">Sort by:</h6>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setSortByIsOpen(!sortByIsOpen)}
            >
              <div className="flex items-center w-[175px] justify-around">
                <h6>{sortBySelectedOption}</h6>
                <h6>{sortByIsOpen ? <FaAngleUp /> : <FaAngleDown />}</h6>
              </div>
            </div>
            {sortByIsOpen && (
              <div className="flex absolute z-10 flex-col mt-7 rounded-md ml-12 bg-white shadow-lg border">
                {options.map((option) => (
                  <div
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSortBySelectedOption(option);
                      // handleSortSelection(option);
                      setSortByIsOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 mx-24 mt-4 flex-wrap">
          {selectedMetal.map((item, key) => (
            <div key={key}>
              <button
                onClick={() => {
                  // Update the state to filter out this item
                  setSelectedMetal(
                    selectedMetal.filter((_, index) => index !== key)
                  );
                }}
                className=" bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-600 mr-2 mb-2 shadow-sm flex items-center gap-1 group hover:text-purple-500"
              >
                <RxCross2 size={20} /> {item}
              </button>
            </div>
          ))}
          {selectedCategory.map((item, key) => (
            <div key={key}>
              <button
                onClick={() => {
                  // Update the state to filter out this item
                  setSelectedCategory(
                    selectedCategory.filter((_, index) => index !== key)
                  );
                }}
                className="bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-600 mr-2 mb-2 shadow-sm flex items-center gap-1 group hover:text-purple-500"
              >
                <RxCross2 size={20} /> {item}
              </button>
            </div>
          ))}
          {priceRange.map((item, key) => (
            <div>
              <button
                onClick={() => {
                  // Update the state to filter out this item
                  setPriceRange(priceRange.filter((_, index) => index !== key));
                }}
                className="bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-600 mr-2 mb-2 shadow-sm flex items-center gap-1 group hover:text-purple-500"
              >
                <RxCross2 size={20} />
                {`USD ${item.start} - USD ${item.end}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Mobile View Buttons */}
        <div className="flex justify-around md:hidden">
          <button
            className="p-2 border rounded"
            onClick={() => setIsFilterPopupOpen(true)}
          >
            Filter by
          </button>
          <button
            className="p-2 border rounded"
            onClick={() => setIsSortPopupOpen(true)}
          >
            Sort by
          </button>
        </div>

        {/* Filter Popup */}
        <div ref={wrapperRef}>
          {isFilterPopupOpen && (
            <div className="fixed inset-0 bg-white p-4 z-50 overflow-y-auto h-full">
              <button onClick={() => setIsFilterPopupOpen(false)}>Close</button>
              <div>
                {/* Metal Options */}
                <div>
                  <button
                    onClick={() => setIsMetalColorOpen(!isMetalColorOpen)}
                  >
                    Metal
                  </button>
                  {isMetalColorOpen && (
                    <div>
                      {uniqueMetalColors.map((option) => (
                        <label key={option} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedMetal.includes(option)}
                            onChange={() => handleMetalChange(option)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Options */}
                <div>
                  <button
                    onClick={() => setIsPriceRangeOpen(!isPriceRangeOpen)}
                  >
                    Price
                  </button>
                  {isPriceRangeOpen && (
                    <div>
                      {priceOptions.map((option) => (
                        <label key={option} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={priceRange.some(
                              (item) =>
                                JSON.stringify(item) === JSON.stringify(option)
                            )}
                            onChange={() => handlePriceChange(option)}
                          />
                          <span>{`USD ${option.start} - USD ${option.end}`}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Category Options */}
                <div>
                  <button onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                    Category
                  </button>
                  {isCategoryOpen && (
                    <div>
                      {categoryOptions.map((option) => (
                        <label key={option} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedCategory.includes(option)}
                            onChange={() => handleCategoryChange(option)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sort Popup */}
        {isSortPopupOpen && (
          <div className="fixed inset-0 bg-white p-4 z-50">
            <button onClick={() => setIsSortPopupOpen(false)}>Close</button>
            {/* Replace the following div with your actual sort options */}
            <div>
              {/* Example Sort Options */}
              <button onClick={() => setSelectedSort("Option A")}>
                Option A
              </button>
              <button onClick={() => setSelectedSort("Option B")}>
                Option B
              </button>
            </div>
          </div>
        )}

        {/* Display Selected Options */}
        <div className="mt-4">
          {selectedFilter && <div>Selected Filter: {selectedFilter}</div>}
          {selectedSort && <div>Selected Sort: {selectedSort}</div>}
        </div>
      </div>

      {/* items */}
      <div>
        <div className="relative">
          <div className="flex flex-wrap justify-center gap-2 md:m-4">
            {products ? (
              products?.map((product, index) => (
                <div
                  key={index}
                  className="md:w-[350px] md:h-[350px] w-[175px] h-[175px] cursor-pointer duration-200 md:hover:scale-105 group pb-[275px]"
                >
                  {/* Web View */}
                  <div className="md:block hidden">
                    <div className="group-hover:hidden">
                      <img
                        src={product?.images[0].data}
                        alt={defaultImage}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="hidden z-20  group-hover:block border-1 border-cyan-900 p-2 bg-main-bg">
                      <Swiper
                        modules={[
                          Navigation,
                          Pagination,
                          Scrollbar,
                          A11y,
                          Autoplay,
                        ]}
                        navigation
                        spaceBetween={50}
                        sliderPerView={1}
                        // onSlideChange={() => console.log("slide Change")}
                        // onSwiper={(swiper) => console.log(swiper)}
                        pagination={{ clickable: true }}
                        autoplay={{
                          delay: 3000, // Set delay for 3 seconds
                          disableOnInteraction: false, // Continue autoplay after user interaction
                        }}
                      >
                        <div className="absolute top-0 right-0 p-3 z-10">
                          <button onClick={() => handleLike(index)}>
                            {isLiked ? (
                              <AiFillHeart
                                size={23}
                                className="text-main-blue"
                              />
                            ) : (
                              <AiOutlineHeart
                                size={23}
                                className="text-main-blue"
                              />
                            )}
                          </button>
                        </div>
                        {product?.images?.map((image, key) => (
                          <div key={key}>
                            {image.fileType.includes("image") ? (
                              <SwiperSlide>
                                <img
                                  src={product.images[key].data || defaultImage}
                                  alt={key.toString()}
                                  className="w-full h-full object-cover"
                                  onClick={() => {
                                    // dispatch(setSelectedProduct(product));
                                    navigate(
                                      `/jewellery/${selected_shop.toLowerCase()}/${
                                        product.productNo
                                      }`
                                    );
                                  }}
                                />
                              </SwiperSlide>
                            ) : (
                              <SwiperSlide>
                                <img src={defaultImage} alt="" />
                              </SwiperSlide>
                            )}
                          </div>
                        ))}
                      </Swiper>

                      <div className=" group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-center pt-2">{product.name}</p>
                        <button className="bg-gray-800 text-white py-2 px-4 flex justify-between items-center w-full mt-2  hover:bg-main-blue transition ease-in-out duration-300">
                          <span>${product.priceUSD}</span>
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden block">
                    <Swiper
                      modules={[Navigation, Pagination, Scrollbar, A11y]}
                      spaceBetween={50}
                      sliderPerView={1}
                      // onSlideChange={() => console.log("slide Change")}
                      // onSwiper={(swiper) => console.log(swiper)}
                      pagination={{ clickable: true }}
                      autoplay={{
                        delay: 3000, // Set delay for 3 seconds
                        disableOnInteraction: false, // Continue autoplay after user interaction
                      }}
                    >
                      <div className="absolute top-0 right-0 p-3 z-10">
                        <button onClick={() => handleLike(index)}>
                          {isLiked ? (
                            <AiFillHeart size={23} className="text-main-blue" />
                          ) : (
                            <AiOutlineHeart
                              size={23}
                              className="text-main-blue"
                            />
                          )}
                        </button>
                      </div>
                      {product?.images?.map((image, key) => (
                        <div key={key}>
                          {image.fileType.includes("image") ? (
                            <SwiperSlide>
                              <img
                                src={product.images[key].data || defaultImage}
                                alt={key.toString()}
                                className="w-full h-full object-cover"
                              />
                            </SwiperSlide>
                          ) : image.fileType.includes("video") ? (
                            <></>
                          ) : (
                            <SwiperSlide>
                              <img src={defaultImage} alt="" />
                            </SwiperSlide>
                          )}
                        </div>
                      ))}
                    </Swiper>

                    <div className="py-2">
                      <p className="px-2 text-slate-700">
                        {product?.name?.length > 100
                          ? `${product?.name?.substring(0, 40)} ...`
                          : product?.name}
                      </p>
                      <p className="px-2 text-slate-500 -mt-1">
                        US$ {product?.priceUSD}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
      {/* <Loader /> */}
    </div>
  );
}
