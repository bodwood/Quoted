import firebase_app from '../config';
import { signOut, getAuth } from 'firebase/auth';

//Grabs the auth object from firebase
const auth = getAuth(firebase_app);

//Signs in a user with email and password
export default async function userSignOut() {
  let result = null,
    error = null;
  try {
    result = await signOut(auth);
  } catch (e) {
    error = e;
  }
  return { result, error };
}
