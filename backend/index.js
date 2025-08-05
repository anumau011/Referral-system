import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const app = express();

// Configure CORS with single allowed origin
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/refrel-system')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Get user by referral code or create dummy data
app.get('/api/user/:referralCode?', async (req, res) => {
  try {
    const { referralCode } = req.params;
    
    if (referralCode) {
      const user = await User.findOne({ referralCode });
      if (user) {
        return res.json(user);
      }
    }
    
    // Return dummy data if no specific user found
    const dummyUser = {
      name: 'John Doe',
      referralCode: 'johndoe2025',
      totalDonations: 1234,
      email: 'john@example.com'
    };
    res.json(dummyUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new user
app.post('/api/user', async (req, res) => {
  try {
    const { name, email } = req.body;
    const referralCode = name.toLowerCase().replace(/\s+/g, '') + '2025';
    
    const user = new User({
      name,
      email,
      referralCode,
      totalDonations: Math.floor(Math.random() * 2000) // Random starting amount
    });
    
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users with pagination
app.get('/api/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await User.countDocuments();
    
    // If no users in DB, return dummy data
    if (users.length === 0) {
      const dummyUsers = [
        { 
          name: 'Alice Smith', 
          referralCode: 'alicesmith2025', 
          totalDonations: 2500, 
          email: 'alice@example.com',
          createdAt: new Date('2025-01-15')
        },
        { 
          name: 'John Doe', 
          referralCode: 'johndoe2025', 
          totalDonations: 1234, 
          email: 'john@example.com',
          createdAt: new Date('2025-01-20')
        },
        { 
          name: 'Bob Johnson', 
          referralCode: 'bobjohnson2025', 
          totalDonations: 900, 
          email: 'bob@example.com',
          createdAt: new Date('2025-01-25')
        },
        { 
          name: 'Sarah Wilson', 
          referralCode: 'sarahwilson2025', 
          totalDonations: 750, 
          email: 'sarah@example.com',
          createdAt: new Date('2025-01-30')
        },
        { 
          name: 'Mike Davis', 
          referralCode: 'mikedavis2025', 
          totalDonations: 1800, 
          email: 'mike@example.com',
          createdAt: new Date('2025-02-01')
        },
        { 
          name: 'Emma Brown', 
          referralCode: 'emmabrown2025', 
          totalDonations: 650, 
          email: 'emma@example.com',
          createdAt: new Date('2025-02-05')
        }
      ];
      return res.json({
        users: dummyUsers,
        pagination: {
          currentPage: page,
          totalPages: 1,
          totalUsers: dummyUsers.length,
          hasNext: false,
          hasPrev: false
        }
      });
    }
    
    res.json({
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const users = await User.find().sort({ totalDonations: -1 }).limit(10);
    
    // If no users in DB, return dummy data
    if (users.length === 0) {
      const dummyLeaderboard = [
        { name: 'Alice Smith', referralCode: 'alicesmith2025', totalDonations: 2500 },
        { name: 'Mike Davis', referralCode: 'mikedavis2025', totalDonations: 1800 },
        { name: 'John Doe', referralCode: 'johndoe2025', totalDonations: 1234 },
        { name: 'Bob Johnson', referralCode: 'bobjohnson2025', totalDonations: 900 },
        { name: 'Sarah Wilson', referralCode: 'sarahwilson2025', totalDonations: 750 },
        { name: 'Emma Brown', referralCode: 'emmabrown2025', totalDonations: 650 }
      ];
      return res.json(dummyLeaderboard);
    }
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update donations
app.put('/api/user/:referralCode/donate', async (req, res) => {
  try {
    const { referralCode } = req.params;
    const { amount } = req.body;
    
    const user = await User.findOneAndUpdate(
      { referralCode },
      { $inc: { totalDonations: amount } },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
