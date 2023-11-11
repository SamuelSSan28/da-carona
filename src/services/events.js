import {
  doc,
  setDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const createEvent = async (title, date, hour, location, user) => {
  try {
    const docRef = doc(firestore, "events", uuidv4());

    await setDoc(
      docRef,
      { title, date, hour, location, user },
      { merge: true }
    );
  } catch (error) {
    console.error("Erro ao salvar evento:", error);
  }
};

const getEvents = async (dateStart, dateEnd) => {
  const eventssRef = collection(firestore, "events");

  // Create a query against the collection.
  const q = query(eventssRef, where("name", "!=", ""));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
};

export { createEvent, getEvents };
