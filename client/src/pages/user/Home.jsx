import React, { useEffect, useState } from "react";
import backgroundImage from "../../assets/background.jpg"

export const Home = () => {
  
  
  return (
    <div className="bg-blue-100 text-blue-900 dark:bg-base-100 dark:text-base-content min-h-screen py-5 flex flex-col items-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center dark:bg-base-100 dark:text-base-content bg-no-repeat"  style={{ backgroundImage: `url(${backgroundImage})` }}></div>

      {/* Header */}
      <header className="text-center mb-8 relative z-10">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-500 to-blue-600 transition duration-500">
          Welcome to "Easy Tools"
        </h1>
        <p className="text-lg text-lime-400 mt-2">Your ultimate Office solution!</p>
      </header>

      
    </div>
  );
};
