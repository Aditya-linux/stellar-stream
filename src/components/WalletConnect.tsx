"use client";

import { useState, useEffect } from "react";
import { isConnected, setAllowed, getAddress } from "@stellar/freighter-api";
import { Wallet, LogOut, Loader2 } from "lucide-react";

export default function WalletConnect({ onConnect }: { onConnect: (address: string) => void }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setIsLoading(true);
    try {
      const installed = await isConnected();
      if (!installed) {
        setIsInstalling(true);
        setIsLoading(false);
        return;
      }

      if (await isAllowed()) {
        const response = await getAddress();
        if (response.address) {
          setAddress(response.address);
          onConnect(response.address);
        }
      }
    } catch (err) {
      console.error("Error checking connection:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const isAllowed = async () => {
    const allowed = await setAllowed(); // This actually prompts or checks if allowed
    return allowed;
  };

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      const installed = await isConnected();
      if (!installed) {
        window.open("https://www.freighter.app/", "_blank");
        return;
      }

      const allowed = await setAllowed();
      if (allowed) {
        const response = await getAddress();
        if (response.address) {
          setAddress(response.address);
          onConnect(response.address);
        }
      }
    } catch (error) {
      console.error("Connection failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    setAddress(null);
    onConnect(""); // Or handle disconnect state in parent
    // Freighter doesn't have a strict disconnect API for dApps, local state clear is main way
  };

  if (isInstalling) {
    return (
      <a
        href="https://www.freighter.app/"
        target="_blank"
        rel="noreferrer"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
      >
        Install Freighter
      </a>
    );
  }

  if (address) {
    return (
      <div className="flex items-center gap-3 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700/50 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] animate-pulse" />
          <span className="text-sm font-mono text-slate-200 tracking-wide">
            {address.slice(0, 4)}...{address.slice(-4)}
          </span>
        </div>
        <button
          onClick={handleDisconnect}
          className="ml-2 text-slate-400 hover:text-red-400 transition-colors p-1 hover:bg-white/5 rounded-full"
          title="Disconnect"
        >
          <LogOut size={16} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isLoading}
      className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed border border-slate-700/50 hover:border-sky-500/50 shadow-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] group"
    >
      {isLoading ? (
        <Loader2 className="animate-spin text-sky-400" size={18} />
      ) : (
        <Wallet size={18} className="text-sky-400 group-hover:scale-110 transition-transform" />
      )}
      <span className="text-sm tracking-wide">{isLoading ? "Connecting..." : "Connect Wallet"}</span>
    </button>
  );
}
