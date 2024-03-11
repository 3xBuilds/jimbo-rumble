"use client"

import { useEffect, useState } from "react";

const usePhantomProvider = () => {
    const [provider, setProvider] = useState(null);

    useEffect(() => {
        if ('phantom' in window) {
            const provider = window.phantom?.solana;

            if (provider?.isPhantom) {
                setProvider(provider);
            }
        }
        else {
            throw new Error("Phantom wallet not installed");
        }
    }, []);

    return {provider};
};

export default usePhantomProvider;