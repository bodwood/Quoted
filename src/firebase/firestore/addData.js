import firebase_app from '../config';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';

const db = getFirestore(firebase_app);
const storage = getStorage(firebase_app);

export default async function addData(collection, id, data, profilePicFile) {
  let result = null;
  let error = null;

  try {
    if (profilePicFile) {
      const listRef = ref(storage, `profile-pics/${id}`);
      let profilePicString = '';
      const picList = await listAll(listRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
             profilePicString = itemRef.name;
          });
        })
        .catch((error) => {
          console.log('Error listing profile pics:', error);
        });
     
     const currentProfilePic = ref(storage, `profile-pics/${id}/${profilePicString}`);
      if(currentProfilePic) {
        await deleteObject(currentProfilePic).then(() => {
          console.log('Current Profile Pic Deleted');
        }).catch((error) => {
          console.log('Error deleting current profile pic:', error);
        });
      }

      const profilePicRef = ref(storage, `profile-pics/${id}/${profilePicFile.name}`);
      await uploadBytes(profilePicRef, profilePicFile);
      const profilePicUrl = await getDownloadURL(profilePicRef);

      data = {
        ...data,
        profilePic: profilePicUrl,
      };
    }
    result = await setDoc(doc(db, collection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
