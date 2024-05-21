import axios from "axios";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link, useParams } from "react-router-dom";

export default function CardPage() {
  const { id } = useParams();
  const [card, setCard] = useState("");

  useEffect(() => {
    axios.get("/cards/" + id).then(({ data }) => {
      setCard(data);
    });
  }, [id]);

  return (
    <div className="">
      <header>
        <img src="./src/assets/Appbar.svg" alt="" />
      </header>
      <Link
        to={"/"}
        className="flex justify-center items-center absolute aspect-square rounded-full bg-dark-brown opacity-80 text-[10px] p-[2px] m-1 text-white shadow"
      >
        back
      </Link>
      <img src="./src/assets/kambing-img.png" className="w-full" alt="" />

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
          <div className="detail-desc mt-1">
            {card.desc}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3">
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
