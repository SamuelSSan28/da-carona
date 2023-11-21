import {
  doc,
  setDoc,
  query,
  where,
  orderBy,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { firestore } from "./firebase";
import { format, parse } from "date-fns";

const createEvent = async ({ title, date, hour, location, user }) => {
  // Convertendo a string de data para um objeto Timestamp
  const timestamp = Timestamp.fromDate(
    new Date(
      `${format(parse(date, "dd/MM/yyyy", new Date()), "yyyy-MM-dd")}T${hour}`
    )
  );

  const docRef = doc(firestore, "events", uuidv4());

  await setDoc(docRef, { title, date: timestamp, location }, { merge: true });
};

const getEvents = async () => {
  const eventsRef = collection(firestore, "events");
  const currentTimestamp = Timestamp.now();

  const querySnapshot = await getDocs(
    query(eventsRef, where("date", ">", currentTimestamp), orderBy("date"))
  );
  const eventsList = querySnapshot.docs.map((doc) => {
    const event = doc.data();
    const dateTimestamp = event.date.toMillis(); // Convertendo para timestamp em milissegundos

    const formattedDate = format(dateTimestamp, "dd/MM/yyyy * HH:mm").replace(
      "*",
      "às"
    ); // Formatando a data

    return {
      id: doc.id,
      ...event,
      date: formattedDate,
    };
  });
 
  return eventsList;
};

export { createEvent, getEvents };
