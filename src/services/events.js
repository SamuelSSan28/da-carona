import {
  doc,
  setDoc,
  query,
  where,
  orderBy,
  collection,
  getDocs,
  Timestamp,
  updateDoc,
  getDoc,
  arrayUnion,
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

const updateArrayFieldEvent =async (documentId, newElement,field) => {
  const docRef = doc(firestore, "events", documentId);

  // Verifica se o documento já existe
  const documentSnapshot = await getDoc(docRef);

  if (documentSnapshot.exists()) {
    await updateDoc(docRef, {
      [field]: arrayUnion(newElement),
    });

    console.log('Elemento adicionado ao array com sucesso!');
  } else {
    console.error('Documento não encontrado.');
  }
};
export { createEvent, getEvents, updateArrayFieldEvent };
