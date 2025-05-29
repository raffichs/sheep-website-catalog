// import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header className="bg-dark-green">
      <div className="md:max-w-4xl md:m-auto">
        <div
          onClick={handleBackClick}
          className="flex justify-center items-center top-[18px] absolute aspect-square rounded-full p-[2px] ml-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="#F5F3A6"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <nav className="flex justify-center items-center gap-2 p-2">
          <img src={"/images/appbar-logo.svg"} alt="logo" />
          <span className="md:text-2xl">PETERNAK NING SALATIGA</span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
