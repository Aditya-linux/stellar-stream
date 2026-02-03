# 🚀 StellarStream

> **A seamless, high-performance Stellar dApp for secure payments on the Testnet.**
> *Built with ❤️ for the Stellar Developer Challenge (Level 1: White Belt)*

## � Introduction

Hi there! I built **StellarStream** to demonstrate just how fast, smooth, and powerful building on Stellar can be.

My goal was to create more than just a functional wallet interface—I wanted to build an experience that feels **premium, modern, and fun to use**. By combining a futuristic "Glassmorphism" aesthetic with the speed of the Stellar network, StellarStream turns simple Testnet transactions into a visual delight.

Whether you're checking your balance or sending your first XLM, I hope you enjoy using it as much as I enjoyed building it!

---

## 🌐 Live Demo

🚀 **[Try the Live App Here](https://stellar-stream-smoky.vercel.app/)**

*Make sure you have [Freighter](https://www.freighter.app/) installed and connected to Testnet!*

---

## ✅ Challenge Validation

I've carefully implemented all the requirements for **Mission 1**:

| Requirement | Status | how It Works |
| :--- | :---: | :--- |
| **Connect Wallet** | ✅ | I used the `@stellar/freighter-api` to securely detect and connect to your wallet. |
| **View Balance** | ✅ | The app fetches your live Testnet XLM balance instantly using `Horizon.Server`. |
| **Send Payment** | ✅ | You can sign and send actual payment transactions to any public key. |
| **Show PubKey** | ✅ | Your compressed public key is displayed proudly in the header. |
| **Error Handling** | ✅ | I've added friendly error messages for things like "User Rejected" or network issues. |

---

## 🛠 Tech Stack

I chose a modern stack to ensure performance and developer experience:

*   **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) - *For that snappy SPA feel.*
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) - *With custom animations & deep-space gradients.*
*   **Blockchain:** [@stellar/stellar-sdk](https://github.com/stellar/js-stellar-sdk) & Freighter API.
*   **Typography:** Google Fonts (Outfit headlines, Inter body).

---

## 📸 Screenshots

| **1. Wallet Connection** | **2. Balance Display** |
| :---: | :---: |
| ![Wallet Connect](https://placehold.co/600x400/1e293b/38bdf8?text=Wallet+Connection+UI) | ![Balance](https://placehold.co/600x400/1e293b/38bdf8?text=Balance+Display) |
| *Clean, one-click connection.* | *Your funds, visible instantly.* |

| **3. Successful Transaction** | **4. Transaction Result** |
| :---: | :---: |
| ![Transaction Form](https://placehold.co/600x400/1e293b/38bdf8?text=Payment+Form) | ![Success State](https://placehold.co/600x400/1e293b/38bdf8?text=Success+Message) |
| *Easy-to-use payment form.* | *Verification link to StellarExpert.* |

---

## � Running Locally

Want to peek under the hood? Here is how to run it on your machine:

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/your-username/stellar-stream.git
    cd stellar-stream
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Fire it up:**
    ```bash
    npm run dev
    ```

4.  **Explore:**
    Open `http://localhost:3000` and start streaming payments!

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

*Thanks for checking out my submission!* 🌟
