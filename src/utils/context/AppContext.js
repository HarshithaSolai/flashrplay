import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { getDocs, getDoc, collection, doc } from 'firebase/firestore';
import { UserAuth } from './AuthContext'; // Import the AuthContext

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const { user } = UserAuth(); // Use the AuthContext to get the authenticated user
  const [userData, setUserData] = useState({});
  const [settings, setSettings] = useState({});


  const fetchUserData = async (userId) => {
    if (userId) {
      try {
        const userDocRef = doc(db, 'userData', userId);
        const userDocSnapshot = await getDoc(userDocRef);
  
        if (userDocSnapshot.exists()) {
          const userCollections = userDocSnapshot.data();
          setUserData(userCollections);
        } else {
          console.log('User data not found for userId:', userId);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    } else {
      setUserData({});
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
    fetchSettings();
    // eslint-disable-next-line
  }, []); 

  useEffect(() => {
    fetchUserData(user ? user.uid : null);
    // eslint-disable-next-line
  }, [user]);

  return (
    <AppContext.Provider value={{ userData, setUserData, settings }}>
      {children}
    </AppContext.Provider>
  );
};
