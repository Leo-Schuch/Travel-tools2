import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';

const getAllDocumentsAt = async (collectionName) => {
  const results = [];
  const querySnapshot = await getDocs(collection(db, collectionName));

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    results.push({
      id: doc.id,
      name: data?.name,
      value: data?.value
    });
  });

  return results;
};

export { getAllDocumentsAt };