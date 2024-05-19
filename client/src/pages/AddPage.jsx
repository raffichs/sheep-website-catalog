import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  // const [ type, setType ] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [desc, setDesc] = useState("");
  // const [ category, setCategory ] = useState("");
  // const [ status, setStatus ] = useState("");
  const [ addedPhotos, setAddedPhotos ] = useState([]);
  const [linkPhotos, setLinkPhotos] = useState("");

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data:filename } = await axios.post("/upload-by-link", { link: linkPhotos });

    setAddedPhotos(prev => {
      return [...prev, filename];
    });
    setLinkPhotos('');
  }

  return (
    <div>
      <header>
        <nav className="flex justify-center items-center gap-2 p-2 bg-soft-brown">
          <img src="./src/assets/nav-logo.svg" alt="logo" />
          <span className="md:text-2xl">BERKAH SUNGU SHEEP</span>
          <div className="admin bg-gradient py-2 px-3 rounded-xl">ADMIN</div>
        </nav>
      </header>

      <div className="mt-2 p-2">
        <Link
          to={"/admin"}
          className="bg-gradient py-2 px-4 label w-auto text-white rounded-md"
        >
          Kembali
        </Link>
        <form className="mt-3">
          <div className="flex items-center">
            <label htmlFor="name">Nama</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="price">Harga</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="type">Jenis Domba</label>
            <select name="" id="type" className="input">
              <option value="" disabled selected hidden></option>
              <option value="">jenis 1</option>
              <option value="">jenis 2</option>
              <option value="">jenis 3</option>
            </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="age">Usia</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(ev) => setAge(ev.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="height">Tinggi Badan</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(ev) => setHeight(ev.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="weight">Berat Badan</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(ev) => setWeight(ev.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="color">Warna</label>
            <input
              type="text"
              id="color"
              value={color}
              onChange={(ev) => setColor(ev.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="desc">Deskripsi</label>
            <textarea
              name=""
              id="desc"
              value={desc}
              onChange={(ev) => setDesc(ev.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center">
            <label htmlFor="category">Kategori Domba</label>
            <select name="" id="category" className="input">
              <option value="" disabled selected hidden></option>
              <option value="">kategori 1</option>
              <option value="">kategori 2</option>
              <option value="">kategori 3</option>
            </select>
          </div>
          <div className="grid grid-cols-2 mt-2">
            <div className="label">Status</div>
            <div className="grid grid-cols-2">
              <div className="flex gap-2">
                <input className="w-4" type="radio" id="active" name="status" />{" "}
                <label htmlFor="active">Aktif</label>
              </div>
              <div className="flex gap-2">
                <input className="w-4" type="radio" id="sold" name="status" />{" "}
                <label htmlFor="sold">Sold&nbsp;Out</label>
              </div>
            </div>
          </div>
          <div className="label mt-3">Tambah Foto</div>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="text"
              placeholder="kambing.jpg"
              value={linkPhotos}
              onChange={(ev) => setLinkPhotos(ev.target.value)}
            />
            <button
              onClick={addPhotoByLink}
              className="bg-gradient label text-white px-2 rounded-md w-[6rem] h-[26.67px]"
            >
              Tambah
            </button>
          </div>
          <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos.length > 0 && addedPhotos.map(link => (
              <div key={linkPhotos}>
                {link}
              </div>
            ))}
            <button className="label flex w-auto items-center justify-center border border-gray-600 bg-transparent rounded-xl px-2 py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                // className="md:w-20 md:h-20"
                width="18"
                height="18"
                viewBox="0 0 14 13"
                fill="none"
              >
                <path
                  d="M7.00001 4.99999V11.75M7.00001 4.99999L9.25001 7.24999M7.00001 4.99999L4.75001 7.24999M11.125 8.74999C12.2643 8.74999 13 7.82674 13 6.68749C13 6.23645 12.8521 5.79786 12.579 5.43889C12.3059 5.07993 11.9227 4.82037 11.488 4.69999C11.4211 3.85883 11.0725 3.06481 10.4985 2.44631C9.92454 1.8278 9.15872 1.42096 8.32489 1.29156C7.49106 1.16215 6.63796 1.31776 5.9035 1.7332C5.16905 2.14865 4.59618 2.79966 4.27751 3.58099C3.60658 3.395 2.88925 3.48316 2.28332 3.82607C1.67739 4.16898 1.2325 4.73856 1.04651 5.40949C0.860529 6.08042 0.948689 6.79775 1.2916 7.40368C1.63451 8.00961 2.20408 8.4545 2.87501 8.64049"
                  stroke="black"
                  strokeOpacity="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              &nbsp; Upload
            </button>
          </div>
          <button className="bg-gradient label w-full text-white p-3 mt-10 rounded-lg">
            TAMBAH
          </button>
        </form>
      </div>
    </div>
  );
}
