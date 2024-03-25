"use client";

import {
  createContext,
  useContext,
  useState
} from "react";

const GlobalContext = createContext();


export const GlobalContextProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [publicKey, setPublicKey] = useState(null);
  const [userName, setUserName] = useState(null);

  return (
    <GlobalContext.Provider value={{ loader, setLoader, publicKey, setPublicKey, userName, setUserName}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
