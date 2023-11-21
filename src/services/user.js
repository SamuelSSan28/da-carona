import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "./firebase";

const updateVehicle = async (userId, vehicle, vehicleVacancies) => {
  const docRef = doc(firestore, "users", userId);

  await setDoc(docRef, { vehicle, vehicleVacancies }, { merge: true });

  return true;
};

const getUser = async (userId) => {
  const docRef = doc(firestore, "users", userId);

  const documentSnapshot = await getDoc(docRef);

  if (documentSnapshot.exists()) {
    // Se o documento existir, retorne os dados
    return documentSnapshot.data();
  } else {
    // Se o documento não existir, retorne null ou um valor padrão, dependendo da sua lógica
    return {};
  }
};

export { updateVehicle, getUser };
