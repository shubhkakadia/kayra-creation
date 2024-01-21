import React, { useState, useEffect } from "react";
import round from "../assets/round.png";
import pear from "../assets/pear.png";
import oval from "../assets/oval.png";
import cushion from "../assets/cushion.png";
import princess from "../assets/princess.png";

const Loader = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const list = [round, oval, pear, cushion, princess];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % 5);
    }, 1000); // Change the interval duration as needed (in milliseconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center">
      {list.map((imagePath, index) => (
        <div key={index}>
          <img
            src={imagePath}
            alt="loader"
            className={`w-[50px] h-[50px] object-contain transition-transform transform ${
              currentImage === index ? "scale-100" : "scale-0"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default Loader;
