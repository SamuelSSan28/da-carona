import React, { createContext, useState, useEffect } from "react";
import { getUser } from "../services/user";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Recuperar token do LocalStorage ao inicializar o componente
    const storedToken = localStorage.getItem("token-daCarona");
    if (storedToken) {
      setToken(storedToken);
    }

    //puxar dados do usuário aqui e setar no state
    const fetchData = async () => {
      try {
        const userData = await getUser(storedToken);
        setUser({id:storedToken, ...userData});
      } catch (error) {
        console.error("Erro ao atualizar os dados dos usuários:", error);
      }  
    };

    fetchData();    
  }, []);

  // Função para atualizar o token e persistir no LocalStorage
  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token-daCarona", newToken);
  };

  return (
    <UserContext.Provider value={{ token, updateToken, user }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
