import { useMemo, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import airports from '../data/airports';
import { DateRange } from 'react-date-range';
import {
  FiChevronRight,
  FiChevronLeft,
  FiMapPin,
  FiUsers,
  FiBriefcase,
  FiCalendar,
  FiSliders,
} from 'react-icons/fi';
import Autosuggest from 'react-autosuggest';

// -----------------------------
// Airline Fare Comparison Bar
// -----------------------------

const AirlineFareBar = ({ flights }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // ✅ Run hooks before conditional return
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateScrollButtons = () => {
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
    };

    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  if (!flights || !flights.length) return null;

  // ✅ Group flights by airline
  const grouped = flights.reduce((acc, f) => {
    if (!acc[f.airlineName]) acc[f.airlineName] = [];
    acc[f.airlineName].push(f);
    return acc;
  }, {});

  const summary = Object.entries(grouped).map(([airline, list]) => {
    const nonstop = list
      .filter((f) => f.stops === 0)
      .reduce((min, f) => (Number(f.price) < min ? Number(f.price) : min), Infinity);
    const onestop = list
      .filter((f) => f.stops >= 1)
      .reduce((min, f) => (Number(f.price) < min ? Number(f.price) : min), Infinity);

    return {
      airline,
      code: list[0].airlineCode,
      nonstop: nonstop === Infinity ? null : nonstop,
      onestop: onestop === Infinity ? null : onestop,
    };
  });

  const scrollByAmount = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className="relative mb-5">
      {/* Scrollable Airline Bar */}
      <div
        ref={scrollRef}
        className="flex gap-3 py-3 px-6 scroll-smooth select-none relative"
        style={{
          overflowX: 'hidden', // Disable manual scroll
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Show All Box */}
        <div className="flex flex-col justify-center items-center text-center bg-white border border-gray-200 rounded-xl px-6 py-4 min-w-[140px] flex-shrink-0">
          <div className="text-sm font-semibold text-gray-600 mb-2">Show All Fares</div>
          <div className="text-blue-600 text-sm font-semibold mb-1 cursor-pointer">Nonstop</div>
          <div className="text-blue-600 text-sm font-semibold cursor-pointer">1+ Stops</div>
        </div>

        {/* Airline Boxes */}
        {summary.map((a) => {
          const logoUrl = `https://content.airhex.com/content/logos/airlines_${a.code}_200_200_s.png`;
          return (
            <div
              key={a.airline}
              className="flex flex-col justify-between items-center bg-white border border-gray-200 rounded-xl px-6 py-4 min-w-[180px] flex-shrink-0 hover:shadow-lg transition"
            >
              <div className="flex flex-col items-center mb-2">
                <img
                  src={logoUrl}
                  alt={a.airline}
                  className="h-8 w-8 object-contain mb-1"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://pics.avs.io/200/200/${a.code?.toUpperCase()}.png`;
                  }}
                />
                <div className="text-sm font-medium text-gray-800 text-center">{a.airline}</div>
              </div>

              <div className="w-full border-t border-gray-100 my-2"></div>

              <div className="w-full text-center">
                <div className="text-xs text-gray-500">Direct</div>
                <div className="font-semibold text-gray-900">
                  {a.nonstop ? `USD ${a.nonstop.toFixed(0)}` : '—'}
                </div>
              </div>

              <div className="w-full text-center mt-2">
                <div className="text-xs text-gray-500">1 Stops</div>
                <div className="font-semibold text-gray-900">
                  {a.onestop ? `USD ${a.onestop.toFixed(0)}` : '—'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ Properly positioned arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scrollByAmount('left')}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-md transition z-20"
          aria-label="Scroll left"
        >
          <FiChevronLeft className="text-lg" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scrollByAmount('right')}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-md transition z-20"
          aria-label="Scroll right"
        >
          <FiChevronRight className="text-lg" />
        </button>
      )}
    </div>
  );
};

// -----------------------------
// Editable Search Summary Bar
// -----------------------------
const EditableSummaryBar = ({ form, setForm, navigate }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: form.depart ? new Date(form.depart) : new Date(),
      endDate: form.ret ? new Date(form.ret) : new Date(),
      key: 'selection',
    },
  ]);

  const dateRef = useRef(null);

  // ✅ Close date picker on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showDatePicker &&
        dateRef.current &&
        !dateRef.current.contains(e.target) &&
        !e.target.closest('.rdrCalendarWrapper')
      ) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDatePicker]);

  const handleAirport = (field, s) =>
    setForm((st) => ({
      ...st,
      [field]: `${s.city} (${s.iata})`,
      [`${field}_iata`]: s.iata,
    }));

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const getSuggestions = (input) => {
    const q = (input || '').trim().toLowerCase();
    if (!q) return [];
    return airports
      .filter((a) => [a.city, a.name, a.iata].some((field) => field?.toLowerCase().includes(q)))
      .slice(0, 10);
  };

  const formatDateRange = () => {
    const { startDate, endDate } = dateRange[0];
    const start = startDate.toLocaleDateString('en-GB');
    const end =
      form.tripType === 'round' && endDate ? ` - ${endDate.toLocaleDateString('en-GB')}` : '';
    return start + end;
  };


  const handleSearch = (e) => {
    e?.preventDefault();
    e?.stopPropagation();

    // Smooth scroll up
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Reset previous flight selections and trigger new search
    const newForm = {
      ...form,
      departFlight: null,
      returnFlight: null,
      timestamp: Date.now(),
    };

    // Navigate to /results with updated form
    navigate('/results', { state: newForm });

    // ✅ Reload AFTER navigation to ensure new results load properly
    setTimeout(() => {
      window.location.reload();
    }, 200); // delay ensures navigation completes first
  };





  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* 🔹 Route Inputs */}
        <div className="flex flex-wrap items-center gap-3">
          {/* From */}
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200">
            <FiMapPin className="text-blue-600" />
            <Autosuggest
              suggestions={getSuggestions(form.from)}
              onSuggestionsFetchRequested={({ value }) => getSuggestions(value)}
              onSuggestionsClearRequested={() => []}
              getSuggestionValue={(s) => `${s.city} (${s.iata})`}
              renderSuggestion={(s) => (
                <div className="px-3 py-2 text-black hover:bg-blue-50 transition">
                  <strong>{s.iata}</strong> - {s.city}
                </div>
              )}
              onSuggestionSelected={(_, { suggestion }) => handleAirport('from', suggestion)}
              inputProps={{
                placeholder: 'From airport',
                value: form.from || '',
                onChange: (_, { newValue }) =>
                  handleChange({ target: { name: 'from', value: newValue } }),
                className: 'bg-transparent text-black outline-none text-sm w-[120px] md:w-[150px]',
              }}
            />
          </div>

          <span className="text-gray-600">→</span>

          {/* To */}
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200">
            <Autosuggest
              suggestions={getSuggestions(form.to)}
              onSuggestionsFetchRequested={({ value }) => getSuggestions(value)}
              onSuggestionsClearRequested={() => []}
              getSuggestionValue={(s) => `${s.city} (${s.iata})`}
              renderSuggestion={(s) => (
                <div className="px-3 py-2 text-black hover:bg-blue-50 transition">
                  <strong>{s.iata}</strong> - {s.city}
                </div>
              )}
              onSuggestionSelected={(_, { suggestion }) => handleAirport('to', suggestion)}
              inputProps={{
                placeholder: 'To airport',
                value: form.to || '',
                onChange: (_, { newValue }) =>
                  handleChange({ target: { name: 'to', value: newValue } }),
                className: 'bg-transparent text-black outline-none text-sm w-[120px] md:w-[150px]',
              }}
            />
          </div>

          {/* Passengers */}
          <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg border border-gray-200">
            <FiUsers className="text-blue-600" />
            <input
              type="number"
              min="1"
              max="9"
              name="passengers"
              value={form.passengers || 1}
              onChange={handleChange}
              className="bg-transparent w-10 text-sm text-center outline-none"
            />
          </div>

          {/* Class */}
          <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg border border-gray-200">
            <FiBriefcase className="text-blue-600" />
            <select
              name="travelClass"
              value={form.travelClass}
              onChange={handleChange}
              className="bg-transparent outline-none text-sm"
            >
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </div>

          {/* Dates */}
          <div
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg border border-gray-200 relative"
            ref={dateRef}
          >
            <FiCalendar className="text-blue-600" />
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="text-sm text-gray-700"
            >
              {formatDateRange()}
            </button>

            {showDatePicker && (
              <div className="absolute top-[110%] z-50 bg-white rounded-xl shadow-lg border animate-fadeIn">
                <DateRange
                  onChange={(item) => {
                    setDateRange([item.selection]);
                    setForm((f) => ({
                      ...f,
                      depart: item.selection.startDate.toISOString().split('T')[0],
                      ret: item.selection.endDate.toISOString().split('T')[0],
                    }));
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  rangeColors={['#007bff']}
                  minDate={new Date()}
                  direction="horizontal"
                />
              </div>
            )}
          </div>
        </div>

        {/* 🔹 Modify Button */}
        <button
          type="button"
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition"
        >
          Search Again
        </button>
      </div>
    </div>
  );
};
// -----------------------------
// Small helper to format ISO8601 durations like "PT7H25M" → "7h 25m"
// -----------------------------
const fmtDuration = (iso) => {
  if (!iso) return '—';
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/i);
  if (!m) return iso;
  const h = m[1] ? `${m[1]}h` : '';
  const mm = m[2] ? ` ${m[2]}m` : '';
  return `${h}${mm}`.trim() || '—';
};

// -----------------------------
// Flight Card w/ dynamic logos
// -----------------------------
const FlightCard = ({ f, departFlight, returnFlight }) => {
  const navigate = useNavigate();
  const { state: form } = useLocation();
  const [logoError, setLogoError] = useState(false);
  const [returnLogoError, setReturnLogoError] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState('departure');
  const [showFareDetail, setShowFareDetail] = useState(false); // New state for popover

  const flight = departFlight || form?.departFlight || f;

  const getLogoUrl = (code) =>
    `https://content.airhex.com/content/logos/airlines_${code?.toUpperCase()}_200_200_s.png`;

  const handleSelect = () => {
    navigate('/book', {
      state: {
        flight: f,
        returnFlight: returnFlight || null,
        form,
      },
    });
  };

  // ✅ Helper to format time from ISO string to "h:mm AM/PM"
  const formatTime = (dateString) => {
    if (!dateString) return '';

    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Placeholder function for fare breakdown data
  // In a real app, this would fetch or derive from flight/returnFlight data
  const getFareBreakdown = () => {
    const flightPrice = Number(flight?.price || 0);
    const returnPrice =
      form?.tripType === 'round' && returnFlight ? Number(returnFlight.price || 0) : 0;

    // Total fare for all flights combined
    const total = flightPrice + returnPrice;

    // Use your exact logic: Base = 85%, Taxes = 15%
    const baseFare = total * 0.85;
    const taxes = total * 0.15;

    // Split base fare proportionally for round trips
    const baseFareOutbound = returnPrice ? baseFare * (flightPrice / total) : baseFare;

    const baseFareReturn = returnPrice ? baseFare * (returnPrice / total) : 0;

    return [
      { label: 'Base Fare', amount: `$${baseFareOutbound.toFixed(2)}` },
      ...(returnPrice
        ? [{ label: 'Return Base Fare', amount: `$${baseFareReturn.toFixed(2)}` }]
        : []),
      { label: 'Taxes & Fees', amount: `$${taxes.toFixed(2)}` },
      { label: 'Total', amount: `$${total.toFixed(2)}` },
    ];
  };

  return (
    <>
      {/* CARD */}
      <div className="bg-white border border-gray-200 shadow-sm overflow-hidden mb-6 rounded-lg">
        {/* Header */}
        <div className="bg-gray-100 text-gray-500 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {form.tripType === 'round' ? 'Trip Summary' : 'Flight Summary'}
          </h2>
          <span className="text-sm">
            {form?.passengers || 1} Traveler(s) • {form?.travelClass || 'Economy'}
          </span>
        </div>

        <div className="divide-y">
          {/* ✈️ Departure Segment */}
          <div className="flex flex-col md:flex-row justify-between items-start p-6 gap-4">
            <div className="flex items-start gap-4">
              <img
                src={getLogoUrl(flight.airlineCode)}
                alt={flight.airlineName}
                className="w-12 h-12 object-contain rounded-full bg-white border"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://pics.avs.io/200/200/${flight.airlineCode?.toUpperCase()}.png`;
                }}
              />

              <div>
                <h3 className="font-semibold text-gray-900 text-base">
                  {flight.from} → {flight.to}
                </h3>
                <p className="text-sm text-gray-700 font-medium">{flight.airlineName}</p>
                <p className="text-xs text-gray-500 mb-1">
                  Flight {flight.code} • {form.depart || '---'}
                </p>
                <p className="text-sm text-gray-600">
                  {flight.stops === 0 ? 'Nonstop' : `${flight.stops} Stop`} •{' '}
                  {fmtDuration(flight.duration)}
                </p>
              </div>
            </div>

            <div className="text-right text-gray-800">
              <p className="text-sm font-semibold">
                {formatTime(flight.departTime)} - {formatTime(flight.arriveTime)}
              </p>
              <p className="text-xs text-gray-500">{form.travelClass}</p>
            </div>
          </div>

          {/* 🛬 Return Segment */}
          {form.tripType === 'round' && returnFlight && (
            <div className="flex flex-col md:flex-row justify-between items-start p-6 gap-4 bg-gray-50">
              <div className="flex items-start gap-4">
                <img
                  src={getLogoUrl(returnFlight.airlineCode)}
                  alt={returnFlight.airlineName}
                  className="w-12 h-12 object-contain rounded-full bg-white border"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://pics.avs.io/200/200/${returnFlight.airlineCode?.toUpperCase()}.png`;
                  }}
                />

                <div>
                  <h3 className="font-semibold text-gray-900 text-base">
                    {returnFlight.from} → {returnFlight.to}
                  </h3>
                  <p className="text-sm text-gray-700 font-medium">{returnFlight.airlineName}</p>
                  <p className="text-xs text-gray-500 mb-1">
                    Flight {returnFlight.code} • {form.ret || '---'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {returnFlight.stops === 0 ? 'Nonstop' : `${returnFlight.stops} Stop`} •{' '}
                    {fmtDuration(returnFlight.duration)}
                  </p>
                </div>
              </div>

              <div className="text-right text-gray-800">
                <p className="text-sm font-semibold">
                  {formatTime(returnFlight.departTime)} - {formatTime(returnFlight.arriveTime)}
                </p>
                <p className="text-xs text-gray-500">{form.travelClass}</p>
              </div>
            </div>
          )}
        </div>

        {/* Fare + Button */}
        <div className="relative border-t border-gray-200 flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-gray-50">
          {' '}
          {/* Added relative for popover positioning */}
          <div className="text-left">
            <div className="text-3xl font-bold text-gray-900">
              $
              {form.tripType === 'round' && returnFlight
                ? (Number(flight.price) + Number(returnFlight.price)).toFixed(2)
                : Number(flight.price).toFixed(2)}
            </div>
            <p
              className="text-xs text-orange-600 font-semibold cursor-pointer hover:underline" // Made clickable
              onClick={() => setShowFareDetail(!showFareDetail)} // Toggle popover
            >
              Fare Detail
            </p>
            <p className="text-xs text-gray-500">(incl. taxes)</p>

            {/* Fare Detail Popover */}
            {showFareDetail && (
              <div
                className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 shadow-lg p-3 z-10 
               animate-fadeIn"
              >
                {/* Header */}
                <h4 className="text-sm font-semibold text-gray-900 mb-3 border-b pb-2">
                  💰 Price Breakdown
                </h4>

                {/* Fare items */}
                <ul className="space-y-2 text-sm text-gray-700">
                  {getFareBreakdown().map((item, index) => (
                    <li
                      key={index}
                      className={`flex justify-between ${
                        item.label === 'Total'
                          ? 'font-semibold text-gray-900 pt-2 border-t border-gray-200'
                          : ''
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="font-medium tabular-nums">{item.amount}</span>
                    </li>
                  ))}
                </ul>

                {/* Close button */}
                <button
                  onClick={() => setShowFareDetail(false)}
                  className="mt-3 text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline transition"
                >
                  Close
                </button>

                {/* Small decorative shadow edge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l border-b border-gray-200" />
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2 mt-3 md:mt-0">
            <button
              onClick={handleSelect}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded font-semibold text-sm shadow"
            >
              Select
            </button>

            <button
              onClick={() => setShowDrawer(true)}
              className="text-blue-600 text-sm hover:underline"
            >
              View Details &gt;
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- Drawer ---------------- */}
      {showDrawer && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setShowDrawer(false)}
          ></div>

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 h-full w-full sm:w-[540px] bg-white z-50 shadow-2xl overflow-y-auto transition-all duration-300 ease-in-out">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Flight Details</h2>
              <button
                onClick={() => setShowDrawer(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕ Close
              </button>
            </div>

            {/* Tabs */}
            {form.tripType === 'round' ? (
              <div className="flex border-b text-sm font-medium text-gray-700">
                <button
                  onClick={() => setActiveTab('departure')}
                  className={`flex-1 py-2 ${
                    activeTab === 'departure'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  Departure
                </button>
                <button
                  onClick={() => setActiveTab('return')}
                  className={`flex-1 py-2 ${
                    activeTab === 'return'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  Return
                </button>
              </div>
            ) : (
              <div className="border-b py-2 text-center text-sm text-gray-500">One-Way Flight</div>
            )}

            {/* Drawer Content */}
            <div className="p-6 space-y-6">
              {(activeTab === 'departure' || form.tripType !== 'round') && (
                <FlightDetailDrawer
                  title="Departure Flight"
                  data={flight}
                  form={form}
                  getLogoUrl={getLogoUrl}
                />
              )}

              {activeTab === 'return' && returnFlight && (
                <FlightDetailDrawer
                  title="Return Flight"
                  data={returnFlight}
                  form={form}
                  getLogoUrl={getLogoUrl}
                />
              )}
            </div>

            {/* Bottom Fare Summary */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center shadow-sm">
              <div>
                <p className="text-gray-500 text-xs">Grand Total (incl. taxes)</p>
                <p className="text-xl font-bold text-gray-900">
                  $
                  {form.tripType === 'round' && returnFlight
                    ? (Number(flight.price) + Number(returnFlight.price)).toFixed(2)
                    : Number(flight.price).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowDrawer(false);
                  handleSelect();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm"
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};;

// -----------------------------
// Flight Detail Drawer Component
// -----------------------------

const FlightDetailDrawer = ({ title, data, form, getLogoUrl }) => {
  const segments = data?.segments && data.segments.length ? data.segments : [data];
  const totalTrip = fmtDuration(data.totalTrip || data.duration) || '—';

  // 🔹 Compute layover duration
  const computeLayover = (prev, next) => {
    if (!prev?.arriveDate || !next?.departDate) return null;
    const diffMs = new Date(next.departDate) - new Date(prev.arriveDate);
    if (isNaN(diffMs)) return null;
    const mins = Math.floor(diffMs / 60000);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h ? `${h}h ` : ''}${m}m`;
  };
  console.log('Flight segments debug:', data.segments);

  // ✅ Helper to format time from ISO string to "h:mm AM/PM"
  const formatTime = (dateString) => {
    if (!dateString) return '';

    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm p-5 bg-white">
      <h3 className="text-base font-semibold text-gray-900 mb-4">{title}</h3>

      {segments.map((seg, i) => (
        <div key={i} className="mb-5 last:mb-0">
          {/* Airline */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img
                src={getLogoUrl(seg.airlineCode)}
                alt={seg.airlineName}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://pics.avs.io/200/200/${seg.airlineCode?.toUpperCase()}.png`;
                }}
              />
              <div>
                <p className="font-semibold text-gray-800">{seg.airlineName}</p>
                <p className="text-xs text-gray-500">
                  Flight No: {seg.code} | Operated by: {seg.airlineCode}
                </p>
              </div>
            </div>
            <span className="text-xs text-gray-500">Class: {form.travelClass}</span>
          </div>

          {/* Timeline */}
          <div className="flex justify-between items-start text-sm text-gray-700">
            <div>
              <p className="font-semibold">{formatTime(seg.departTime)}</p>

              <p className="text-gray-500">
                ({seg.from}) {seg.fromFull || 'Departure Airport'}
              </p>

              {seg.departTerminal && (
                <p className="text-xs text-gray-400">Terminal: {seg.departTerminal}</p>
              )}
            </div>

            <div className="flex-1 text-center">
              <div className="w-full border-t border-dashed border-gray-300 my-3 relative">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-gray-400">
                  {fmtDuration(seg.duration)}
                </div>
              </div>

              <p className="text-xs text-gray-400">
                {segments.length === 1
                  ? 'Nonstop'
                  : `${segments.length - 1} stop${segments.length - 1 > 1 ? 's' : ''}`}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">{formatTime(seg.arriveTime)}</p>

              <p className="text-gray-500">
                ({seg.to}) {seg.toFull || 'Arrival Airport'}
              </p>

              {seg.arriveTerminal && (
                <p className="text-xs text-gray-400">Terminal: {seg.arriveTerminal}</p>
              )}
            </div>
          </div>

          {/* 🔹 Layover between segments */}
          {i < segments.length - 1 && (
            <div className="mt-4 bg-blue-900 text-white text-sm rounded-lg px-4 py-2 flex justify-center items-center gap-2">
              <span>⏱ Layover:</span>
              <span className="font-semibold">
                {computeLayover(seg, segments[i + 1]) || segments[i + 1].layover || '—'}
              </span>
              <span className="ml-1 font-medium">
                at {seg.toFull || seg.to || 'Transit Airport'}
              </span>
            </div>
          )}
        </div>
      ))}

      {/* Total Trip Time */}
      <div className="mt-5 bg-blue-900 text-white text-sm rounded-md px-4 py-2 flex items-center justify-between">
        <span>🕓 Total Trip Time</span>
        <span className="font-semibold">{totalTrip}</span>
      </div>

      {/* Fare */}
      <div className="rounded-xl border border-gray-200 p-5 shadow-sm bg-white mt-4">
        <h3 className="font-semibold text-gray-800 mb-3">Fare Details</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Base Fare</span>
            <span>${(Number(data.price) * 0.85).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes & Fees</span>
            <span>${(Number(data.price) * 0.15).toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>${Number(data.price).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};;

// -----------------------------
// Main Results Page
// -----------------------------
const Results = () => {
  // const { state: form = {} } = useLocation();
  const location = useLocation();
  const [form, setForm] = useState(location.state || {});

  useEffect(() => {
    if (location.state) setForm(location.state);
  }, [location.state]);

  const navigate = useNavigate();

  // Skeleton gate
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000); // 5 sec gate
    return () => clearTimeout(timer);
  }, []);

  // Live flights
  const [flights, setFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [error, setError] = useState('');

  // Filters state (same behavior as your layout)
  const [stops, setStops] = useState({ nonstop: true, onestop: true });
  const [airlines, setAirlines] = useState([]); // selected airlines (names)
  const [priceCap, setPriceCap] = useState(0);

  // Fetch Flights From Duffel PHP API
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setError('');

        // OUTBOUND SEARCH
        const response = await fetch('https://airlinedealhub.com/search.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            from: form.from_iata,
            to: form.to_iata,
            departDate: form.depart,
            returnDate: form.ret,
            passengers: form.passengers || 1,
            cabinClass: form.travelClass?.toLowerCase().replace(' ', '_') || 'economy',

            tripType: form.tripType || 'oneway',
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch flights');
        }

        const mappedFlights = result.data || [];

        setFlights(mappedFlights);

        // RETURN FLIGHTS
        if (form.tripType === 'round') {
          const returnResponse = await fetch('https://airlinedealhub.com/search.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
              from: form.to_iata,
              to: form.from_iata,
              departDate: form.ret,
              passengers: form.passengers || 1,

              cabinClass: form.travelClass?.toLowerCase().replace(' ', '_') || 'economy',

              tripType: 'oneway',
            }),
          });

          const returnResult = await returnResponse.json();

          setReturnFlights(returnResult.data || []);
        }

        // FILTERS
        const allAirlineNames = Array.from(
          new Set(mappedFlights.map((f) => f.airlineName || f.airlineCode))
        );

        setAirlines(allAirlineNames);

        const maxP = Math.max(0, ...mappedFlights.map((f) => Number(f.price) || 0));

        setPriceCap(maxP);

        setError(mappedFlights.length ? '' : 'No flights found.');
      } catch (err) {
        console.error(err);
        setError('Failed to load flights.');
      }
    };

    if (form.from_iata && form.to_iata && form.depart) {
      fetchFlights();
    }
  }, [location.state?.timestamp]);

  // Build options and price bounds from live flights
  const allAirlines = useMemo(
    () => Array.from(new Set(flights.map((f) => f.airlineName || f.airlineCode))),
    [flights]
  );

  const [minPrice, maxPrice] = useMemo(() => {
    if (!flights.length) return [0, 0];
    const nums = flights.map((f) => Number(f.price) || 0);
    return [Math.min(...nums), Math.max(...nums)];
  }, [flights]);

  // Ensure priceCap respects current max when flights change
  useEffect(() => {
    if (flights.length) {
      const newMax = Math.max(...flights.map((f) => Number(f.price) || 0));
      setPriceCap((prev) => (prev === 0 ? newMax : Math.min(prev, newMax)));
    } else {
      setPriceCap(0);
    }
  }, [flights]);

  const toggleAirline = (name) => {
    setAirlines((prev) => (prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]));
  };

  // Apply filters (stops, airlines, price)
  const filteredFlights = useMemo(() => {
    return flights.filter((f) => {
      const passStops = (f.stops === 0 && stops.nonstop) || (f.stops === 1 && stops.onestop);
      const passAirline =
        airlines.length === 0 || airlines.includes(f.airlineName || f.airlineCode);
      const passPrice = Number(f.price) <= (priceCap || Infinity);
      return passStops && passAirline && passPrice;
    });
  }, [flights, stops, airlines, priceCap]);


  const pairedFlights = useMemo(() => {
    // One way
    if (form.tripType !== 'round') {
      return filteredFlights.map((f) => ({
        flight: f,
      }));
    }

    // Round trip
    return filteredFlights.slice(0, 20).map((f, i) => ({
      flight: f,
      returnFlight: returnFlights[i] || null,
    }));
  }, [filteredFlights, returnFlights, form.tripType]);



  return (
    <div className=" bg-gray-50 text-gray-200">
      {/* Top container */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {loading ? (
          <>
            {/* Skeleton summary */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md animate-pulse mb-6">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Content Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Sidebar skeleton */}
              <aside className="lg:col-span-3">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm animate-pulse space-y-4">
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  </div>
                </div>
              </aside>

              {/* Flight results skeleton */}
              <main className="lg:col-span-9 space-y-5">
                {/* Airline Fare Bar Skeleton (auto-scroll animation) */}
                <div className="relative overflow-hidden mb-5 py-3 px-2">
                  <div className="flex gap-3 animate-scroll whitespace-nowrap">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="inline-flex flex-col justify-center items-center bg-white border border-gray-200 rounded-xl px-6 py-4 min-w-[160px] animate-pulse"
                      >
                        <div className="h-8 w-8 bg-gray-200 rounded-full mb-2"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded mb-3"></div>
                        <div className="h-px bg-gray-100 w-full my-2"></div>
                        <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 w-16 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sort row skeleton */}
                <div className="flex items-center justify-between mb-3">
                  <div className="h-4 bg-gray-200 rounded w-40"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>

                {/* Flight cards skeleton */}
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                          <div>
                            <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                            <div className="h-3 w-16 bg-gray-200 rounded"></div>
                          </div>
                        </div>

                        <div className="flex-1 mx-8 flex items-center justify-between">
                          <div className="h-4 w-10 bg-gray-200 rounded"></div>
                          <div className="h-4 w-12 bg-gray-200 rounded"></div>
                          <div className="h-4 w-10 bg-gray-200 rounded"></div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="h-5 w-16 bg-gray-200 rounded"></div>
                          <div className="h-8 w-24 bg-gray-300 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </main>
            </div>
          </>
        ) : (
          <>
            {/* Search Summary Bar */}
            <EditableSummaryBar form={form} setForm={setForm} navigate={navigate} />

            {/* Content grid */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Filters Sidebar */}
              <aside className="lg:col-span-3">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 sticky top-20 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-800 mb-4">
                    <FiSliders className="text-blue-600" />
                    <h3 className="font-semibold">Filters</h3>
                  </div>

                  {/* Stops */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Stops</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="accent-blue-600"
                          checked={stops.nonstop}
                          onChange={(e) => setStops((s) => ({ ...s, nonstop: e.target.checked }))}
                        />
                        Nonstop
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="accent-blue-600"
                          checked={stops.onestop}
                          onChange={(e) => setStops((s) => ({ ...s, onestop: e.target.checked }))}
                        />
                        1 Stop
                      </label>
                    </div>
                  </div>

                  {/* Airlines */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Airlines</h4>
                    <div className="space-y-2 text-sm text-gray-700 max-h-64 overflow-auto pr-1">
                      {allAirlines.map((a) => (
                        <label key={a} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="accent-blue-600"
                            checked={airlines.includes(a)}
                            onChange={() => toggleAirline(a)}
                          />
                          {a}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Price up to</h4>
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceCap}
                      onChange={(e) => setPriceCap(Number(e.target.value))}
                      className="w-full accent-blue-600"
                      disabled={!flights.length}
                    />
                    <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                      <span>${minPrice || 0}</span>
                      <span className="font-semibold text-blue-700">${priceCap || 0}</span>
                      <span>${maxPrice || 0}</span>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Results List */}
              <main className="lg:col-span-9">
                {/* Airline fare comparison bar */}
                <AirlineFareBar flights={filteredFlights} />
                {/* sort row */}
                <div className="flex items-center justify-between mb-3 text-gray-700">
                  <div className="text-sm">
                    Showing {filteredFlights.length} of {flights.length} flights
                  </div>
                  <div className="text-sm">
                    Sorted by: <span className="font-medium text-blue-700">Recommended</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {error ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-600">
                      {error}
                    </div>
                  ) : pairedFlights.length ? (
                    pairedFlights.map(({ flight, returnFlight }, i) => (
                      <FlightCard
                        key={i}
                        f={flight}
                        departFlight={flight}
                        returnFlight={returnFlight}
                      />
                    ))
                  ) : (
                    <div className="space-y-4">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse"
                        >
                          <div className="flex items-center justify-between">
                            {/* Left */}
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>

                              <div>
                                <div className="h-4 w-28 bg-gray-200 rounded mb-2"></div>
                                <div className="h-3 w-20 bg-gray-200 rounded"></div>
                              </div>
                            </div>

                            {/* Middle */}
                            <div className="flex-1 mx-8 flex items-center justify-between">
                              <div className="h-4 w-12 bg-gray-200 rounded"></div>
                              <div className="h-4 w-20 bg-gray-200 rounded"></div>
                              <div className="h-4 w-12 bg-gray-200 rounded"></div>
                            </div>

                            {/* Right */}
                            <div className="flex flex-col items-end gap-2">
                              <div className="h-5 w-16 bg-gray-200 rounded"></div>
                              <div className="h-8 w-24 bg-gray-300 rounded"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </main>
            </div>
          </>
        )}
      </div>
    </div>
  );
};;

export default Results;
