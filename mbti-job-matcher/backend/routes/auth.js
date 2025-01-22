const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// 註冊路由
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: '用戶已存在' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = crypto.randomBytes(20).toString('hex');
    
    user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken
    });
    await user.save();

    // 發送驗證郵件
    const transporter = nodemailer.createTransport({
      // 配置郵件服務器
    });
    await transporter.sendMail({
      from: '"MBTI Job Matcher" <noreply@mbtijobmatcher.com>',
      to: email,
      subject: '驗證您的郵箱',
      html: `<p>請點擊以下鏈接驗證您的郵箱：</p>
             <a href="http://yourdomain.com/verify/${verificationToken}">驗證郵箱</a>`
    });

    res.status(201).json({ msg: '用戶註冊成功，請檢查郵箱進行驗證' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// 登入路由
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: '無效的憑證' });
    }
    if (!user.isVerified) {
      return res.status(400).json({ msg: '請先驗證您的郵箱' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: '無效的憑證' });
    }
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Google 登入路由
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ user: { id: req.user.id } }, process.env.JWT_SECRET, { expiresIn: 3600 });
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);

module.exports = router;