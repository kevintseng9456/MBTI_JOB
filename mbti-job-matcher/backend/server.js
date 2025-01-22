require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
require('./config/passport')(passport);

const app = express();

// 中間件
app.use(express.json());
app.use(passport.initialize());

// 防爬蟲措施
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分鐘
  max: 100 // 限制每個 IP 15 分鐘內最多 100 個請求
});
app.use(limiter);

// 路由
app.use('/api/auth', authRoutes);

// 連接數據庫
mongoose.connect('mongodb://localhost/mbti_job_matcher', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// 錯誤處理中間件
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Something broke!');
});

const cors = require('cors');
app.use(cors());

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);