import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import { NumericFormat } from "react-number-format";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function CardPage() {
  const [card, setCard] = useState(null);
  const [message, setMessage] = useState("");
  const { id } = useParams();

  const getGreeting = useCallback(() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 11) return "pagi";
    if (hour >= 11 && hour < 15) return "siang";
    if (hour >= 15 && hour < 18) return "sore";
    return "malam";
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("/cards/" + id)
      .then(({ data }) => {
        setCard(data);
      })
      .catch((error) => {
        console.error("Error fetching card data:", error);
      });

    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    if (card) {
      const greeting = getGreeting();
      setMessage(
        encodeURI(
          `Halo, selamat ${greeting}! Saya tertarik dengan ${card.name}. Bisa minta info lebih lanjut?`
        )
      );
    }
  }, [card, getGreeting]);

  const whatsappUrl = useMemo(
    () => `https://wa.me/6282324019042?text=${message}`,
    [message]
  );

  const specsSection = useMemo(
    () => (
      <div className="mt-2 px-2">
        <div className="detail-heading md:text-xl">Spesifikasi</div>
        <div className="flex gap-8 mt-1 ml-5">
          <ul className="flex flex-col items-start md:gap-1">
            <li className="detail-specs-name md:text-base">Jenis Domba</li>
            <li className="detail-specs-name md:text-base">Usia</li>
            <li className="detail-specs-name md:text-base">Tinggi Badan</li>
            <li className="detail-specs-name md:text-base">Berat Badan</li>
            <li className="detail-specs-name md:text-base">Warna</li>
          </ul>
          <ul className="flex flex-col items-start md:gap-1">
            <li className="detail-specs md:text-base">{card?.type}</li>
            <li className="detail-specs md:text-base">{card?.age} Bulan</li>
            <li className="detail-specs md:text-base">{card?.height} cm</li>
            <li className="detail-specs md:text-base">{card?.weight} kg</li>
            <li className="detail-specs md:text-base">{card?.color}</li>
          </ul>
        </div>
      </div>
    ),
    [card?.type, card?.age, card?.height, card?.weight, card?.color]
  );

  const descriptionSection = useMemo(
    () => (
      <div className="mt-3 px-2">
        <div className="detail-heading md:text-xl">Deskripsi</div>
        <div className="detail-desc mt-1 md:text-base">{card?.desc}</div>
      </div>
    ),
    [card?.desc]
  );

  if (!card) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="">
      <Header />

      <div className="md:flex md:max-w-4xl md:m-auto md:mt-2 lg:mt-7 md:px-4 lg:px-0">
        <div>
          {card.photos && card.photos.length > 0 && (
            <Carousel showThumbs={false} className="md:mt-5 md:w-[30rem]">
              {card.photos.map((photo, index) => (
                <div key={index} className="">
                  <img
                    src={card.photos[0].replace(
                      "/upload/",
                      "/upload/c_fill,f_auto,q_auto/"
                    )}
                    loading="lazy"
                    className="w-full h-72 md:h-[20rem] object-contain bg-gradient-to-r from-gray-600 to-gray-400"
                    alt={`${card.name} ${index + 1}`}
                  />
                </div>
              ))}
            </Carousel>
          )}

          <div className="flex justify-between mt-3 px-2 md:px-0 md:mt-7">
            <div className="detail-name md:text-2xl">{card.name}</div>
            <div className="detail-price">
              <NumericFormat
                value={card.price}
                displayType={"text"}
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp "
                suffix=",-"
                renderText={(formattedValue) => (
                  <span className="detail-price md:text-xl">
                    {formattedValue}
                  </span>
                )}
              />
            </div>
          </div>
        </div>

        <div className="md:pt-2 pl-4 lg:pl-20">
          {specsSection}
          {descriptionSection}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-4 md:gap-8 px-2 md:px-4 lg:px-0 pb-5 md:mt-14 md:max-w-4xl md:m-auto">
        <div className="detail-heading col-span-2 cw-auto md:text-base">
          Hubungi kami melalui whatsapp untuk info lebih lanjut terkait kambing
          ini
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          className="flex bg-gradient justify-center items-center detail-button col-span-1 p-1 md:py-2 rounded-md md:text-base"
        >
          Hubungi&nbsp;Kami
        </a>
      </div>

      <Footer />
    </div>
  );
}
