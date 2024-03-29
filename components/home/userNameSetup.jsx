import { GlobalContextProvider } from "@/context/MainContext"
import { useContext, useEffect, useState } from "react";
import { useGlobalContext } from "@/context/MainContext";
import  axios  from "axios";


export default function UserNameSetup(){

    const {publicKey, setPublicKey} = useGlobalContext();
    const{user, setUser} = useGlobalContext();

    const[enteredName, setEnteredName] = useState("");
    const[error, setError] = useState(null)

    function handleUserName(e){
        setError(null);
        setEnteredName(e.target.value);
    }

    async function userNameSetup(){
        try{
            const wallet = publicKey.toString();
            if(enteredName != ""){
                await axios.post("/api/user/create",{
                    walletId: wallet,
                    username: enteredName
                })
                .then((res)=>{
                    setUser(res.data.user)})
                    .catch((err)=>{
                    if(err.response.status == 409){
                        setError(err.response.data.error);
                    }
                });
            }
        }
        catch(err){
        }
    }

    if(!user)
    return (
        <div className="w-[100vw] h-[100vh] absolute top-0 left-0 bg-black/40 backdrop-blur-md flex items-center justify-center">
            <div className="bg-gradient-to-br backdrop-brightness-0 text-white from-jimbo-green/10 to-jimbo-green/40 rounded-xl px-4 py-2 flex flex-col items-center justify-center border-2 border-jimbo-green">
                <h1 className="mb-4">Name your Warrior:</h1>
                <input value={enteredName} onChange={handleUserName} className=" p-2 px-4 rounded-xl bg-black/50 text-jimbo-green outline-jimbo-green border-none"></input>
                {<p className="text-red-500 text-xs mt-2">{error}</p>}
                <button onClick={userNameSetup} className="block mx-auto mt-6 bg-jimbo-green/80 hover:brightness-125 duration-200 px-3 py-2 rounded-xl">Submit</button>
            </div>
        </div>
    )
}