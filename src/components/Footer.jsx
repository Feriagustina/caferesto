import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from './Toast';

const Footer = () => {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      addToast("Silakan masukkan alamat email Anda", "error");
      return;
    }
    if (!email.includes("@")) {
      addToast("Format email tidak valid", "error");
      return;
    }
    
    addToast(`Terima kasih! Kami akan mengirimkan promo ke ${email}`, "success");
    setEmail("");
  };

  const handleSocialClick = (e, platform) => {
    e.preventDefault();
    addToast(`Mengunjungi halaman ${platform} Kuliner Semarang...`, "info");
    // In real app, window.open(url)
  };

  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 text-white font-serif text-xl font-bold mb-4">
              <span className="text-primary text-2xl">⚡</span>
              <span>Kuliner Semarang</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Platform kurasi kuliner terbaik di Semarang. Temukan referensi cafe, restoran, dan street food pilihan influencer.
            </p>
            <div className="flex space-x-4">
              <SocialIcon Icon={Instagram} onClick={(e) => handleSocialClick(e, "Instagram")} />
              <SocialIcon Icon={Facebook} onClick={(e) => handleSocialClick(e, "Facebook")} />
              <SocialIcon Icon={Youtube} onClick={(e) => handleSocialClick(e, "Youtube")} />
              <SocialIcon Icon={Twitter} onClick={(e) => handleSocialClick(e, "Twitter")} />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-primary">Explore</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#rekomendasi" className="hover:text-white transition-colors">Rekomendasi Cafe</a></li>
              <li><a href="#rekomendasi" className="hover:text-white transition-colors">Restoran Keluarga</a></li>
              <li><a href="#rekomendasi" className="hover:text-white transition-colors">Street Food Legendaris</a></li>
              <li><a href="#rekomendasi" className="hover:text-white transition-colors">Kuliner Malam</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-primary">Hubungi Kami</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                hello@kulinersemarang.id
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                +62 813 2661 1168
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                Semarang Tengah, Indonesia
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-primary">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Dapatkan info promo dan rekomendasi terbaru.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address" 
                className="bg-white/10 border border-white/10 px-4 py-2 rounded text-white text-sm outline-none focus:border-primary"
              />
              <button type="submit" className="bg-primary hover:bg-yellow-600 text-white py-2 rounded font-bold text-sm transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-xs">
          <p>&copy; 2024 Kuliner Semarang Asik. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ Icon, onClick }) => (
  <a href="#" onClick={onClick} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
    <Icon size={16} />
  </a>
);

export default Footer;
