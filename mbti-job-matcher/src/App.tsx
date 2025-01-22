import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import MBTITest from './pages/MBTITest';
import JobSearch from './pages/JobSearch';
import Profile from './pages/Profile';
import CompanyDetails from './pages/CompanyDetails';
import Auth from './pages/Auth';
import PostJob from './pages/PostJob';
import ReferralSystem from './pages/ReferralSystem';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#121212]">
        <nav className="bg-[#1C2833] shadow-md">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <ul className="flex space-x-4">
              <li><Link to="/" className="text-[#E0E0E0] hover:text-[#D4AF37] transition duration-300">首頁</Link></li>
              <li><Link to="/mbti-test" className="text-[#E0E0E0] hover:text-[#D4AF37] transition duration-300">MBTI 測試</Link></li>
              <li><Link to="/job-search" className="text-[#E0E0E0] hover:text-[#D4AF37] transition duration-300">職位搜索</Link></li>
              <li className="relative group">
                <button className="text-[#E0E0E0] hover:text-[#D4AF37] transition duration-300">更多</button>
                <ul className="absolute left-0 mt-2 w-48 bg-[#1C2833] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                  <li><Link to="/post-job" className="block px-4 py-2 text-[#E0E0E0] hover:bg-[#2C3E50] hover:text-[#D4AF37]">發布職位</Link></li>
                  <li><Link to="/referral" className="block px-4 py-2 text-[#E0E0E0] hover:bg-[#2C3E50] hover:text-[#D4AF37]">內推系統</Link></li>
                  <li><Link to="/dashboard" className="block px-4 py-2 text-[#E0E0E0] hover:bg-[#2C3E50] hover:text-[#D4AF37]">儀表板</Link></li>
                </ul>
              </li>
            </ul>
            <div className="flex space-x-4">
              <Link to="/profile" className="text-[#E0E0E0] hover:text-[#D4AF37] transition duration-300">個人資料</Link>
              <Link to="/auth" className="text-[#E0E0E0] hover:text-[#D4AF37] transition duration-300">登入/註冊</Link>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mbti-test" element={<MBTITest />} />
            <Route path="/job-search" element={<JobSearch />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/company/:id" element={<CompanyDetails />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/referral" element={<ReferralSystem />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;