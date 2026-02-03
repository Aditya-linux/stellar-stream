# StellarStream

A high-quality Stellar dApp on Testnet to send pseudo-payments using Freighter Wallet. Built with Next.js (App Router), Tailwind CSS, and Stellar SDK.

## Features
- **Wallet Connection**: Connect via Freighter (Testnet).
- **Balance Display**: Real-time XLM balance fetching.
- **Send Payments**: Send XLM to any public key on Testnet.
- **Transaction History**: Link to StellarExpert for verification.
- **Modern UI**: Dark-themed, responsive Fintech aesthetic.

## Tech Stack
- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Blockchain**: @stellar/stellar-sdk, @stellar/freighter-api
- **Icons**: Lucide React

## Project Structure
```
stellar-stream/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles (Dark theme)
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Main Dashboard
│   ├── components/
│   │   └── WalletConnect.tsx # Wallet Connection Logic
│   └── utils/
│       └── stellar.ts        # Stellar SDK Helpers
├── public/
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ installed.
- Freighter Wallet Extension installed in browser.
- Freighter set to **TESTNET** in Settings > Network.

### Installation

1. **Clone & Install**
   ```bash
   git clone <your-repo-url>
   cd stellar-stream
   npm install
   ```

2. **Run Locally**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

## Deployment Guide

### GitHub
1. Initialize Git in the `stellar-stream` folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Create a new repository on GitHub.
3. Push to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/stellar-stream.git
   git push -u origin main
   ```

### Vercel Deployment
1. Go to [Vercel](https://vercel.com).
2. Click **Add New > Project**.
3. Import your `stellar-stream` repository.
4. Framework Preset: **Next.js** (Auto-detected).
5. Click **Deploy**.
6. Your dApp will be live in minutes!

## Design Notes
The app uses a "Slate" dark theme (`bg-slate-900`, `text-slate-50`) with Sky Blue accents (`text-sky-400`, `bg-sky-500`) to evoke a professional financial feel. Glassmorphism effects are applied using `backdrop-blur` and semi-transparent backgrounds.
