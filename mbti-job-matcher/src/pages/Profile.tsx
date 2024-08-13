import React, { useState } from 'react';

const Profile: React.FC = () => {
  const [mbtiType, setMbtiType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 將 MBTI 類型保存到用戶資料中
    console.log('保存的 MBTI 類型：', mbtiType);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">個人資料</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="mbtiType" className="block mb-2">您的 MBTI 類型：</label>
          <input
            type="text"
            id="mbtiType"
            value={mbtiType}
            onChange={(e) => setMbtiType(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="例如：INTJ"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          保存
        </button>
      </form>
    </div>
  );
};

export default Profile;