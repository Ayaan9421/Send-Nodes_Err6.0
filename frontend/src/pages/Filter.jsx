import React, { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Filter.css";
import { Link } from "react-router-dom";

const Filter = () => {
  const [sortBy, setSortBy] = useState("lowest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    gender: [],
    rent: [],
    availability: [],
    capacity: []
  });

  const listings = [
    { id: 1, name: "Vaishali Varadkar", location: "Goregaon East, Mumbai 400065", rent: 11000, 
      images: ["/images/pg1-1.jpg", "/images/pg1-2.jpg", "/images/pg1-3.jpg"], gender: "Ladies", 
      availability: "Available Now", capacity: "Single" },
  
    { id: 2, name: "K K Housing PG", location: "Santacruz East, Mumbai 400055", rent: 12500, 
      images: ["/images/pg 2-1.jpg", "/images/pg 2-2.jpg", "/images/pg 2-3.jpg"], gender: "Unisex", 
      availability: "Fully Occupied", capacity: "Double" },
  
    { id: 3, name: "Sunrise PG", location: "Andheri West, Mumbai 400058", rent: 9000, 
      images: ["/images/pg 3-1.jpg", "/images/pg 3-2.jpg", "/images/pg 3-3.jpg"], gender: "Gents", 
      availability: "Available Now", capacity: "Triple" },
  
    { id: 4, name: "Metro City PG", location: "Bandra East, Mumbai 400051", rent: 15000, 
      images: ["/images/pg 4-1.jpg", "/images/pg 4-2.jpg", "/images/pg 4-3.jpg"], gender: "Ladies", 
      availability: "Available Now", capacity: "Single" },
  
    { id: 5, name: "Comfort Stay PG", location: "Powai, Mumbai 400076", rent: 8000, 
      images: ["/images/pg 5-1.jpg", "/images/pg 5-2.jpg", "/images/pg 5-3.jpg"], gender: "Unisex", 
      availability: "Fully Occupied", capacity: "Double" },
  
    { id: 6, name: "Skyline PG", location: "Thane West, Mumbai 400601", rent: 9500, 
      images: ["/images/pg6-1.jpg", "/images/pg6-2.jpg", "/images/pg6-3.jpg"], gender: "Gents", 
      availability: "Available Now", capacity: "Triple" },
  
    { id: 7, name: "Elite Living PG", location: "Vile Parle, Mumbai 400047", rent: 18000, 
      images: ["/images/pg1-1.jpg", "/images/pg1-2.jpg", "/images/pg1-3.jpg"], gender: "Ladies", 
      availability: "Available Now", capacity: "Single" },
  
    { id: 8, name: "Green Haven PG", location: "Malad West, Mumbai 400064", rent: 7500, 
      images: ["/images/pg 2-1.jpg", "/images/pg 2-2.jpg", "/images/pg 2-3.jpg"], gender: "Unisex", 
      availability: "Fully Occupied", capacity: "Double" },
  
    { id: 9, name: "City Comfort PG", location: "Kurla, Mumbai 400070", rent: 10500, 
      images: ["/images/pg 3-1.jpg", "/images/pg 3-2.jpg", "/images/pg 3-3.jpg"], gender: "Gents", 
      availability: "Available Now", capacity: "Triple" },
  

  ];
  

  const handleFilterChange = (category, value) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(value)
        ? prevFilters[category].filter(item => item !== value)
        : [...prevFilters[category], value]
    }));
  };

  const filteredListings = useMemo(() => {
    return listings.filter(pg => {
      const matchesSearch = pg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            pg.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGender = selectedFilters.gender.length === 0 || selectedFilters.gender.includes(pg.gender);
      const matchesAvailability = selectedFilters.availability.length === 0 || selectedFilters.availability.includes(pg.availability);
      const matchesCapacity = selectedFilters.capacity.length === 0 || selectedFilters.capacity.includes(pg.capacity);
      const matchesRent = selectedFilters.rent.length === 0 || selectedFilters.rent.some(range => {
        if (range === "<5000") return pg.rent < 5000;
        if (range === "5000-7500") return pg.rent >= 5000 && pg.rent <= 7500;
        if (range === "7500-10000") return pg.rent > 7500 && pg.rent <= 10000;
        if (range === ">10000") return pg.rent > 10000;
        return false;
      });

      return matchesSearch && matchesGender && matchesAvailability && matchesCapacity && matchesRent;
    });
  }, [searchQuery, selectedFilters]);

  const sortedListings = useMemo(() => {
    return [...filteredListings].sort((a, b) => (sortBy === "lowest" ? a.rent - b.rent : b.rent - a.rent));
  }, [filteredListings, sortBy]);

  return (
    <div className="pg-container">
      {/* Sidebar Filters */}
      <div className="filters">
        <h3>Filters</h3>

        <h4>Gender</h4>
        {["Male", "Female", "Unisex"].map(gender => (
          <label key={gender}>
            <input type="checkbox" checked={selectedFilters.gender.includes(gender)} 
                   onChange={() => handleFilterChange("gender", gender)} /> {gender}
          </label>
        ))}
        <hr />

        <h4>Monthly Rent</h4>
        {[
          { label: "< 5000", value: "<5000" },
          { label: "5000 - 7,500", value: "5000-7500" },
          { label: "7,500 - 10,000", value: "7500-10000" },
          { label: "> 10,000", value: ">10000" }
        ].map(({ label, value }) => (
          <label key={value}>
            <input type="checkbox" checked={selectedFilters.rent.includes(value)} 
                   onChange={() => handleFilterChange("rent", value)} /> {label}
          </label>
        ))}
        <hr />

        <h4>Availability</h4>
        {["Available Now", "Fully Occupied"].map(availability => (
          <label key={availability}>
            <input type="checkbox" checked={selectedFilters.availability.includes(availability)} 
                   onChange={() => handleFilterChange("availability", availability)} /> {availability}
          </label>
        ))}
        <hr />

        <h4>Capacity</h4>
        {["Single", "Double", "Triple"].map(capacity => (
          <label key={capacity}>
            <input type="checkbox" checked={selectedFilters.capacity.includes(capacity)} 
                   onChange={() => handleFilterChange("capacity", capacity)} /> {capacity}
          </label>
        ))}
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="search-results-container">
          <h2 className="results-count">{filteredListings.length} Results Found</h2>
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search PGs by name or location..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="sort-options">
          <button onClick={() => setSortBy("lowest")} className={sortBy === "lowest" ? "active" : ""}>
            Lowest price first
          </button>
          <button onClick={() => setSortBy("highest")} className={sortBy === "highest" ? "active" : ""}>
            Highest price first
          </button>
        </div>

        {/* Listings with Swiper */}
        <div className="listings">
          {sortedListings.length > 0 ? (
            sortedListings.map((pg, index) => (
              <div key={index} className="pg-card">
                
                {/* Swiper for Images */}
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  className="rounded-lg overflow-hidden"
                >
                  {pg.images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img 
                        src={img} 
                        alt={`PG ${pg.name}`} 
                        className="w-full h-48 object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <h3>{pg.name}</h3>
                <p>{pg.location}</p>
                <p>&#8377; {pg.rent}/month onwards</p>
                <p><strong>Availability:</strong> {pg.availability}</p>
                <p><strong>Capacity:</strong> {pg.capacity}</p>
                <p><strong>Gender:</strong> {pg.gender}</p>
                <Link to={`/pg/${pg.id | 1}`}>
                    <button className="details-btn">View PG Details</button>
                </Link>
              </div>
            ))
          ) : (
            <p className="no-results">No PGs found. Try a different search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
