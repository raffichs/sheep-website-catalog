import axios from "axios";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link, Navigate } from "react-router-dom";
import PlainHeader from "../../components/PlainHeader";

export default function AdminPage() {
  const [cards, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (!admin) {
      axios
        .get("/admin")
        .then(({ data }) => {
          if (data) {
            setAdmin(data);
          } else {
            setRedirect(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching admin data: ", error);
          setRedirect(true);
        });
    }
  }, [admin]);

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        setCard(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch cards:", error);
        setLoading(false);
      });
  }, []);

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  if (loading) {
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
    <div className="root">
      <PlainHeader />

      <main className="catalog mt-2 md:mt-7 p-2 md:max-w-4xl md:m-auto">
        <div>
          <div className="flex justify-between">
            <h2 className="">Admin Page</h2>
            <Link
              to={"/add"}
              className="add-cta bg-gradient py-2 px-5 rounded-md"
            >
              TAMBAH
            </Link>
          </div>
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
                className={`search_text ${
                  isExpanded ? "text-[#f5f5f5]" : ""
                } md:text-xs`}
              >
                {selectedCategory ? selectedCategory : "Pilih Kategori"}
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
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <Link
                to={"/edit/" + card._id}
                key={card._id}
                className="block card bg-slate-100 rounded-md shadow"
              >
                <img
                  className={`rounded-t-md object-cover w-full h-40 ${
                    card.status === "sold" ? "grayscale" : ""
                  }`}
                  src={card.photos[0].replace(
                    "/upload/",
                    "/upload/c_fill,f_auto,q_auto/"
                  )}
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

                  <button className="edit-card bg-gradient w-full p-2 mt-2 rounded-sm">
                    EDIT
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <div className="h1-card p-14 col-span-full card bg-slate-100 rounded-md shadow text-center">
              Belum ada produk untuk kategori ini
            </div>
          )}
        </div>
      </main>

      <footer className="mt-5 md:mt-7 pb-1 bg-dark-green">
        <div className="md:max-w-4xl md:m-auto">
          <Link to={"/"} className="admin-btn flex justify-end p-2 pb-0">
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
                  src={"/images/appbar-logo.svg"}
                  className="h-11"
                  alt="logo"
                />
                <span className="md:text-2xl">PETERNAK NING SALATIGA</span>
              </nav>
            </div>
          </div>
          <hr className="mx-2 mb-1 mt-5 h-px my-8 border-0" />
          <div className="cr flex gap-1 text-[10px] md:text-sm items-center justify-center">
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
