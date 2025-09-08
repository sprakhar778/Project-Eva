import React from 'react';

const Hero = () => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to MyApp</h1>
        <p className="text-lg md:text-xl mb-8">We provide the best solutions for your business needs.</p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">Get Started</button>
      </div>
    </div>
  );
};

export default Hero;