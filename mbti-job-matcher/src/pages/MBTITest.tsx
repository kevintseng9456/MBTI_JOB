import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const personalityTypes = [
  {
    type: 'INTJ',
    title: '建築師',
    description: '富有想像力和戰略性的思考者，一切皆在計劃之中。',
    careers: '科學家、系統分析師、建築師、工程師、法官',
    strengths: '創新、獨立、戰略性思考、高度理性',
    weaknesses: '過於批判、情感表達困難、完美主義',
  },
  {
    type: 'INTP',
    title: '邏輯學家',
    description: '具有創新想法和獨特見解的發明家。',
    careers: '程序員、物理學家、化學家、分析師、哲學家',
    strengths: '邏輯思維、創意豐富、客觀分析、獨立思考',
    weaknesses: '過於理論化、忽視情感、容易分心',
  },
  {
    type: 'ENTJ',
    title: '指揮官',
    description: '大膽、富有想像力的強勢領導者，總是找到方法來實現目標。',
    careers: '企業高管、律師、管理顧問、政治家、企業家',
    strengths: '領導能力、自信、決策果斷、長遠規劃',
    weaknesses: '不耐煩、傲慢、過於主導',
  },
  {
    type: 'ENTP',
    title: '辯論家',
    description: '聰明好奇的思想家，無法抗拒智力上的挑戰。',
    careers: '企業家、發明家、記者、市場營銷專家、律師',
    strengths: '創新思維、適應力強、口才出眾、知識廣博',
    weaknesses: '爭論好勇鬥狠、容易分心、不切實際',
  },
  {
    type: 'INFJ',
    title: '提倡者',
    description: '安靜而神秘，同時富有啟發性和理想主義。',
    careers: '心理諮詢師、作家、教師、藝術家、人力資源專員',
    strengths: '富有同情心、有遠見、有創意、有原則',
    weaknesses: '過於理想化、容易倦怠、過於完美主義',
  },
  {
    type: 'INFP',
    title: '調停者',
    description: '富有詩意、善良和利他主義的理想主義者，總是渴望做正確的事。',
    careers: '作家、心理諮詢師、社工、教師、藝術家',
    strengths: '富有同情心、創意豐富、開放思想、靈活適應',
    weaknesses: '過於理想化、不切實際、情緒化',
  },
  {
    type: 'ENFJ',
    title: '主人公',
    description: '富有魅力和鼓舞人心的領導者，能夠吸引聽眾。',
    careers: '教師、人力資源經理、銷售經理、政治家、心理諮詢師',
    strengths: '富有同理心、領導能力強、善於溝通、有責任感',
    weaknesses: '過於理想化、優柔寡斷、過度敏感',
  },
  {
    type: 'ENFP',
    title: '競選者',
    description: '熱情、有創造力和社交能力的自由精神，總能找到理由微笑。',
    careers: '記者、演員、公關專員、藝術家、顧問',
    strengths: '熱情洋溢、創意十足、適應力強、溝通技巧佳',
    weaknesses: '注意力分散、組織能力差、過度情緒化',
  },
  {
    type: 'ISTJ',
    title: '物流師',
    description: '實際和注重事實的個人，其可靠性是無可置疑的。',
    careers: '會計師、審計師、財務分析師、項目經理、軍人',
    strengths: '誠實可靠、注重細節、有組織、有耐心',
    weaknesses: '固執、不善變通、情感表達困難',
  },
  {
    type: 'ISFJ',
    title: '守衛者',
    description: '非常專注和溫暖的保護者，時刻準備著保護愛的人。',
    careers: '護士、小學教師、行政助理、社工、圖書管理員',
    strengths: '可靠、耐心、細心、盡職盡責',
    weaknesses: '過於謙遜、不善拒絕、抗拒變化',
  },
  {
    type: 'ESTJ',
    title: '總經理',
    description: '出色的管理者，在管理事務和人員方面無與倫比。',
    careers: '企業主管、銀行經理、法官、政府官員、項目經理',
    strengths: '組織能力強、務實、忠誠、直接坦率',
    weaknesses: '固執、不善變通、不夠敏感',
  },
  {
    type: 'ESFJ',
    title: '執政官',
    description: '極有同情心、受歡迎的人，總是熱心地幫助他人。',
    careers: '銷售代表、護士、教師、人力資源專員、公關專員',
    strengths: '善解人意、合作、可靠、有耐心',
    weaknesses: '過於敏感、需要認可、不善處理批評',
  },
  {
    type: 'ISTP',
    title: '鑒賞家',
    description: '大膽而實際的實驗家，擅長使用各種工具。',
    careers: '機械師、工程師、技師、飛行員、運動員',
    strengths: '靈活、冷靜、實際、理性',
    weaknesses: '冷漠、容易厭倦、魯莽',
  },
  {
    type: 'ISFP',
    title: '探險家',
    description: '靈活和有魅力的藝術家，時刻準備著探索和體驗新事物。',
    careers: '藝術家、音樂家、造型師、室內設計師、廚師',
    strengths: '富有創意、靈活、有同情心、有審美眼光',
    weaknesses: '過於競爭、容易感到壓力、不善規劃',
  },
  {
    type: 'ESTP',
    title: '企業家',
    description: '聰明、精力充沛、善於察言觀色的人，真正熱愛生活中的刺激。',
    careers: '企業家、銷售人員、市場營銷專員、警察、消防員',
    strengths: '大膽、理性、直接、社交能力強',
    weaknesses: '不耐煩、冒險、容易厭倦',
  },
  {
    type: 'ESFP',
    title: '表演者',
    description: '自發性、精力充沛和熱情的娛樂者 - 生活永遠不會在他們身邊感到無聊。',
    careers: '演員、舞者、活動策劃師、導遊、銷售代表',
    strengths: '樂觀、友好、有創意、實際',
    weaknesses: '容易分心、敏感、衝動',
  },
];

const MBTITest: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#121212] text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-6xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2C3E50] to-[#D4AF37]">
            探索你的 MBTI 人格類型
          </span>
        </motion.h1>
        <motion.p 
          className="text-2xl mb-16 text-center max-w-3xl mx-auto text-[#B0B0B0]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          MBTI 揭示了 16 種獨特的人格類型，每一種都如同宇宙中的星座，閃耀著自己的光芒。
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {personalityTypes.map((personality, index) => (
            <motion.div
              key={personality.type}
              ref={(el: HTMLDivElement | null) => (sectionRefs.current[index] = el)}
              className="opacity-0 translate-y-10 transition-all duration-1000 ease-out"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-[#1C2833] rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-[#3E4C59]">
                <div className="bg-gradient-to-br from-[#2C3E50] to-[#3E4C59] p-6">
                  <h2 className="text-4xl font-bold text-center">{personality.type}</h2>
                  <h3 className="text-xl font-semibold text-center mt-2 text-[#D4AF37]">{personality.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-[#E0E0E0] mb-4">{personality.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-[#D4AF37]">建議職業：</h4>
                    <p className="text-[#B0B0B0]">{personality.careers}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-[#D4AF37]">優點：</h4>
                    <p className="text-[#B0B0B0]">{personality.strengths}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-[#D4AF37]">缺點：</h4>
                    <p className="text-[#B0B0B0]">{personality.weaknesses}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <a 
            href="https://www.16personalities.com/tw/%E6%80%A7%E6%A0%BC%E6%B8%AC%E8%A9%A6" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-gradient-to-r from-[#2C3E50] to-[#D4AF37] text-white px-10 py-4 rounded-full text-xl font-semibold hover:from-[#3E4C59] hover:to-[#E0E0E0] transition duration-300 inline-block"
          >
            立即開始 MBTI 測試
          </a>
          <p className="mt-6 text-[#B0B0B0]">
            完成測試後，請記住你的結果，並在
            <Link to="/profile" className="text-[#D4AF37] hover:underline">
              個人資料頁面
            </Link>
            中填寫。
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MBTITest;