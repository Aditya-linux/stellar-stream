"use client";

import { useState, useEffect } from "react";
import WalletConnect from "@/components/WalletConnect";
import { fetchBalance, createPaymentTransaction, submitTransaction } from "@/utils/stellar";
import { signTransaction } from "@stellar/freighter-api";
import { Send, AlertCircle, CheckCircle2, Loader2, DollarSign } from "lucide-react";
import clsx from "clsx";

export default function Home() {
  const [publicKey, setPublicKey] = useState<string>("");
  const [balance, setBalance] = useState<string>("0");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [txHash, setTxHash] = useState("");

  useEffect(() => {
    if (publicKey) {
      loadBalance();
    } else {
      setBalance("0");
    }
  }, [publicKey]);

  const loadBalance = async () => {
    try {
      const bal = await fetchBalance(publicKey);
      setBalance(bal);
    } catch (error) {
      console.error("Failed to load balance", error);
    }
  };

  const handleConnect = (address: string) => {
    setPublicKey(address);
    if (!address) {
      setBalance("0");
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) return;

    setStatus("loading");
    setStatusMessage("Constructing transaction...");
    setTxHash("");

    try {
      // 1. Create Transaction XDR
      const xdr = await createPaymentTransaction({
        recipient,
        amount,
        memo,
        publicKey,
      });

      // 2. Sign with Freighter
      setStatusMessage("Please sign in Freighter...");
      // @ts-ignore - Freighter types might be slightly off, trust the returns
      const response = await signTransaction(xdr, {
        networkPassphrase: "Test SDF Network ; September 2015",
      });

      if (!response || !response.signedTxXdr) {
        throw new Error("User rejected transaction");
      }

      const signedXdr = response.signedTxXdr;

      // 3. Submit to Network
      setStatusMessage("Submitting to Stellar Testnet...");
      const result = await submitTransaction(signedXdr);

      setStatus("success");
      setStatusMessage("Payment sent successfully!");
      // @ts-ignore - result type might vary but usually has hash
      setTxHash(result.hash || result.id);

      // Refresh balance
      setTimeout(loadBalance, 2000);
      setAmount("");
      setMemo("");

    } catch (error: any) {
      console.error("Transaction failed:", error);
      setStatus("error");
      setStatusMessage(error.message || "Transaction failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-[pulse-glow_8s_infinite]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-sky-600/20 rounded-full blur-[120px] animate-[pulse-glow_10s_infinite_reverse]" />

      {/* Header */}
      <header className="w-full max-w-2xl flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            <Send className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white font-display">
              Stellar<span className="text-sky-400">Stream</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono tracking-wider">TESTNET PAYMENT GATEWAY</p>
          </div>
        </div>
        <WalletConnect onConnect={handleConnect} />
      </header>

      {/* Main Content */}
      <div className="w-full max-w-2xl grid gap-6 relative z-10 animate-[float_6s_ease-in-out_infinite]">

        {/* Balance Card */}
        <section className="glass-card p-8 rounded-3xl relative overflow-hidden group transition-all hover:shadow-[0_0_40px_rgba(56,189,248,0.15)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-sky-500/20" />

          <div className="relative z-10">
            <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-2 font-display">Total Balance</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold text-white tracking-tighter font-display drop-shadow-xl">
                {parseFloat(balance).toLocaleString()}
              </span>
              <span className="text-2xl font-medium text-sky-400 font-display">XLM</span>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 w-fit px-4 py-1.5 rounded-full border border-emerald-400/20">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Connected to Testnet
            </div>
          </div>
        </section>

        {/* Transaction Form */}
        <section className="glass-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 font-display text-white">
            <div className="p-2 bg-sky-500/20 rounded-lg">
              <DollarSign className="text-sky-400" size={20} />
            </div>
            Send Payment
          </h3>

          <form onSubmit={handleSend} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="recipient" className="block text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
                Recipient Address
              </label>
              <input
                id="recipient"
                type="text"
                placeholder="G..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full glass-input rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none font-mono text-sm transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="amount" className="block text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
                  Amount (XLM)
                </label>
                <div className="relative">
                  <input
                    id="amount"
                    type="number"
                    step="0.0000001"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full glass-input rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none font-mono text-lg transition-all"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">XLM</span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="memo" className="block text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
                  Memo
                </label>
                <input
                  id="memo"
                  type="text"
                  placeholder="Optional..."
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="w-full glass-input rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Status Display */}
            {status !== "idle" && (
              <div className={clsx(
                "p-4 rounded-xl border flex items-start gap-3 text-sm backdrop-blur-md",
                status === "loading" && "bg-blue-500/10 border-blue-500/20 text-blue-200",
                status === "error" && "bg-red-500/10 border-red-500/20 text-red-200",
                status === "success" && "bg-green-500/10 border-green-500/20 text-green-200"
              )}>
                {status === "loading" && <Loader2 className="animate-spin shrink-0" size={18} />}
                {status === "error" && <AlertCircle className="shrink-0" size={18} />}
                {status === "success" && <CheckCircle2 className="shrink-0" size={18} />}
                <div className="flex-1">
                  <p className="font-semibold">{statusMessage}</p>
                  {status === "success" && txHash && (
                    <a
                      href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs underline mt-1 block hover:text-white transition-colors decoration-sky-400/50 underline-offset-4"
                    >
                      View on StellarExplorer
                    </a>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={!publicKey || status === "loading"}
              className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_4px_20px_rgba(56,189,248,0.3)] hover:shadow-[0_6px_30px_rgba(56,189,248,0.5)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 font-display text-lg tracking-wide"
            >
              {!publicKey ? "Connect Wallet to Send" : status === "loading" ? "Processing Transaction..." : "Sign & Send Payment"}
            </button>
          </form>
        </section>

        <footer className="text-center text-slate-500 text-xs font-medium tracking-wide">
          Secured by Stellar Network • Testnet Environment
        </footer>
      </div>
    </main>
  );
}
