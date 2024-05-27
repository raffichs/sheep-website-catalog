import axios from "axios";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

export default function CardPage() {
  const [card, setCard] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/cards/" + id)
      .then(({ data }) => {
        setCard(data);
      })
      .catch((error) => {
        console.error("Error fetching card data:", error);
      });
  }, [id]);

  if (!card) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="">
      <header>
        <Link
          to={"/#main"}
          className="flex justify-center items-center top-5  absolute aspect-square rounded-full bg-dark-brown opacity-80 text-[10px] p-[2px] ml-2 text-white shadow"
        >
          back
        </Link>
        <nav className="flex justify-center items-center gap-2 p-2 bg-dark-green">
          <img src="./src/assets/appbar-logo.svg" alt="logo" />
          <span className="md:text-2xl">BERKAH SUNGU SHEEP</span>
        </nav>
      </header>

      {card.photos && card.photos.length > 0 && (
        <Carousel showThumbs={false}>
          {card.photos.map((photo, index) => (
            <div key={index}>
              <img
                src={`http://localhost:3001/uploads/${photo}`}
                className="w-full h-72 object-cover bg-gray-400"
                alt={`${card.name} ${index + 1}`}
              />
            </div>
          ))}
        </Carousel>
      )}

      <div className="px-2 pb-5">
        <div className="flex justify-between mt-3">
          <div className="detail-name">{card.name}</div>
          <div className="detail-price">
            <NumericFormat
              value={card.price}
              displayType={"text"}
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
              suffix=",-"
              renderText={(formattedValue) => (
                <span className="detail-price">{formattedValue}</span>
              )}
            />
          </div>
        </div>

        <div className="mt-2">
          <div className="detail-heading">Spesifikasi</div>
          <div className="flex gap-8 mt-1 ml-5">
            <ul className="flex flex-col items-start">
              <li className="detail-specs-name">Jenis Domba</li>
              <li className="detail-specs-name">Usia</li>
              <li className="detail-specs-name">Tinggi Badan</li>
              <li className="detail-specs-name">Berat Badan</li>
              <li className="detail-specs-name">Warna</li>
            </ul>
            <ul className="flex flex-col items-start">
              <li className="detail-specs">{card.type}</li>
              <li className="detail-specs">{card.age} Bulan</li>
              <li className="detail-specs">{card.height} cm</li>
              <li className="detail-specs">{card.weight} kg</li>
              <li className="detail-specs">{card.color}</li>
            </ul>
          </div>
        </div>

        <div className="mt-3">
          <div className="detail-heading">Deskripsi</div>
          <div className="detail-desc mt-1">{card.desc}</div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-4">
          <div className="detail-heading col-span-2 cw-auto">
            Hubungi Kami melalui Whatsapp Untuk info lebih lanjut terkait
            kambing ini
          </div>
          <button className="bg-gradient detail-button col-span-1 p-1 rounded-md">
            Hubungi&nbsp;Kami
          </button>
        </div>
      </div>
    </div>
  );
}
