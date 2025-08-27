# Digital Wallet System

A full-stack **Digital Wallet Application** built with **TypeScript, Express.js, MongoDB, and React**.  
This project allows users to **send money, cash in, cash out, deposit, and manage transactions** with secure authentication and role-based access.

---

## 🌐 Live Links

- **Live Deployment:** [Digital Wallet API Frontend](https://assignment-6-digital-wallet-client.vercel.app/)
  
  
- **Live Deployment:** [Digital Wallet API Backend](https://digital-wallet-api-pink.vercel.app/)

## 🚀 Features

- User authentication (JWT + Role-based access: Admin, User, Agent)
- Wallet management (balance tracking, transactions, commission system)
- Transaction types:
  - **SEND** → Send money to another user
  - **CASH_IN** → Add money through an agent
  - **CASH_OUT** → Withdraw money via an agent
  - **DEPOSIT** → Add money to own wallet
- Admin functionalities:
  - Approve/Reject agents
  - Manage users and commissions
- Agent functionalities:
  - Handle user cash-in/cash-out requests
  - Earn commission on transactions
- Error handling with **AppError & global middleware**
- Request validation with **Zod**
- MongoDB with **Mongoose ODM**
- Frontend built with **React, TailwindCSS, Redux Toolkit Query**

---

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **Zod** for validation
- **JWT** for authentication
- **Bcrypt** for password hashing

### Frontend
- **React** + **Vite**
- **Redux Toolkit Query** for API calls
- **Tailwind CSS** for styling
- **Shadcn/ui** components
- **Toast Notifications** for user feedback

---



