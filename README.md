# 🚀 StellarStream

> **A seamless, high-performance Stellar dApp for secure payments on the Testnet.**
> *Built with ❤️ for the Stellar Developer Challenge (Level 1: White Belt)*

## � Introduction

Hi there! I built **StellarStream** to demonstrate just how fast, smooth, and powerful building on Stellar can be.

My goal was to create more than just a functional wallet interface—I wanted to build an experience that feels **premium, modern, and fun to use**. By combining a futuristic "Glassmorphism" aesthetic with the speed of the Stellar network, StellarStream turns simple Testnet transactions into a visual delight.

Whether you're checking your balance or sending your first XLM, I hope you enjoy using it as much as I enjoyed building it!

---

## 🌐 Live Demo

🚀 **[Try the Live App Here](https://stellar-stream-seven.vercel.app/)**

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
| ![Wallet Connection](https://github.com/user-attachments/assets/348578e7-8d92-427f-863b-d88856c064dc) | ![Balance Display](https://github.com/user-attachments/assets/9999867a-8f92-4e97-b78c-2f0520f7d12d) |
| *Clean, one-click connection.* | *Your funds, visible instantly.* |

| **3. Successful Transaction** | **4. Transaction Result** |
| :---: | :---: |
| ![Transaction Form](https://github.com/user-attachments/assets/6fdc06bf-c595-4b51-bd14-dd446fbebe54) | ![Success State](https://github.com/user-attachments/assets/1bb1d184-80fa-43c1-b682-4bb3c0249d0b) |
| *Easy-to-use payment form.* | *Verification link to StellarExpert.* |
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
