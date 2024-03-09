"use client"

import {useEffect, useState} from "react";
// import {io} from "socket.io-client";


export default function Home() {

  const [message, setMessage] = useState(["hiii", "hello", "how are you", "I am fine","hiii", "hello", "how are you", "I am fine", "what about you", "I am also fine"]);
  const [input, setInput ] = useState("");

  const wsServer = new WebSocket('ws://localhost:4000');
  
  useEffect(() => {
    wsServer.onmessage = (event) => {
      console.log("jushsdhd", event.data);
      setMessage((prev) => [...prev, `${event.data} from Server`]);
    }
  }, []);

  const sendMessage = () => {
    console.log("hh");
    wsServer.send(` ${input} `);
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-white items-center justify-center">
        <div className="flex flex-col gap-2 text-white bg-black/40 rounded-xl w-[60%] h-80 overflow-scroll p-5">
          {message?.map((msg)=>(
            <h2 className="text-white bg-white/5 px-4 py-1 w-fit rounded-md">{msg}</h2>
          ))}
        </div>
        <input type="text" onChange={(e)=>{setInput(e.target.value)}} className="bg-black/40 rounded-xl my-10 mb-4 text-white px-4 py-4 w-[60%]" placeholder={"Enter test to send to server"} />
        <button onClick={sendMessage} className="bg-white/5 rounded-lg px-5 py-2 hover:bg-white/10">Send Message</button>
    </main>
  );
}
