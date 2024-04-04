import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Loader from "./Loader";
import ProductNotFound from "./ProductNotFound";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
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
  const [isRingSizeDorwpdownOpen, setIsRingSizeDorwpdownOpen] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

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

  useEffect(() => {
    getProductDetails(productNo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductDetails = (productNo) => {
    setSelectedProduct((currentState) => ({ ...currentState, load: true }));

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${serverApi}${selected_shop}/getbyproductno/${productNo}`,
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
    setIsRingSizeDorwpdownOpen(false); // Close dropdown after selection
  };

  const [selectedImage, setSelectedImage] = useState({});

  console.log(selectedProduct);

  return (
    <div>
      {selectedProduct.load ? (
        <Loader />
      ) : Object.keys(selectedProduct.success).length > 0 ? (
        <div className="flex flex-col lg:flex-row w-full">
          <div className="lg:w-3/5 w-full container hidden lg:block">
            <div className="grid grid-cols-2 gap-2 mx-8 my-4">
              {selectedProduct.success.images.map((image, index) => (
                <div className="w-auto h-auto min-h-[300px] min-w-[300px] ">
                  <img
                    src={image}
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
                  src={selectedImage}
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
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover hover:opacity-75"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-2/5 w-full flex-col flex my-20 items-center mx-2">
          <div className="flex-col flex gap-3">
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
              <div>
                <div className="relative inline-block text-left">
                  <div>
                    <div
                      type="button"
                      className="flex cursor-pointer items-center w-[400px] justify-between text-gray-600 font-raleway"
                      onClick={() =>
                        setIsQuantityDropdownOpen(!isQuantityDropdownOpen)
                      }
                    >
                      <h6>Quantity </h6>
                      <h6 className="flex items-center gap-2">
                        {selectedQuantity || "Select"}
                        {isQuantityDropdownOpen ? (
                          <FaAngleUp />
                        ) : (
                          <FaAngleDown />
                        )}
                      </h6>
                    </div>
                  </div>
                  {isQuantityDropdownOpen && (
                    <div className="absolute z-10 w-[100px] ml-[20rem] rounded-lg bg-white shadow-lg border border-gray-200">
                      {[...Array(6).keys()].map((quantity) => (
                        <div
                          key={quantity}
                          className="justify-center py-2 flex items-center cursor-pointer hover:bg-gray-200 rounded-lg"
                          onClick={() => handleQuantitySelection(quantity)}
                        >
                          <span
                            className={`ml-2 text-sm ${
                              selectedQuantity === quantity
                                ? "text-purple-500"
                                : "text-gray-700"
                            }`}
                          >
                            {quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="relative inline-block text-left">
                  <div>
                    <div
                      type="button"
                      className="flex cursor-pointer items-center w-[400px] justify-between text-gray-600 font-raleway"
                      onClick={() =>
                        setIsRingSizeDorwpdownOpen(!isRingSizeDorwpdownOpen)
                      }
                    >
                      <h6>Size </h6>
                      <h6 className="flex items-center gap-2">
                        {selectedSize || "Select"}{" "}
                        {isRingSizeDorwpdownOpen ? (
                          <FaAngleUp />
                        ) : (
                          <FaAngleDown />
                        )}
                      </h6>
                    </div>
                  </div>
                  {isRingSizeDorwpdownOpen && (
                    <div className="absolute w-[100px] z-10 ml-[20rem] rounded-lg bg-white shadow-lg border border-gray-200">
                      {ringSizes.map((size) => (
                        <div
                          key={size}
                          className="px-4 py-2 justify-center flex items-center cursor-pointer hover:bg-gray-200 rounded-lg"
                          onClick={() => handleRingSelection(size.size)}
                        >
                          <span
                            className={`ml-2 text-sm ${
                              selectedSize === size.size
                                ? "text-purple-500"
                                : "text-gray-700"
                            }`}
                          >
                            {size.size}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-col gap-2 flex">
              <div>
                <button className="font-raleway bg-gray-800 text-main-bg py-2 px-4 flex justify-between items-center w-full border-1 border-gray-800 hover:bg-main-blue transition ease-in-out duration-300">
                  <span>${selectedProduct.success.priceUSD}</span>
                  <span>Add to Bag</span>
                </button>
              </div>
              <div>
                <button className="font-quicksand text-gray-800 py-2 px-4 w-full border-1 border-gray-800">
                  <span>Consult Export</span>
                </button>
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
