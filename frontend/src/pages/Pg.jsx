import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";


const pgList = [
  {
    id: 1,
    name: "Sharma PG",
    location: "Goregaon East, Mumbai",
    price: "₹ 11,000/month",
    rating: 4.5,
    image: "../pg/pg1-1.jpg",
  },
  {
    id: 2,
    name: "Shaikh PG",
    location: "Santacruz East, Mumbai",
    price: "₹ 12,500/month",
    rating: 4.2,
    image: "../pg/pg1-2.jpg",
  },
  {
    id: 3,
    name: "Verma PG",
    location: "Sector 22, Noida",
    price: "₹ 10,000/month",
    rating: 4.8,
    image: "../pg/pg1-5.jpg",
  },
  {
    id: 4,
    name: "Gupta PG",
    location: "Andheri West, Mumbai",
    price: "₹ 9,500/month",
    rating: 4.0,
    image: "../pg/pg1-6.jpg",
  },
];

const Pg = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState("");
  const itemsPerView = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerView >= pgList.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? pgList.length - itemsPerView : prevIndex - 1
    );
  };

  const filteredPGs = pgList.filter((pg) =>
    pg.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-12 rounded-xl shadow-lg overflow-hidden bg-gradient-to-r from-blue-500 to-blue-300 h-80">
        
   
        <div className="flex flex-col items-start md:w-1/2 w-full gap-3 bg-transparent">
          <div className="text-left bg-transparent">
            <h1 className="text-5xl font-extrabold text-black bg-transparent">StuRent </h1>
            <p className="text-lg text-gray-900 mt-1 font-medium bg-transparent">
              More Than a Room, A Home
            </p>
          </div>

          {/* 🔹 Smaller Search Bar */}
          <div className="w-3/4 flex items-center gap-2 bg-white p-1.5 rounded-full shadow-md opacity-90">
            <input
              type="text"
              placeholder="Search PGs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-black px-2 py-1 text-sm focus:outline-none"
            />
            <button className="bg-blue-500 p-1.5 rounded-full hover:bg-blue-600 transition">
              <Search className="bg-transparent" size={16} />
            </button>
          </div>
        </div>

        {/* 🔹 Larger PG Image (Fills the Box) */}
        <div className="md:w-1/2 w-full flex justify-end" id="img-info">
          <img
            src="../pg/pg1-13.jpg"
            alt="PG Building"
            className="w-full h-80 object-cover  shadow-lg opacity-90"
          />
        </div>
      </div>

      {/* 🔹 PG Listings Carousel */}
      <div className="relative text-black w-full flex justify-center mt-10">
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black p-2 rounded-full shadow-md   hover:bg-gray-700 z-10 bg-transparent"
          onClick={prevSlide}
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex gap-6 overflow-hidden w-full px-10 justify-center">
          {filteredPGs
            .slice(currentIndex, currentIndex + itemsPerView)
            .map((pg) => (
              <div
                key={pg.id}
                className="bg-white p-4 rounded-2xl shadow-md w-72 flex flex-col items-center transition-transform transform hover:scale-105"
              >
                <img
                  src={pg.image}
                  alt={pg.name}
                  className="w-full h-44 object-cover rounded-lg"
                />
                <h3 className="font-bold text-lg mt-3">{pg.name}</h3>
                <p className="text-gray-600 text-sm">{pg.location}</p>
                <p className="text-blue-600 font-bold mt-2">{pg.price}</p>
                <p className="text-yellow-500 font-semibold">
                  ⭐ {pg.rating}/5
                </p>

                <Link
                  to={`/pg/${pg.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-3 hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
        </div>

        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black  p-2 rounded-full shadow-md hover:bg-gray-700 z-10 bg-transparent"
          onClick={nextSlide}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Pg;
