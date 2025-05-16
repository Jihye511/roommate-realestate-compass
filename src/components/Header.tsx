
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This would be replaced with actual authentication logic
  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-emerald-600">
          부동산 정보 플랫폼
        </Link>
        
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link to="/map" className="text-sky-700 hover:text-emerald-600 transition">
                지도
              </Link>
            </li>
            <li>
              <Link to="/community" className="text-sky-700 hover:text-emerald-600 transition">
                커뮤니티
              </Link>
            </li>
            <li>
              <Link to="/calculator" className="text-sky-700 hover:text-emerald-600 transition">
                계산기
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <button 
                  onClick={handleLoginToggle}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-sky-700 rounded-lg hover:bg-gray-200 transition"
                >
                  <User size={18} />
                  <span>내 계정</span>
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" 
                  onClick={handleLoginToggle} 
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                >
                  로그인
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
