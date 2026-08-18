import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContest";

const Header = () => {
  const { input, setInput } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };
  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-white'>
          Learn, Build &
          <span className='text-primary'> Grow</span>
          <br />
          As a Developer
        </h1>

        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-200">
          Discover tutorials, development guides, programming tips, and the
          latest insights in web development. Learn something new and level up
          your coding journey.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white text-gray-700 rounded overflow-hidden"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for blogs"
            required
            className="w-full pl-4 outline-none"
          />
          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
      <div className="text-center">
        {input && (
          <button
            onClick={onClear}
            className="border font-light text-xs py-1 px-3 rounded-sm
           shadow-custom-sm cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </div>
      <img
        src={assets.gradientBackground}
        alt="gradientBackground"
        className="absolute -top-52 -z-1 opacity-50"
      />
    </div>
  );
};

export default Header;
