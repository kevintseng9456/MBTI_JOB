import React from 'react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const jobPostings = [
    { id: 1, title: '前端工程師', company: 'TechCo', applicants: 15 },
    { id: 2, title: '後端工程師', company: 'DataSys', applicants: 10 },
    { id: 3, title: 'UI/UX 設計師', company: 'DesignHub', applicants: 8 },
  ];

  const referrals = [
    { id: 1, name: '張三', position: '前端工程師', status: '待處理' },
    { id: 2, name: '李四', position: '後端工程師', status: '已接受' },
  ];

  return (
    <motion.div
      className="bg-[#1C2833] p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-[#D4AF37]">儀表板</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#D4AF37]">我的職位發布</h3>
          <ul>
            {jobPostings.map((job) => (
              <li key={job.id} className="bg-[#2C3E50] p-4 rounded-md mb-4">
                <h4 className="text-lg font-semibold text-white">{job.title}</h4>
                <p className="text-gray-300">{job.company}</p>
                <p className="text-gray-300">申請人數：{job.applicants}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#D4AF37]">我的內推</h3>
          <ul>
            {referrals.map((referral) => (
              <li key={referral.id} className="bg-[#2C3E50] p-4 rounded-md mb-4">
                <h4 className="text-lg font-semibold text-white">{referral.name}</h4>
                <p className="text-gray-300">職位：{referral.position}</p>
                <p className="text-gray-300">狀態：{referral.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;