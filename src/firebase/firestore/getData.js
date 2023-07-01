import firebase_app from '../config';
import { getFirestore, doc, getDoc, updateDoc, getDocs, collection, query, where, getUser } from 'firebase/firestore';

const db = getFirestore(firebase_app);

// Gets a document from Firestore by using the getDoc function from firebase/firestore
export async function getDocument(collection, id) {
  const docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

// Updates a document in Firestore by using the updateDoc function from firebase/firestore
export async function updateDocument(collection, id, data) {
  const docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    await updateDoc(docRef, data);
    result = 'Document updated successfully.';
  } catch (e) {
    error = e;
  }

  return { result, error };
}

// Retrieves all quotes from all users
export async function getAllQuotes() {
  const usersCollectionRef = collection(db, 'users');
  const querySnapshot = await getDocs(usersCollectionRef);

  let allQuotes = [];

  querySnapshot.forEach((userDoc) => {
    const userData = userDoc.data();
    const userQuotes = userData.quotes || [];
    allQuotes = allQuotes.concat(userQuotes);
  });

  return allQuotes;
}

// Retrieves all quotes from all users
export async function getAllQuoteInfo() {
  const usersCollectionRef = collection(db, 'users');
  const querySnapshot = await getDocs(usersCollectionRef);

  let allQuotes = [];

  querySnapshot.forEach((userDoc) => {
    const userData = userDoc.data();
    const { data, profilePic, quotes } = userData;
    const userQuotesWithInfo = quotes.map((quote) => {
      return {
        data,
        profilePic,
        quote,
      };
    });
    allQuotes = allQuotes.concat(userQuotesWithInfo);
    console.log(allQuotes)
  });

  return allQuotes;
}


// Fetches the user data from Firestore based on the user's ID
export async function fetchUser(userId) {
  const userCollectionRef = collection(db, 'users');
  const q = query(userCollectionRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  // try {
  //   const userCollectionRef = collection(db, 'users');
  //   const q = query(userCollectionRef, where('userId', '==', userId));
  //   const querySnapshot = await getDocs(q);

  //   if (!querySnapshot.empty) {
  //     const userDoc = querySnapshot.docs[0];
  //     console.log(userDoc)
  //     const userData = userDoc.data();
  //     return userData;
  //   }
  // } catch (error) {
  //   console.error('Error fetching user data: ', error);
  // }
  
  // return null;
}