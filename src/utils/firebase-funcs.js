import app from "../../firebase-config";
import {
  doc,
  getFirestore,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
const firestore = getFirestore();

export const readUser = async (docRef) => {
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    const docData = snapshot.data();
    const stringData = JSON.stringify(docData);
    return JSON.parse(stringData);
  } else {
    return undefined;
  }
};

export const readBookDetails = async (isbn) => {
  const docRef = doc(firestore, `books/${isbn}`);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    const docData = snapshot.data();
    const stringData = JSON.stringify(docData);
    return JSON.parse(stringData);
  } else {
    return undefined;
  }
};

export const readUserLibrary = async (email) => {
  const docRef = doc(firestore, `users/${email}`);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    const docData = snapshot.data();
    const stringData = JSON.stringify(docData);
    return JSON.parse(stringData).bookLibrary;
  } else {
    return undefined;
  }
};

export const readBookListDetails = async (isbnArr) => {
  const booksRef = collection(firestore, "books");
  const bookDetails = [];

  while (isbnArr.length) {
    const batch = isbnArr.splice(0, 10);
    const q = query(booksRef, where("__name__", "in", batch));

    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      const bookFromDb = doc.data();
      bookFromDb.isbn = doc.id;
      bookDetails.push(bookFromDb);
    });
  }

  return bookDetails;
};
