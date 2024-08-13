import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import MBTITest from './pages/MBTITest';
import JobSearch from './pages/JobSearch';
import Profile from './pages/Profile';
import CompanyDetails from './pages/CompanyDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-3">
            <ul className="flex space-x-4">
              <li><Link to="/" className="text-blue-500 hover:text-blue-700">首頁</Link></li>
              <li><Link to="/mbti-test" className="text-blue-500 hover:text-blue-700">MBTI 測試</Link></li>
              <li><Link to="/job-search" className="text-blue-500 hover:text-blue-700">職位搜索</Link></li>
              <li><Link to="/profile" className="text-blue-500 hover:text-blue-700">個人資料</Link></li>
            </ul>
          </div>
        </nav>

        <main className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mbti-test" element={<MBTITest />} />
            <Route path="/job-search" element={<JobSearch />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/company/:id" element={<CompanyDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;