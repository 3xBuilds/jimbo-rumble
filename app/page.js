"use client"
import {useEffect} from "react";
import {io} from "socket.io-client";


export default function Home() {
  
  useEffect(() => {
    const socket = io('http://localhost:3001');
    
    socket.on('message', (msg) => {
        console.log('Received message:', msg);
    });

    socket.emit('message', 'Hello from the client!');

    return () => {
        socket.disconnect();
    }
  }, []);

  const sendMessage = () => {
    console.log("hh");
    socket.emit('message', 'Hello from the client!');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
        <button onClick={sendMessage}>Send Message</button>
    </main>
  );
}
