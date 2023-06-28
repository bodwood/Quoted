import firebase_app from '../config';
import { getFirestore, doc, getDoc, updateDoc, getDocs, collection } from 'firebase/firestore';

const db = getFirestore(firebase_app);

// Gets a document from Firestore by using the getDoc function from firebase/firestore
export async function getDocument(collection, id) {
  const docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
    console.log(result);
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
