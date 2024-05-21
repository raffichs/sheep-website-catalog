import axios from "axios";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

export default function AdminPage() {

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
    <div className="root">
      <header>
        {/* <nav className="flex justify-center items-center gap-2 p-2 bg-soft-brown">
          <img src="./src/assets/nav-logo.svg" alt="logo" />
          <span className="md:text-2xl">BERKAH SUNGU SHEEP</span> */}
        {/* <span className='bg-dark-brown text-white p-2 rounded-lg md:text-md'>ADMIN</span> */}
        {/* <Link to={"/"}>
            <button className="p-2 bg-red-500">LOG OUT</button>
          </Link> */}
        {/* </nav> */}
        <img src="./src/assets/Appbar.png" alt="" />
      </header>

      <main className="catalog mt-2 p-2">
        <div>
          <div className="flex justify-between">
            <h2>Admin Page</h2>
            <Link
              to={"/add"}
              className="add-cta bg-gradient py-2 px-5 rounded-md"
            >
              TAMBAH
            </Link>
          </div>
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
              to={"/edit" + card._id}
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
                  EDIT
                </button>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
