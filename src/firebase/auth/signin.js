import firebase_app from '../config';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

//Grabs the auth object from firebase
const auth = getAuth(firebase_app);

//Signs in a user with email and password
export default async function signIn(email, password) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
