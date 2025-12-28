import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CafeCard from './components/CafeCard';
import CategorySection from './components/CategorySection';
import MapPromoSection from './components/MapPromoSection';
import Footer from './components/Footer';
import Loading from './components/Loading';
import CafeDetailModal from './components/CafeDetailModal';
import { ToastProvider } from './components/Toast';
import { fetchData } from './services/mockApi';

function App() {
  const [data, setData] = useState({ cafes: [], categories: [], promos: [] });
  const [loading, setLoading] = useState(true);
  
  // Filtering States
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [searchParams, setSearchParams] = useState({ term: "", category: "Semua Kategori", price: "Harga" });
  const [activeTag, setActiveTag] = useState(null);
  
  // Modal State
  const [selectedCafe, setSelectedCafe] = useState(null);

  useEffect(() => {
    // Simulate fetching data from an API
    const loadData = async () => {
      try {
        const result = await fetchData();
        setData(result);
        setFilteredCafes(result.cafes); // Initial data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter Logic
  useEffect(() => {
    if (!data.cafes.length) return;

    let result = data.cafes;

    // Filter by Search Term
    if (searchParams.term) {
      const term = searchParams.term.toLowerCase();
      result = result.filter(cafe => 
        cafe.name.toLowerCase().includes(term) || 
        cafe.location.toLowerCase().includes(term)
      );
    }

    // Filter by Category
    if (searchParams.category && searchParams.category !== "Semua Kategori") {
      result = result.filter(cafe => cafe.category === searchParams.category);
    }

    // Filter by Price
    if (searchParams.price && searchParams.price !== "Harga") {
      result = result.filter(cafe => {
        // Parse "Rp 50K - 100K" -> 50
        const priceString = cafe.priceRange.split('-')[0].replace(/[^0-9]/g, '');
        const price = parseInt(priceString);
        
        if (searchParams.price === "cheap") return price <= 50; // < 50K
        if (searchParams.price === "medium") return price > 50 && price <= 100; // 50K - 100K
        if (searchParams.price === "expensive") return price > 100; // > 100K
        return true;
      });
    }

    // Filter by Tag (Quick Filters)
    if (activeTag) {
      result = result.filter(cafe => cafe.tags.includes(activeTag));
    }

    // Default View Logic: Show only High Rated / Popular if no filter is active
    const isFiltering = searchParams.term || 
                        searchParams.category !== "Semua Kategori" || 
                        searchParams.price !== "Harga" || 
                        activeTag;

    if (!isFiltering) {
      // Show only top rated cafes (e.g., rating >= 4.7) as default recommendations
      result = result.filter(cafe => cafe.rating >= 4.7);
      // Optional: Sort by rating descending
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredCafes(result);
  }, [searchParams, activeTag, data.cafes]);

  const handleSearch = (params) => {
    setSearchParams(params);
    // Scroll to recommendation section if searching
    if (params.term || params.category !== "Semua Kategori") {
      document.getElementById('rekomendasi')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTagFilter = (tag) => {
    if (activeTag === tag) {
      setActiveTag(null); // Toggle off
    } else {
      setActiveTag(tag);
      document.getElementById('rekomendasi')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (categoryName) => {
    setSearchParams(prev => ({ ...prev, category: categoryName }));
    document.getElementById('rekomendasi')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ToastProvider>
      <div className="min-h-screen font-sans">
        <Navbar />
        
        <main>
          <HeroSection 
            onSearch={handleSearch} 
            onFilterTag={handleTagFilter}
            activeTag={activeTag}
            currentFilters={searchParams}
          />

          {/* Categories */}
          <CategorySection 
            categories={data.categories} 
            onSelectCategory={handleCategorySelect}
          />

          {/* Recommendations */}
          <section className="py-12 bg-white" id="rekomendasi">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-end mb-8">
                 <div>
                  <h2 className="text-3xl font-serif font-bold text-secondary mb-2">
                    {searchParams.term || activeTag || searchParams.category !== "Semua Kategori" || searchParams.price !== "Harga"
                      ? "Hasil Pencarian" 
                      : "Rekomendasi Terbaik Pilihan Editor"}
                  </h2>
                  <p className="text-gray-500">
                    Menampilkan {filteredCafes.length} tempat kuliner 
                    {activeTag && ` dengan kategori "${activeTag}"`}
                    {searchParams.term && ` untuk pencarian "${searchParams.term}"`}
                  </p>
                 </div>
              </div>
              
              {filteredCafes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in-up">
                  {filteredCafes.map((cafe) => (
                    <CafeCard 
                      key={cafe.id} 
                      cafe={cafe} 
                      onClick={() => setSelectedCafe(cafe)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-xl">
                  <p className="text-gray-400 text-lg">Tidak ada tempat yang cocok dengan filter Anda.</p>
                  <button 
                    onClick={() => {
                      setSearchParams({ term: "", category: "Semua Kategori", price: "Harga" });
                      setActiveTag(null);
                    }}
                    className="mt-4 text-primary font-bold hover:underline"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Map & Promo */}
          <MapPromoSection promos={data.promos} />
        </main>

        <Footer />

        {/* Modal Detail */}
        <CafeDetailModal 
          cafe={selectedCafe} 
          onClose={() => setSelectedCafe(null)} 
        />
      </div>
    </ToastProvider>
  );
}

export default App;
