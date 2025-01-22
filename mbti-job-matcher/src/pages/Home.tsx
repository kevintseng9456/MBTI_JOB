import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaBriefcase, FaChartLine, FaEnvelope } from 'react-icons/fa';

const Home: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // 處理訂閱邏輯
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <div className="bg-gradient-to-b from-[#121212] to-[#2C3E50] min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-5xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] to-[#FFF]">
            MBTI 職業匹配平台
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          探索你的性格，找到理想的職業
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            className="bg-[#1C2833] p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-[#D4AF37]">了解你的 MBTI 類型</h2>
            <p className="mb-4">MBTI（邁爾斯-布里格斯類型指標）是一種性格評估工具，可以幫助你更好地了解自己的優勢和潛力。</p>
            <Link to="/mbti-test" className="inline-block bg-[#D4AF37] text-[#121212] px-4 py-2 rounded-full font-semibold hover:bg-[#E0E0E0] transition duration-300">
              開始 MBTI 測試
            </Link>
          </motion.div>

          <motion.div 
            className="bg-[#1C2833] p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-[#D4AF37]">尋找適合你的工作</h2>
            <p className="mb-4">根據你的 MBTI 類型，我們可以為你推薦最適合的職業和工作機會。</p>
            <Link to="/job-search" className="inline-block bg-[#D4AF37] text-[#121212] px-4 py-2 rounded-full font-semibold hover:bg-[#E0E0E0] transition duration-300">
              搜索工作
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="bg-[#1C2833] p-6 rounded-lg shadow-lg mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center text-[#D4AF37]">MBTI 類型預覽</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['INTJ', 'ENFP', 'ISTJ', 'ESFJ'].map((type) => (
              <div key={type} className="text-center p-4 bg-[#2C3E50] rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{type}</h3>
                <p className="text-sm">點擊了解更多</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-4 gap-8 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <div className="text-center">
            <FaUserAlt className="text-4xl mx-auto mb-4 text-[#D4AF37]" />
            <h3 className="text-xl font-semibold mb-2">10,000+</h3>
            <p>註冊用戶</p>
          </div>
          <div className="text-center">
            <FaBriefcase className="text-4xl mx-auto mb-4 text-[#D4AF37]" />
            <h3 className="text-xl font-semibold mb-2">5,000+</h3>
            <p>工作機會</p>
          </div>
          <div className="text-center">
            <FaChartLine className="text-4xl mx-auto mb-4 text-[#D4AF37]" />
            <h3 className="text-xl font-semibold mb-2">80%</h3>
            <p>成功匹配率</p>
          </div>
          <div className="text-center">
            <FaEnvelope className="text-4xl mx-auto mb-4 text-[#D4AF37]" />
            <h3 className="text-xl font-semibold mb-2">每週更新</h3>
            <p>職業建議</p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-[#1C2833] p-6 rounded-lg shadow-lg mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center text-[#D4AF37]">訂閱我們的 Newsletter</h2>
          <form onSubmit={handleSubscribe} className="flex justify-center">
            <input
              type="email"
              placeholder="輸入你的郵箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-l-full bg-[#2C3E50] text-white border border-[#3E4C59] focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              className="bg-[#D4AF37] text-[#121212] px-4 py-2 rounded-r-full font-semibold hover:bg-[#E0E0E0] transition duration-300"
            >
              訂閱
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;