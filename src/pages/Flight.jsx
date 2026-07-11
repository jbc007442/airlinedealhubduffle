import { useEffect, useState } from 'react';
import aero from '../assets/Aero.jpg';
import Searchbar from '../components/Searchbar';
import book from '../assets/booking.png';
import globe from '../assets/globe.png';
import user from '../assets/user.png';
import eye from '../assets/eye.png';
import paris from '../assets/paris.jpg';
import amster from '../assets/amster.jpg';
import dubai from '../assets/dubai.jpg';
import { useNavigate } from 'react-router-dom';
import { PhoneCall, X } from 'lucide-react';
import logo from '../assets/A.png';
import { Link, useLocation } from 'react-router-dom';
import DateNow from '../components/DateNow';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import toll from '../assets/Tollfree.jpg';
import expedia from '../assets/expedia.png';

const Flight = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Show modal only on mobile when page reloads
  useEffect(() => {
    if (window.innerWidth < 768) {
      setShowModal(true);
    }
  }, []);

  //header hide logic
  const location = useLocation();

  // hide entire header only on specific routes
  const hideHeaderRoutes = ['/results'];
  const hideHeader = hideHeaderRoutes.includes(location.pathname);

  if (hideHeader) return null;

  // ✅ Function to get formatted dates dynamically
  const getDynamicDates = () => {
    const today = new Date();
    const depart = new Date(today);
    depart.setDate(today.getDate() + 7);
    const ret = new Date(today);
    ret.setDate(today.getDate() + 14);

    const options = { month: 'short', day: '2-digit' };
    const departFormatted = depart.toLocaleDateString('en-US', options);
    const retFormatted = ret.toLocaleDateString('en-US', options);

    return `${departFormatted} – ${retFormatted}`;
  };

  const handleBookNow = (from, to) => {
    const today = new Date();
    const depart = new Date(today);
    depart.setDate(today.getDate() + 7);
    const ret = new Date(today);
    ret.setDate(today.getDate() + 14);

    const formatDate = (d) => d.toISOString().split('T')[0];

    const formDataToSend = {
      tripType: 'round',
      from: `${from} Airport`,
      to: `${to} Airport`,
      from_iata: from,
      to_iata: to,
      passengers: 1,
      adults: 1,
      children: 0,
      infants: 0,
      travelClass: 'Economy',
      depart: formatDate(depart),
      ret: formatDate(ret),
    };

    navigate('/results', { state: formDataToSend });
  };

  const deals = [
    { from: 'LAX', to: 'LAS' },
    { from: 'MCO', to: 'ORD' },
    { from: 'NYC', to: 'MIA' },
    { from: 'DFW', to: 'SFO' },
    { from: 'SEA', to: 'PHX' },
    { from: 'BOS', to: 'ATL' },
  ];

  return (
    <>
      {/* Modal for mobile */}
      {showModal && (
        <a href="tel:+18885016590">
          <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col font-sans">
            {/* HEADER */}
            <div className="flex items-center justify-between  py-3 border-b shadow-sm">
              <h1 className="text-xl font-bold text-gray-700 px-2">Airlinedealhub</h1>

              <div className="flex items-center space-x-2">
                <a
                  href="tel:+18885016590"
                  className="border border-green-500 text-green-600 px-3 py-1 rounded-md font-semibold"
                >
                  +1-888-501-6590
                </a>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <X className="w-4 h-4 bg-gray-100 rounded-full mr-2" />
                </button>
              </div>
            </div>

            {/* RED TITLE BAR */}
            <div className="bg-gradient-to-t from-[#2B5796] to-[#3A80CE] text-gray-100 text-center py-3 text-lg font-bold">
              Airline Reservations
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto px-5 py-6 text-center pb-24">
              {/* toll */}
              <img
                src="data:image/jpeg;base64,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"
                className="mx-auto w-24 h-24 mb-3 rounded-full border-4 border-green-400 object-cover"
              />

              <p className="text-gray-700 font-medium mb-6">24/7 Reservations & Support</p>

              {/* BUTTON GRID */}
              <div className="grid grid-cols-2 gap-4 my-4">
                {['New Bookings', 'Changes', 'Cancellations', 'Customer Service'].map((item, i) => (
                  <button
                    key={i}
                    className="bg-gradient-to-t from-[#2B5796] to-[#3A80CE] text-white py-4 rounded font-semibold hover:bg-orange-300"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* TEXT */}
              <p className="font-semibold text-gray-800 mb-3">Booking & Changes Over The Phone</p>

              {/* FEATURES */}
              <div className="flex justify-center gap-6 text-sm mb-4 border-b pb-2"></div>

              {/* 🔴 UPDATED CTA BUTTON (MATCH SCREENSHOT STYLE) */}
              <a
                href="tel:+18885016590"
                // className="flex items-center gap-3 bg-gradient-to-t from-[#FE5A06] to-[#FE5A06]/80 text-white py-4 px-4 rounded-full shadow-lg max-w-sm mx-auto"
                className="flex items-center gap-3 bg-gradient-to-t from-[#2B5796] to-[#3A80CE] text-white py-4 px-4 rounded-full shadow-lg max-w-sm mx-auto"
              >
                <div className="bg-white p-3 rounded-full ">
                  <PhoneCall className="w-6 h-6 vibrate text-[#2B5796]" />
                </div>

                <div className="text-left">
                  <p className="text-xs opacity-90">Call now Unpublished Phone-Only Offers</p>
                  <p className="text-lg font-bold ml-6">+1-888-501-6590</p>
                </div>
              </a>

              {/* 🧑‍💼 AGENT ICON (REPLACED IMAGE) */}

              <p className="font-bold text-gray-800 mt-4 mb-2">No Hold - Call Answered in 5 Sec</p>

              {/* CTA TEXT */}
              <p className="text-orange-400 font-semibold my-2">Click to Call !</p>
            </div>
          </div>

          {/* 🔻 MODERN CALL BOTTOM STRIP */}
          <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
            <div className="flex items-center justify-between bg-white rounded-2xl shadow-xl border border-blue-400 px-4 py-3 max-w-xl mx-auto">
              {/* LEFT: AVATAR */}
              <div className="flex items-center gap-3">
                <img
                  src="data:image/jpeg;base64,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"
                  className="w-15 h-14 object-fit rounded-full border-2 border-green-400"
                />
              </div>

              {/* CENTER: TEXT */}
              <div className="flex-1 text-center">
                <p className="text-xl font-bold text-black tracking-wide">+1-888-501-6590</p>
                <p className="text-sm text-gray-600">Save Time and get our best deals</p>
              </div>

              {/* RIGHT: CALL ICON */}
              <a
                href="tel:+18005688296"
                className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full shadow-md"
              >
                <PhoneCall className="w-6 h-6 text-white vibrate" />
              </a>
            </div>
          </div>
        </a>
      )}

      {!showModal && (
        <>
          <header className="bg-blue-500 text-white">
            <div className="container mx-auto flex justify-between items-center p-2 md:p-4">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="AirLineDealHub Icon"
                  className="h-8 w-auto md:h-14 transition-all"
                />
                <span className="text-sm md:text-xl font-extrabold tracking-wide text-white font-[Poppins] leading-none">
                  AirLine<span className="text-yellow-400">Deal</span>Hub
                </span>
              </Link>

              {/* Phone Number */}
              <div className="flex items-center gap-2 md:gap-3">
                {/* Phone Icon */}
                <span className="relative inline-flex h-7 w-7 md:h-10 md:w-10 rounded-full bg-blue-600 text-white items-center justify-center animate-pulse">
                  <PhoneCall size={16} className="md:size-6" />
                </span>

                {/* Phone Number */}
                <a
                  href="tel:8885016590"
                  className="font-bold text-white text-sm md:text-xl leading-none hover:text-yellow-300 transition"
                >
                  (888) 501-6590
                </a>
              </div>
            </div>
          </header>
          <section
            className="relative h-[80vh] bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage: `url(${aero})`,
            }}
          >
            <div className="px-4 md:px-8 lg:px-16 w-full">
              <Searchbar />
            </div>
          </section>
          <section className="bg-blue-500 py-6">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
              {/* Item 1 */}
              <div className="flex items-start space-x-3">
                <img
                  src={book}
                  alt="Booking Icon"
                  className="w-8 h-8 filter invert brightness-200"
                />
                <div>
                  <h3 className="font-semibold text-lg">Simple Booking Process</h3>
                  <p className="text-sm text-gray-200">Search, Compare, Book</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start space-x-3">
                <img
                  src={globe}
                  alt="Travel Expert Icon"
                  className="w-8 h-8 filter invert brightness-200"
                />
                <div>
                  <h3 className="font-semibold text-lg">Speak To Travel Experts</h3>
                  <p className="text-sm text-gray-200">Connect over call for help</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start space-x-3">
                <img src={user} alt="User Friendly Icon" className="w-8 h-8 " />
                <div>
                  <h3 className="font-semibold text-lg">User-Friendly Platform</h3>
                  <p className="text-sm text-gray-200">The one-stop destination for travel</p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-start space-x-3">
                <img
                  src={eye}
                  alt="Transparency Icon"
                  className="w-8 h-8 filter invert brightness-200"
                />
                <div>
                  <h3 className="font-semibold text-lg">Transparency</h3>
                  <p className="text-sm text-gray-200">Promising fair dealing</p>
                </div>
              </div>
            </div>
          </section>
          <section className="py-12 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
              {/* Section Title */}
              <div className="mb-6">
                <h2 className="text-4xl font-bold text-gray-900">Popular Flight Destination</h2>
                <p className="text-gray-500">So many places.. So little time! Hurry up.</p>
              </div>

              {/* Destination Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dubai */}
                <div className="relative rounded-xl overflow-hidden group">
                  <img
                    src={dubai}
                    alt="Dubai"
                    className="w-full h-[660px] object-fit group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">Dubai</h3>
                    <p className="text-sm">United Arab Emirate</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {/* New York */}
                  <div className="relative rounded-xl overflow-hidden group">
                    <img
                      src={paris}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-bold">Paris</h3>
                      <p className="text-sm">France</p>
                    </div>
                  </div>

                  {/* Bangkok */}
                  <div className="relative rounded-xl overflow-hidden group">
                    <img
                      src={amster}
                      alt="Amster"
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-bold">Amsterdam</h3>
                      <p className="text-sm">Netherland</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-gray-100 py-10">
            <div className="max-w-[1100px] mx-auto px-5">
              {/* Section Heading */}
              <div className="mb-5">
                <h2 className="text-[28px] font-bold text-[#1e1e1e]"> Airlines Reservation</h2>
                <p className="text-[#555]">
                  Airlinedealhub offers you some incredible airfare discounts that will undoubtedly
                  improve your trip. These are the greatest and most recent offers we have
                  discovered. Stop waiting. Reserve them right away!
                </p>
              </div>

              {/* Deals Grid */}
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {deals.map((deal, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg p-5 flex justify-between items-center border border-gray-200 hover:shadow-lg transition"
                  >
                    <div>
                      <div className="text-xl font-bold">
                        {deal.from} ✈ {deal.to}
                      </div>
                      <div className="text-sm text-[#555]">{getDynamicDates()}</div>
                    </div>
                    <button
                      onClick={() => handleBookNow(deal.from, deal.to)}
                      className="border border-[#1a2a7a] px-4 py-2 rounded-full text-[#1a2a7a] font-medium hover:bg-[#1a2a7a] hover:text-white transition"
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <p className=" text-red-500 my-1"> *Note: All fares are quoted in USD. </p>
                <p className="text-xs">
                  Last updated on Wednesday
                  <span className="text-red-500">
                    {' '}
                    <DateNow /> at 05:00 AM
                  </span>
                  , the fares mentioned above are for Round Trip flight tickets and inclusive of
                  fuel surcharges,{' '}
                  <Link to="/tax-fee" className="underline">
                    {' '}
                    service fee and taxes
                  </Link>{' '}
                  . Based on historical data, these fares are subject to change without prior notice
                  and cannot be guaranteed at the time of booking. Kindly go through our
                  <Link to="/TermAndCondition" className="underline">
                    {' '}
                    terms and conditions
                  </Link>{' '}
                  before booking.
                </p>
              </div>
            </div>
          </section>
          <section className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
              {/* Heading */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">
                  Special Offers & Bookings on Airline Tickets
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Traveling the world doesn’t have to come at a high cost. At Airlinedealhub , we
                  help you discover cheap flight tickets to destinations across the globe. Whether
                  you're planning a short getaway, a business trip, or a long-awaited international
                  vacation, booking with us means saving on airfare while enjoying reliable travel
                  assistance every step of the way.
                </p>
              </div>

              {/* Why Choose Cheap Flights */}
              <div className="mb-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Why Choose Cheap Flights?
                </h3>
                <p className="text-gray-600 mb-3">
                  Cheap flight tickets make travel more accessible, practical, and spontaneous. With
                  lower airfare, you can:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Reallocate your budget toward hotels, dining, or experiences</li>
                  <li>Take more trips throughout the year</li>
                  <li>Travel with family or in groups without overspending</li>
                  <li>Make last-minute plans without worrying about high costs</li>
                </ul>
                <p className="mt-3 text-gray-600">
                  The key is knowing when, where, and how to book airline reservations—and that’s
                  where Airlinedealhub steps in.
                </p>
              </div>

              {/* Why Book With Us */}
              <div className="mb-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Book with Us?</h3>
                <p className="text-gray-600 mb-4">
                  Booking with Airlinedealhub offers more than just a seat on a plane—it’s a
                  complete, stress-free travel experience. Here’s why thousands of travelers trust
                  us when booking cheap flight with airline reservation:
                </p>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>
                    <strong>Personalized Flight Search Assistance</strong> – Our travel
                    professionals help you explore all options—budget carriers, flexible dates,
                    alternative airports—to secure the best available fares based on your
                    preferences.
                  </li>
                  <li>
                    <strong>User-Friendly Booking Platform</strong> – Our website is designed for
                    ease of use, with intuitive tools to help you search, filter, and compare cheap
                    flights quickly and efficiently.
                  </li>
                  <li>
                    <strong>Access to a Wide Range of Airlines</strong> – We provide access to
                    hundreds of domestic and international airlines—helping you find flights that
                    fit your schedule and budget.
                  </li>
                  <li>
                    <strong>24/7 Customer Support</strong> – Have questions before, during, or after
                    booking? Our team is here around the clock to help with any queries, changes, or
                    assistance you need.
                  </li>
                  <li>
                    <strong>Transparent Pricing – No Hidden Fees</strong> – What you see is what you
                    pay. We believe in clear, upfront pricing with no hidden costs or surprise
                    charges at checkout.
                  </li>
                  <li>
                    <strong>Options for Every Traveler</strong> – From economy to business class,
                    one-way to round-trip, direct or connecting—we offer a range of airline group
                    booking flight options to suit every traveler and budget.
                  </li>
                  <li>
                    <strong>Secure and Reliable Transactions</strong> – Book with peace of mind. Our
                    platform uses industry-standard encryption and payment security protocols to
                    protect your personal and payment information.
                  </li>
                  <li>
                    <strong>Price Match Assurance</strong> – If you come across a lower fare for the
                    same flight itinerary elsewhere, we’ll work with you to match it—ensuring you
                    always get the best possible price.
                  </li>
                </ol>
              </div>

              {/* Classes of Service */}
              <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-4">Classes of Service</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg">Basic Economy Class</h4>
                  <p>
                    Take advantage of the cheapest airfare in Basic Economy. Complimentary
                    refreshments, soft drinks, in-flight entertainment, and cozy seating are
                    included. Passengers are permitted to bring one carry-on bag per ticket.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg">Economy Class</h4>
                  <p>
                    Includes Main Cabin Extra and Main Cabin options. Main Cabin Extra offers early
                    boarding, free alcoholic beverages, extra legroom, Wi-Fi, and entertainment.
                    Main Cabin includes complimentary snacks, soft drinks, Wi-Fi, and in-flight
                    entertainment.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg">Premium Economy</h4>
                  <p>
                    Wider seats with more legroom, priority check-in/boarding, chef-inspired meals
                    with beverages, plus amenities like headphones, bedding, skincare kits, USB
                    charging, and Wi-Fi.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg">Business Class</h4>
                  <p>
                    Options include business cabins and flagship business. Amenities include
                    lie-flat seats, chef-prepared meals, premium bedding, Wi-Fi, entertainment,
                    priority services, and access to flagship lounges.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg">First Class</h4>
                  <p>
                    Domestic and international options available. Amenities include priority
                    check-in, additional baggage allowance, premium dining, lie-flat seats,
                    entertainment, Wi-Fi, lounge access, and luxury amenity kits.
                  </p>
                </div>
              </div>

              {/* Baggage Policy */}
              <h3 className="text-xl md:text-2xl font-semibold mt-10 mb-4">Baggage Policy</h3>
              <p className="mb-4">
                Travelers may bring one complimentary carry-on bag plus a personal item (22 x 14 x 9
                inches). Domestic flights allow up to 50 lbs per bag, while business/first-class
                tickets may allow up to 70 lbs. Premium cabins may include up to 3 complimentary
                checked bags. Overweight or additional luggage may incur extra fees.
              </p>

              {/* Web Check-in */}
              <h3 className="text-xl md:text-2xl font-semibold mt-10 mb-4">Web Check-in</h3>
              <p className="mb-4">
                Passengers can check in online 24 to 1 hour before departure via the official
                website or mobile app. This service allows travelers to access boarding passes
                quickly and skip long airport lines.
              </p>

              {/* 24/7 Assistance */}
              <h3 className="text-xl md:text-2xl font-semibold mt-10 mb-4">
                24/7 Post-Flight Booking Assistance
              </h3>
              <p className="mb-6">
                Our travel experts are available 24/7 to help with reservations, cancellations,
                passenger information updates, and refunds. We ensure seamless support and flexible
                options to meet your travel needs. Contact us anytime to manage your trip with
                confidence.
              </p>

              {/* Smart Ways */}
              <div className="mb-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Smart Ways to Book Cheap Flights
                </h3>
                <p className="text-gray-600 mb-3">
                  Getting the best price on a flight often comes down to strategy. Here are proven
                  tips to help you save:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    <strong>Book in Advance:</strong> Plan your trip early—ideally 30–60 days before
                    your departure—for the most favorable rates.
                  </li>
                  <li>
                    <strong>Be Flexible with Dates:</strong> Slight changes in your travel schedule
                    can lead to big savings. Midweek flights (especially Tuesdays and Wednesdays)
                    are often cheaper than weekend travel.
                  </li>
                  <li>
                    <strong>Use Nearby Airports:</strong> Check flights departing from or arriving
                    at alternative airports near your destination for better deals.
                  </li>
                  <li>
                    <strong>Travel During Off-Peak Seasons:</strong> Avoid school holidays, major
                    festivals, or high-tourism months to find lower fares.
                  </li>
                  <li>
                    <strong>Mix and Match Airlines:</strong> Sometimes, booking different carriers
                    for outbound and return flights offers better value than round-trip tickets from
                    a single airline.
                  </li>
                </ul>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Take Off?</h3>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                  With Airlinedealhub, booking cheap flight tickets with airline reservation is
                  simple, reliable, and tailored to your travel style. Whether you're flying across
                  the country or across the globe, we’re here to help you travel smarter—and for
                  less.
                </p>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                  Let your next adventure begin with the right flight, at the right price.
                </p>
              </div>
            </div>
          </section>
          <footer className="bg-gray-200 text-black text-sm">
            <div className=" py-10 px-6 grid md:grid-cols-4 gap-8 border-b border-gray-700">
              {/* Logo + Social */}
              <div className="col-span-1 flex flex-col items-center text-center space-y-4">
                {/* Logo & Heading */}
                <div className="flex flex-col items-center space-y-2">
                  <img src={logo} className="h-32 rounded" alt="Expedai Logo" />
                  <h2 className="text-3xl font-bold">
                    <span className="text-blue-600">Airlinedealhub</span>
                  </h2>
                </div>
              </div>

              {/* Important Links */}
              <div>
                <h3 className="text-blue-600 font-semibold mb-3">IMPORTANT LINKS</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/faqs">FAQs</Link>
                  </li>
                  <li>
                    <Link to="/disclaimer">Disclaimer</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/baggage-policy">Baggage Policy</Link>
                  </li>
                  <li>
                    <Link to="/Advisory">Advisory Disclosure</Link>
                  </li>
                  <li>
                    <Link to="/cookie-policy">Cookie Policy</Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-blue-600 font-semibold mb-3">LEGAL</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/t&c" className="hover:underline">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/price-match" className="hover:underline">
                      Price Match Promise
                    </Link>
                  </li>
                  <li>
                    <Link to="/taxes-fees" className="hover:underline">
                      Taxes & Fees
                    </Link>
                  </li>
                  <li>
                    <Link to="/post-ticketing-fee" className="hover:underline">
                      Post Ticketing Fee
                    </Link>
                  </li>
                  <li>
                    <Link to="/damage-policy" className="hover:underline">
                      Damage Management Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/service-fees" className="hover:underline">
                      Our Service Fees
                    </Link>
                  </li>
                  <li>
                    <Link to="/ccpa" className="hover:underline">
                      California Consumer Privacy Act
                    </Link>
                  </li>
                  <li>
                    <Link to="/gdpr" className="hover:underline">
                      GDPR
                    </Link>
                  </li>
                  <li>
                    <Link to="/cancel-policy" className="hover:underline">
                      Cancellation policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-blue-600 font-semibold mb-3">CONTACT US</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <FaMapMarkerAlt className="mt-1" />
                    <span>1798 D ST, HAYWARD, CA 94541 USA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaPhone />
                    <a href="tel:1-833-914-2482">(888) 501-6590</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaEnvelope />
                    <a href="mailto:support@airlinedealhub.com">support@airlinedealhub.com</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Disclaimer and Terms */}
            <div className="text-gray-900 text-[12px] px-6 py-6 space-y-2 leading-relaxed">
              <p>
                <span className="font-bold">DISCLAIMER:</span> AirLineDealHub is an independent
                online travel agency operating under the umbrella of your trip charge LLC. We are
                the resellers of travel Products & services i.e. vacation packages, hotels, flight
                deals & attractions. We are a travels company associated with travels consolidators
                and 3rd party travels suppliers. We are neither directly or indirectly associated
                with any airlines. All prices quoted through us include all taxes and fees. The
                flight search engine used is a third-party tool used for just providing the
                information, we are not associated with any company available on it.
                <Link to="/disclaimer" className="text-blue-600 underline">
                  read more...
                </Link>
              </p>

              <p></p>

              <p>
                SUBJECT TO{' '}
                <a href="/service-fees" className="text-blue-600 underline">
                  Our Service Fees
                </a>{' '}
                AND{' '}
                <Link to="/fullfill" className="text-blue-600 underline">
                  Fulfill Policy
                </Link>
                . SEE AirLineDealHub{' '}
                <Link to="/cookie-policy" className="text-blue-600 underline">
                  Cookie Policy
                </Link>
              </p>

              <p>
                **$25 DISCOUNT: OFFERS AND DISCOUNTS ARE FOR A LIMITED TIME AND SUBJECT TO
                AVAILABILITY. SAVINGS APPLY ONLY TO AirLineDealHub SERVICE FEES ON SELECT
                UNPUBLISHED FARES AND PHONE-ONLY BOOKINGS. PROMOTIONS MAY BE MODIFIED OR
                DISCONTINUED WITHOUT PRIOR NOTICE. VALID UNTIL JUL, 31 2025, AT 11:59 PM EST.
                ADDITIONAL{' '}
                <Link to="t&c" className="text-blue-600 underline">
                  Terms & Conditions
                </Link>{' '}
                APPLY.
              </p>
            </div>
          </footer>
        </>
      )}
    </>
  );
};

export default Flight;
