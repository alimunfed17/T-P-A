import Link from 'next/link';
import { BiMapPin, BiMobile, BiStar } from 'react-icons/bi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { FaArrowRight } from 'react-icons/fa';
import { HiArrowPath } from 'react-icons/hi2';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Welcome to Your Next <span className="text-yellow-300">Adventure</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Your AI-powered personal travel guide that creates personalized itineraries, 
              discovers hidden gems, and turns every journey into an unforgettable adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/planner" 
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200 flex items-center gap-2 shadow-lg"
              >
                Create My Perfect Trip
                <FaArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/trips" 
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200"
              >
                Browse Curated Adventures
              </Link>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              Get a personalized itinerary in minutes • Discover popular destinations and experiences
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Travel Smarter?
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Gone are the days of generic travel advice and cookie-cutter itineraries. Our intelligent 
              platform learns your preferences, budget, and travel style to craft experiences that match 
              your unique personality. Whether you're seeking luxury escapes, budget adventures, 
              family-friendly activities, or solo exploration, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Tell us your preferences",
                description: "Share your interests, budget, and travel style",
                icon: "👤"
              },
              {
                step: "2", 
                title: "AI creates your perfect trip",
                description: "Our smart algorithm builds personalized itineraries",
                icon: "🤖"
              },
              {
                step: "3",
                title: "Explore and customize", 
                description: "Fine-tune recommendations to match your vision",
                icon: "✨"
              },
              {
                step: "4",
                title: "Travel with confidence",
                description: "Access real-time updates and local insights", 
                icon: "✈️"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Featured Benefits
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BiMapPin className="w-8 h-8 text-blue-600" />,
                title: "Personalized recommendations",
                description: "Based on your preferences and travel style"
              },
              {
                icon: <BiStar className="w-8 h-8 text-blue-600" />,
                title: "Real-time local insights",
                description: "Discover hidden gems and local favorites"
              },
              {
                icon: <BsCurrencyDollar className="w-8 h-8 text-blue-600" />,
                title: "Budget optimization",
                description: "Get maximum value for your money"
              },
              {
                icon: <BiMobile className="w-8 h-8 text-blue-600" />,
                title: "Mobile-friendly access",
                description: "Access your itinerary anywhere you go"
              },
              {
                icon: <HiArrowPath className="w-8 h-8 text-blue-600" />,
                title: "Easy customization",
                description: "Make changes and get instant updates"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-blue-600 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join thousands of travelers who've discovered their perfect adventures
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            with our AI travel companion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/planner" 
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200 flex items-center gap-2 shadow-lg"
            >
              Start Planning Now
              <FaArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/trips" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200"
            >
              Explore Popular Trips
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
