import React from 'react';
import { ArrowRight } from 'lucide-react';

const CategorySection = ({ categories, onSelectCategory }) => {
  return (
    <section className="py-12 bg-gray-50" id="kategori">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-secondary">
            Kuliner Asik <span className="font-light">di Semarang</span>
          </h2>
          <div className="h-0.5 bg-gray-200 flex-1 mx-4 hidden md:block"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => onSelectCategory(cat.name)}
              className="group relative h-40 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-primary/80 transition-colors flex items-end p-6">
                <div className="flex justify-between items-center w-full text-white">
                  <h3 className="font-bold text-lg translate-y-0 group-hover:-translate-y-1 transition-transform">{cat.name}</h3>
                  <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
