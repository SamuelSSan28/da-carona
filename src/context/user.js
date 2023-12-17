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
        if(!storedToken) return;
        const userData = await getUser(storedToken);

        if(userData)
          setUser({ id: storedToken, ...userData });
        else{
          localStorage.setItem("token-daCarona", null);
        }
      } catch (error) {
        console.error("Erro ao buscar  os dados dos usuários:", error);
      }
    };

    if (!user) fetchData();
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
