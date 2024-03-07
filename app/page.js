"use client"

import {useEffect, useState} from "react";
// import {io} from "socket.io-client";


export default function Home() {

  const [message, setMessage] = useState([]);
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
    wsServer.send('Hello from the client!');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>({message})</h1>
        <button onClick={sendMessage}>Send Message</button>
    </main>
  );
}
