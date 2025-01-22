import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ReferralSystem: React.FC = () => {
  const [referralCode, setReferralCode] = useState('');
  const [referralList, setReferralList] = useState([
    { id: 1, name: '張三', email: 'zhangsan@example.com', status: '待處理' },
    { id: 2, name: '李四', email: 'lisi@example.com', status: '已接受' },
    { id: 3, name: '王五', email: 'wangwu@example.com', status: '已拒絕' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 處理推薦邏輯
    console.log('Referral Code:', referralCode);
  };

  return (
    <motion.div
      className="bg-[#1C2833] p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-[#D4AF37]">內推系統</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="referralCode" className="block text-sm font-medium text-gray-300 mb-1">
            內推碼
          </label>
          <input
            type="text"
            id="referralCode"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            className="w-full px-3 py-2 bg-[#2C3E50] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#D4AF37] text-[#121212] py-2 rounded-md font-semibold hover:bg-[#E0E0E0] transition duration-300"
        >
          提交內推
        </button>
      </form>
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[#D4AF37]">我的內推列表</h3>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-300">
              <th className="pb-2">姓名</th>
              <th className="pb-2">郵箱</th>
              <th className="pb-2">狀態</th>
            </tr>
          </thead>
          <tbody>
            {referralList.map((referral) => (
              <tr key={referral.id} className="text-white">
                <td className="py-2">{referral.name}</td>
                <td className="py-2">{referral.email}</td>
                <td className="py-2">{referral.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ReferralSystem;