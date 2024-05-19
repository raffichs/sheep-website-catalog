import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <div className="root">

      <header>
        <nav className='flex justify-center items-center gap-2 p-2 bg-soft-brown'>
          <img src="./src/assets/nav-logo.svg" alt="logo" />
          <span className='md:text-2xl'>BERKAH SUNGU SHEEP</span>
          <Link to={'/login'}>
            <button className="p-2 bg-red-500">
              LOGIN
            </button>
          </Link>
        </nav>
      </header>

      <div>
        <div className="hero mt-5">
          <h1 className='p-2 md:text-4xl'>
            Peternakan Berkah Sungu Sheep
          </h1>
          <div className="desc flex justify-between items-center ps-2 gap-10 mt-6">
            <p className='w-auto md:text-xl'>Welcome to our sheep farm, where we celebrate local farming traditions. Enjoy a curated selection of premium products sourced directly from dedicated local producers. With a commitment to excellence and efficiency, we ensure swift delivery of our finest wool and sheep-derived delicacies to your doorstep, bridging the gap between producer and consumer.</p>
            <img src="./src/assets/hero-logo.svg" alt="hero" />
          </div>
        </div>

        <div className="button-container flex justify-center">
          <button type="button" className='cta px-4 py-3 mt-9 rounded-lg'>
            JELAJAHI TERNAK KAMI
          </button>
        </div>
      </div>

      <main className='catalog mt-10 p-2'>
        <div>
          <h2>Ternak Kami</h2>
          <div className='search bg-white flex px-4 py-2 mt-3 justify-between items-center rounded-xl'>
            <p className='search_text'>
              Pilih Kategori
            </p>
            <button>
              <img src="./src/assets/arrow.svg" alt="arrow" />
            </button>
          </div>
        </div>

        <div className="mt-2 card-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="card bg-gray-500 rounded-2xl flex">
            card
            <img className='rounded-2xl object-cover aspect-square' src="" alt="" />
          </div>
        </div>
      </main>
    </div>
  );
}