import React, { useEffect, useState } from 'react';
import { X, MapPin, Star, Clock, Phone, Globe, CheckCircle, ChevronLeft, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './Toast';

const CafeDetailModal = ({ cafe, onClose }) => {
  const { addToast } = useToast();
  const [showMenu, setShowMenu] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (cafe) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [cafe]);

  // Reset menu view when cafe changes
  useEffect(() => {
    setShowMenu(false);
  }, [cafe]);

  if (!cafe) return null;

  const handleWebsiteClick = (e) => {
    e.preventDefault();
    addToast("Website sedang dalam pengembangan", "info");
  };

  const handleMenuClick = () => {
    setShowMenu(true);
  };

  const mockMenu = [
    { name: "Signature Coffee", price: "Rp 28.000", desc: "Kopi susu gula aren spesial" },
    { name: "Beef Rice Bowl", price: "Rp 45.000", desc: "Nasi dengan daging sapi lada hitam" },
    { name: "French Fries", price: "Rp 20.000", desc: "Kentang goreng renyah dengan saus keju" },
    { name: "Matcha Latte", price: "Rp 32.000", desc: "Green tea latte creamy" },
    { name: "Spaghetti Carbonara", price: "Rp 55.000", desc: "Pasta creamy dengan smoked beef" },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors md:text-gray-800 md:bg-gray-100 md:hover:bg-gray-200"
          >
            <X size={24} />
          </button>

          {/* Image Section */}
          <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            <img 
              src={cafe.image} 
              alt={cafe.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 md:hidden">
              <h2 className="text-2xl font-bold text-white">{cafe.name}</h2>
              <div className="flex items-center text-yellow-400 mt-1">
                <Star fill="currentColor" size={16} />
                <span className="ml-1 font-bold">{cafe.rating}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-gray-200">{cafe.category}</span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
            <div className="hidden md:block mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-secondary mb-1">{cafe.name}</h2>
                  <p className="text-primary font-medium">{cafe.category}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center text-yellow-500 font-bold text-lg">
                    <Star fill="currentColor" size={20} className="mr-1" />
                    {cafe.rating}
                  </div>
                  <span className="text-gray-400 text-sm">120+ Reviews</span>
                </div>
              </div>
            </div>

            {showMenu ? (
              <div className="flex-1 overflow-y-auto pr-2 animate-fade-in">
                <div className="flex items-center gap-2 mb-4 cursor-pointer text-primary font-bold" onClick={() => setShowMenu(false)}>
                  <ChevronLeft size={20} />
                  <span>Kembali ke Detail</span>
                </div>
                <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
                  <Utensils size={18} /> Menu Populer
                </h3>
                <div className="space-y-4">
                  {mockMenu.map((item, index) => (
                    <div key={index} className="flex justify-between items-start border-b border-gray-100 pb-3">
                      <div>
                        <h4 className="font-bold text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                      <span className="font-semibold text-primary">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                  <p>Ini adalah contoh menu. Harga dan ketersediaan dapat berubah sewaktu-waktu.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  {cafe.description} Tempat ini sangat cocok untuk Anda yang mencari suasana {cafe.tags.join(" dan ")}. 
                  Menyediakan berbagai menu andalan dengan cita rasa otentik.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Harga</span>
                    <p className="text-secondary font-semibold">{cafe.priceRange}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Jam Buka</span>
                    <div className="flex items-center text-secondary font-semibold">
                      <Clock size={14} className="mr-1 text-primary" />
                      10:00 - 22:00
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-secondary mb-3">Fasilitas</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Wifi', 'Parking', 'Toilet', 'Musholla', 'AC'].map((facility) => (
                      <span key={facility} className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-100">
                        <CheckCircle size={12} className="mr-1" /> {facility}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-start gap-3 text-gray-600">
                    <MapPin className="text-primary shrink-0 mt-1" size={18} />
                    <span>{cafe.location}, Semarang, Jawa Tengah</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="text-primary shrink-0" size={18} />
                    <span>+62 24 1234 5678</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Globe className="text-primary shrink-0" size={18} />
                    <a href="#" onClick={handleWebsiteClick} className="hover:text-primary transition-colors">
                      www.{cafe.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
                    </a>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-auto pt-8 flex gap-3">
              <button 
                className="flex-1 bg-primary hover:bg-yellow-600 text-white py-3 rounded-lg font-bold shadow-lg shadow-yellow-500/30 transition-all transform hover:scale-[1.02]"
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.name + ' Semarang')}`, '_blank')}
              >
                Buka di Google Maps
              </button>
              {!showMenu && (
                <button 
                  onClick={handleMenuClick}
                  className="flex-1 border border-secondary text-secondary hover:bg-secondary hover:text-white py-3 rounded-lg font-bold transition-all"
                >
                  Lihat Menu
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CafeDetailModal;
