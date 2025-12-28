import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';

const HeroSection = ({ onSearch, onFilterTag, activeTag }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Semua Kategori");
  const [price, setPrice] = useState("Harga");

  const handleSearch = () => {
    onSearch({
      term: searchTerm,
      category: category,
      price: price
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategory("Semua Kategori");
    setPrice("Harga");
    onSearch({ term: "", category: "Semua Kategori", price: "Harga" });
    onFilterTag(null); // Clear tag filter
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" id="home">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight animate-fade-in-up">
          Temukan Restoran & Cafe Favorit di <span className="text-primary">Semarang</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-8 font-light max-w-2xl mx-auto">
          Kurasi Spesial dari Food Influencer Terpercaya untuk pengalaman kuliner tak terlupakan.
        </p>

        {/* Search Bar */}
        <div className="bg-white p-2 rounded-xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto backdrop-blur-sm bg-white/95">
          <div className="relative md:w-1/4">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-full bg-transparent px-4 py-3 outline-none text-gray-700 border-b md:border-b-0 md:border-r border-gray-200 appearance-none cursor-pointer"
            >
              <option>Semua Kategori</option>
              <option>Kafe Kekinian</option>
              <option>Restoran Keluarga</option>
              <option>Street Food</option>
              <option>Fine Dining</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
              <Filter size={14} />
            </div>
          </div>
          
          <div className="relative md:w-1/4">
            <select 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-full bg-transparent px-4 py-3 outline-none text-gray-700 border-b md:border-b-0 md:border-r border-gray-200 appearance-none cursor-pointer"
            >
              <option>Harga</option>
              <option value="cheap">Rp 0 - 50K</option>
              <option value="medium">Rp 50K - 100K</option>
              <option value="expensive">Rp 100K+</option>
            </select>
          </div>
          
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Cari Nama Tempat..." 
            className="flex-1 px-4 py-3 outline-none text-gray-700 placeholder-gray-400"
          />

          <button 
            onClick={handleSearch}
            className="bg-primary hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-yellow-600/20"
          >
            <Search size={20} />
            Cari
          </button>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || category !== "Semua Kategori" || price !== "Harga" || activeTag) && (
          <div className="mt-4 flex justify-center items-center gap-2 animate-fade-in">
             <span className="text-gray-300 text-sm">Filter Aktif:</span>
             <button onClick={clearFilters} className="text-white text-sm hover:text-primary flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
               <X size={12} /> Reset Filter
             </button>
          </div>
        )}

        {/* Quick Filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <QuickFilter 
            icon="✨" 
            label="Instagramable" 
            isActive={activeTag === "Instagramable"}
            onClick={() => onFilterTag("Instagramable")}
          />
          <QuickFilter 
            icon="👨‍👩‍👧‍👦" 
            label="Keluarga" 
            isActive={activeTag === "Keluarga"}
            onClick={() => onFilterTag("Keluarga")}
          />
          <QuickFilter 
            icon="💻" 
            label="Cocok Tugas" 
            isActive={activeTag === "Cocok Tugas"}
            onClick={() => onFilterTag("Cocok Tugas")}
          />
          <QuickFilter 
            icon="💘" 
            label="Romantis" 
            isActive={activeTag === "Romantis"}
            onClick={() => onFilterTag("Romantis")}
          />
        </div>
      </div>
    </div>
  );
};

const QuickFilter = ({ icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 ${
      isActive 
        ? 'bg-primary border-primary text-white shadow-lg scale-105' 
        : 'bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-white/40'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span className="font-medium text-sm">{label}</span>
  </button>
);

export default HeroSection;
