'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react"
import { ChevronLeft } from "lucide-react"

export interface cryptoType {
  name: string;
  percentage_change: string;
  price: string;
}

interface cryptoNews {
  news: string;
}

export default function CryptoPage() {
  const [cryptoData, setCryptoData] = useState<cryptoType[]>([]);
  const [cryptoNews, setCryptoNews] = useState<cryptoNews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://web-scraper-for-crypto.onrender.com/crypto");
        const data = await response.json();
        setCryptoData(data[0]); 
        setCryptoNews(data[1]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="bg-black text-white w-screen h-screen">
      {/* Header */}
      <div className="w-full z-20 text-2xl font-semibold h-1/12 bg-black/50 backdrop-blur-md p-4 text-white fixed">
        Get Crypto
      </div>
  
      {/* Content */}
      <div className="w-full h-[45%] p-4 pt-20">
        <div className="relative w-full">
          {/* Card Container with Scroll Buttons */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-10 hover:bg-black p-2 rounded-full shadow-md"
            onClick={() => scroll('left')}
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black p-2 rounded-full shadow-md"
            onClick={() => scroll('right')}
          >
            <ChevronRight />
          </button>
  
          {cryptoData.length > 0 ? (
            <div
              id="crypto-container"
              className="flex hide-scrollbar p-2 space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 cursor-pointer relative"
            >
              {cryptoData.map((crypto, index) => (
                <div
                  key={index}
                  className="min-w-[250px] bg-zinc-800 rounded-lg p-4 shadow-md flex-shrink-0"
                >
                  <h3 className="text-2xl font-sans font-bold mb-2">{crypto.name}</h3>
                  <p className="text-md font-sans">Price: {crypto.price}</p>
                  <p
                    className={`text-sm ${
                      parseFloat(crypto.percentage_change) >= 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    Change: {crypto.percentage_change}
                  </p>
                  <div className="mt-3">
                    <Button 
                      className="bg-white text-black hover:bg-zinc-400"
                      onClick={() => window.location.href = 'https://crypto.com/'}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No data available</div>
          )}
        </div>
      </div>
      <div className="justify-center items-center flex flex-col"> 
        <div className="font-bold text-4xl p-2 ">
            <h3 > Crypto News </h3>
        </div>
        <div className="text-white bg-black p-2">
          {cryptoNews.map((crypto, index) => (
          <li className="text-md hover:underline underline-offset-1 cursor-pointer font-sans text-slate-300" key={index}>
            {crypto.news}
          </li>))}
        </div>
      </div>
      <div className="bottom-0 justify-between flex w-full h-1/12 bg-black/50 backdrop-blur-md p-4 text-white fixed">
        <div className="text-sm font-light text-slate-300">
          &copy; 2024 Crypto Inc.
        </div>
        <div>
        <a href="https://github.com/Suyash878/Crypto-FE.git" target="_blank" rel="noopener noreferrer">
          <svg role="img" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6 ml-2 cursor-pointer">
            <title>GitHub</title>
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.263.82-.582 0-.288-.01-1.05-.015-2.06-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.805 1.305 3.49.997.108-.775.42-1.305.763-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.47-2.38 1.235-3.22-.125-.305-.535-1.53.115-3.18 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.655 1.65.245 2.875.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.62-5.475 5.92.43.37.81 1.1.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .32.21.7.825.58C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        </div>
      </div>
    </div>
  );
  
  function scroll(direction: 'left' | 'right') {
    const container = document.getElementById('crypto-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
    
}