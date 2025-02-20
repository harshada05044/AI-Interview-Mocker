import React from 'react';
import Header from './_components/Header';

function DashboardLayout({ children }) {  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-white text-gray-900">
      
      {/* Sticky Glass Header */}
      <div className="sticky top-0 z-50 bg-white bg-opacity-90 shadow-md backdrop-blur-lg">
        <Header />
      </div>

      {/* Main Content Area with Smooth Fade-In Animation */}
      <div className="mx-5 md:mx-20 lg:mx-36 py-6 animate-fadeIn">
        
        {/* Content Card with Glassmorphism Effect */}
        <div className="p-6 bg-white bg-opacity-90 shadow-lg rounded-2xl backdrop-blur-md">
          {children}
        </div>
        
      </div>
    </div>
  );
}

export default DashboardLayout;
