import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Loader from "./Loader";
import ProductNotFound from "./ProductNotFound";
import {
  FaAngleDown,
  FaAngleUp,
  FaWhatsapp,
  FaWeixin,
  FaEnvelope,
} from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function Product() {
  const serverApi = process.env.REACT_APP_API_URL;
  const selected_shop = useSelector((state) => state.selectedShop.selected);
  const { productNo } = useParams();
  const [selectedProduct, setSelectedProduct] = useState({
    load: false,
    success: {},
    error: {},
  });

  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [isQuantityDropdownOpen, setIsQuantityDropdownOpen] = useState(false);

  const [selectedSize, setSelectedSize] = useState("");
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [consultOption, setConsultOption] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const [selectedImage, setSelectedImage] = useState({});

  const ringSizes = [
    { size: "3", diameter: 14.05, circumference: 44.14 },
    { size: "3 1/2", diameter: 14.45, circumference: 45.4 },
    { size: "4", diameter: 14.88, circumference: 46.8 },
    { size: "4 1/2", diameter: 15.27, circumference: 48.0 },
    { size: "5", diameter: 15.7, circumference: 49.3 },
    { size: "5 1/2", diameter: 16.1, circumference: 50.6 },
    { size: "6", diameter: 16.51, circumference: 51.9 },
    { size: "6 1/2", diameter: 16.92, circumference: 53.1 },
    { size: "7", diameter: 17.32, circumference: 54.4 },
    { size: "7 1/2", diameter: 17.73, circumference: 55.7 },
    { size: "8", diameter: 18.14, circumference: 57.0 },
    { size: "8 1/2", diameter: 18.54, circumference: 58.3 },
    { size: "9", diameter: 18.95, circumference: 59.5 },
    { size: "9 1/2", diameter: 19.35, circumference: 60.8 },
    { size: "10", diameter: 19.76, circumference: 62.1 },
    { size: "10 1/2", diameter: 20.17, circumference: 63.4 },
    { size: "11", diameter: 20.57, circumference: 64.6 },
    { size: "11 1/2", diameter: 20.98, circumference: 65.9 },
    { size: "12", diameter: 21.39, circumference: 67.2 },
    { size: "12 1/2", diameter: 21.79, circumference: 68.5 },
    { size: "13", diameter: 22.2, circumference: 69.7 },
    { size: "13 1/2", diameter: 22.61, circumference: 71.0 },
  ];

  const necklaceLengths = [
    { inch: 16, cm: 40.64 },
    { inch: 17, cm: 43.18 },
    { inch: 18, cm: 45.72 },
    { inch: 19, cm: 48.26 },
    { inch: 20, cm: 50.8 },
    { inch: 21, cm: 53.34 },
    { inch: 22, cm: 55.88 },
    { inch: 23, cm: 58.42 },
    { inch: 24, cm: 60.96 },
  ];

  const braceletSizes = [
    { inch: 5.5, mm: 139.7 },
    { inch: 6.0, mm: 152.4 },
    { inch: 6.5, mm: 165.1 },
    { inch: 7.0, mm: 177.8 },
    { inch: 7.5, mm: 190.5 },
    { inch: 8.0, mm: 203.2 },
    { inch: 8.5, mm: 215.9 },
    { inch: 9.0, mm: 228.6 },
    { inch: 9.5, mm: 241.3 },
  ];

  useEffect(() => {
    getProductDetails(productNo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductDetails = (productNo) => {
    setSelectedProduct((currentState) => ({ ...currentState, load: true }));

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${serverApi}rings/getbyproductno/${productNo}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setSelectedProduct({
          error: {},
          success: response.data,
          load: false,
        });
        setSelectedImage(response.data.images[0]);
      })
      .catch((error) => {
        console.log(error);
        setSelectedProduct({ success: {}, error: error, load: false });
      });
  };

  const handleQuantitySelection = (quantity) => {
    setSelectedQuantity(quantity); // Assuming onSelectQuantity updates the state in the parent component
    setIsQuantityDropdownOpen(false); // Close dropdown after selection
  };

  const handleRingSelection = (quantity) => {
    setSelectedSize(quantity); // Assuming onSelectQuantity updates the state in the parent component
    setIsSizeDropdownOpen(false); // Close dropdown after selection
  };

  console.log(selectedProduct);

  const getSizeData = (category) => {
    switch (category.toLowerCase()) {
      case "ring":
        return ringSizes;
      case "bracelet":
      case "bangle":
        return braceletSizes;
      case "necklace":
      case "pendant":
        return necklaceLengths;
      default:
        return [];
    }
  };

  return (
    <div>
      {selectedProduct.load ? (
        <Loader />
      ) : Object.keys(selectedProduct.success).length > 0 ? (
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-3/5 w-full container hidden lg:block">
            <div className="grid grid-cols-2 gap-2 mx-8 my-4">
              {selectedProduct.success.images.map((image, index) => (
                <div className="w-auto h-auto min-h-[300px] min-w-[300px] ">
                  <img
                    src={image.data}
                    alt="media"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:hidden">
            <div className="flex flex-col items-center">
              {/* Main selected image */}
              <div className="w-1/2 h-auto mb-4">
                <img
                  src={selectedImage.data}
                  alt="Selected"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center gap-2">
                {selectedProduct.success.images.map((image, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 border-2 border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => setSelectedImage(image)}
                      className="w-full h-full"
                    >
                      <img
                        src={image.data}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover hover:opacity-75"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-2/5 w-full flex-col flex my-20 items-center">
            <div className="flex-col flex gap-2 w-4/5">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-quicksand text-[22px] font-bold text-gray-600">
                    {selectedProduct.success.name}
                  </span>
                  <div className="mx-2">
                    <button onClick={() => handleLike()}>
                      {isLiked ? (
                        <AiFillHeart size={22} className="text-main-blue" />
                      ) : (
                        <AiOutlineHeart size={22} className="text-main-blue" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <span className="font-raleway text-[17px] font-semibold text-gray-600">
                    Description and Details
                  </span>
                  <p className="font-raleway text-[13px] text-gray-400">
                    {selectedProduct.success.descriptionDetails}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {/* Quantity Dropdown */}
                <div className="relative inline-block text-left">
                  <div className="flex items-center justify-between">
                    <h6 className="text-gray-600 font-raleway">Quantity</h6>
                    <button
                      type="button"
                      className="flex items-center gap-2 text-gray-600 font-raleway focus:outline-none"
                      onClick={() =>
                        setIsQuantityDropdownOpen(!isQuantityDropdownOpen)
                      }
                    >
                      {selectedQuantity || "Select"}
                      {isQuantityDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </button>
                  </div>
                  {isQuantityDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-full rounded-lg bg-white shadow-lg border border-gray-200">
                      <div className="grid grid-cols-3 gap-2 p-2">
                        {[...Array(6).keys()].map((quantity) => (
                          <button
                            key={quantity}
                            className={`rounded-lg py-2 text-sm text-center cursor-pointer ${
                              selectedQuantity === quantity
                                ? "bg-purple-400 text-white"
                                : "text-gray-700 hover:bg-gray-200"
                            }`}
                            onClick={() => handleQuantitySelection(quantity)}
                          >
                            {quantity}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Size Dropdown */}
                <div className="relative inline-block text-left">
                  <div className="flex items-center justify-between">
                    <h6 className="text-gray-600 font-raleway">Size</h6>
                    <button
                      type="button"
                      className="flex items-center gap-2 text-gray-600 font-raleway focus:outline-none"
                      onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
                    >
                      {selectedSize || "Select"}
                      {isSizeDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </button>
                  </div>
                  {isSizeDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-full rounded-lg bg-white shadow-lg border border-gray-200">
                      <div className="grid grid-cols-3 gap-2 p-2">
                        {getSizeData(selectedProduct.success.category).map(
                          (size) => (
                            <button
                              key={size.size || size.inch}
                              className={`rounded-lg py-2 text-sm text-center cursor-pointer ${
                                selectedSize === (size.size || size.inch)
                                  ? "bg-purple-500 text-white"
                                  : "text-gray-700 hover:bg-gray-200"
                              }`}
                              onClick={() =>
                                handleRingSelection(size.size || size.inch)
                              }
                            >
                              {size.size || size.inch}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-col gap-2 flex ">
                <div>
                  <button className="font-raleway bg-gray-800 text-main-bg py-2 px-4 flex justify-between items-center w-full border-1 border-gray-800 hover:bg-main-blue transition ease-in-out duration-300">
                    <span>${selectedProduct.success.priceUSD}</span>
                    <span>Add to Bag</span>
                  </button>
                </div>
                <div className="relative inline-block text-left w-full">
                  <button
                    className="font-quicksand text-gray-800 w-full py-2 px-4 border-1 border-gray-800 focus:outline-none"
                    onClick={() => setConsultOption(!consultOption)}
                  >
                    <span>Consult Export</span>
                  </button>

                  {consultOption && (
                    <div className="absolute mt-2 w-full rounded-lg bg-white shadow-lg border border-gray-200 z-[1]">
                      <div className="lg:flex lg:justify-between p-2">
                        <a
                          href={`https://wa.me/+85252482000?text=${encodeURIComponent(
                            `Hi, I am interested in the below product:
          Name: ${selectedProduct.success.name}
          Product Number: ${selectedProduct.success.productNo}
          Price: ${selectedProduct.success.priceUSD} USD
          ${selectedSize ? `Size: ${selectedSize}` : ""}
          ${selectedQuantity ? `Quantity: ${selectedQuantity}` : ""}
          Image: ${selectedProduct.success.images[0].data}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-100 no-underline"
                        >
                          <FaWhatsapp className="mr-2 text-green-500" />
                          <span>WhatsApp</span>
                        </a>
                        <a
                          href={`weixin://dl/chat?text=${encodeURIComponent(
                            `Hi, I am interested in the below product:
          Name: ${selectedProduct.success.name}
          Product Number: ${selectedProduct.success.productNo}
          Price: ${selectedProduct.success.priceUSD} USD
          ${selectedSize ? `Size: ${selectedSize}` : ""}
          ${selectedQuantity ? `Quantity: ${selectedQuantity}` : ""}
          Image: ${selectedProduct.success.images[0].data}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-100 no-underline"
                        >
                          <FaWeixin className="mr-2 text-green-500" />
                          <span>WeChat</span>
                        </a>
                        <a
                          href={`mailto:sales.usa@gmail.com?subject=Product%20Inquiry&body=${encodeURIComponent(
                            `Hi, I am interested in the below product:
          Name: ${selectedProduct.success.name}
          Product Number: ${selectedProduct.success.productNo}
          Price: ${selectedProduct.success.priceUSD} USD
          ${selectedSize ? `Size: ${selectedSize}` : ""}
          ${selectedQuantity ? `Quantity: ${selectedQuantity}` : ""}
          Image: ${selectedProduct.success.images[0].data}
          Please provide me with more information. Thank you.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-100 no-underline"
                        >
                          <FaEnvelope className="mr-2 text-blue-500" />
                          <span>Email</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ProductNotFound />
      )}
    </div>
  );
}
