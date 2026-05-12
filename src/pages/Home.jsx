import aero from '../assets/Aero.jpg';
import Searchbar from '../components/Searchbar';
import book from '../assets/booking.png';
import globe from '../assets/globe.png';
import user from '../assets/user.png';
import eye from '../assets/eye.png';
import about from '../assets/about.jpeg';
import london from '../assets/london.avif';
import us from '../assets/us.avif';
import s from '../assets/s.avif';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

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
      <section
        className="relative h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${aero})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="px-4 md:px-8 lg:px-16 w-full">
          <Searchbar />
        </div>
      </section>
      <section className="bg-blue-500 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
          {/* Item 1 */}
          <div className="flex items-start space-x-3">
            <img src={book} alt="Booking Icon" className="w-8 h-8 filter invert brightness-200" />
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
            <h2 className="text-4xl font-bold text-gray-900">Popular Destination</h2>
            <p className="text-gray-500">So many places.. So little time! Hurry up.</p>
          </div>

          {/* Destination Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dubai */}
            <div className="relative rounded-xl overflow-hidden group">
              <img
                src={london}
                alt="London"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold">London</h3>
                <p className="text-sm">United Kingdom</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* New York */}
              <div className="relative rounded-xl overflow-hidden group">
                <img
                  src={us}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">New York</h3>
                  <p className="text-sm">United States</p>
                </div>
              </div>

              {/* Bangkok */}
              <div className="relative rounded-xl overflow-hidden group">
                <img
                  src={s}
                  alt="Melbourne"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Sydney</h3>
                  <p className="text-sm">Australia</p>
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
            <h2 className="text-[28px] font-bold text-[#1e1e1e]">Popular Deals</h2>
            <p className="text-[#555]">Come let's fly</p>
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
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-stretch">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Embark on your remedial journey stress-free with AirLineDealHub, your trusted
              independent travel portal. Unlike others, we have no airline affiliations, ensuring
              unbiased and optimal choices for our users. Proudly under the umbrella of{' '}
              <strong>AirLineDealHub</strong>, AirLineDealHub prioritizes your desires and
              requirements. We welcome you to the most reliable and one-stop destination for all
              your travel needs.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We are a travel company that puts our client’s desires and requirements as our
              top-most priority. We can fulfill all your travel dreams and needs without any hassle.
              We are a travel planning and booking platform that offers you class-apart travel
              services at the most affordable prices.
            </p>
          </div>

          {/* Image */}
          <div className="relative flex">
            <img
              src={about}
              alt="Travel destination street"
              className="rounded-2xl shadow-lg object-cover w-full h-96"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
