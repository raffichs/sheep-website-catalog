import { Link } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="root">
      <header>
        <nav className="flex justify-center items-center gap-2 p-2 bg-soft-brown">
          <img src="./src/assets/nav-logo.svg" alt="logo" />
          <span className="md:text-2xl">BERKAH SUNGU SHEEP</span>
          {/* <span className='bg-dark-brown text-white p-2 rounded-lg md:text-md'>ADMIN</span> */}
          <Link to={"/"}>
            <button className="p-2 bg-red-500">LOG OUT</button>
          </Link>
        </nav>
      </header>

      <main className="catalog mt-2 p-2">
        <div>
          <div className="flex justify-between">
            <h2>Admin Page</h2>
            <Link to={"/add"} className="add-cta bg-gradient py-2 px-5 rounded-md">TAMBAH</Link>
          </div>
          <div className="search bg-white flex px-4 py-2 mt-3 justify-between items-center rounded-xl">
            <p className="search_text">Pilih Kategori</p>
            <button>
              <img src="./src/assets/arrow.svg" alt="arrow" />
            </button>
          </div>
        </div>

        <div className="mt-2 card-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="card bg-gray-500 rounded-2xl flex">
            card
            <img
              className="rounded-2xl object-cover aspect-square"
              src=""
              alt=""
            />
          </div>
        </div>
      </main>
    </div>
  );
}
