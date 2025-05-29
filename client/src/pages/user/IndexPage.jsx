import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import Footer from "../../components/Footer";
import PlainHeader from "../../components/PlainHeader";

export default function IndexPage() {
  const [cards, setCard] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("/cards")
      .then(({ data }) => {
        setCard(data);
      })
      .catch((error) => {
        console.error("Failed to fetch cards:", error);
      });

    return () => controller.abort();
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsExpanded(false);
  };

  const filteredCards = useMemo(() => {
    return selectedCategory
      ? cards.filter((card) => card.category === selectedCategory)
      : cards;
  }, [cards, selectedCategory]);

  if (!cards) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="">
      <PlainHeader />

      <div className="md:max-w-4xl md:m-auto">
        <div className="hero mt-5">
          <h1 className="p-2 md:text-3xl md:mt-20">
            Peternakan Peternak Ning Salatiga
          </h1>
          <div className="desc flex justify-between items-center ps-2 gap-10 mt-6 md:mt-0">
            <p className="w-auto text-xs md:text-sm">
              Welcome to our sheep farm, where we celebrate local farming
              traditions. Enjoy a curated selection of premium products sourced
              directly from dedicated local producers. With a commitment to
              excellence and efficiency, we ensure swift delivery of our finest
              wool and sheep-derived delicacies to your doorstep, bridging the
              gap between producer and consumer.
            </p>
            <img
              src={"/images/hero-logo.svg"}
              className="md:text-lg lg:size-64"
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
            filteredCards.map((card) =>
              card.status === "sold" ? (
                <div
                  key={card._id}
                  className="block card bg-slate-100 rounded-md shadow"
                >
                  <img
                    className="rounded-t-md object-cover w-full h-40 grayscale blur-[1.5px]"
                    src={card.photos[0].replace(
                      "/upload/",
                      "/upload/c_fill,f_auto,q_auto/"
                    )}
                    alt={card.name}
                    loading="lazy"
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
                    src={card.photos[0].replace(
                      "/upload/",
                      "/upload/c_fill,f_auto,q_auto/"
                    )}
                    alt={card.name}
                    loading="lazy"
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
                </Link>
              )
            )
          ) : (
            <div className="h1-card p-14 col-span-full card bg-slate-100 rounded-md shadow text-center">
              Belum ada produk untuk kategori ini
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
