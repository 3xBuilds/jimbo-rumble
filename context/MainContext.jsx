"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {


  const router = useRouter();

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
    }
  }

  useEffect(()=>{
    if(publicKey)
      checkExistingUser();
  },[publicKey])

  return (
    <GlobalContext.Provider value={{ loader, setLoader, publicKey, setPublicKey, user, setUser}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
