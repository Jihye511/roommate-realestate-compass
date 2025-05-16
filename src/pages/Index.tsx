
import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { Map, Calculator, Users } from 'lucide-react';

const Index = () => {
  return (
    <>
      <Header />
      <div className="main-container">
        {/* First section */}
        <section className="section-hero bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              당신의 공간, 우리의 데이터로 완성됩니다.
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
              부동산 시장을 더 쉽고, 투명하게 이해할 수 있도록 도와드립니다.
              지금 바로 시작해보세요.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/map" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-opacity-90 transition">
                시작하기
              </Link>
              <a href="#map-section" className="px-8 py-4 bg-transparent border border-white text-white rounded-lg font-bold hover:bg-white hover:bg-opacity-10 transition">
                더 알아보기
              </a>
            </div>
          </div>
        </section>

        {/* Map section */}
        <section id="map-section" className="section-hero bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Map size={64} className="text-blue-600 mb-4" />
                <h2 className="text-4xl font-bold mb-6">지도로 보는 부동산 정보</h2>
                <p className="text-lg text-gray-700 mb-6">
                  시세 그래프, 매물 검색, 그리고 실제 거주자들의 생생한 리뷰까지.
                  지도 한 눈에 확인하세요.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    실시간으로 업데이트되는 시세 그래프로 가격 동향을 파악하세요.
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    원하는 조건으로 쉽게 매물을 검색하고 비교하세요.
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    실제 거주자들의 솔직한 리뷰로 주거 환경을 미리 확인하세요.
                  </li>
                </ul>
                <Link to="/map" className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                  지도 보러가기
                </Link>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <img src="https://via.placeholder.com/500x400?text=Map+Preview" alt="지도 미리보기" className="rounded" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator section */}
        <section className="section-hero bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 order-2 md:order-1">
                <div className="bg-gray-50 p-4 rounded-lg shadow-lg">
                  <img src="https://via.placeholder.com/500x400?text=Calculator+Preview" alt="계산기 미리보기" className="rounded" />
                </div>
              </div>
              <div className="md:w-1/2 mb-8 md:mb-0 order-1 md:order-2 md:pl-12">
                <Calculator size={64} className="text-blue-600 mb-4" />
                <h2 className="text-4xl font-bold mb-6">맞춤형 부동산 계산기</h2>
                <p className="text-lg text-gray-700 mb-6">
                  부동산 거래에 필요한 모든 계산을 한 번에. 중개보수, 대출이자, 일반 계산까지.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mt-1">1</div>
                    <div className="ml-4">
                      <h3 className="text-xl font-medium">중개보수 계산기</h3>
                      <p className="text-gray-600">부동산 중개 수수료를 정확하게 계산하여 불필요한 지출을 방지하세요.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mt-1">2</div>
                    <div className="ml-4">
                      <h3 className="text-xl font-medium">대출이자 계산기</h3>
                      <p className="text-gray-600">주택 대출 이자와 월 상환액을 쉽게 계산하여 예산 계획을 세우세요.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mt-1">3</div>
                    <div className="ml-4">
                      <h3 className="text-xl font-medium">일반 계산기</h3>
                      <p className="text-gray-600">필요한 모든 수치 계산을 위한 사용하기 쉬운 일반 계산기입니다.</p>
                    </div>
                  </li>
                </ul>
                <Link to="/calculator" className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                  계산기 사용하기
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Community section */}
        <section className="section-hero community-bg">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Users size={64} className="text-blue-600 mb-4" />
                <h2 className="text-4xl font-bold mb-6">부동산 커뮤니티</h2>
                <p className="text-lg text-gray-700 mb-6">
                  같은 관심사를 가진 사람들과 부동산에 관한 경험, 정보, 조언을 나누세요.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    최신 부동산 정책과 시장 동향에 대한 실시간 토론
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    지역별 거주 경험과 이야기를 공유하는 주거 정보 게시판
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    투자 전략과 경험을 나누는 정보 교류의 장
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    전문가와 함께하는 Q&A 세션
                  </li>
                </ul>
                <Link to="/community" className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                  커뮤니티 참여하기
                </Link>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <img src="https://via.placeholder.com/500x400?text=Community+Preview" alt="커뮤니티 미리보기" className="rounded" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
