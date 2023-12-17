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
    );
    const [day, hour] = formattedDate.split("às");

    return {
      id: doc.id,
      ...event,
      date: formattedDate,
      day,
      hour,
    };
  });

  return eventsList;
};

const updateArrayFieldEvent = async (documentId, newElement, field) => {
  const docRef = doc(firestore, "events", documentId);

  // Verifica se o documento já existe
  const documentSnapshot = await getDoc(docRef);

  if (documentSnapshot.exists()) {
    await updateDoc(docRef, {
      [field]: arrayUnion(newElement),
    });
  } else {
    console.error("Documento não encontrado.");
  }
};

const getEvent = async (eventId) => {
  const docRef = doc(firestore, "events", eventId);

  const documentSnapshot = await getDoc(docRef);

  if (documentSnapshot.exists()) {
    // Se o documento existir, retorne os dados
    return documentSnapshot.data();
  } else {
    // Se o documento não existir, retorne null ou um valor padrão, dependendo da sua lógica
    return {};
  }
};

const requestOneRide = async (documentId, index, newValue) => {
  const docRef = doc(firestore, "events", documentId);

  // Verifica se o documento já existe
  const documentSnapshot = await getDoc(docRef);

  if (documentSnapshot.exists()) {
    const currentData = documentSnapshot.data();

    // Verifica se o novo elemento já existe no campo com base no campo "id"
    const elementWithSameId = currentData?.giveRideRequests?.[index]?.requests?.find(
      (element) => element.id === newValue.id
    );

    if (elementWithSameId) {
      throw new Error(
        "Elemento com o mesmo id já existe. Não pode ser adicionado novamente."
      );
    }

    // Cria uma cópia do array existente
    const existingRequests = [...(currentData.giveRideRequests[index]?.requests || [])];

    // Adiciona o novo valor à cópia do array
    existingRequests.push(newValue);

    // Atualiza o documento no Firebase
    const updatedData = { ...currentData };
    updatedData.giveRideRequests[index].requests = existingRequests;

    await setDoc(docRef, updatedData);
  } else {
    console.error("Documento não encontrado.");
  }
};

const aceptOneRideRequest = async (documentId, index, newValue, valueIndex) => {
  const docRef = doc(firestore, "events", documentId);

  // Verifica se o documento já existe
  const documentSnapshot = await getDoc(docRef);

  if (documentSnapshot.exists()) {
    const currentData = documentSnapshot.data();

    // Verifica se o novo elemento já existe no campo com base no campo "id"
    const elementWithSameId = currentData?.giveRideRequests?.[index]?.requests?.find(
      (element) => element.id === newValue.id
    );

    if (!elementWithSameId) {
      throw new Error(
        "Elemento não  já existe"
      );
    }

    // Cria uma cópia do array existente
    const existingRequests = [...(currentData.giveRideRequests[index]?.requests || [])];

    // Edita o valor dà cópia do array
    existingRequests[valueIndex] = newValue;

    // Atualiza o documento no Firebase
    const updatedData = { ...currentData };
    
    updatedData.giveRideRequests[index].requests = existingRequests;

    await setDoc(docRef, updatedData);
  } else {
    console.error("Documento não encontrado.");
  }
};



export {
  createEvent,
  getEvents,
  updateArrayFieldEvent,
  getEvent,
  requestOneRide,
  aceptOneRideRequest
};
