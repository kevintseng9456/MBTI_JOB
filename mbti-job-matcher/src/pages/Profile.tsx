import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Select from 'react-select';

interface UserProfile {
  name: string;
  email: string;
  mbtiType: string;
  skills: string[];
  experience: string;
  education: string;
  bio: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    mbtiType: '',
    skills: [],
    experience: '',
    education: '',
    bio: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // 這裡應該從後端 API 獲取用戶資料
    // 暫時使用模擬數據
    const mockProfile: UserProfile = {
      name: '張三',
      email: 'zhangsan@example.com',
      mbtiType: 'INTJ',
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: '3 年',
      education: '大學本科',
      bio: '熱愛編程，專注於前端開發。',
    };
    setProfile(mockProfile);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (selectedOptions: any) => {
    setProfile(prev => ({ ...prev, skills: selectedOptions.map((option: any) => option.value) }));
  };

  const handleSave = () => {
    // 這裡應該將更新後的資料發送到後端 API
    console.log('保存的資料:', profile);
    setIsEditing(false);
  };

  const skillOptions = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
  ];

  return (
    <div className="bg-[#121212] text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2C3E50] to-[#D4AF37]">
            個人資料
          </span>
        </motion.h1>

        <motion.div
          className="bg-[#1C2833] rounded-lg shadow-md p-6 mb-4 border border-[#3E4C59]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {isEditing ? (
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="mb-4">
                <label className="block text-[#B0B0B0] mb-2">姓名</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#2C3E50] text-white border border-[#3E4C59] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#B0B0B0] mb-2">電子郵件</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#2C3E50] text-white border border-[#3E4C59] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#B0B0B0] mb-2">MBTI 類型</label>
                <input
                  type="text"
                  name="mbtiType"
                  value={profile.mbtiType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#2C3E50] text-white border border-[#3E4C59] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#B0B0B0] mb-2">技能</label>
                <Select
                  isMulti
                  options={skillOptions}
                  value={profile.skills.map(skill => ({ value: skill, label: skill }))}
                  onChange={handleSkillsChange}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#B0B0B0] mb-2">工作經驗</label>
                <input
                  type="text"
                  name="experience"
                  value={profile.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#2C3E50] text-white border border-[#3E4C59] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#B0B0B0] mb-2">教育背景</label>
                <input
                  type="text"
                  name="education"
                  value={profile.education}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#2C3E50] text-white border border-[#3E4C59] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#B0B0B0] mb-2">個人簡介</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#2C3E50] text-white border border-[#3E4C59] focus:outline-none focus:border-[#D4AF37]"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#2C3E50] to-[#D4AF37] text-white px-6 py-2 rounded-full text-lg font-semibold hover:from-[#3E4C59] hover:to-[#E0E0E0] transition duration-300"
              >
                保存
              </button>
            </form>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">{profile.name}</h2>
              <p className="text-[#E0E0E0] mb-2">電子郵件: {profile.email}</p>
              <p className="text-[#E0E0E0] mb-2">MBTI 類型: {profile.mbtiType}</p>
              <p className="text-[#E0E0E0] mb-2">技能: {profile.skills.join(', ')}</p>
              <p className="text-[#E0E0E0] mb-2">工作經驗: {profile.experience}</p>
              <p className="text-[#E0E0E0] mb-2">教育背景: {profile.education}</p>
              <p className="text-[#E0E0E0] mb-4">個人簡介: {profile.bio}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-[#2C3E50] to-[#D4AF37] text-white px-6 py-2 rounded-full text-lg font-semibold hover:from-[#3E4C59] hover:to-[#E0E0E0] transition duration-300"
              >
                編輯資料
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;