import axios from "axios";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CardPage() {
  const [card, setCard] = useState(null);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 11) {
      return "pagi";
    } else if (hour >= 11 && hour < 15) {
      return "siang";
    } else if (hour >= 15 && hour < 18) {
      return "sore";
    } else {
      return "malam";
    }
  };

  useEffect(() => {
    axios
      .get("/cards/" + id)
      .then(({ data }) => {
        setCard(data);
        const greeting = getGreeting();
        setMessage(
          encodeURI(
            `Halo, selamat ${greeting}! saya tertarik dengan ${card.name}. Bisa minta info lebih lanjut?`
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching card data:", error);
      });
  }, [id, card]);

  const whatsappUrl = `https://wa.me/6282324019042?text=${message}`;

  const handleBackClick = () => {
    navigate(-1);
  };

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
        <div
          onClick={handleBackClick}
          className="flex justify-center items-center top-[18px] absolute aspect-square rounded-full p-[2px] ml-2 "
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
        <nav className="flex justify-center items-center gap-2 p-2 bg-dark-green">
          <img src="./src/assets/appbar-logo.svg" alt="logo" />
          <span className="md:text-2xl">PETERNAK NING SALATIGA</span>
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
          <a
            href={whatsappUrl}
            target="_blank"
            className="flex bg-gradient justify-center items-center detail-button col-span-1 p-1 rounded-md"
          >
            Hubungi&nbsp;Kami
          </a>
        </div>
      </div>
    </div>
  );
}
