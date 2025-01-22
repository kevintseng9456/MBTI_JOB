import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import DoubleRangeSlider from '../components/DoubleRangeSlider';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  mbtiMatch: string;
  isFavorite: boolean;
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: '軟件工程師',
    company: 'TechCorp',
    location: '台北市',
    salary: 'NT$80,000 - NT$120,000',
    mbtiMatch: 'INTJ, INTP',
    isFavorite: false,
  },
  {
    id: 2,
    title: '市場營銷經理',
    company: 'MarketPro',
    location: '新北市',
    salary: 'NT$70,000 - NT$100,000',
    mbtiMatch: 'ENFP, ESFP',
    isFavorite: false,
  },
  {
    id: 3,
    title: '數據分析師',
    company: 'DataInsights',
    location: '台中市',
    salary: 'NT$60,000 - NT$90,000',
    mbtiMatch: 'ISTJ, INTJ',
    isFavorite: false,
  },
  {
    id: 4,
    title: '數據分析師',
    company: 'DataInsights',
    location: '台中市',
    salary: 'NT$60,000 - NT$90,000',
    mbtiMatch: 'ISTJ, INTJ',
    isFavorite: false,
  },
  {
    id: 5,
    title: '數據分析師',
    company: 'DataInsights',
    location: '台中市',
    salary: 'NT$60,000 - NT$90,000',
    mbtiMatch: 'ISTJ, INTJ',
    isFavorite: false,
  },
];

const mbtiOptions = [
  { value: 'INTJ', label: 'INTJ' },
  { value: 'INTP', label: 'INTP' },
  { value: 'ENTJ', label: 'ENTJ' },
  { value: 'ENTP', label: 'ENTP' },
  { value: 'INFJ', label: 'INFJ' },
  { value: 'INFP', label: 'INFP' },
  { value: 'ENFJ', label: 'ENFJ' },
  { value: 'ENFP', label: 'ENFP' },
  { value: 'ISTJ', label: 'ISTJ' },
  { value: 'ISFJ', label: 'ISFJ' },
  { value: 'ESTJ', label: 'ESTJ' },
  { value: 'ESFJ', label: 'ESFJ' },
  { value: 'ISTP', label: 'ISTP' },
  { value: 'ISFP', label: 'ISFP' },
  { value: 'ESTP', label: 'ESTP' },
  { value: 'ESFP', label: 'ESFP' },
];

const salaryRangeOptions = [
  { value: '0-50000', label: 'NT$0 - NT$50,000' },
  { value: '50001-80000', label: 'NT$50,001 - NT$80,000' },
  { value: '80001-120000', label: 'NT$80,001 - NT$120,000' },
  { value: '120001-150000', label: 'NT$120,001 - NT$150,000' },
  { value: '150001+', label: 'NT$150,001+' },
];

const locationOptions = [
  { value: 'taipei', label: '台北市' },
  { value: 'newtaipei', label: '新北市' },
  { value: 'taichung', label: '台中市' },
  // 添加更多城市...
];

const jobCategoryOptions = [
  { value: 'it', label: '資訊科技' },
  { value: 'finance', label: '金融財務' },
  { value: 'marketing', label: '行銷企劃' },
  // 添加更多職務類別...
];

const jobTypeOptions = [
  { value: 'fulltime', label: '全職' },
  { value: 'parttime', label: '兼職' },
  { value: 'contract', label: '約聘' },
  { value: 'intern', label: '實習' },
];

const experienceOptions = [
  { value: '0-1', label: '0-1 年' },
  { value: '1-3', label: '1-3 年' },
  { value: '3-5', label: '3-5 年' },
  { value: '5-10', label: '5-10 年' },
  { value: '10+', label: '10 年以上' },
];

const remoteOptions = [
  { value: 'onsite', label: '辦公室工作' },
  { value: 'hybrid', label: '混合工作' },
  { value: 'remote', label: '遠端工作' },
];

const managementOptions = [
  { value: 'none', label: '無管理職責' },
  { value: 'team', label: '團隊領導' },
  { value: 'department', label: '部門主管' },
  { value: 'executive', label: '高階主管' },
];

const companySizeOptions = [
  { value: '1-50', label: '1-50 人' },
  { value: '51-200', label: '51-200 人' },
  { value: '201-500', label: '201-500 人' },
  { value: '501-1000', label: '501-1000 人' },
  { value: '1000+', label: '1000 人以上' },
];

const industryOptions = [
  { value: 'tech', label: '科技業' },
  { value: 'finance', label: '金融業' },
  { value: 'healthcare', label: '醫療保健' },
  // 添加更多產業...
];

const technologyOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  // 添加更多技術...
];

const languageOptions = [
  { value: 'chinese', label: '中文' },
  { value: 'english', label: '英文' },
  { value: 'japanese', label: '日文' },
  // 添加更多語言...
];

const JobSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState<{ value: string; label: string; } | null>(null);
  const [jobCategory, setJobCategory] = useState<{ value: string; label: string; } | null>(null);
  const [jobType, setJobType] = useState<{ value: string; label: string; } | null>(null);
  const [experience, setExperience] = useState<{ value: string; label: string; } | null>(null);
  const [mbtiTypes, setMbtiTypes] = useState<{ value: string; label: string; }[]>([]);
  const [salaryType, setSalaryType] = useState<{ value: string; label: string; } | null>(null);
  const [salaryCurrency, setSalaryCurrency] = useState<{ value: string; label: string; } | null>(null);
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(1000000);
  const [remote, setRemote] = useState<{ value: string; label: string; } | null>(null);
  const [management, setManagement] = useState<{ value: string; label: string; } | null>(null);
  const [companySize, setCompanySize] = useState<{ value: string; label: string; } | null>(null);
  const [industry, setIndustry] = useState<{ value: string; label: string; } | null>(null);
  const [technologies, setTechnologies] = useState<{ value: string; label: string; }[]>([]);
  const [languages, setLanguages] = useState<{ value: string; label: string; }[]>([]);
  const [searchResults, setSearchResults] = useState<Job[]>([]);
  const [isSticky, setIsSticky] = useState(false);
  const searchFormRef = useRef<HTMLDivElement>(null);
  const [salaryRange, setSalaryRange] = useState<{ value: string; label: string; } | null>(null);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showSalaryDetails, setShowSalaryDetails] = useState(false);
  const [sliderValues, setSliderValues] = useState<[number, number]>([0, 1000000]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (searchFormRef.current) {
        const { top } = searchFormRef.current.getBoundingClientRect();
        setIsSticky(top <= 0);
      }
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 更新 salaryRange 的值
    if (salaryType && salaryCurrency && minSalary && maxSalary) {
      setSalaryRange({
        value: `${salaryType.value}_${salaryCurrency.value}_${minSalary}-${maxSalary}`,
        label: `${salaryType.label} ${minSalary}-${maxSalary} ${salaryCurrency.label}`
      });
    }
    // 這裡將來會實現實際的搜索邏輯，包括所有新添加的搜索條件
    console.log({
      searchTerm,
      location,
      jobCategory,
      jobType,
      experience,
      mbtiTypes,
      salaryType,
      salaryCurrency,
      minSalary,
      maxSalary,
      remote,
      management,
      companySize,
      industry,
      technologies,
      languages
    });
    setSearchResults(mockJobs);
  };

  const handleReset = () => {
    setSearchTerm('');
    setLocation(null);
    setJobCategory(null);
    setJobType(null);
    setExperience(null);
    setMbtiTypes([]);
    setSalaryType(null);
    setSalaryCurrency(null);
    setMinSalary(0);
    setMaxSalary(1000000);
    setRemote(null);
    setManagement(null);
    setCompanySize(null);
    setIndustry(null);
    setTechnologies([]);
    setLanguages([]);
    setSearchResults([]);
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: '#1C2833',
      borderColor: state.isFocused ? '#D4AF37' : '#3E4C59',
      boxShadow: state.isFocused ? '0 0 0 1px #D4AF37' : 'none',
      '&:hover': {
        borderColor: '#D4AF37',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#1C2833',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#2C3E50' : '#1C2833',
      color: 'white',
      '&:active': {
        backgroundColor: '#D4AF37',
      },
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#2C3E50',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: 'white',
      ':hover': {
        backgroundColor: '#D4AF37',
        color: 'black',
      },
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
  };

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
            尋找適合你的工作
          </span>
        </motion.h1>

        <div ref={searchFormRef}>
          <motion.form 
            onSubmit={handleSearch}
            className={`mb-8 ${isSticky ? 'fixed top-0 left-0 right-0 z-40 bg-[#121212] py-4 px-4 shadow-lg' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="搜索職位或公司"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#1C2833] text-white border border-[#3E4C59] focus:outline-none focus:border-[#D4AF37]"
              />
              <Select
                isMulti
                options={mbtiOptions}
                value={mbtiTypes}
                onChange={(selectedOptions) => setMbtiTypes(selectedOptions as { value: string; label: string; }[])}
                placeholder="選擇 MBTI 類型"
                className="react-select-container w-full"
                classNamePrefix="react-select"
                styles={customStyles}
              />
              <div className="w-full relative">
                <Select
                  options={[{ value: 'salary', label: '選擇薪資' }]}
                  value={salaryRange}
                  onChange={(selectedOption) => setSalaryRange(selectedOption as { value: string; label: string; } | null)}
                  placeholder={salaryRange ? salaryRange.label : "選擇薪資"}
                  className="react-select-container w-full"
                  classNamePrefix="react-select"
                  styles={{
                    ...customStyles,
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      color: 'white',
                    }),
                  }}
                  onMenuOpen={() => setShowSalaryDetails(true)}
                  menuIsOpen={showSalaryDetails}
                  components={{
                    DropdownIndicator: () => (
                      <div className="text-white pr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ),
                    Menu: () => (
                      <div className="absolute z-10 w-full bg-[#1C2833] border border-[#3E4C59] rounded-lg mt-1 p-4">
                        <div className="flex space-x-2 mb-4">
                          <Select
                            options={[
                              { value: 'hourly', label: '時薪' },
                              { value: 'monthly', label: '月薪' },
                              { value: 'yearly', label: '年薪' }
                            ]}
                            value={salaryType}
                            onChange={(selectedOption) => setSalaryType(selectedOption)}
                            placeholder="薪資類型"
                            className="react-select-container w-1/2"
                            classNamePrefix="react-select"
                            styles={customStyles}
                          />
                          <Select
                            options={[
                              { value: 'TWD', label: 'TWD' },
                              { value: 'USD', label: 'USD' },
                              { value: 'EUR', label: 'EUR' }
                            ]}
                            value={salaryCurrency}
                            onChange={(selectedOption) => setSalaryCurrency(selectedOption)}
                            placeholder="幣種"
                            className="react-select-container w-1/2"
                            classNamePrefix="react-select"
                            styles={customStyles}
                          />
                        </div>
                        <div className="mb-4">
                          <DoubleRangeSlider
                            min={0}
                            max={1000000}
                            value={sliderValues}
                            onChange={(min, max) => {
                              console.log('min:', min, 'max:', max);
                              setMinSalary(min);
                              setMaxSalary(max);
                              setSliderValues([min, max]);
                              if (salaryType && salaryCurrency) {
                                setSalaryRange({
                                  value: `${salaryType.value}_${salaryCurrency.value}_${min}-${max}`,
                                  label: `${salaryType.label} ${min}-${max} ${salaryCurrency.label}`
                                });
                              }
                            }}
                          />
                        </div>
                        <button
                          onClick={() => {
                            if (salaryType && salaryCurrency) {
                              setSalaryRange({
                                value: `${salaryType.value}_${salaryCurrency.value}_${minSalary}-${maxSalary}`,
                                label: `${salaryType.label} ${minSalary}-${maxSalary} ${salaryCurrency.label}`
                              });
                            }
                            setShowSalaryDetails(false);
                          }}
                          className="mt-4 w-full bg-[#D4AF37] text-[#1C2833] px-4 py-2 rounded-lg hover:bg-[#E0E0E0] transition duration-300"
                        >
                          確認
                        </button>
                      </div>
                    ),
                  }}
                />
              </div>
            </div>
            {showAdvancedSearch && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <Select
                  options={locationOptions}
                  value={location}
                  onChange={(selectedOption) => setLocation(selectedOption as { value: string; label: string; })}
                  placeholder="選擇地點"
                  className="react-select-container w-full"
                  classNamePrefix="react-select"
                  styles={customStyles}
                />
                <Select
                  options={jobCategoryOptions}
                  value={jobCategory}
                  onChange={(selectedOption) => setJobCategory(selectedOption as { value: string; label: string; })}
                  placeholder="選擇職務類別"
                  className="react-select-container w-full"
                  classNamePrefix="react-select"
                  styles={customStyles}
                />
                <Select
                  options={remoteOptions}
                  value={remote}
                  onChange={(selectedOption) => setRemote(selectedOption as { value: string; label: string; })}
                  placeholder="選擇遠端工作選項"
                  className="react-select-container w-full"
                  classNamePrefix="react-select"
                  styles={customStyles}
                />
                <Select
                  options={experienceOptions}
                  value={experience}
                  onChange={(selectedOption) => setExperience(selectedOption as { value: string; label: string; })}
                  placeholder="選擇年資要求"
                  className="react-select-container w-full"
                  classNamePrefix="react-select"
                  styles={customStyles}
                />
                <Select
                  options={managementOptions}
                  value={management}
                  onChange={(selectedOption) => setManagement(selectedOption as { value: string; label: string; })}
                  placeholder="選擇管理職責"
                  className="react-select-container w-full"
                  classNamePrefix="react-select"
                  styles={customStyles}
                />
                <Select
                  options={companySizeOptions}
                  value={companySize}
                  onChange={(selectedOption) => setCompanySize(selectedOption as { value: string; label: string; })}
                  placeholder="選擇公司規模"
                  className="react-select-container w-full"
                  classNamePrefix="react-select"
                  styles={customStyles}
                />
                <Select
                  options={industryOptions}
                  value={industry}
                  onChange={(selectedOption) => setIndustry(selectedOption as { value: string; label: string; })}
                  placeholder="選擇公司產業"
                  className="react-select-container w-full"
                  classNamePrefix="react-select"
                  styles={customStyles}
                />
                <Select
                  isMulti
                  options={technologyOptions}
                  value={technologies}
                  onChange={(selectedOptions) => setTechnologies(selectedOptions as { value: string; label: string; }[])}
                  placeholder="選擇公司使用技術"
                  className="react-select-container w-full"
                  classNamePrefix="react-select"
                  styles={customStyles}
                />
                <Select
                  isMulti
                  options={languageOptions}
                  value={languages}
                  onChange={(selectedOptions) => setLanguages(selectedOptions as { value: string; label: string; }[])}
                  placeholder="選擇語言能力要求"
                  className="react-select-container w-full"
                  classNamePrefix="react-select"
                  styles={customStyles}
                />
              </div>
            )}
            <div className="text-center space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                className="bg-[#3E4C59] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#2C3E50] transition duration-300"
              >
                {showAdvancedSearch ? '隱藏進階搜索' : '顯示進階搜索'}
              </button>
            </div>
            <div className="text-center space-x-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#2C3E50] to-[#D4AF37] text-white px-6 py-2 rounded-full text-lg font-semibold hover:from-[#3E4C59] hover:to-[#E0E0E0] transition duration-300"
              >
                搜索職位
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-[#3E4C59] text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-[#2C3E50] transition duration-300"
              >
                清空條件
              </button>
            </div>
          </motion.form>
        </div>

        {isSticky && <div style={{ height: '100px' }}></div>}

        {searchResults.length > 0 ? (
          <JobList jobs={searchResults} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-8 text-center"
          >
            <p className="mt-4 text-3xl font-bold text-[#B0B0B0]">
              Oops! The job market is playing hide and seek!
            </p>
            <p className="mt-2 text-xl text-[#B0B0B0]">
              Looks like all the jobs are on a coffee break. Try again later!
            </p>
          </motion.div>
        )}
      </div>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#D4AF37] text-[#1C2833] p-3 rounded-full shadow-lg hover:bg-[#E0E0E0] transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

const JobList: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
  const [favoriteJobs, setFavoriteJobs] = useState<number[]>([]);

  const toggleFavorite = (jobId: number) => {
    setFavoriteJobs(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  return (
    <div className="mt-8">
      {jobs.map((job) => (
        <div key={job.id} className="bg-[#1C2833] rounded-lg shadow-md p-6 mb-4 border border-[#3E4C59] relative">
          <h3 className="text-2xl font-semibold text-[#D4AF37] mb-2">{job.title}</h3>
          <p className="text-[#E0E0E0] mb-2">{job.company}</p>
          <p className="text-[#B0B0B0] mb-2">{job.location}</p>
          <p className="text-[#B0B0B0] mb-2">薪資範圍: {job.salary}</p>
          <p className="text-[#B0B0B0]">適合的 MBTI 類型: {job.mbtiMatch}</p>
          <FavoriteButton
            isFavorite={favoriteJobs.includes(job.id)}
            onClick={() => toggleFavorite(job.id)}
          />
        </div>
      ))}
    </div>
  );
};

const FavoriteButton: React.FC<{ isFavorite: boolean; onClick: () => void }> = ({ isFavorite, onClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onClick();
  };

  return (
    <motion.button
      onClick={handleClick}
      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#2C3E50] bg-opacity-70 rounded-full text-xl text-[#D4AF37] hover:bg-opacity-100 transition duration-300"
      whileTap={{ scale: 0.9 }}
    >
      {isFavorite ? '★' : '☆'}
      {isAnimating && (
        <motion.div
          className="absolute"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-1 h-1 bg-[#D4AF37]"
              initial={{ x: 0, y: 0 }}
              animate={{
                x: Math.cos(index * Math.PI / 4) * 20,
                y: Math.sin(index * Math.PI / 4) * 20,
                opacity: 0,
              }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </motion.div>
      )}
    </motion.button>
  );
};

export default JobSearch;