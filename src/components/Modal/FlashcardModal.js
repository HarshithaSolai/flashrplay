import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../utils/context/AppContext'; // Import the AppContext

const FlashcardModal = ({ cards, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    let interval;

    if (isPlaying && currentIndex < cards.length - 1) {
      interval = setInterval(() => {
        setCurrentIndex(currentIndex + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, cards]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying && hasMounted && currentIndex < cards.length) {
      const speech = new SpeechSynthesisUtterance(cards[currentIndex].name);
      
      speechSynthesis.speak(speech);
    }
  }, [isPlaying, hasMounted, currentIndex, cards]);

  useEffect(() => {
    setHasMounted(true);
  }, []);


  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg mt-10 w-[600px] h-[450px] flex flex-col gap-12">
        <div className='flex flex-row justify-center w-full h-3/4'>
          <img src={cards[currentIndex].image} alt={cards[currentIndex].name} className="mb-4 " />
        </div>
        <div className='flex flex-row justify-center gap-4'>
          <button
            onClick={togglePlay}
            className="mr-2 bg-green-500 text-white rounded-md px-4 py-2"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white rounded-md px-4 py-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardModal;
