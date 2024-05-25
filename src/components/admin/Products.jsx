import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultImage from "../../assets/upload-Image.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Loader from "../Loader";
import axios from "axios";

import validator from "validator";

const AdminProductsPage = () => {
  const serverApi = process.env.REACT_APP_API_URL;
  const [selectProduct, setSelectProduct] = useState(null);

  const [selectProductNoEdits, setSelectProductNoEdits] = useState(null);
  const [metalColorToggle, setMetalColorToggle] = useState(false);
  const [clarityToggle, setClarityToggle] = useState(false);
  const [goldPurityToggle, setGoldPurityToggle] = useState(false);
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(false);
  const [productNoIsTaken, setProductNoIsTaken] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("recommendations");
  const [ActiveToggle, setActiveToggle] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minCarat, setMinCarat] = useState("");
  const [maxCarat, setMaxCarat] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedMetalColors, setSelectedMetalColors] = useState([]);
  const [selectedClarity, setSelectedClarity] = useState([]);
  const [selectedGoldPurity, setSelectedGoldPurity] = useState([]);

  const generatePreSignedURL = async (fileName, contentType) => {
    try {
      const data = JSON.stringify({
        filename: fileName,
        contentType: contentType,
      });
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}rings/uploadurl`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      return response.data.url;
    } catch (error) {
      console.error("Error generating pre-signed URL:", error);
      throw error; // Or handle the error in a different way
    }
  };

  const categoryList = [
    "Necklace",
    "Pendant",
    "Bracelet",
    "Earring",
    "Ring",
    "Bangle",
    "Men's Jewellery",
  ];

  // const clarityRangeList = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"];
  // const colorRangeList = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  const [allproducts, setAllproducts] = useState({
    load: false,
    success: [],
    error: [],
  });

  
  const [validationErrors, setValidationErrors] = useState({});

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const initialState = {
    productNo: "",
    name: "",
    caratWt: "",
    colorRange: "",
    clarityRange: "",
    metalColor: "",
    netWeight: "",
    goldPurity: "",
    priceUSD: "",
    collection: "",
    dateAdded: new Date().toISOString().slice(0, 16), // Default to current date
    descriptionDetails: "",
    active: true,
    category: "",
    designNo: "",
    jobNo: "",
    subCategory: "",
    images: [],
  };

  const [newProduct, setNewProduct] = useState(initialState);

  useEffect(() => {
    getallproducts(selectedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const getallproducts = (category) => {
    setAllproducts({ ...allproducts, load: true });
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}rings/getall/${category}`,
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

  const update_Product = (product, productObj) => {
    const toastId = toast.loading("Updating product...");
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${serverApi}${product}/update/${productObj.productNo}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: productObj,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);

        if (response.status === 200) {
          toast.update(toastId, {
            render: `Product updated successfully! Message: ${response.data.message}`,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          getallproducts("ring");
        } else if (response.status === 500 || response.status === 404) {
          toast.update(toastId, {
            render: `Error updating product. Message: ${response.data.error}`,
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const add_product = (product, productObj) => {
    const toastId = toast.loading("Updating product...");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${serverApi}rings/add`,
      headers: {
        "Content-Type": "application/json",
      },
      data: productObj,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);

        if (response.status === 201) {
          toast.update(toastId, {
            render: `Product updated successfully! Message: ${response.data.message}`,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setAddNew(false);
          getallproducts("ring");
        } else {
          toast.update(toastId, {
            render: `Error updating product. Message: ${response.data.error}`,
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleMetalColor = (color) => {
    setSelectedMetalColors((prevSelectedColors) => {
      if (prevSelectedColors.includes(color)) {
        return prevSelectedColors.filter((c) => c !== color);
      } else {
        return [...prevSelectedColors, color];
      }
    });
  };

  const toggleClarity = (clarity) => {
    setSelectedClarity((prevSelectedClarity) => {
      if (prevSelectedClarity.includes(clarity)) {
        return prevSelectedClarity.filter((c) => c !== clarity);
      } else {
        return [...prevSelectedClarity, clarity];
      }
    });
  };

  const toggleGoldPurity = (goldPurity) => {
    setSelectedGoldPurity((prevSelectedGoldPurity) => {
      if (prevSelectedGoldPurity.includes(goldPurity)) {
        return prevSelectedGoldPurity.filter((c) => c !== goldPurity);
      } else {
        return [...prevSelectedGoldPurity, goldPurity];
      }
    });
  };

  const useProductFilters = (
    allProducts,
    searchQuery,
    sortOption,
    selectedMetalColors,
    selectedClarity,
    selectedGoldPurity,
    minPrice,
    maxPrice,
    minCarat,
    maxCarat,
    ActiveToggle,
    selectedCategory
  ) => {
    // Function to filter by search term
    const filterBySearchTerm = (products) => {
      if (!searchQuery) return products;
      return products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    };

    // Function to sort by price
    const sortByActiveStatus = (products) => {
      if (ActiveToggle === "Active") {
        return products.filter((product) => product.active === true);
      } else if (ActiveToggle === "Inactive") {
        return products.filter((product) => product.active === false);
      }
      return products;
    };

    // Function to sort by price
    const sortByCategory = (products) => {
      if (selectedCategory) {
        return products.filter(
          (product) =>
            product.category.toLowerCase() ===
            selectedCategory.toLowerCase()
        );
      }
      return products;

      // if (selectedCategory === "Active") {
      //   return products.filter((product) => product.active === true);
      // } else if (ActiveToggle === "Inactive") {
      //   return products.filter((product) => product.active === false);
      // }
      // return products;
    };

    // Function to sort by price
    const sortByPrice = (products) => {
      if (sortOption === "price_asc") {
        return [...products].sort((a, b) => a.priceUSD - b.priceUSD);
      } else if (sortOption === "price_desc") {
        return [...products].sort((a, b) => b.priceUSD - a.priceUSD);
      } else if (sortOption === "newest") {
        return [...products].sort(
          (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
        );
      }
      return products;
    };

    // Function to filter by metal color
    const filterByMetalColor = (products) => {
      if (selectedMetalColors.length === 0) return products;
      return products.filter((product) =>
        selectedMetalColors.includes(product.metalColor)
      );
    };

    const filterByClarity = (products) => {
      if (selectedClarity.length === 0) return products;
      return products.filter((product) =>
        selectedClarity.includes(product.clarityRange)
      );
    };

    const filterByGoldPurity = (products) => {
      if (selectedGoldPurity.length === 0) return products;
      return products.filter((product) =>
        selectedGoldPurity.includes(product.goldPurity)
      );
    };

    const filterByPriceRange = (products) => {
      return products.filter((product) => {
        const price = product.priceUSD;
        const min = minPrice ? parseFloat(minPrice) : 0;
        const max = maxPrice ? parseFloat(maxPrice) : Number.MAX_SAFE_INTEGER;
        return price >= min && price <= max;
      });
    };

    const filterByCaratRange = (products) => {
      return products.filter((product) => {
        const carat = product.caratWt;
        const min = minCarat ? parseFloat(minCarat) : 0;
        const max = maxCarat ? parseFloat(maxCarat) : Number.MAX_SAFE_INTEGER;
        return carat >= min && carat <= max;
      });
    };

    // Sequentially apply filters and search term to allProducts
    const filteredData = useMemo(() => {
      // Start with all products or an empty array if not available
      let result = allProducts.success || [];

      // Apply search filter
      result = filterBySearchTerm(result);

      // Apply category filter
      result = sortByCategory(result);

      // Apply sorting
      result = sortByPrice(result);

      // Apply Active status filter
      result = sortByActiveStatus(result);

      // Apply metal color filter
      result = filterByMetalColor(result);

      // Apply clarity filter
      result = filterByClarity(result);

      // Apply Gold Purity filter
      result = filterByGoldPurity(result);

      // // Apply Price Range Filter
      result = filterByCaratRange(result);

      // Apply Price Range Filter
      result = filterByPriceRange(result);

      return result;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      allProducts,
      searchQuery,
      sortOption,
      selectedMetalColors,
      selectedClarity,
      selectedGoldPurity,
      minPrice,
      maxPrice,
      minCarat,
      maxCarat,
      ActiveToggle,
      selectedCategory,
    ]);

    return filteredData;
  };

  const filteredData = useProductFilters(
    allproducts,
    searchQuery,
    sortOption,
    selectedMetalColors,
    selectedClarity,
    selectedGoldPurity,
    minPrice,
    maxPrice,
    minCarat,
    maxCarat,
    ActiveToggle,
    selectedCategory
  );

  const uniqueMetalColors = useMemo(() => {
    const colors = new Set();
    allproducts?.success?.forEach((product) => colors.add(product.metalColor));
    return Array.from(colors);
  }, [allproducts]);

  const uniqueClarity = useMemo(() => {
    const clarity = new Set();
    allproducts?.success?.forEach((product) =>
      clarity.add(product.clarityRange)
    );
    return Array.from(clarity);
  }, [allproducts]);

  const uniqueGoldPurity = useMemo(() => {
    const goldPurity = new Set();
    allproducts?.success?.forEach((product) =>
      goldPurity.add(product.goldPurity)
    );
    return Array.from(goldPurity);
  }, [allproducts]);

  // const categories = useMemo(() => {
  //   const types = new Set();
  //   allproducts?.success?.forEach((product) =>
  //     types.add(product.category.toLowerCase())
  //   );
  //   return Array.from(types);
  // }, [allproducts]);

  const currentRecords = filteredData?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nPages = Math.ceil(allproducts?.success?.length / recordsPerPage);
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const fieldTagNames = {
    productNo: "Product Number",
    name: "Name",
    caratWt: "Carat Weight",
    colorRange: "Color Range",
    clarityRange: "Clarity Range",
    metalColor: "Metal Color",
    goldPurity: "Gold Purity",
    price: "Price",
    collection: "Collection",
    active: "Active Status",
    dateAdded: "Date Added",
    descriptionDetails: "Description",
    netWeight: "Net Weight",
    priceUSD: "Price (USD)",
    category: "Category",
    designNo: "Design Number",
    jobNo: "Job Number",
    subCategory: "Sub Category",
  };

  const editableFieldsInitialState = {
    name: false,
    priceUSD: false,
    caratWt: false,
    colorRange: false,
    metalColor: false,
    goldPurity: false,
    collection: false,
    netWEight: false,
    dateAdded: false,
    active: false,
    descriptionDetails: false,
    netWeight: false,
    designNo: false,
    jobNo: false,
    images: false,
  };
  const [editableFields, setEditableFields] = useState(
    editableFieldsInitialState
  );

  const handleEdit = (field) => {
    setEditableFields({ ...editableFields, [field]: true });
  };

  const handleCancelEdit = () => {
    setEditableFields(editableFieldsInitialState);
  };

  const handleSave = () => {
    const isValid = Object.keys(selectProduct).every((field) =>
      validateField(field, selectProduct[field])
    );
    if (isValid) {
      update_Product("rings", selectProduct);
      handleCancelEdit();
      setSelectProduct(null);
    } else {
      toast.error(`Please correct the errors before saving.`);
    }
  };

  const handleImageUpload = async (index, product, file) => {
    const presignedurl = await generatePreSignedURL(file.name, file.type);
    const object_url = await uploadMediaS3(file, presignedurl);

    if (product === "update") {
      if (file) {
        const newImages = [...selectProduct.images];
        newImages[index] = { data: object_url, fileType: file.type };
        setSelectProduct({ ...selectProduct, images: newImages });
        console.log("S3", selectProduct);
      }
    } else if (product === "new") {
      if (file) {
        const newImages = [...newProduct.images];
        newImages[index] = { data: object_url, fileType: file.type };
        setNewProduct({ ...newProduct, images: newImages });
        console.log("S3", newProduct);
      }
    }
  };

  const uploadMediaS3 = async (file, preSignedUrl) => {
    if (!file) return;
    const toastId = toast.loading("Uploading Media");

    try {
      const response = await fetch(preSignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.ok) {
        toast.update(toastId, {
          render: `Media Uploaded Successfully`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        console.log("File uploaded successfully");
        // Remove the query parameters to get the object URL
        const objectUrl = new URL(preSignedUrl);
        objectUrl.search = ""; // This removes the query parameters
        console.log("object url", objectUrl);
        return objectUrl.href; // Return the URL of the uploaded object
      } else {
        toast.update(toastId, {
          render: `Failed to upload media`,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        console.error("Error uploading file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    console.log("upload progress", uploadProgress);
  }, [uploadProgress]);

  const handleSaveNewProduct = () => {
    const isValid = Object.keys(newProduct).every((field) =>
      validateField(field, newProduct[field])
    );

    if (isValid) {
      add_product(newProduct.category.toLocaleLowerCase(), newProduct);
    } else {
      toast.error(`Please correct the errors before saving.`);
    }
  };

  const validateField = (field, value) => {
    let isValid = true;

    switch (field) {
      case "productNo":
      case "name":
      case "category":
      case "collection":
      case "colorRange":
      case "clarityRange":
      case "metalColor":
      case "netWeight":
      case "goldPurity":
      case "descriptionDetails":
      case "designNo":
      case "jobNo":
      case "subCategory":
        isValid = !validator.isEmpty(value);
        break;
      case "caratWt":
      case "priceUSD":
        isValid = validator.isNumeric(value.toString());
        break;
      case "dateAdded":
        isValid = validator.isISO8601(value);
        break;
      default:
        isValid = true;
    }
    if (productNoIsTaken){
      setValidationErrors({ ...validationErrors, "productNo": true });
      return !isValid
    }

    console.log(field, value);
    if (!isValid) {
      setValidationErrors({ ...validationErrors, [field]: true });
    } else {
      const newErrors = validationErrors;
      delete newErrors[field];
      setValidationErrors(newErrors);
    }
    return isValid;
  };

  const clearFilter = () => {
    setSearchQuery("");
    setSortOption("");
    setSelectedMetalColors([]);
    setSelectedClarity([]);
    setSelectedGoldPurity([]);
    setMinPrice("");
    setMaxPrice("");
    setMinCarat("");
    setMaxCarat("");
    setAppliedFilters(false);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const checkProductNumber = async (productNo) => {
    try {
      const response = await axios.post(`${serverApi}rings/checkproductno`, { productNo });
      
      
      if (response.data.taken) {
        setProductNoIsTaken(response.data.taken);
        const toastId = toast.loading("Product Number already exists.");
        validateField("productNo", "")
        toast.update(toastId, {
          render: `Product Number ${productNo} already exists.`,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      else{
        setProductNoIsTaken(response.data.taken);
        validateField("productNo", "")
      }

    } catch (error) {
      console.error('Error checking product number:', error);
    }
  };

  const debouncedCheckProductNumber = useCallback(debounce(checkProductNumber, 300), []);

  const handleProductNoChange = (event) => {
    const value = event.target.value;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      productNo: value,
    }));
    debouncedCheckProductNumber(value);
  };

  return (
    <div>
      <h2 className="text-center my-10">Product Catalogue</h2>
      <ToastContainer position="top-center" />
      {/* <ToastContainer position="top-center" /> */}
      {allproducts.load && <Loader />}

      <div className="flex justify-between mx-20 mb-4">
        <div>
          <select
            id="sort-by"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded-md focus:outline-none cursor-pointer"
          >
            <option value="">All</option>
            {categoryList.map((type, index) => (
              <option key={index} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <button
          class="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition duration-300 ease-in-out focus:outline-none"
          onClick={() => {
            console.log("Before update:", addNew);
            setAddNew(true);
            console.log("After update:", addNew);
          }}
        >
          Add New Product
        </button>
      </div>

      {/* Search Bar */}
      <div class="flex justify-between items-center gap-10 mx-20">
        <div class="flex-grow">
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to the first page when searching
            }}
            className="border p-2 rounded-md focus:outline-none w-full"
          />
        </div>

        <select
          id="sort-by"
          value={ActiveToggle}
          onChange={(e) => setActiveToggle(e.target.value)}
          className="border p-2 rounded-md focus:outline-none cursor-pointer"
        >
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Filter toggle button */}
        <div>
          <button
            className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition duration-300 ease-in-out focus:outline-none"
            onClick={() => setIsFilterBoxOpen(!isFilterBoxOpen)}
          >
            {isFilterBoxOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
      </div>

      {/* Filter box */}
      <div
        className={`absolute z-[11] pt-1 transition-transform overflow-auto duration-500 ease-in-out ${
          isFilterBoxOpen ? "h-[300px]" : "max-h-0"
        } overflow-hidden`}
      >
        {/* Your filter content goes here */}
        <div className="bg-white shadow-md rounded p-4 mx-20 h-full">
          <div className="flex flex-wrap justify-between items-center gap-10 mt-4">
            {/* Sort dropdown */}
            <div className="flex items-center">
              <label htmlFor="sort-by" className="mr-2">
                Sort by:
              </label>
              <select
                id="sort-by"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border p-2 rounded-md focus:outline-none"
              >
                <option value="recommendations">Recommendations</option>
                <option value="newest">Newly Added</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            {/* Filter by Metal Color Dropdown */}
            <div>
              <div className="relative inline-block text-left z-[10]">
                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center w-[150px] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setMetalColorToggle(!metalColorToggle)}
                  >
                    Metal Color
                    {/* Icon for dropdown, adjust as needed */}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.292 7.292a1 1 0 011.414 0L10 10.586l3.294-3.294a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {/* Dropdown menu, show/hide based on dropdown state */}
                {metalColorToggle && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    {/* Active: "bg-gray-100", Not Active: "" */}
                    <div className="py-1" role="none">
                      {/* Mapping through metal colors to create checkboxes */}
                      {uniqueMetalColors.map((color) => (
                        <div
                          key={color}
                          className="px-4 py-2 flex items-center"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-gray-600"
                            checked={selectedMetalColors.includes(color)}
                            onChange={() => {
                              toggleMetalColor(color);
                              setAppliedFilters(true);
                            }}
                          />
                          <span className="ml-3 text-sm text-gray-700">
                            {color}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Filter by Clarity Dropdown */}
            <div>
              <div className="relative inline-block text-left z-[10]">
                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center w-[150px] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setClarityToggle(!clarityToggle)}
                  >
                    Clarity
                    {/* Icon for dropdown, adjust as needed */}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.292 7.292a1 1 0 011.414 0L10 10.586l3.294-3.294a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {/* Dropdown menu, show/hide based on dropdown state */}
                {clarityToggle && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    {/* Active: "bg-gray-100", Not Active: "" */}
                    <div className="py-1" role="none">
                      {/* Mapping through Clarity to create checkboxes */}
                      {uniqueClarity.map((clarity) => (
                        <div
                          key={clarity}
                          className="px-4 py-2 flex items-center"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-gray-600"
                            checked={selectedClarity.includes(clarity)}
                            onChange={() => {
                              toggleClarity(clarity);
                              setAppliedFilters(true);
                            }}
                          />
                          <span className="ml-3 text-sm text-gray-700">
                            {clarity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Filter by Gold Purity Dropdown */}
            <div>
              <div className="relative inline-block text-left z-[10]">
                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center w-[150px] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setGoldPurityToggle(!goldPurityToggle)}
                  >
                    Gold Purity
                    {/* Icon for dropdown, adjust as needed */}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.292 7.292a1 1 0 011.414 0L10 10.586l3.294-3.294a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {/* Dropdown menu, show/hide based on dropdown state */}
                {goldPurityToggle && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    {/* Active: "bg-gray-100", Not Active: "" */}
                    <div className="py-1" role="none">
                      {/* Mapping through Clarity to create checkboxes */}
                      {uniqueGoldPurity.map((goldPurity) => (
                        <div
                          key={goldPurity}
                          className="px-4 py-2 flex items-center"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-gray-600"
                            checked={selectedGoldPurity.includes(goldPurity)}
                            onChange={() => {
                              toggleGoldPurity(goldPurity);
                              setAppliedFilters(true);
                            }}
                          />
                          <span className="ml-3 text-sm text-gray-700">
                            {goldPurity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setAppliedFilters(true);
                }}
                className="border p-2 rounded-md focus:outline-none"
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setAppliedFilters(true);
                }}
                className="border p-2 rounded-md focus:outline-none"
              />
            </div>

            {/* Carat Filter */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min Carat"
                value={minCarat}
                onChange={(e) => {
                  setMinCarat(parseFloat(e.target.value));
                  setAppliedFilters(true);
                }}
                className="border p-2 rounded-md focus:outline-none"
                step="any"
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max Carat"
                value={maxCarat}
                onChange={(e) => {
                  setMaxCarat(parseFloat(e.target.value));
                  setAppliedFilters(true);
                }}
                className="border p-2 rounded-md focus:outline-none"
                step="any"
              />
            </div>
          </div>

          {appliedFilters && (
            <div className="flex justify-center p-4">
              <button
                onClick={() => {
                  clearFilter();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center">
        {currentRecords ? (
          currentRecords?.map((product) => (
            <div
              key={product.productNumber}
              className="max-w-[250px] rounded-2xl overflow-hidden shadow-lg m-3"
            >
              {/* Image slider */}
              <div className="relative">
                <Swiper
                  spaceBetween={50}
                  slidesPerView={1}
                  className="cursor-pointer"
                  // onSlideChange={() => console.log("slide change")}
                  // onSwiper={(swiper) => console.log(swiper)}
                >
                  {product?.images?.length > 0 ? (
                    product?.images?.map((img, key) => (
                      <div key={key}>
                        {img.fileType?.includes("image") ? (
                          <SwiperSlide>
                            <img
                              src={product.images[key].data || defaultImage}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          </SwiperSlide>
                        ) : img.fileType?.includes("video") ? (
                          <SwiperSlide>
                            <video
                              src={product.images[key].data}
                              autoPlay
                              controls
                              className="w-full h-full object-contain"
                            />
                          </SwiperSlide>
                        ) : (
                          <SwiperSlide>
                            <img src={defaultImage} alt="" />
                          </SwiperSlide>
                        )}
                      </div>
                    ))
                  ) : (
                    <SwiperSlide>
                      <img src={defaultImage} alt="" />
                    </SwiperSlide>
                  )}

                  {/* Add more SwiperSlide components for additional images */}
                </Swiper>
                <div className="z-[1] absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
                  {product.productNo}
                </div>
                <div className="z-[1] absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
                  {product.name}
                </div>
                {/* Toggle Switch */}
                <div class="form-check form-switch absolute top-0 right-1 m-2 z-10">
                  <div
                    className={`px-2 rounded focus:outline-none text-[14px] ${
                      product.active ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {product.active ? "Active" : "Inactive"}
                  </div>
                </div>
              </div>

              {/* Card content */}
              <div className="px-6 py-3 flex justify-between">
                <p className="text-gray-700 font-semibold">
                  US${product.priceUSD}
                </p>
                <p className="text-gray-700">
                  {product.category.charAt(0).toUpperCase() +
                    product.category.slice(1)}
                </p>
              </div>
              <div className="flex justify-center pb-4">
                <button
                  onClick={() => {
                    setSelectProduct(product);
                    setSelectProductNoEdits(product);
                  }}
                  className="bg-sky-500 text-white px-3 py-1 rounded hover:bg-sky-600 transition duration-300 ease-in-out focus:outline-none"
                >
                  Show More
                </button>
                {/* <button
                onClick={() => handleDelete(product.productNumber)}
                className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none mx-2"
              >
                Delete
              </button> */}
              </div>
            </div>
          ))
        ) : (
          <div>No Data Found!</div>
        )}
      </div>

      {/* Show Product */}
      {selectProduct && (
        <div className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[900px] h-[600px] bg-white shadow-lg rounded-md p-6 flex">
            {/* Images on the left */}
            <div className="flex-1 mr-4 grid grid-cols-2 gap-2 overflow-auto ">
              {Array.from({ length: selectProduct?.images?.length })?.map(
                (_, index) => (
                  <div key={index} className="relative group">
                    {selectProduct?.images[index]?.fileType?.includes(
                      "image"
                    ) ? (
                      <img
                        src={selectProduct.images[index].data}
                        alt={`Media ${index + 1}`}
                        className="w-full h-full object-contain rounded-md"
                      />
                    ) : (
                      <video
                        src={selectProduct.images[index].data}
                        className="w-full h-full object-contain rounded-md"
                        controls
                        autoPlay
                      />
                    )}

                    <label
                      htmlFor={`file-input-${index}`}
                      className="absolute inset-0 w-full h-full rounded-md items-center justify-center bg-black bg-opacity-50 cursor-pointer hidden group-hover:flex"
                    >
                      <span className="text-white">Upload Media</span>
                    </label>

                    {selectProduct?.images?.length > 1 && (
                      <button
                        onClick={() => {
                          setSelectProduct({
                            ...selectProduct,
                            images: selectProduct.images.filter(
                              (_, imgIndex) => imgIndex !== index
                            ),
                          });
                          handleEdit("images");
                        }}
                        className="w-[60px] absolute top-0 right-0 m-2 text-white bg-red-600 hover:bg-red-700 rounded-lg p-1 hidden group-hover:block"
                      >
                        Delete
                      </button>
                    )}

                    <input
                      id={`file-input-${index}`}
                      type="file"
                      onChange={(e) => {
                        handleImageUpload(index, "update", e.target.files[0]);
                        handleEdit("images");
                      }}
                      className="hidden"
                    />
                  </div>
                )
              )}
              {selectProduct?.images?.length < 6 && (
                <div className="flex justify-center">
                  <button
                    onClick={() =>
                      setSelectProduct((prevState) => ({
                        ...prevState,
                        images: [...prevState.images, ""],
                      }))
                    }
                    className="bg-blue-500 text-white px-4 rounded focus:outline-none h-[50px]"
                  >
                    Add Media
                  </button>
                </div>
              )}
            </div>

            {/* Product details on the right */}
            <div className="flex-1 overflow-auto">
              {/* Close button */}
              <button
                onClick={() => {
                  setSelectProduct(null);
                  handleCancelEdit();
                }}
                className="relative left-[370px] text-gray-500 hover:text-red-500 focus:outline-none"
              >
                <IoMdClose size={25} />
              </button>

              {/* Product details */}
              <div className="flex justify-between mr-6">
                <h2 className="text-xl font-bold">{selectProduct.productNo}</h2>
                <button
                  className={`ml-2 px-2 rounded focus:outline-none text-[12px] ${
                    selectProduct.active ? "bg-green-500" : "bg-red-500"
                  }`}
                  onClick={() => {
                    setSelectProduct((prevState) => ({
                      ...prevState,
                      active: !prevState.active,
                    }));
                    handleEdit("active");
                  }}
                >
                  {selectProduct.active ? "Active" : "Inactive"}
                </button>
              </div>

              {Object?.keys(selectProduct)
                .filter((field) =>
                  [
                    "name",
                    "category",
                    "caratWt",
                    "colorRange",
                    "clarityRange",
                    "metalColor",
                    "netWEight",
                    "goldPurity",
                    "price",
                    "collection",
                    "dateAdded",
                    "descriptionDetails",
                    "netWeight",
                    "priceUSD",
                    "designNo",
                    "jobNo",
                  ].includes(field)
                )
                .map((field) => (
                  <div key={field} className="mb-2 ">
                    <p className="inline font-semibold">
                      {fieldTagNames[field]}:
                    </p>

                    {field === "dateAdded" ? (
                      <input
                        type="datetime-local"
                        value={selectProduct[field].slice(0, 16)} // Ensure proper formatting for datetime-local input
                        onChange={(e) => {
                          handleEdit(field);
                          setSelectProduct({
                            ...selectProduct,
                            [field]: e.target.value,
                          });
                        }}
                        className="ml-2 border border-gray-300 p-1 rounded-md"
                      />
                    ) : editableFields[field] ? (
                      <input
                        value={selectProduct[field]}
                        onChange={(e) =>
                          setSelectProduct({
                            ...selectProduct,
                            [field]: e.target.value,
                          })
                        }
                        className={`ml-2 p-1 border-[1px] rounded-md   ${
                          validationErrors[field]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    ) : (
                      <span
                        onClick={() => handleEdit(field)}
                        className="ml-2 text-gray-500"
                      >
                        {selectProduct[field]}
                      </span>
                    )}
                  </div>
                ))}

              {Object.values(editableFields).some((field) => field) && (
                <div className="mt-4">
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      handleCancelEdit();
                      setSelectProduct(selectProductNoEdits);
                    }}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add New Product */}
      {addNew && (
        <div className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[900px] h-[600px] bg-white shadow-lg rounded-md flex flex-col">
            {/* Product details section */}
            <div className="flex justify-between items-center sticky top-0 bg-white m-6">
              <h2 className="text-xl font-bold">Add New Product</h2>
              <button
                onClick={() => {
                  setAddNew(false);
                  handleCancelEdit();
                }}
                className="text-gray-500 hover:text-red-500 focus:outline-none"
              >
                <IoMdClose size={25} />
              </button>
            </div>
            <div className="flex-grow mx-6 overflow-auto">
              <div className="grid grid-cols-4 gap-3">
                {/* Product fields */}
                {Object.keys(newProduct)
                  .filter((field) =>
                    [
                      "productNo",
                      "name",
                      "category",
                      "caratWt",
                      "colorRange",
                      "clarityRange",
                      "metalColor",
                      "netWEight",
                      "goldPurity",
                      "price",
                      "collection",
                      "dateAdded",
                      "descriptionDetails",
                      "netWeight",
                      "priceUSD",
                      "designNo",
                      "jobNo",
                      "subCategory",
                    ].includes(field)
                  )
                  .map((field) => (
                    <div key={field} className="mb-2">
                      <label className="block font-semibold">
                        {fieldTagNames[field]}:
                      </label>
                      {field === "productNo" ? (
                        <div>
                          <input
                            type="text"
                            value={newProduct[field]}
                            onChange={(e) => {

                              handleProductNoChange(e);
                            }}
                            className={`w-full p-1 border-[1px] rounded-lg ${
                              validationErrors[field]
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                        </div>
                      ) : field === "category" ? (
                        <div>
                          <input
                            type="text"
                            value={newProduct[field]}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                [field]: e.target.value,
                              })
                            }
                            className={`w-full p-1 border-[1px] rounded-lg ${
                              validationErrors[field]
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            list="categoryOptions"
                          />
                          <datalist id="categoryOptions">
                            {categoryList.map((type) => (
                              <option key={type} value={type} />
                            ))}
                          </datalist>
                        </div>
                      ) : field === "descriptionDetails" ? (
                        <textarea
                          type="text"
                          value={newProduct[field]}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              [field]: e.target.value,
                            })
                          }
                          className={`w-full p-1 border-[1px] rounded-lg ${
                            validationErrors[field]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                      ) : (
                        <input
                          type={
                            field === "dateAdded" ? "datetime-local" : "text"
                          }
                          value={newProduct[field]}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              [field]: e.target.value,
                            })
                          }
                          className={`w-full p-1 border-[1px] rounded-lg ${
                            validationErrors[field]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Images section */}
            <div className="h-[45%] bg-gray-100 mt-2 p-4">
              <h3 className="text-lg font-semibold mb-2">Media Upload</h3>
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: newProduct?.images?.length })?.map(
                  (_, index) => (
                    <div key={index} className="relative group">
                      {newProduct?.images[index]?.fileType?.includes(
                        "video"
                      ) ? (
                        <video
                          src={newProduct.images[index].data}
                          className="w-full h-full object-cover rounded-md"
                          controls
                          autoPlay
                        />
                      ) : newProduct?.images[index]?.fileType?.includes(
                          "image"
                        ) ? (
                        <img
                          src={newProduct.images[index].data}
                          alt={`${defaultImage}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <img
                          src={defaultImage}
                          alt={`${defaultImage}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                      )}
                      <label
                        htmlFor={`file-input-${index}`}
                        className="absolute inset-0 w-full h-full items-center rounded-md justify-center bg-black bg-opacity-50 cursor-pointer hidden group-hover:flex"
                      >
                        <span className="text-white">Upload Media</span>
                      </label>
                      {newProduct?.images?.length > 1 && (
                        <button
                          onClick={() => {
                            setNewProduct({
                              ...newProduct,
                              images: newProduct.images.filter(
                                (_, imgIndex) => imgIndex !== index
                              ),
                            });
                          }}
                          className="w-[60px] absolute top-0 right-0 m-2 text-white bg-red-600 hover:bg-red-700 rounded-lg p-1 hidden group-hover:block"
                        >
                          Delete
                        </button>
                      )}
                      <input
                        id={`file-input-${index}`}
                        type="file"
                        onChange={(e) => {
                          handleImageUpload(index, "new", e.target.files[0]);
                          handleEdit("images");
                        }}
                        className="hidden"
                      />
                    </div>
                  )
                )}
                {newProduct?.images?.length < 6 && (
                  <div className="flex justify-center items-center bg-green-500 text-white text-4xl font-bold cursor-pointer rounded-md">
                    <button
                      onClick={() =>
                        setNewProduct((prevState) => ({
                          ...prevState,
                          images: [...prevState.images, ""],
                        }))
                      }
                      className="w-full h-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="my-2 flex justify-center">
              <button
                onClick={() => handleSaveNewProduct()}
                className="bg-blue-500 text-white px-6 py-2 rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center py-4 cursor-pointer">
        {nPages > 1 ? (
          <ul className="pagination">
            <li className="page-item">
              <div
                onClick={() => {
                  if (currentPage !== 1) setCurrentPage(currentPage - 1);
                }}
                className="page-link"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </div>
            </li>
            {pageNumbers?.map((pgNumber) => (
              <li
                key={pgNumber}
                className={`page-item ${
                  currentPage === pgNumber ? "active" : ""
                } `}
              >
                <div
                  onClick={() => setCurrentPage(pgNumber)}
                  className="page-link"
                >
                  {pgNumber}
                </div>
              </li>
            ))}
            <li className="page-item">
              <div
                onClick={() => {
                  if (currentPage !== nPages) setCurrentPage(currentPage + 1);
                }}
                className="page-link"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </div>
            </li>
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AdminProductsPage;
