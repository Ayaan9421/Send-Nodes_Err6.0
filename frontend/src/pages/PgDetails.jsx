import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// PG List with latitude and longitude
const pgList = [
  {
    id: 1,
    name: "Sharma PG",
    location: "19/1923, Nalanda Chs, Goregaon East, Mumbai",
    price: "₹ 11,000/month",
    owner: "Raj Sharma",
    latitude: 19.1621,
    longitude: 72.8497,
    images: ["/pg/pg1-1.jpg", "/pg/pg1-2.jpg", "/pg/pg1-5.jpg"],
    amenities: ["Wi-Fi", "Air Conditioning", "CCTV Security", "Laundry", "Parking", "24/7 Water Supply"],
    reviews: ["Great place, very clean!", "Safe and comfortable."],
  },
  {
    id: 2,
    name: "Shaikh PG",
    location: "Vakola, Santacruz East, Mumbai, Maharashtra 400055",
    price: "₹ 12,500/month",
    owner: "Mohd Shaikh",
    latitude: 19.0853,
    longitude: 72.8523,
    images: ["/pg/pg1-6.jpg", "/pg/pg1-7.jpg"],
    amenities: ["Wi-Fi", "CCTV Security", "Laundry"],
    reviews: ["Cozy place, well maintained."],
  },
  {
    id: 3,
    name: "Elite Residency PG",
    location: "Andheri West, Mumbai",
    price: "₹ 14,000/month",
    owner: "Amit Patel",
    latitude: 19.1292,
    longitude: 72.8311,
    images: ["/pg/pg 1-10.jpg", "/pg/pg 1-11.jpg"],
    amenities: ["Wi-Fi", "Gym", "Parking"],
    reviews: ["Luxury PG, amazing experience!"],
  },
  {
    id: 4,
    name: "Sharma PG",
    location: "19/1923, Nalanda Chs, Goregaon East, Mumbai",
    price: "₹ 11,000/month",
    owner: "Raj Sharma",
    latitude: 19.1621,
    longitude: 72.8497,
    images: ["/pg/pg1-1.jpg", "/pg/pg1-2.jpg", "/pg/pg1-5.jpg"],
    amenities: ["Wi-Fi", "Air Conditioning", "CCTV Security", "Laundry", "Parking", "24/7 Water Supply"],
    reviews: ["Great place, very clean!", "Safe and comfortable."],
  },
  {
    id: 5,
    name: "Shaikh PG",
    location: "Vakola, Santacruz East, Mumbai, Maharashtra 400055",
    price: "₹ 12,500/month",
    owner: "Mohd Shaikh",
    latitude: 19.0853,
    longitude: 72.8523,
    images: ["/pg/pg1-6.jpg", "/pg/pg1-7.jpg"],
    amenities: ["Wi-Fi", "CCTV Security", "Laundry"],
    reviews: ["Cozy place, well maintained."],
  },
  {
    id: 6,
    name: "Elite Residency PG",
    location: "Andheri West, Mumbai",
    price: "₹ 14,000/month",
    owner: "Amit Patel",
    latitude: 19.1292,
    longitude: 72.8311,
    images: ["/pg/pg 1-10.jpg", "/pg/pg 1-11.jpg"],
    amenities: ["Wi-Fi", "Gym", "Parking"],
    reviews: ["Luxury PG, amazing experience!"],
  },
  {
    id: 7,
    name: "Sharma PG",
    location: "19/1923, Nalanda Chs, Goregaon East, Mumbai",
    price: "₹ 11,000/month",
    owner: "Raj Sharma",
    latitude: 19.1621,
    longitude: 72.8497,
    images: ["/pg/pg1-1.jpg", "/pg/pg1-2.jpg", "/pg/pg1-5.jpg"],
    amenities: ["Wi-Fi", "Air Conditioning", "CCTV Security", "Laundry", "Parking", "24/7 Water Supply"],
    reviews: ["Great place, very clean!", "Safe and comfortable."],
  },
  {
    id: 8,
    name: "Shaikh PG",
    location: "Vakola, Santacruz East, Mumbai, Maharashtra 400055",
    price: "₹ 12,500/month",
    owner: "Mohd Shaikh",
    latitude: 19.0853,
    longitude: 72.8523,
    images: ["/pg/pg1-6.jpg", "/pg/pg1-7.jpg"],
    amenities: ["Wi-Fi", "CCTV Security", "Laundry"],
    reviews: ["Cozy place, well maintained."],
  },
  {
    id: 9,
    name: "Elite Residency PG",
    location: "Andheri West, Mumbai",
    price: "₹ 14,000/month",
    owner: "Amit Patel",
    latitude: 19.1292,
    longitude: 72.8311,
    images: ["/pg/pg 1-10.jpg", "/pg/pg 1-11.jpg"],
    amenities: ["Wi-Fi", "Gym", "Parking"],
    reviews: ["Luxury PG, amazing experience!"],
  },
];

const PGDetails = () => {
  const { id } = useParams();
  const pg = pgList.find((item) => item.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(null);

  if (!pg) {
    return <div className="text-center text-red-500 text-lg">PG not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section - Images and Details */}
        <div className="md:col-span-2">
          {/* Swiper Image Slider */}
          <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="w-full h-64 rounded-lg shadow-lg">
            {pg.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`PG Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Image Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]"
              onClick={() => setSelectedImage(null)} // Close on backdrop click
            >
              <div className="relative p-4 bg-white rounded-lg shadow-lg max-w-4xl w-full flex flex-col items-center z-[110]" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-3 right-3 text-gray-700 text-2xl font-bold hover:text-red-600" onClick={() => setSelectedImage(null)}>
                  ✖
                </button>
                <img src={selectedImage} alt="Selected PG" className="max-w-full max-h-[80vh] object-contain rounded-lg" />
              </div>
            </div>
          )}

          {/* Amenities Section */}
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Amenities</h2>
            <div className="grid grid-cols-2 gap-2">
              {pg.amenities.map((amenity, index) => (
                <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm">
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Reviews</h2>
            {pg.reviews.map((review, index) => (
              <p key={index} className="text-gray-600 italic">"{review}"</p>
            ))}
          </div>
        </div>

        {/* Right Section - Map, Owner Info, Rent & Address */}
        <div>
          {/* OpenStreetMap Integration */}
          {!selectedImage && ( // Hide map when modal is open
            <div className="w-full h-64 bg-gray-200 rounded-lg relative z-10">
              <MapContainer center={[pg.latitude, pg.longitude]} zoom={15} className="w-full h-full rounded-lg">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[pg.latitude, pg.longitude]}>
                  <Popup>{pg.name}<br />{pg.location}</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}

          {/* Owner Info Card */}
          <div className="bg-white shadow-lg p-4 rounded-lg mt-4 relative z-20">
            <h3 className="text-lg text-black font-semibold">Owner Information</h3>
            <p className="text-black">{pg.owner}</p>
          </div>

          {/* Rent & Address */}
          <div className="bg-white shadow-lg p-4 rounded-lg mt-4 relative z-20">
            <h3 className="text-lg font-semibold">{pg.name}</h3>
            <p className="text-gray-600">{pg.location}</p>
            <p className="text-blue-600 font-bold mt-2">{pg.price}</p>
            <p className="text-blue-700 font-bold mt-2">Contact No. 9987210344</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PGDetails;
