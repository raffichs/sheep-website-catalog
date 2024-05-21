import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";

export default function IndexPage() {
  const [cards, setCard] = useState(null);

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

  if (!cards) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <header>
        {/* <nav className="flex justify-center items-center gap-2 p-2 bg-soft-brown">
          <img src="./src/assets/nav-logo.svg" alt="logo" />
          <span className="md:text-2xl">BERKAH SUNGU SHEEP</span>
          <Link to={"/login"}>
            <button className="bg-gradient label w-auto text-white text-sm p-1 rounded-md">
              login
            </button>
          </Link>
        </nav> */}
        <img src="./src/assets/Appbar.svg" alt="" />
      </header>

      <div>
        <div className="hero mt-5">
          <h1 className="p-2 md:text-4xl">Peternakan Berkah Sungu Sheep</h1>
          <div className="desc flex justify-between items-center ps-2 gap-10 mt-6">
            <p className="w-auto md:text-xl">
              Welcome to our sheep farm, where we celebrate local farming
              traditions. Enjoy a curated selection of premium products sourced
              directly from dedicated local producers. With a commitment to
              excellence and efficiency, we ensure swift delivery of our finest
              wool and sheep-derived delicacies to your doorstep, bridging the
              gap between producer and consumer.
            </p>
            <img src="./src/assets/hero-logo.svg" alt="hero" />
          </div>
        </div>

        <div className="button-container flex justify-center">
          <a href="#main">
            <button
              type="button"
              className="bg-gradient cta px-4 py-3 mt-9 rounded-lg"
            >
              JELAJAHI TERNAK KAMI
            </button>
          </a>
        </div>
      </div>

      <main id="main" className="catalog mt-10 p-2">
        <div>
          <h2>Ternak Kami</h2>
          <div className="search bg-white flex px-4 py-2 mt-3 justify-between items-center rounded-xl">
            <p className="search_text">Pilih Kategori</p>
            <button>
              <img src="./src/assets/arrow.svg" alt="arrow" />
            </button>
          </div>
        </div>

        <div className="mt-2 gap-2 card-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cards.map((card) => (
            <Link
              to={"/card/" + card._id}
              key={card._id}
              className="block card bg-slate-100 rounded-md shadow"
            >
              <img
                className="rounded-t-md object-cover w-full h-28"
                src={"http://localhost:3001/uploads/" + card.photos[0]}
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
                  BELI SEKARANG
                </button>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="mt-5">
        <img src="./src/assets/Footer.svg" alt="" />
      </footer>
    </div>
  );
}
