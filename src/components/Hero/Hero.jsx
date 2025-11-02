import React from "react";
import shapeLeft from "/assets/bg-hero-left.png";
import shapeRight from "/assets/bg-hero-right.png";
import { FiSearch } from "react-icons/fi";

const Hero = () => {
  return (
    // hero-wrapper
    <div className="relative flex flex-col items-center justify-center text-center px-4 py-20 md:py-28 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      {/* bg-shapes */}
      <img
        src={shapeLeft}
        alt="bg left"
        className="absolute left-0 top-17 max-w-xs md:max-w-md opacity-70 pointer-events-none"
      />
      <img
        src={shapeRight}
        alt="bg right"
        className="absolute right-0 bottom-25 max-w-xs md:max-w-md opacity-70 pointer-events-none"
      />

      {/* headline */}
      <h1 className="text-4xl md:text-6xl font-bold leading-tight z-10">
        Deal Your <span className="text-indigo-600">Products</span>
        <br /> In A <span className="text-indigo-600">Smart</span> Way !
      </h1>

      {/* sub-text */}
      <p className="text-gray-600 mt-4 max-w-2xl text-sm md:text-base z-10">
        SmartDeals helps you sell, resell, and shop from trusted local sellers —
        all in one place!
      </p>

      {/* search-bar */}
      <div className="mt-8 flex items-center bg-white rounded-full shadow-md overflow-hidden w-full max-w-lg border border-gray-200 z-10">
        <input
          type="text"
          placeholder="Search For Products, Categories..."
          className="flex-grow px-4 py-2 focus:outline-none text-gray-700"
        />
        <button className="bg-indigo-600 p-3 rounded-full text-white hover:bg-indigo-700 transition">
          <FiSearch size={18} />
        </button>
      </div>

      {/* buttons */}
      <div className="flex flex-col md:flex-row gap-3 mt-8 z-10">
        <button className="btn bg-indigo-600 text-white border-none hover:bg-indigo-700 transition">
          Watch All Products
        </button>
        <button className="btn bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition">
          Post an Product
        </button>
      </div>
    </div>
  );
};

export default Hero;
