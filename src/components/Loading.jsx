import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2 text-secondary font-serif text-3xl font-bold mb-4 animate-pulse">
        <span className="text-primary text-4xl">⚡</span>
        <span>Kuliner Semarang Asik</span>
      </div>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-100"></div>
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-200"></div>
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-300"></div>
      </div>
      <p className="mt-4 text-gray-500 text-sm">Sedang memuat data kuliner terbaik...</p>
    </div>
  );
};

export default Loading;
