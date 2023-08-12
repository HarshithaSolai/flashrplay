import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../utils/context/AppContext'; // Import the AppContext
import { doc, updateDoc } from 'firebase/firestore'; // Import Firestore updateDoc
import { db } from '../../utils/firebase';
import { UserAuth } from '../../utils/context/AuthContext'; // Import the AuthContext


const FlashcardModal = ({ flashCardCollectionId, cards, onClose }) => {
  const { userData, setUserData, settings } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const { user } = UserAuth(); // Use the AuthContext to get the authenticated user

  useEffect(() => {
    let interval;

    if (isPlaying && currentIndex < cards.length - 1) {
      interval = setInterval(() => {
        setCurrentIndex(currentIndex + 1);
      }, settings.speed * 1000); // Convert speed to milliseconds
    } else if (currentIndex === cards.length - 1 && isPlaying) {
      // Update completedTimes for the specific flashCardCollectionId in userData
      const updatedUserData = { ...userData };
      if (!updatedUserData[flashCardCollectionId]) {
        updatedUserData[flashCardCollectionId] = {
          completedTimes: 1,
        };
      } else {
        updatedUserData[flashCardCollectionId].completedTimes += 1;
      }

      // Update the userData document in Firestore
      const userDocRef = doc(db, 'userData', user.uid);
      updateDoc(userDocRef, updatedUserData).then(() => {
        setUserData(updatedUserData);
      });
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying && hasMounted && currentIndex < cards.length) {
      const speech = new SpeechSynthesisUtterance(cards[currentIndex].name);

      // Set the speech synthesis options, like voice type
      const voices = speechSynthesis.getVoices();
      const selectedVoiceType = settings.voiceType;
      const selectedVoice = voices.find(voice => voice.name.includes(selectedVoiceType));
      if (selectedVoice) {
        speech.voice = selectedVoice;
      }

      speechSynthesis.speak(speech);
    }
  }, [isPlaying, hasMounted, currentIndex, cards, settings]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg mt-10 w-[600px] h-[450px] flex flex-col gap-12">
        <div className='flex flex-row justify-center w-full h-3/4'>
          <img src={cards[currentIndex].image} alt={cards[currentIndex].name} className="mb-4" />
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
