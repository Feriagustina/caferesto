import React from 'react';
import { ArrowRight, Map } from 'lucide-react';
import { useToast } from './Toast';

const MapPromoSection = ({ promos }) => {
  const { addToast } = useToast();

  const openMap = () => {
    window.open('https://www.google.com/maps/search/Kuliner+Semarang', '_blank');
  };

  const handlePromoClick = (promo) => {
    addToast(`Promo ${promo.title} berhasil diklaim! Tunjukkan saat bayar ya 😉`, "success");
  };

  return (
    <section className="py-16 bg-white" id="promo">
      <div className="container mx-auto px-4">
        {/* Map Section */}
        <div className="mb-16">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-3xl font-serif font-bold text-secondary mb-2">Peta Kuliner Semarang</h2>
              <p className="text-gray-500">Jelajahi lokasi kuliner terdekat dari posisimu</p>
            </div>
            <button 
              onClick={openMap}
              className="hidden md:flex items-center text-primary font-bold hover:underline"
            >
              Lihat Peta Lengkap <ArrowRight size={18} className="ml-1" />
            </button>
          </div>
          
          <div className="relative h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-inner group">
            <img 
              src="https://img.freepik.com/free-vector/city-map-navigation-gps-app-concept_23-2148590680.jpg?w=1380&t=st=1708764000~exp=1708764600~hmac=fake_token" 
              alt="Map Illustration" 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
              <button 
                onClick={openMap}
                className="bg-white text-secondary px-8 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 hover:bg-primary hover:text-white transition-all transform hover:scale-105"
              >
                <Map size={20} />
                Buka Peta Interaktif
              </button>
            </div>
          </div>
        </div>

        {/* Promo Section */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-3xl font-serif font-bold text-secondary mb-2">Promo & Review Terbaru</h2>
              <p className="text-gray-500">Dapatkan penawaran terbaik minggu ini</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {promos.map((promo) => (
              <div 
                key={promo.id} 
                className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 cursor-pointer"
                onClick={() => handlePromoClick(promo)}
              >
                <div className="h-40 overflow-hidden">
                  <img src={promo.image} alt={promo.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-secondary mb-2 line-clamp-2">{promo.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{promo.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapPromoSection;
