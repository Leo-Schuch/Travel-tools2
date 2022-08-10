import { doc, updateDoc, collection, query, orderBy } from 'firebase/firestore';
import { db } from './firebase-config';

const insert = async (data) => {
  const id = new Date().getTime();
  const docRef = doc(db, 'calculos', id);

  await updateDoc(docRef, data);
};

const getQuery = async (collectionName) => query(collection(db, collectionName), orderBy('created', 'desc'));

export { insert, getQuery };