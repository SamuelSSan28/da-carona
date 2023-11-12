import {
  doc,
  setDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { firestore } from "./firebase";

const createEvent = async ({ title, date, hour, location, user }) => {
  const docRef = doc(firestore, "events", uuidv4());

  await setDoc(docRef, { title, date, hour, location }, { merge: true });
};

const getEvents = async (dateStart, dateEnd) => {
  const eventsRef = collection(firestore, "events");

  const querySnapshot = await getDocs(eventsRef);

  const eventsList = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return eventsList;
};

export { createEvent, getEvents };
