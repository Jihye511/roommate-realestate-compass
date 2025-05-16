
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          부동산 정보 플랫폼
        </Link>
        
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link to="/map" className="text-gray-700 hover:text-blue-600 transition">
                지도
              </Link>
            </li>
            <li>
              <Link to="/community" className="text-gray-700 hover:text-blue-600 transition">
                커뮤니티
              </Link>
            </li>
            <li>
              <Link to="/calculator" className="text-gray-700 hover:text-blue-600 transition">
                계산기
              </Link>
            </li>
            <li>
              <Link to="/signup" className="text-gray-700 hover:text-blue-600 transition">
                회원가입
              </Link>
            </li>
            <li>
              <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                로그인
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
