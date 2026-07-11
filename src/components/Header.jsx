import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PhoneCall, Menu, X } from 'lucide-react';

import logo from '../assets/A.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Hide nav on these routes
  const hideNavRoutes = ['/results'];
  const hideNav = hideNavRoutes.includes(location.pathname);

  return (
    <>
      {/* ================= TOP HEADER ================= */}
      <div className="hidden md:block bg-[#003B5C] text-white border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto relative overflow-hidden h-6 flex items-center">
          {/* Marquee Track */}
          <div className="flex items-center whitespace-nowrap animate-marquee gap-16 absolute">
            <div className="flex items-center gap-2 text-sm font-medium tracking-wide">
              <span className="text-yellow-300 font-bold text-base">✈ 65% OFF</span>

              <span>Get Amazing Deals on Flights & Travel Packages</span>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium">
              <PhoneCall size={15} className="text-yellow-300" />
              <span>Call Now: +1-888-501-6590</span>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="text-yellow-300">🔥 Limited Time Offers</span>
            </div>

            {/* Duplicate */}
            <div className="flex items-center gap-2 text-sm font-medium tracking-wide">
              <span className="text-yellow-300 font-bold text-base">✈ 65% OFF</span>

              <span>Get Amazing Deals on Flights & Travel Packages</span>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium">
              <PhoneCall size={15} className="text-yellow-300" />
              <span>Call Now: +1-888-501-6590</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN HEADER ================= */}
      <header className="bg-gray-200 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* ================= LOGO ================= */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-3 group">
                {/* Logo */}
                <img
                  src={logo}
                  alt="Airline Deal Hub Logo"
                  className="h-14 w-auto object-contain"
                />

                {/* Text */}
                <div className="hidden sm:block leading-tight">
                  <h1 className="text-2xl font-extrabold tracking-tight text-black font-[Poppins]">
                    Airline
                    <span className="text-blue-400">Deal</span>
                    Hub
                  </h1>

                  <p className="text-[9px] text-gray-500 font-medium tracking-widest uppercase">
                    Best Flight Deals Worldwide
                  </p>
                </div>
              </Link>
            </div>

            {/* ================= DESKTOP MENU ================= */}
            {!hideNav && (
              <nav className="hidden lg:flex items-center gap-10 flex-1 justify-end pr-20">
                <Link
                  to="/"
                  className={`relative text-[17px] font-semibold transition duration-300 hover:text-[#005B8F] ${
                    isActive('/') ? 'text-[#005B8F]' : 'text-gray-800'
                  }`}
                >
                  Home
                  {isActive('/') && (
                    <span className="absolute left-0 -bottom-2 h-[3px] w-full rounded-full bg-[#005B8F]"></span>
                  )}
                </Link>

                <Link
                  to="/about"
                  className={`relative text-[17px] font-semibold transition duration-300 hover:text-[#005B8F] ${
                    isActive('/about') ? 'text-[#005B8F]' : 'text-gray-800'
                  }`}
                >
                  About
                  {isActive('/about') && (
                    <span className="absolute left-0 -bottom-2 h-[3px] w-full rounded-full bg-[#005B8F]"></span>
                  )}
                </Link>

                <Link
                  to="/contact"
                  className={`relative text-[17px] font-semibold transition duration-300 hover:text-[#005B8F] ${
                    isActive('/contact') ? 'text-[#005B8F]' : 'text-gray-800'
                  }`}
                >
                  Contact
                  {isActive('/contact') && (
                    <span className="absolute left-0 -bottom-2 h-[3px] w-full rounded-full bg-[#005B8F]"></span>
                  )}
                </Link>
              </nav>
            )}

            {/* ================= RIGHT CALL SECTION ================= */}
            <div className="hidden md:flex items-center gap-4">
              {/* Animated Phone */}
              <div className="relative">
                {/* Ping Effect */}
                <span className="absolute inset-0 rounded-full bg-[#005B8F] animate-ping opacity-20"></span>

                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#005B8F] to-[#0A74B8] text-white shadow-xl">
                  <PhoneCall size={16} />
                </div>
              </div>

              {/* Text */}
              <div className="leading-tight">
                <p className="text-xs uppercase tracking-[3px] text-gray-500 font-semibold">
                  24/7 Supportes
                </p>

                <a
                  href="tel:+18885016590"
                  className="text-xl font-extrabold text-black hover:text-[#005B8F] transition"
                >
                  (888) 501-6590
                </a>
              </div>
            </div>

            {/* ================= MOBILE BUTTON ================= */}
            {!hideNav && (
              <button
                className="lg:hidden flex items-center justify-center h-11 w-11 rounded-xl bg-[#005B8F] text-white shadow-lg hover:scale-105 transition"
                onClick={() => setIsOpen(true)}
              >
                <Menu size={24} />
              </button>
            )}
          </div>
        </div>

        {/* ================= MOBILE SIDEBAR ================= */}
        {!hideNav && (
          <div
            className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Sidebar Header */}
            <div className="flex justify-between items-center p-5 border-b">
              <img src={logo} alt="Logo" className="h-12" />

              <button onClick={() => setIsOpen(false)}>
                <X size={28} />
              </button>
            </div>

            {/* Sidebar Links */}
            <nav className="flex flex-col gap-5 p-6 text-gray-800 font-medium">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={isActive('/') ? 'text-[#005B8F]' : ''}
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className={isActive('/about') ? 'text-[#005B8F]' : ''}
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={isActive('/contact') ? 'text-[#005B8F]' : ''}
              >
                Contact
              </Link>

              {/* Mobile Call Box */}
              <a
                href="tel:+18885016590"
                className="mt-5 bg-[#005B8F] text-white rounded-2xl p-4 flex items-center gap-3"
              >
                <PhoneCall size={22} />

                <div>
                  <p className="text-sm">Call Us</p>
                  <p className="font-bold text-lg">+1-888-501-6590</p>
                </div>
              </a>
            </nav>
          </div>
        )}

        {/* Overlay */}
        {isOpen && !hideNav && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)}></div>
        )}
      </header>
    </>
  );
};

export default Header;
