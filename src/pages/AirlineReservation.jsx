import { useEffect, useState, useRef } from 'react';
// import "react-datepicker/dist/react-datepicker.css";
import beachImg from '../assets/Aero.jpg';
import toll from '../assets/Tollfree.jpg';
import { Users, Heart, Plane, Phone, ClockAlert, X, PhoneCall } from 'lucide-react';
import Searchbar from '../components/Searchbar.jsx';

const reasons = [
  {
    icon: Users,
    title: 'Family Travel',
    desc: `Family travel is more than just a trip; it's an opportunity to reconnect, bond, and create lifelong memories. From multi-generational vacations to weekend getaways with your children, we ensure that every moment is meaningful. Our curated family packages include activities that cater to all age groups,`,
  },
  {
    icon: Heart,
    title: 'Honeymoon',
    desc: `A honeymoon is the most cherished trip a couple takes, and we make it magical. Whether you dream of pristine beaches, cozy mountain cabins, or romantic European cities, we tailor your journey to match your love story. Our luxurious honeymoon packages include private transfers, couple spa treatments, candlelit dinners, and exclusive experiences. `,
  },
  {
    icon: Plane,
    title: 'Travel Plans',
    desc: `We believe that every travel plan should be effortless and exciting. Whether it’s a last-minute business trip or a year-in-the-making bucket list adventure, our team handles every aspect—flights, hotels, transfers, tours, and more. We specialize in creating end-to-end itineraries that match your budget, interests, and schedule.`,
  },
];

const WhyTravelWithUs = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Travel with Us</h2>
        <p className="text-lg text-gray-600">
          We create travel experiences that are meaningful, luxurious, and unforgettable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {reasons.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-sm rounded-2xl p-8 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="bg-blue-100 text-blue-600 w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-6">
              <item.icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{item.title}</h3>
            <p className="text-sm text-gray-600 text-justify leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const AirlineReservations = () => {
  const scriptContainerRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  // Show modal only on mobile when page reloads
  useEffect(() => {
    if (window.innerWidth < 768) {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const script = document.createElement('script');
      script.src = '';
      script.async = true;
      script.charset = 'utf-8';
      scriptContainerRef.current?.appendChild(script);
    }, 100); // Delay to ensure container is rendered

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Modal for mobile */}
      {showModal && (
        <a href="tel:+18885016590">
          <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col font-sans">
            {/* HEADER */}
            <div className="flex items-center justify-between  py-3 border-b shadow-sm">
              <h1 className="text-xl font-bold text-gray-700 px-2">Airlinedealhub</h1>

              <div className='flex items-center space-x-2'>
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
          <section
            className="relative w-full lg:h-[70vh] bg-cover bg-center flex items-center justify-center text-center"
            style={{ backgroundImage: `url(${beachImg})` }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            {/* Content wrapper */}
            <div className="relative z-20 flex flex-col items-center justify-center px-6 md:px-16 py-12 w-full">
              {/* ✅ Your Searchbar placed here */}
              <Searchbar />
            </div>
          </section>

          <WhyTravelWithUs />

          <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-6">
            <div className="max-w-6xl mx-auto">
              {/* Heading */}
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Airline Reservation</h2>
                <p className="text-gray-600 max-w-3xl mx-auto text-base leading-relaxed text-justify">
                  The technologies that enable an airline to sell its inventory (seats) are known as
                  airline reservation systems (ARS). Schedules, rates, and a database of
                  reservations (or passenger name records) and tickets issued (if appropriate) are
                  all included. ARSs are a component of passenger service systems (PSS), which are
                  programs that facilitate face-to-face communication with travelers. Eventually,
                  the computer reservations system (CRS) replaced ARS. Reservations for a specific
                  airline are made through a computer reservation system that links with a global
                  distribution system (GDS), which facilitates reservations for the majority of
                  major airlines in a single system for travel agents and other distribution
                  channels.
                </p>
              </div>

              {/* Reservation by Phone */}
              <div className="bg-white shadow-md rounded-2xl p-8 mb-12 border border-gray-100">
                <h3 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
                  Airline Reservation Phone Number
                </h3>
                <p className="text-gray-700 text-sm font-bold leading-relaxed mb-4">
                  You can take the following actions to book an airline reservation over the phone:
                </p>
                <p className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2">
                  Visit the airline's official website to make your reservation. Search for their
                  customer care section or contact details. Locate the Telephone Number: Look for a
                  phone number associated with booking, reservations, or customer support once you
                  are on the website. Typically, the "Contact Us" or "Support" pages contain the
                  contact details. Give the airline a call: Wait for a customer support agent to
                  help you by dialing the number you discovered. Have all of your trip information
                  ready, including the destination, dates, number of passengers, and any special
                  needs. Booking Procedure: The customer support agent will walk you through the
                  procedure, offering flight choices and answering any questions you might have.
                  Payment: In order to validate your reservation, you will need to submit payment
                  details. You can try looking online or going to a local travel agency that can
                  assist you with making the reservation over the phone if you can not find the
                  airline's phone number on their website. It is a good idea to ask about any
                  potential fees during the call because certain airlines might charge an extra
                  price for reservations booked over the phone.
                </p>
                <p className="text-gray-600 text-sm mt-3">
                  💡 Tip: Some airlines may charge a small fee for reservations made over the phone,
                  so always confirm during your call.
                </p>
              </div>

              {/* Assistance Section */}
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold text-blue-900 mb-2">
                  Flight Booking, Changes, Cancellations & Name Corrections – 24/7 Assistance
                </h3>
                <p className="text-gray-700 text-sm font-medium">
                  Get Instant Help From Certified Travel Agents
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
                  <h4 className="text-xl font-semibold text-blue-800 mb-4">Our Services</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm leading-relaxed space-y-2">
                    <li>✅ New Flight Bookings – Domestic & International Routes</li>
                    <li>✅ Flight Date & Time Changes</li>
                    <li>✅ Name Correction or Passenger Details Update</li>
                    <li>✅ Ticket Cancellations & Refund Support</li>
                    <li>✅ Seat Upgrade or Special Request Assistance</li>
                  </ul>
                  <p className="text-gray-600 text-sm mt-3">
                    We help you find the best available options through trusted airline systems to
                    make your travel smooth and hassle-free.
                  </p>
                </div>

                {/* Right Side */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
                  <h4 className="text-xl font-semibold text-blue-800 mb-4">Why Choose Us</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm leading-relaxed space-y-2">
                    <li>🌐 24/7 Customer Support via Phone</li>
                    <li>⚡ Fast and Reliable Booking Assistance</li>
                    <li>🧾 Transparent Policies with No Hidden Fees</li>
                    <li>👨‍💼 Experienced Travel Consultants</li>
                    <li>🔒 Safe & Secure Payment Channels</li>
                  </ul>
                </div>
              </div>

              {/* How It Works */}
              <div className="mt-16 bg-blue-50 rounded-2xl p-8 shadow-inner">
                <h3 className="text-2xl font-semibold text-center text-blue-800 mb-4">
                  How It Works
                </h3>
                <ol className="list-decimal list-inside text-gray-700 text-sm leading-relaxed max-w-3xl mx-auto space-y-2">
                  <li>
                    📞 <strong>Call Our Support Line</strong> – Speak with a trained agent
                    immediately.
                  </li>
                  <li>
                    🧳 <strong>Share Your Travel Details</strong> – Date, destination, and airline
                    preferences.
                  </li>
                  <li>
                    ✈️ <strong>Get Options & Confirm</strong> – Receive the best available flight
                    solutions.
                  </li>
                  <li>
                    💳 <strong>Secure Payment & Confirmation</strong> – Get instant confirmation via
                    email or SMS.
                  </li>
                </ol>
                <p className="text-center text-gray-600 text-sm mt-6">
                  We are an independent travel service provider and are not directly affiliated with
                  any airline. Our agents assist travelers in managing reservations, changes, and
                  cancellations through authorized airline systems.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-6">
            <div className="max-w-6xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Flight Reservations Made Easy with{' '}
                <span className="text-blue-600">Airlinedealhub</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Whether you’re planning a quick getaway or a long vacation,
                <span className="font-semibold"> Airlinedealhub </span> ensures hassle-free flight
                bookings, best fares, and 24/7 travel support. Fly smarter, not harder.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center hover:shadow-xl transition">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-6">
                  <Plane />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Best Flight Deals</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Find exclusive airfare discounts and offers with Airlinedealhub. Save more every
                  time you book.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center hover:shadow-xl transition">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-6">
                  <ClockAlert />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Flexible Booking</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Change of plans? No worries. Enjoy flexible flight reservation options with easy
                  modifications.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center hover:shadow-xl transition">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-6">
                  <Phone />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">24/7 Travel Support</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our experts are here around the clock to assist you with booking, cancellations,
                  or queries.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12">
              <a
                href="tel:+18885016590"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold text-lg shadow-lg hover:opacity-90 transition"
              >
                Book Your Flight Now <Plane />
              </a>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AirlineReservations;

// Airlines Reservations
