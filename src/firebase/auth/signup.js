import firebase_app from '../config';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

//Grabs the auth object from firebase
const auth = getAuth(firebase_app);

//Creates a new user with email and password
export default async function signUp(email, password) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
