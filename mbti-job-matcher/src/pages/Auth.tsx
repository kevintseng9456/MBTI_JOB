import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGoogle } from 'react-icons/fa';
import { register, login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        response = await login({ email, password });
      } else {
        response = await register({ email, password });
      }
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Authentication failed:', error.response?.data);
      // 這裡可以添加錯誤處理，例如顯示錯誤消息
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="bg-gradient-to-b from-[#121212] to-[#2C3E50] min-h-screen flex items-center justify-center">
      <motion.div
        className="bg-[#1C2833] p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#D4AF37]">
          {isLogin ? '登入' : '註冊'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              電子郵件
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#2C3E50] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              密碼
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#2C3E50] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#D4AF37] text-[#121212] py-2 rounded-md font-semibold hover:bg-[#E0E0E0] transition duration-300"
          >
            {isLogin ? '登入' : '註冊'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#D4AF37] hover:underline"
          >
            {isLogin ? '還沒有帳號？註冊' : '已有帳號？登入'}
          </button>
        </div>
        <div className="mt-6">
          <button
            onClick={handleGoogleAuth}
            className="w-full bg-white text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-100 transition duration-300 flex items-center justify-center"
          >
            <FaGoogle className="mr-2" />
            使用 Google 帳號{isLogin ? '登入' : '註冊'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;