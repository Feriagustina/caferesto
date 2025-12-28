import React, { useState } from 'react';
import { Star, Heart, MapPin } from 'lucide-react';
import { useToast } from './Toast';

const CafeCard = ({ cafe, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { addToast } = useToast();

  const handleLike = (e) => {
    e.stopPropagation();
    const newStatus = !isLiked;
    setIsLiked(newStatus);
    
    if (newStatus) {
      addToast(`${cafe.name} ditambahkan ke favorit ❤️`, "success");
    } else {
      addToast(`${cafe.name} dihapus dari favorit`, "info");
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={cafe.image} 
          alt={cafe.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 right-3">
          <button 
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
              isLiked ? 'bg-red-500/90 text-white' : 'bg-white/30 text-white hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>
        {cafe.isPromo && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
            PROMO
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-secondary mb-1 group-hover:text-primary transition-colors">{cafe.name}</h3>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{cafe.category}</p>
          </div>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="text-yellow-400 fill-current" size={14} />
            <span className="text-sm font-bold text-yellow-700 ml-1">{cafe.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin size={14} className="mr-1 text-primary" />
          <span className="truncate">{cafe.location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {cafe.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md border border-gray-200">
              {tag}
            </span>
          ))}
          {cafe.tags.length > 2 && (
            <span className="text-xs text-gray-400 py-1">+ {cafe.tags.length - 2}</span>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-primary font-bold">{cafe.priceRange}</span>
          <span className="text-xs text-gray-400 group-hover:translate-x-1 transition-transform">Detail &rarr;</span>
        </div>
      </div>
    </div>
  );
};

export default CafeCard;
