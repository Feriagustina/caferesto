import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useToast } from './Toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { addToast } = useToast();

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsOpen(false);
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleBlogClick = () => {
    addToast("Halaman Blog sedang dalam tahap pengembangan! 🚧", "info");
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-secondary/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 text-white font-serif text-xl font-bold cursor-pointer"
          onClick={() => scrollToSection('home')}
        >
          <span className="text-primary text-2xl">⚡</span>
          <span>Kuliner Semarang Asik</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-white font-medium text-sm">
          <button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors">Home</button>
          <button onClick={() => scrollToSection('rekomendasi')} className="hover:text-primary transition-colors">Rekomendasi</button>
          <button onClick={() => scrollToSection('promo')} className="hover:text-primary transition-colors">Promo</button>
          <button onClick={handleBlogClick} className="hover:text-primary transition-colors">Blog</button>
          <button onClick={() => window.open('https://wa.me/6281326611168', '_blank')} className="bg-primary hover:bg-yellow-600 text-white px-5 py-2 rounded-full transition-colors">
            Kerjasama
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-secondary text-white absolute w-full top-full left-0 py-4 shadow-xl">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <button onClick={() => scrollToSection('home')} className="text-left hover:text-primary">Home</button>
            <button onClick={() => scrollToSection('rekomendasi')} className="text-left hover:text-primary">Rekomendasi</button>
            <button onClick={() => scrollToSection('promo')} className="text-left hover:text-primary">Promo</button>
            <button onClick={handleBlogClick} className="text-left hover:text-primary">Blog</button>
            <button onClick={() => window.open('https://wa.me/6281326611168', '_blank')} className="text-left text-primary font-bold">Kerjasama</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
