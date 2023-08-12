import React, { useState, useEffect } from "react";
import { useAppContext } from "../utils/context/AppContext"; // Update the path accordingly
import { db } from "../utils/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import FlashcardModal from "./Modal/FlashcardModal";
import bugfender from "../utils/bugfender";

const CardsList = () => {
  const { userData, settings } = useAppContext();
  const [flashCardCollection, setFlashCardCollection] = useState([]);
  const [flashCard, setFlashCard] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = async (flashCardCollectionId) => {
    try {
      const q = query(
        collection(db, "flashCard"),
        where("flashCardCollectionId", "==", flashCardCollectionId)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setFlashCard(data[0]);
      setIsModalOpen(true);
    } catch (error) {
      bugfender.sendIssue("fetching flash card collection", error )
      console.error("Error fetching data:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFlashCard([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "flashCardCollection")
        );
        const data = querySnapshot.docs.map((doc) => doc.data());
        setFlashCardCollection(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Determine card status based on userData and settings
  const getCardStatus = (card) => {
    const collectionId = card.id; // Assuming card.id corresponds to flashCardCollection ID
    const collectionData = userData[collectionId];

    if (!collectionData) {
      return "todo"; // Assuming new collections are always "todo"
    }

    if (
      collectionData.completedTimes < settings.maxTimes ) {
      return "in progress";
    } else {
      return "done";
    }
  };

  // Separate cards based on status
  const todoCards = flashCardCollection.filter(
    (card) => getCardStatus(card) === "todo"
  );
  const inProgressCards = flashCardCollection.filter(
    (card) => getCardStatus(card) === "in progress"
  );
  const doneCards = flashCardCollection.filter(
    (card) => getCardStatus(card) === "done"
  );

  return (
    <div className="pt-[100px]">
      <div className="flex justify-around gap-4">
        {/* Column for "Todo" cards */}
        <div className="flex flex-col bg-white rounded p-4 w-[350px] shadow">
          <h2 className="text-2xl font-semibold mb-2 text-pink-500 text-center">
            TODO
          </h2>
          {todoCards.map((card) => (
            <div
              key={card.id}
              onClick={() => openModal(card.id)}
              className="card-item text-center bg-pink-200 p-2 rounded cursor-pointer mb-2 w-full shadow"
            >
              <p>{card.name}</p>
              <p>Count Status : 0 of {settings.maxTimes} </p>
            </div>
          ))}
        </div>

        {/* Column for "In Progress" cards */}
        <div className="flex flex-col bg-white rounded p-4 w-[350px] shadow">
          <h2 className="text-2xl font-semibold mb-2 text-center text-yellow-500">
            IN PROGRESS
          </h2>
          {inProgressCards.map((card) => (
            <div
              key={card.id}
              onClick={() => openModal(card.id)}
              className="card-item bg-yellow-300 p-2 rounded cursor-pointer mb-2 text-center"
            >
              <p>{card.name}</p>
              <p>Count Status : {userData[card.id]?.completedTimes} of {settings.maxTimes} </p>
                  </div>
          ))}
        </div>

        {/* Column for "Done" cards */}
        <div className="flex flex-col bg-white rounded p-4 w-[350px] shadow">
          <h2 className="text-2xl font-semibold mb-2 text-center text-green">DONE</h2>
          {doneCards.map((card) => (
            <div
              key={card.id}
              onClick={() => openModal(card.id)}
              className="card-item bg-green p-2 rounded cursor-pointer mb-2 text-center"
            >
              <p>{card.name}</p>
              <p>Count Status : {userData[card.id]?.completedTimes} of {settings.maxTimes} </p>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && <FlashcardModal flashCardCollectionId={flashCard.flashCardCollectionId} cards={flashCard.items} onClose={closeModal} />}
    </div>
  );
};

export default CardsList;
