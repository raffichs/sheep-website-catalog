import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";

export default function IndexPage() {
  const [cards, setCard] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        setCard(data);
      })
      .catch((error) => {
        console.error("Failed to fetch cards:", error);
      });
  }, []);

  useEffect(() => {
    // Store scroll position when leaving the Index page
    const handleBeforeUnload = () => {
      localStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  if (!cards) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsExpanded(false);
  };

  const filteredCards = selectedCategory
    ? cards.filter((card) => card.category === selectedCategory)
    : cards;

  return (
    <div className="">
      <header>
        <nav className="flex justify-center items-center gap-2 p-2 bg-dark-green">
          <img src="/appbar-logo.svg" className="h-11" alt="logo" />
          <span className="md:text-2xl">PETERNAK NING SALATIGA</span>
        </nav>
      </header>

      <div className="md:max-w-4xl md:m-auto">
        <div className="hero mt-5">
          <h1 className="p-2 md:text-3xl md:mt-20">Peternakan Peternak Ning Salatiga</h1>
          <div className="desc flex justify-between items-center ps-2 gap-10 mt-6 md:mt-0">
            <p className="w-auto md:text-sm">
              Welcome to our sheep farm, where we celebrate local farming
              traditions. Enjoy a curated selection of premium products sourced
              directly from dedicated local producers. With a commitment to
              excellence and efficiency, we ensure swift delivery of our finest
              wool and sheep-derived delicacies to your doorstep, bridging the
              gap between producer and consumer.
            </p>
            <img
              src="/hero-logo.svg"
              className="md:text-lg"
              alt="hero"
            />
          </div>
        </div>

        <div className="button-container flex justify-center">
          <a href="#main">
            <button
              type="button"
              className="bg-gradient cta px-4 py-3 mt-9 rounded-lg md:text-sm"
            >
              JELAJAHI TERNAK KAMI
            </button>
          </a>
        </div>
      </div>

      <main id="main" className="catalog mt-10 p-2 md:max-w-4xl md:m-auto">
        <div>
          <h2 className="md:text-xl">Ternak Kami</h2>
          <div
            className={`search flex flex-col px-4 py-2 mt-3 justify-between items-center rounded-xl ${
              isExpanded ? "bg-gradient" : "bg-white"
            } transition-all duration-300`}
          >
            <button
              onClick={toggleExpanded}
              className="flex w-full justify-between items-center"
            >
              <p
                className={`search_text sm:text-[12px] md:text-[16px] ${
                  isExpanded ? "text-[#f5f5f5]" : ""
                } md:text-xs`}
              >
                Pilih Kategori
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`transition-transform w-6 h-6 ${
                  isExpanded ? "rotate-180 text-white" : "text-dark-brown"
                } `}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300  ${
                isExpanded ? "max-h-40 w-full mt-1" : "max-h-0"
              }`}
            >
              <button
                onClick={() => {
                  handleCategoryClick("Murah");
                }}
                className="search_text md:text-xs py-1 text-[#f5f5f5] w-full text-left"
              >
                Murah
              </button>
              <hr className="w-full bg-[#F5F5F5] bg-opacity-50 mb-1 mt-0 h-px border-0" />
              <button
                onClick={() => {
                  handleCategoryClick("Sedang");
                }}
                className="search_text md:text-xs py-1 text-[#f5f5f5] w-full text-left"
              >
                Sedang
              </button>
              <hr className="w-full bg-[#F5F5F5] bg-opacity-50 mb-1 mt-0 h-px border-0" />
              <button
                onClick={() => {
                  handleCategoryClick("Premium");
                }}
                className="search_text md:text-xs py-1 text-[#f5f5f5] w-full text-left"
              >
                Premium
              </button>
              <hr className="w-full bg-[#F5F5F5] bg-opacity-50 mb-1 mt-0 h-px border-0" />
              <button
                onClick={() => {
                  handleCategoryClick("");
                }}
                className="search_text md:text-xs py-1 text-[#f5f5f5] w-full text-left"
              >
                Tampilkan semua
              </button>
              <hr className="w-full bg-[#F5F5F5] bg-opacity-50 mb-1 mt-0 h-px border-0" />
            </div>
          </div>
        </div>

        <div className="mt-2 gap-2 card-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredCards.map((card) =>
            card.status === "sold" ? (
              <div
                key={card._id}
                className="block card bg-slate-100 rounded-md shadow"
              >
                <img
                  className="rounded-t-md object-cover w-full h-40 grayscale blur-[1.5px]"
                  src={card.photos[0]}
                  alt={card.name}
                />
                <div className="px-2 pb-2">
                  <div className="h1-card mt-1">{card.name}</div>
                  <div className="flex items-center">
                    <div className="desc-card">{card.weight} kg</div>
                    <div className="desc-card"> &nbsp;|&nbsp; </div>
                    <div className="desc-card">{card.age} bulan</div>
                  </div>

                  <NumericFormat
                    value={card.price}
                    displayType={"text"}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="Rp "
                    suffix=",-"
                    renderText={(formattedValue) => (
                      <span className="price-card">{formattedValue}</span>
                    )}
                  />

                  <button
                    className={`edit-card w-full p-2 mt-2 rounded-sm ${
                      card.status === "sold" ? "bg-[#606060]" : "bg-gradient"
                    }`}
                  >
                    {card.status === "sold" ? "SOLD OUT" : "BELI SEKARANG"}
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to={"/" + card._id}
                key={card._id}
                className="block card bg-slate-100 rounded-md shadow"
              >
                <img
                  className={`rounded-t-md object-cover w-full h-40 ${
                    card.status === "sold" ? "grayscale" : ""
                  }`}
                  src={card.photos[0]}
                  alt={card.name}
                />
                <div className="px-2 pb-2">
                  <div className="h1-card mt-1">{card.name}</div>
                  <div className="flex items-center">
                    <div className="desc-card">
                      {card.weight} kg
                    </div>
                    <div className="desc-card">
                      {" "}
                      &nbsp;|&nbsp;{" "}
                    </div>
                    <div className="desc-card">
                      {card.age} bulan
                    </div>
                  </div>

                  <NumericFormat
                    value={card.price}
                    displayType={"text"}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="Rp "
                    suffix=",-"
                    renderText={(formattedValue) => (
                      <span className="price-card">
                        {formattedValue}
                      </span>
                    )}
                  />

                  <button
                    className={`edit-card w-full p-2 mt-2 rounded-sm ${
                      card.status === "sold" ? "bg-[#606060]" : "bg-gradient"
                    }`}
                  >
                    {card.status === "sold" ? "SOLD OUT" : "BELI SEKARANG"}
                  </button>
                </div>
              </Link>
            )
          )}
        </div>
      </main>

      <footer className="mt-5 pb-1 bg-dark-green">
        <div className="md:max-w-4xl md:m-auto">
          <Link to={"/admin"} className="admin-btn flex justify-end p-2 pb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.99998 15.3333C4.29531 14.51 1.33331 11.0146 1.33331 7.33329V3.33329L7.99998 0.666626L14.6666 3.33329V7.33329C14.6666 11.016 11.7046 14.51 7.99998 15.3333ZM2.66665 3.99996V7.33329C2.70474 8.87471 3.24689 10.3612 4.2101 11.5652C5.17331 12.7692 6.50452 13.6244 7.99998 14C9.49544 13.6244 10.8266 12.7692 11.7899 11.5652C12.7531 10.3612 13.2952 8.87471 13.3333 7.33329V3.99996L7.99998 1.99996L2.66665 3.99996Z"
                fill="#F5F3A6"
              />
              <path
                d="M7.99998 7.33333C8.92045 7.33333 9.66665 6.58714 9.66665 5.66667C9.66665 4.74619 8.92045 4 7.99998 4C7.07951 4 6.33331 4.74619 6.33331 5.66667C6.33331 6.58714 7.07951 7.33333 7.99998 7.33333Z"
                fill="#F5F3A6"
              />
              <path
                d="M4.66669 10C4.99517 10.5989 5.47695 11.0997 6.06267 11.4511C6.64839 11.8026 7.317 11.992 8.00002 12C8.68304 11.992 9.35165 11.8026 9.93737 11.4511C10.5231 11.0997 11.0049 10.5989 11.3334 10C11.3167 8.736 9.10535 8 8.00002 8C6.88869 8 4.68335 8.736 4.66669 10Z"
                fill="#F5F3A6"
              />
            </svg>
          </Link>
          <div className=" flex flex-col items-center mt-4">
            <div className="contacts flex flex-col md:flex-row md:gap-20 md:items-center gap-1 items-start">
              <nav className="flex justify-center items-center gap-2 bg-dark-green mb-2">
                <img
                  src="/public/appbar-logo.svg"
                  className="h-11"
                  alt="logo"
                />
                <span className="md:text-2xl">PETERNAK NING SALATIGA</span>
              </nav>
              <div>
                <div className="">Hubungi kami:</div>
                <a
                  href="https://www.instagram.com/peternaknaningsalatiga"
                  target="_blank"
                  className="socmed-link md:text-sm flex gap-2 items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M1 8.83337C1 5.06243 1 3.17611 2.17137 2.00474C3.34274 0.833374 5.22821 0.833374 9 0.833374C12.7709 0.833374 14.6573 0.833374 15.8286 2.00474C17 3.17611 17 5.06158 17 8.83337C17 12.6043 17 14.4906 15.8286 15.662C14.6573 16.8334 12.7718 16.8334 9 16.8334C5.22905 16.8334 3.34274 16.8334 2.17137 15.662C1 14.4906 1 12.6052 1 8.83337Z"
                      stroke="#F5F3A6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.6383 4.2019H13.6299M12.7895 8.83348C12.7895 9.83851 12.3902 10.8024 11.6796 11.513C10.9689 12.2237 10.005 12.623 9 12.623C7.99497 12.623 7.0311 12.2237 6.32044 11.513C5.60977 10.8024 5.21053 9.83851 5.21053 8.83348C5.21053 7.82845 5.60977 6.86459 6.32044 6.15392C7.0311 5.44326 7.99497 5.04401 9 5.04401C10.005 5.04401 10.9689 5.44326 11.6796 6.15392C12.3902 6.86459 12.7895 7.82845 12.7895 8.83348Z"
                      stroke="#F5F3A6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  @peternakningsalatiga
                </a>
                <a
                  href="https://www.tiktok.com/@peternakningsalatiga"
                  target="_blank"
                  className="socmed-link md:text-sm flex gap-2 items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M1 9.16663C1 5.39568 1 3.50936 2.17137 2.33799C3.34274 1.16663 5.22821 1.16663 9 1.16663C12.7709 1.16663 14.6573 1.16663 15.8286 2.33799C17 3.50936 17 5.39484 17 9.16663C17 12.9376 17 14.8239 15.8286 15.9953C14.6573 17.1666 12.7718 17.1666 9 17.1666C5.22905 17.1666 3.34274 17.1666 2.17137 15.9953C1 14.8239 1 12.9384 1 9.16663Z"
                      stroke="#F5F3A6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.76717 8.33116C7.07664 8.23348 5.5019 8.39432 4.73054 9.82169C3.95917 11.2491 4.73643 12.7345 5.22233 13.2987C5.70148 13.8267 7.22485 14.8263 8.84085 13.8503C9.24169 13.6086 9.74106 13.4276 10.307 11.5371L10.2413 4.0979C10.1318 4.91727 11.0371 6.83895 13.6131 7.06632"
                      stroke="#F5F3A6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  @peternakningsalatiga
                </a>
                <a
                  href="https://wa.me/6282324019042"
                  target="_blank"
                  className="socmed-link md:text-sm flex gap-2 items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      d="M13.6683 2.82804C12.9312 2.08718 12.0532 1.49978 11.0855 1.10009C10.1178 0.700395 9.07987 0.496416 8.03214 0.500048C3.6422 0.500048 0.0643215 4.06004 0.0643215 8.42802C0.0643215 9.82802 0.43417 11.188 1.12562 12.388L0 16.5L4.22109 15.396C5.38692 16.028 6.69747 16.364 8.03214 16.364C12.4221 16.364 16 12.804 16 8.43602C16 6.31603 15.1718 4.32404 13.6683 2.82804ZM8.03214 15.02C6.84219 15.02 5.67636 14.7 4.65526 14.1L4.41406 13.956L1.90552 14.612L2.57286 12.18L2.41205 11.932C1.75095 10.8816 1.39991 9.66741 1.39899 8.42802C1.39899 4.79603 4.37386 1.83604 8.0241 1.83604C9.79293 1.83604 11.4573 2.52404 12.7035 3.77204C13.3205 4.38321 13.8096 5.11016 14.1422 5.91077C14.4748 6.71138 14.6444 7.56971 14.6412 8.43602C14.6572 12.068 11.6824 15.02 8.03214 15.02ZM11.6663 10.092C11.4653 9.99602 10.4844 9.51602 10.3075 9.44402C10.1226 9.38002 9.99394 9.34802 9.85726 9.54002C9.72057 9.74002 9.34268 10.188 9.23012 10.316C9.11756 10.452 8.99696 10.468 8.79595 10.364C8.59495 10.268 7.95173 10.052 7.19596 9.38002C6.60099 8.85202 6.20702 8.20402 6.08641 8.00402C5.97385 7.80403 6.07033 7.70003 6.17486 7.59603C6.2633 7.50803 6.37586 7.36403 6.47234 7.25203C6.56882 7.14003 6.60903 7.05203 6.67335 6.92403C6.73767 6.78803 6.70551 6.67603 6.65727 6.58003C6.60903 6.48403 6.20702 5.50803 6.04621 5.10803C5.88541 4.72404 5.71657 4.77204 5.59596 4.76403H5.21003C5.07335 4.76403 4.86431 4.81203 4.67938 5.01203C4.5025 5.21203 3.98793 5.69203 3.98793 6.66803C3.98793 7.64403 4.7035 8.58802 4.79999 8.71602C4.89647 8.85202 6.20702 10.852 8.20098 11.708C8.67535 11.916 9.0452 12.036 9.33464 12.124C9.80902 12.276 10.2432 12.252 10.5889 12.204C10.9748 12.148 11.7708 11.724 11.9316 11.26C12.1005 10.796 12.1005 10.404 12.0442 10.316C11.9879 10.228 11.8673 10.188 11.6663 10.092Z"
                      fill="#F5F3A6"
                    />
                  </svg>
                  Admin (+6282324019042)
                </a>
              </div>
            </div>
          </div>
          <hr className="mx-2 mb-1 mt-5 h-px my-8 border-0" />
          <div className="cr flex gap-1 text-[10px] md:text-xs items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 5 4"
              fill="none"
            >
              <g clipPath="url(#clip0_98_3607)">
                <path
                  d="M2.5 3.625C2.17861 3.625 1.86443 3.5297 1.5972 3.35114C1.32997 3.17258 1.12169 2.91879 0.998697 2.62186C0.875704 2.32493 0.843524 1.9982 0.906225 1.68298C0.968926 1.36776 1.12369 1.07821 1.35095 0.850951C1.57821 0.623691 1.86776 0.468925 2.18298 0.406224C2.4982 0.343523 2.82493 0.375703 3.12186 0.498695C3.41879 0.621688 3.67258 0.829968 3.85114 1.0972C4.0297 1.36443 4.125 1.67861 4.125 2C4.12455 2.43084 3.9532 2.8439 3.64855 3.14855C3.3439 3.45319 2.93084 3.62455 2.5 3.625ZM2.5 0.625C2.22805 0.625 1.96221 0.705642 1.73609 0.856729C1.50997 1.00782 1.33374 1.22256 1.22967 1.47381C1.1256 1.72506 1.09837 2.00153 1.15142 2.26825C1.20448 2.53497 1.33543 2.77997 1.52773 2.97227C1.72003 3.16457 1.96503 3.29553 2.23175 3.34858C2.49848 3.40163 2.77494 3.3744 3.02619 3.27033C3.27744 3.16626 3.49218 2.99003 3.64327 2.76391C3.79436 2.53779 3.875 2.27195 3.875 2C3.87459 1.63545 3.72959 1.28596 3.47182 1.02818C3.21404 0.770412 2.86455 0.625413 2.5 0.625ZM2 2C2 1.89506 2.03302 1.79278 2.09438 1.70764C2.15574 1.62251 2.24233 1.55884 2.34189 1.52566C2.44144 1.49247 2.54892 1.49145 2.64908 1.52274C2.74925 1.55403 2.83704 1.61605 2.9 1.7C2.91991 1.72652 2.94954 1.74405 2.98238 1.74872C3.01521 1.75339 3.04856 1.74483 3.07508 1.72492C3.1016 1.70501 3.11913 1.67538 3.1238 1.64254C3.12847 1.60971 3.11991 1.57637 3.1 1.54984C3.00553 1.42395 2.87385 1.33097 2.7236 1.28407C2.57336 1.23717 2.41217 1.23873 2.26285 1.28852C2.11354 1.33831 1.98368 1.43382 1.89166 1.56151C1.79964 1.6892 1.75012 1.8426 1.75012 2C1.75012 2.1574 1.79964 2.3108 1.89166 2.43849C1.98368 2.56618 2.11354 2.66169 2.26285 2.71148C2.41217 2.76127 2.57336 2.76283 2.7236 2.71593C2.87385 2.66903 3.00553 2.57605 3.1 2.45016C3.10986 2.43702 3.11704 2.42208 3.12112 2.40617C3.1252 2.39027 3.12611 2.37371 3.1238 2.35746C3.12149 2.3412 3.11599 2.32556 3.10763 2.31142C3.09927 2.29729 3.08821 2.28494 3.07508 2.27508C3.06195 2.26522 3.047 2.25804 3.0311 2.25396C3.01519 2.24988 2.99864 2.24896 2.98238 2.25128C2.96612 2.25359 2.95048 2.25909 2.93634 2.26745C2.92221 2.27581 2.90986 2.28687 2.9 2.3C2.83704 2.38395 2.74925 2.44597 2.64908 2.47726C2.54892 2.50855 2.44144 2.50753 2.34189 2.47434C2.24233 2.44116 2.15574 2.37749 2.09438 2.29236C2.03302 2.20722 2 2.10494 2 2Z"
                  fill="#F5F3A6"
                  fillOpacity="0.6"
                />
              </g>
              <defs>
                <clipPath id="clip0_98_3607">
                  <rect
                    width="4"
                    height="4"
                    fill="white"
                    transform="matrix(1 0 0 -1 0.5 4)"
                  />
                </clipPath>
              </defs>
            </svg>
            PETERNAK NING SALATIGA
          </div>
        </div>
      </footer>
    </div>
  );
}
