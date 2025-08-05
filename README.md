# 🎯 Refrel System - Modern Referral Platform

A beautiful, modern referral system with React frontend and Node.js backend with MongoDB support.

## ✨ Features
- 🔐 **Dummy Authentication** - Simple login/signup (no real auth needed)
- 📊 **Interactive Dashboard** - View referral stats, codes, and rewards
- 🏆 **Leaderboard** - See top referrers with beautiful rankings
- � **All Users View** - Browse all users and their donations with search & filters
- �💎 **Rewards System** - Unlock badges based on donation milestones
- 🎨 **Modern UI** - Beautiful design with styled-components
- 🗄️ **Database Support** - MongoDB integration (with fallback dummy data)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (optional - will use dummy data if not available)

### Backend Setup
1. Open terminal in the `backend` folder
2. Run `npm install`
3. Start the server: `npm start`
4. Backend runs on http://localhost:4000

### Frontend Setup
1. Open terminal in the `frontend` folder
2. Run `npm install`
3. Start the app: `npm start`
4. Frontend runs on http://localhost:3000

### Database Setup (Optional)
- Install MongoDB locally OR use MongoDB Atlas
- Update `.env` file in backend folder with your MongoDB URI
- If no database is connected, the app will use dummy data

## 🎮 How to Use

1. **Sign Up/Login**: Create an account or login with any name
2. **Dashboard**: View your referral code, donations raised, and rewards
3. **Share Code**: Click your referral code to copy it
4. **Demo Donations**: Use the donation simulator to test rewards
5. **Leaderboard**: Check rankings of top referrers
6. **All Users**: Browse all registered users, search by name/email/code, and sort by different criteria

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router
- Styled Components
- Axios

**Backend:**
- Node.js
- Express
- MongoDB/Mongoose
- CORS

## 📁 Project Structure
```
Refrel system/
├── backend/
│   ├── models/User.js      # MongoDB user schema
│   ├── index.js           # Express server
│   ├── .env              # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.js       # Main app component
│   │   └── index.js     # React entry point
│   └── package.json
└── README.md
```

## 🎨 Features Demo

- **Modern Design**: Gradient backgrounds, cards, animations
- **Responsive**: Works on all screen sizes
- **Interactive**: Hover effects, clickable elements
- **Real-time**: Updates when donations are added
- **Copy to Clipboard**: Easy referral code sharing
- **Search & Filter**: Find users quickly with advanced filtering options
- **Pagination**: Handle large user lists efficiently

---

🚀 **Ready to start referring!** Launch both servers and open http://localhost:3000
