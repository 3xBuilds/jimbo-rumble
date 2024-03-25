import { GlobalContextProvider } from "@/context/MainContext"
import { useContext, useEffect, useState } from "react";
import { useGlobalContext } from "@/context/MainContext";
import  axios  from "axios";


export default function UserNameSetup(){

    const {publicKey, setPublicKey} = useGlobalContext();
    const{userName, setUserName} = useGlobalContext();
    const [userNameModal, setUserNameModal] = useState(false);

    const[enteredName, setEnteredName] = useState("");
    const[error, setError] = useState(false)

    async function checkExistingUser(){
        try{
            const wallet = publicKey.toString();
            console.log("hello", wallet)
            const res = await axios.get("/api/user/"+wallet);
            console.log(res);

            if(res.data.user == null){
                setUserNameModal(true);
            }

        }
        catch(err){
            console.log(err)
        }
    }

    function handleUserName(e){
        setError(false);
        setEnteredName(e.target.value);
    }

    async function userNameSetup(){
        try{
            const wallet = publicKey.toString();
            if(enteredName != ""){
                console.log(wallet, enteredName);
                await axios.post("/api/user/create", {walletId: wallet, username: enteredName}).then((res)=>{console.log(res);setUserNameModal(false); setUserName(res.data.user)}).catch((err)=>{console.log(err); 
                if(err.response.status == 409){
                    setError(true);
                }});
            }
        }
        catch(err){
            console.log(err);
        }
    }
    
    useEffect(()=>{
        if(publicKey)
        checkExistingUser();
    if(publicKey == null)
    setUserNameModal(false);
    },[publicKey])


    if(userNameModal)
    return (
        <div className="w-[100vw] h-[100vh] absolute top-0 left-0 bg-black/40 backdrop-blur-md flex items-center justify-center">
            <div className="bg-gradient-to-br text-white from-jimbo-green/10 to-jimbo-green/40 rounded-xl px-4 py-2 border-2 border-jimbo-green">
                <h1 className="mb-4">Name your Warrior:</h1>
                <input value={enteredName} onChange={handleUserName} className="text-black p-2 rounded-xl"></input>
                {error&& <h1 className="text-red-500">Username already exists</h1>}
                <button onClick={userNameSetup} className="block mx-auto my-6 bg-jimbo-green/80 hover:bg-jimbo-green duration-200 px-3 py-2 rounded-xl">Submit</button>
            </div>
        </div>
    )
}