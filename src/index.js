import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { UserProvider } from "./context/user";

const root = ReactDOM.createRoot(document.getElementById("root"));

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registrado com sucesso:", registration);
      })
      .catch((error) => {
        console.error("Erro ao registrar o Service Worker:", error);
      });
  });
}

root.render(
  <React.StrictMode>
    <UserProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </UserProvider>
  </React.StrictMode>
);
