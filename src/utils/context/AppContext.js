import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { getDocs, getDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { UserAuth } from './AuthContext'; // Import the AuthContext

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const { user } = UserAuth(); // Use the AuthContext to get the authenticated user
  const [userData, setUserData] = useState({});
  const [settings, setSettings] = useState({});

const incrementCompletedTimes = async (flashCardCollectionId) => {
  try {
    if (user) {
      const userRef = doc(db, 'userData', user.uid); 
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        if (userData[flashCardCollectionId]) {
          // Increment the completedTimes for the specific flashCardCollectionId
          userData[flashCardCollectionId].completedTimes += 1;

          // Update the user data with the modified userData
          await updateDoc(userRef, userData);

          // Refresh the user data after updating
          fetchUserData();
        } else {
          console.log('flashCardCollectionId not found in userData');
        }
      } else {
        console.log('User document does not exist');
      }
    } else {
      console.log('User is not authenticated');
    }
  } catch (error) {
    console.error('Error incrementing completedTimes:', error);
  }
};


  const fetchUserData = async () => {
    if (user) {
      try {
        const userDataSnapshot = await getDocs(collection(db, 'userData'));
        const userData = {};
  
        userDataSnapshot.forEach((doc) => {
          userData[doc.id] = doc.data();
        });
  
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    } else {
      console.log('User is not authenticated');
    }
  };


  const fetchSettings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'settings'));
      const data = querySnapshot.docs.map((doc) => doc.data())[0]; // Assuming there's only one document
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchSettings();
    // eslint-disable-next-line
  }, [user]); 

  return (
    <AppContext.Provider value={{ userData, setUserData, settings, incrementCompletedTimes }}>
      {children}
    </AppContext.Provider>
  );
};
