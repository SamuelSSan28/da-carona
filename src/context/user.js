import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Recuperar token do LocalStorage ao inicializar o componente
    const storedToken = localStorage.getItem('token-daCarona');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Função para atualizar o token e persistir no LocalStorage
  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token-daCarona', newToken);
  };

  return (
    <UserContext.Provider value={{ token, updateToken }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
