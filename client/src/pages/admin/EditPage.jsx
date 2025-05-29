import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PlainHeader from "../../components/PlainHeader";

export default function EditPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [linkPhotos, setLinkPhotos] = useState("");
  const [admin, setAdmin] = useState(null);
  const [redirect, setRedirect] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (!admin) {
      axios
        .get("/admin")
        .then(({ data }) => {
          if (data) {
            setAdmin(data);
          } else {
            setRedirect("/login");
          }
        })
        .catch((error) => {
          console.error("Error fetching admin data: ", error);
          setRedirect("/login");
        });
    }
  }, [admin]);

  useEffect(() => {
    axios
      .get("/cards/" + id)
      .then(({ data }) => {
        setName(data.name);
        setPrice(data.price);
        setType(data.type);
        setAge(data.age);
        setHeight(data.height);
        setWeight(data.weight);
        setColor(data.color);
        setDesc(data.desc);
        setCategory(data.category);
        setStatus(data.status);
        setAddedPhotos(data.photos);
      })
      .catch((error) => {
        console.error("Error fetching card data:", error);
      });
  }, [id]);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (!name) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    if (!linkPhotos) {
      alert("Link cannot be empty");
      return;
    }

    try {
      setIsLoading(true);

      const { data: filename } = await axios.post("/upload-by-link", {
        link: linkPhotos,
      });

      setAddedPhotos((prev) => {
        return [...prev, filename];
      });
      setLinkPhotos("");
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Failed to upload photo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function uploadPhoto(ev) {
    setIsLoading(true);

    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      })
      .catch((error) => {
        console.error("Error uploading photos:", error);
        alert("Failed to upload photos. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleStatus(ev) {
    setStatus(ev.target.value);
  }

  function handleCategory(ev) {
    setCategory(ev.target.value);
  }

  function handleType(ev) {
    setType(ev.target.value);
  }

  async function editCard(ev) {
    ev.preventDefault();
    try {
      await axios.put("/edit/" + id, {
        name,
        price,
        type,
        age,
        height,
        weight,
        color,
        desc,
        category,
        status,
        photos: addedPhotos,
      });
      setRedirect("/admin");
    } catch (error) {
      console.error("Error updating card: ", error);
    }
  }

  const deleteCard = async () => {
    const confirm = window.confirm(
      "Apakah anda yakin ingin menghapus domba ini?"
    );
    if (confirm) {
      try {
        await axios.delete("/delete/" + id);
        setRedirect("/admin");
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  function removePhoto(filename) {
    const confirm = window.confirm("Hapus foto?");
    if (confirm) {
      setAddedPhotos((prevPhotos) =>
        prevPhotos.filter((photo) => photo !== filename)
      );

      axios
        .delete("/remove", { data: { filename } })
        .then((response) => {
          console.log("Photo deleted successfully: ", response.data);
        })
        .catch((error) => {
          console.error("Error deleting photo: ", error);
        });
    }
  }

  function starPhoto(filename) {
    setAddedPhotos((prevPhotos) => {
      const updatedPhotos = prevPhotos.filter((photo) => photo !== filename);
      return [filename, ...updatedPhotos];
    });
  }

  return (
    <div>
      <PlainHeader />

      <div className="mt-2 p-2 md:max-w-4xl md:m-auto">
        <div className="flex justify-between">
          <Link
            to={"/admin"}
            className="bg-gradient py-2 px-4 label w-auto text-white rounded-md"
          >
            Kembali
          </Link>
          <div className="admin bg-gradient py-2 px-3 rounded-xl">ADMIN</div>
        </div>
        <form className="mt-3" onSubmit={editCard}>
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
            <label htmlFor="price" className="flex items-end">
              Harga{" "}
              <div className=" flex item-center text-gray-500 text-[12px]">
                &nbsp;(ex: 2500000)
              </div>
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="type">Jenis Domba</label>
            <select
              name=""
              id="type"
              className="input"
              value={type}
              onChange={handleType}
            >
              <option value="" disabled selected hidden></option>
              <option value="Dugul">Dugul</option>
              <option value="Tanduk">Tanduk</option>
            </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="age" className="flex items-center">
              Usia{" "}
              <div className=" flex item-center text-gray-500 text-[12px]">
                &nbsp;(dalam bulan)
              </div>
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(ev) => setAge(ev.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="height" className="flex items-center">
              Tinggi Badan{" "}
              <div className=" flex item-center text-gray-500 text-[12px]">
                &nbsp;(cm)
              </div>
            </label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(ev) => setHeight(ev.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="weight" className="flex items-center">
              Berat Badan{" "}
              <div className=" flex item-center text-gray-500 text-[12px]">
                &nbsp;(kg)
              </div>
            </label>
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
            <select
              name=""
              id="category"
              className="input"
              value={category}
              onChange={handleCategory}
            >
              <option value="" disabled selected hidden></option>
              <option value="Murah">Murah</option>
              <option value="Sedang">Sedang</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          <div className="grid grid-cols-2 mt-2">
            <div className="label">Status</div>
            <div className="grid grid-cols-2">
              <div className="flex gap-2">
                <input
                  className="w-4"
                  type="radio"
                  value="active"
                  name="status"
                  checked={status === "active"}
                  onChange={handleStatus}
                />{" "}
                <label htmlFor="active">Aktif</label>
              </div>
              <div className="flex gap-2">
                <input
                  className="w-4"
                  type="radio"
                  value="sold"
                  name="status"
                  checked={status === "sold"}
                  onChange={handleStatus}
                />{" "}
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
          <div className="mt-2 gap-2 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6">
            {addedPhotos.length > 0 &&
              addedPhotos.map((link) => (
                <div className="flex relative h-30" key={link}>
                  <img
                    className="rounded-xl w-full object-cover h-28"
                    src={link.replace(
                      "/upload/",
                      "/upload/c_fill,f_auto,q_auto/"
                    )}
                    alt=""
                  />
                  <div
                    onClick={() => removePhoto(link)}
                    className="cursor-pointer absolute bottom-1 right-1 bg-black bg-opacity-50 py-1 px-2 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 9 9"
                      fill="none"
                    >
                      <path
                        d="M1.83331 9C1.55831 9 1.32298 8.90217 1.12731 8.7065C0.931646 8.51083 0.833646 8.27533 0.833313 8V1.5H0.333313V0.5H2.83331V0H5.83331V0.5H8.33331V1.5H7.83331V8C7.83331 8.275 7.73548 8.5105 7.53981 8.7065C7.34415 8.9025 7.10865 9.00033 6.83331 9H1.83331ZM6.83331 1.5H1.83331V8H6.83331V1.5ZM2.83331 7H3.83331V2.5H2.83331V7ZM4.83331 7H5.83331V2.5H4.83331V7Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div
                    onClick={() => starPhoto(link)}
                    className="cursor-pointer absolute bottom-1 left-1 bg-black bg-opacity-50 py-1 px-2 rounded-full"
                  >
                    {link === addedPhotos[0] && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-[10px] text-white"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {link !== addedPhotos[0] && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="size-[10px] text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            <div
              className={
                isLoading ? "flex justify-center items-center" : "hidden"
              }
            >
              <div className="spinner w-10 h-10"></div>
            </div>
            <label className="label h-30 flex w-auto items-center justify-center border border-gray-600 bg-transparent rounded-xl px-2 py-8 cursor-pointer">
              <input
                type="file"
                multiple
                className="hidden"
                name=""
                id=""
                onChange={uploadPhoto}
              />
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
            </label>
          </div>
          <div className="flex gap-4">
            <div
              onClick={deleteCard}
              className="flex justify-center items-center bg-red-700 label w-12 text-white py-1 px-3 mt-10 rounded-lg text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
            <button className="bg-gradient label w-full text-white p-3 mt-10 rounded-lg">
              EDIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
