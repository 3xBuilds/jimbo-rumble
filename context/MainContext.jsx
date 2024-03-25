"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

  const [loader, setLoader] = useState(false);
  const [publicKey, setPublicKey] = useState(null);
  const [user, setUser] = useState({});

  async function checkExistingUser(){
    try{
      const wallet = publicKey.toString();
      const res = await axios.get("/api/user/" + wallet);

      if(res.data.user){
        setUser(res.data.user);
      }else{
        setUser(null);
      }
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    if(publicKey)
    checkExistingUser();
  },[publicKey, user])

  return (
    <GlobalContext.Provider value={{ loader, setLoader, publicKey, setPublicKey, user, setUser}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
