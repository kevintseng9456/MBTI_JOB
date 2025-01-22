import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PostJob: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 處理職位發布邏輯
    console.log({ jobTitle, company, location, description, requirements, salary });
  };

  return (
    <motion.div
      className="bg-[#1C2833] p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-[#D4AF37]">發布新職位</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-300 mb-1">
            職位名稱
          </label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full px-3 py-2 bg-[#2C3E50] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
            公司名稱
          </label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-3 py-2 bg-[#2C3E50] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
            工作地點
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 bg-[#2C3E50] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            職位描述
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-[#2C3E50] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            rows={4}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-300 mb-1">
            職位要求
          </label>
          <textarea
            id="requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="w-full px-3 py-2 bg-[#2C3E50] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            rows={4}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="salary" className="block text-sm font-medium text-gray-300 mb-1">
            薪資範圍
          </label>
          <input
            type="text"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-3 py-2 bg-[#2C3E50] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#D4AF37] text-[#121212] py-2 rounded-md font-semibold hover:bg-[#E0E0E0] transition duration-300"
        >
          發布職位
        </button>
      </form>
    </motion.div>
  );
};

export default PostJob;