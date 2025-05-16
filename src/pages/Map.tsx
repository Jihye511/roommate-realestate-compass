import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Map as MapIcon, Calculator, Users, User, ArrowRight, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface Property {
  id: number;
  name: string;
  address: string;
  price: string;
  size: string;
  type: string;
  imageUrl: string;
  isFavorite?: boolean;
}

const sampleProperties: Property[] = [
  {
    id: 1,
    name: "한강 파크뷰",
    address: "서울시 강남구 압구정동 123-45",
    price: "12억 5,000만원",
    size: "84m²",
    type: "아파트",
    imageUrl: "https://via.placeholder.com/100"
  },
  {
    id: 2,
    name: "센트럴 파크",
    address: "서울시 강남구 청담동 456-78",
    price: "15억 2,000만원",
    size: "102m²",
    type: "아파트",
    imageUrl: "https://via.placeholder.com/100"
  },
  {
    id: 3,
    name: "리버사이드 아파트",
    address: "서울시 용산구 이촌동 789-10",
    price: "9억 8,000만원",
    size: "76m²",
    type: "아파트",
    imageUrl: "https://via.placeholder.com/100"
  },
  {
    id: 4,
    name: "스카이 하이츠",
    address: "서울시 서초구 반포동 234-56",
    price: "10억 3,000만원",
    size: "92m²",
    type: "아파트",
    imageUrl: "https://via.placeholder.com/100"
  },
  {
    id: 5,
    name: "선유도 그린파크",
    address: "서울시 영등포구 선유도동 345-67",
    price: "7억 5,000만원",
    size: "68m²",
    type: "아파트",
    imageUrl: "https://via.placeholder.com/100"
  }
];

const Map = () => {
  const [searchAddress, setSearchAddress] = useState('');
  const [searchApartment, setSearchApartment] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [dong, setDong] = useState('');
  const [properties, setProperties] = useState<Property[]>(sampleProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [showAIResults, setShowAIResults] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  
  // New state for region toggles in AI recommendation
  const [selectedRegion, setSelectedRegion] = useState({
    city: '서울특별시',
    district: '강남구',
    dong: '압구정동'
  });
  
  const [aiPreferences, setAiPreferences] = useState({
    nearSubway: false,
    nearSchool: false,
    lowNoise: false,
    goodSecurity: false,
    newBuilding: false,
    investment: false,
    livingSpace: false,
    budget: "1억 ~ 5억",
    size: "소형 (20평 이하)",
  });

  const toggleFavorite = (property: Property, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Prevent triggering property selection
    }
    
    const updatedProperties = properties.map(p => 
      p.id === property.id ? { ...p, isFavorite: !p.isFavorite } : p
    );
    
    setProperties(updatedProperties);
    
    // Update favorites list
    if (!property.isFavorite) {
      // Add to favorites
      setFavorites([...favorites, { ...property, isFavorite: true }]);
    } else {
      // Remove from favorites
      setFavorites(favorites.filter(f => f.id !== property.id));
    }
  };

  const aiRecommendedProperties = [
    {
      id: 6,
      name: "햇살가득 레지던스",
      address: "서울시 마포구 망원동 123-45",
      price: "6억 8,000만원",
      size: "62m²",
      type: "아파트",
      imageUrl: "https://via.placeholder.com/100",
      aiScore: "92점"
    },
    {
      id: 7,
      name: "강변 힐스테이트",
      address: "서울시 성동구 옥수동 456-78",
      price: "9억 2,000만원",
      size: "79m²",
      type: "아파트",
      imageUrl: "https://via.placeholder.com/100",
      aiScore: "88점"
    },
    {
      id: 8,
      name: "숲속 테라스하우스",
      address: "서울시 은평구 진관동 789-10",
      price: "7억 5,000만원",
      size: "68m²",
      type: "아파트",
      imageUrl: "https://via.placeholder.com/100",
      aiScore: "85점"
    }
  ];

  // City options for toggles
  const cityOptions = ['서울특별시', '부산광역시', '인천광역시'];
  const districtOptions = {
    '서울특별시': ['강남구', '서초구', '송파구', '마포구'],
    '부산광역시': ['해운대구', '부산진구', '남구'],
    '인천광역시': ['연수구', '남동구', '부평구'],
  };
  const dongOptions = {
    '강남구': ['압구정동', '청담동', '삼성동', '역삼동'],
    '서초구': ['반포동', '서초동', '방배동'],
    '송파구': ['잠실동', '가락동', '문정동'],
    '마포구': ['망원동', '합정동', '상암동'],
  };

  const handleAddressSearch = () => {
    console.log('Address search:', { city, district, dong });
    // In a real app, this would filter properties based on address
  };

  const handleApartmentSearch = () => {
    console.log('Apartment search:', searchApartment);
    // In a real app, this would filter properties based on apartment name
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleAISubmit = () => {
    console.log('AI preferences:', { region: selectedRegion, ...aiPreferences });
    setShowAIDialog(false);
    setShowAIResults(true);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-16 bg-emerald-700 flex flex-col items-center py-6">
        <Link to="/" className="mb-8">
          <Home size={24} className="text-white" />
        </Link>
        <Link to="/map" className="mb-8">
          <MapIcon size={24} className="text-sky-300" />
        </Link>
        <Link to="/calculator" className="mb-8">
          <Calculator size={24} className="text-white" />
        </Link>
        <Link to="/community" className="mb-8">
          <Users size={24} className="text-white" />
        </Link>
      </div>

      <div className="relative flex-1">
        {/* Map area - Takes the full screen */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center p-8">
              <div className="text-3xl font-bold text-emerald-700 mb-4">카카오맵 지도 영역</div>
              <div className="text-gray-600 text-lg">실제 구현시 카카오맵 API로 대체됩니다</div>
            </div>
          </div>
        </div>

        {/* Search and Detail Panel - Floats over the map */}
        <div className="relative z-10 flex h-full">
          {/* Search panel */}
          <div className="w-80 bg-white shadow-lg overflow-y-auto">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4 text-emerald-700">
                {showFavorites ? '찜 목록' : '검색'}
              </h2>
              
              {!showFavorites && (
                <>
                  {/* Address search */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 text-sky-700">지역으로 검색</h3>
                    <div className="space-y-2">
                      <Select onValueChange={setCity}>
                        <SelectTrigger className="border-emerald-300 focus:ring-emerald-500">
                          <SelectValue placeholder="시 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seoul">서울특별시</SelectItem>
                          <SelectItem value="busan">부산광역시</SelectItem>
                          <SelectItem value="incheon">인천광역시</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select onValueChange={setDistrict}>
                        <SelectTrigger className="border-emerald-300 focus:ring-emerald-500">
                          <SelectValue placeholder="구 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gangnam">강남구</SelectItem>
                          <SelectItem value="seocho">서초구</SelectItem>
                          <SelectItem value="songpa">송파구</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select onValueChange={setDong}>
                        <SelectTrigger className="border-emerald-300 focus:ring-emerald-500">
                          <SelectValue placeholder="동 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apgujeong">압구정동</SelectItem>
                          <SelectItem value="cheongdam">청담동</SelectItem>
                          <SelectItem value="samseong">삼성동</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button onClick={handleAddressSearch} className="w-full bg-emerald-500 hover:bg-emerald-600">검색</Button>
                    </div>
                  </div>
                  
                  {/* Apartment search */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 text-sky-700">아파트로 검색</h3>
                    <div className="flex space-x-2">
                      <Input
                        value={searchApartment}
                        onChange={(e) => setSearchApartment(e.target.value)}
                        placeholder="아파트 이름을 입력하세요"
                        className="border-emerald-300 focus:ring-emerald-500"
                      />
                      <Button onClick={handleApartmentSearch} className="bg-emerald-500 hover:bg-emerald-600">검색</Button>
                    </div>
                  </div>
                </>
              )}

              {/* Search results or Favorites list */}
              <div>
                <h3 className="font-medium mb-2 text-sky-700">
                  {showFavorites 
                    ? '찜한 매물' 
                    : (showAIResults ? 'AI 추천 물건' : '검색 결과')}
                </h3>
                <div className="space-y-4">
                  {showFavorites 
                    ? favorites.map((property) => (
                        <div
                          key={property.id}
                          className={`flex border rounded-lg p-3 cursor-pointer hover:bg-gray-50 ${selectedProperty?.id === property.id ? 'border-emerald-500 bg-emerald-50' : ''}`}
                          onClick={() => handlePropertyClick(property)}
                        >
                          <img
                            src={property.imageUrl}
                            alt={property.name}
                            className="w-16 h-16 rounded object-cover mr-3"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-emerald-700">{property.name}</h4>
                            <p className="text-sm text-gray-600">{property.address}</p>
                            <p className="text-sm font-semibold text-sky-600">{property.price}</p>
                          </div>
                          <button 
                            onClick={(e) => toggleFavorite(property, e)}
                            className="ml-2 text-red-500 focus:outline-none"
                          >
                            <Heart className="w-5 h-5" fill="currentColor" />
                          </button>
                        </div>
                      ))
                    : showAIResults 
                      ? aiRecommendedProperties.map((property) => (
                          <div
                            key={property.id}
                            className={`flex border rounded-lg p-3 cursor-pointer hover:bg-gray-50 ${selectedProperty?.id === property.id ? 'border-emerald-500 bg-emerald-50' : ''}`}
                            onClick={() => handlePropertyClick(property)}
                          >
                            <img
                              src={property.imageUrl}
                              alt={property.name}
                              className="w-16 h-16 rounded object-cover mr-3"
                            />
                            <div className="flex-1">
                              <div className="flex items-center">
                                <h4 className="font-medium text-emerald-700">{property.name}</h4>
                                <span className="ml-2 bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">AI {property.aiScore}</span>
                              </div>
                              <p className="text-sm text-gray-600">{property.address}</p>
                              <p className="text-sm font-semibold text-sky-600">{property.price}</p>
                            </div>
                            <button 
                              onClick={(e) => toggleFavorite(property, e)}
                              className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
                            >
                              <Heart className="w-5 h-5" fill={property.isFavorite ? "currentColor" : "none"} />
                            </button>
                          </div>
                        ))
                      : properties.map((property) => (
                          <div
                            key={property.id}
                            className={`flex border rounded-lg p-3 cursor-pointer hover:bg-gray-50 ${selectedProperty?.id === property.id ? 'border-emerald-500 bg-emerald-50' : ''}`}
                            onClick={() => handlePropertyClick(property)}
                          >
                            <img
                              src={property.imageUrl}
                              alt={property.name}
                              className="w-16 h-16 rounded object-cover mr-3"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-emerald-700">{property.name}</h4>
                              <p className="text-sm text-gray-600">{property.address}</p>
                              <p className="text-sm font-semibold text-sky-600">{property.price}</p>
                            </div>
                            <button 
                              onClick={(e) => toggleFavorite(property, e)}
                              className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
                            >
                              <Heart className="w-5 h-5" fill={property.isFavorite ? "currentColor" : "none"} />
                            </button>
                          </div>
                        ))}
                </div>
                {showFavorites && favorites.length === 0 && (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <p>찜한 매물이 없습니다.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Property details panel - Only shown when a property is selected */}
          {selectedProperty && (
            <div className="w-96 bg-white shadow-lg overflow-y-auto p-4">
              <h2 className="text-2xl font-bold mb-2 text-emerald-700">{selectedProperty.name}</h2>
              <p className="text-gray-600 mb-4">{selectedProperty.address}</p>
              
              <img 
                src="https://via.placeholder.com/400x300?text=Property+Image" 
                alt={selectedProperty.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-sky-700">가격 및 정보</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">가격</span>
                      <span className="font-medium">{selectedProperty.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">면적</span>
                      <span className="font-medium">{selectedProperty.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">유형</span>
                      <span className="font-medium">{selectedProperty.type}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-sky-700">시세 그래프</h3>
                  <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center border border-gray-200">
                    시세 그래프 영역
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-sky-700">거주자 리뷰</h3>
                  <div className="space-y-2">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <p className="text-sm">
                        "교통이 편리하고 주변 편의시설이 잘 갖춰져 있어요."
                      </p>
                      <p className="text-xs text-gray-500 mt-1">김** | 2023.05.12</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <p className="text-sm">
                        "층간소음이 조금 있지만 전반적으로 만족스러워요."
                      </p>
                      <p className="text-xs text-gray-500 mt-1">이** | 2023.04.23</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* User profile and favorites buttons */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <Button 
            variant="outline" 
            className="rounded-full w-10 h-10 p-0 bg-white border-emerald-300"
            as={Link}
            to="/mypage"
          >
            <User size={20} className="text-sky-700" />
          </Button>
          <Button 
            variant="outline" 
            className={`rounded-full w-10 h-10 p-0 ${showFavorites ? 'bg-red-100 border-red-300' : 'bg-white border-emerald-300'}`}
            onClick={() => setShowFavorites(!showFavorites)}
          >
            <Heart size={20} className={showFavorites ? 'text-red-500' : 'text-sky-700'} fill={showFavorites ? "currentColor" : "none"} />
          </Button>
        </div>
        
        {/* Area Exploration button */}
        <div className="absolute bottom-24 right-6 z-20">
          <Button 
            className="rounded-full h-16 w-16 flex items-center justify-center bg-sky-500 hover:bg-sky-600 shadow-lg"
            onClick={() => console.log("구역 탐색 클릭")}
          >
            <Search size={24} />
            <span className="sr-only">구역 탐색</span>
          </Button>
        </div>
        
        {/* AI recommendation button */}
        <div className="absolute bottom-6 right-6 z-20">
          <Button 
            className="rounded-full h-16 w-16 flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 shadow-lg"
            onClick={() => setShowAIDialog(true)}
          >
            <span className="text-lg font-bold">AI</span>
          </Button>
        </div>
        
        {/* Search results toggle button (only when AI results are showing) */}
        {showAIResults && (
          <div className="absolute bottom-6 right-24 z-20">
            <Button 
              className="rounded-full h-16 w-16 flex items-center justify-center bg-sky-500 hover:bg-sky-600 shadow-lg"
              onClick={() => setShowAIResults(false)}
            >
              <ArrowRight size={24} />
            </Button>
          </div>
        )}
      </div>

      {/* AI Preferences Dialog */}
      <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-emerald-700">AI 추천 체크리스트</DialogTitle>
            <DialogDescription>
              원하시는 조건을 선택하시면 AI가 최적의 부동산을 추천해드립니다.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 py-4">
            {/* Region selector using toggle groups */}
            <div className="space-y-4">
              <h4 className="font-medium text-sky-700">지역 선택</h4>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">시</label>
                <ToggleGroup 
                  type="single" 
                  value={selectedRegion.city}
                  onValueChange={(value) => value && setSelectedRegion({...selectedRegion, city: value})}
                  className="flex flex-wrap gap-1"
                >
                  {cityOptions.map(city => (
                    <ToggleGroupItem 
                      key={city} 
                      value={city} 
                      className="px-3 py-1 text-sm"
                    >
                      {city}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">구</label>
                <ToggleGroup 
                  type="single" 
                  value={selectedRegion.district}
                  onValueChange={(value) => value && setSelectedRegion({...selectedRegion, district: value})}
                  className="flex flex-wrap gap-1"
                >
                  {districtOptions[selectedRegion.city as keyof typeof districtOptions]?.map(district => (
                    <ToggleGroupItem 
                      key={district} 
                      value={district} 
                      className="px-3 py-1 text-sm"
                    >
                      {district}
                    </ToggleGroupItem>
                  )) || null}
                </ToggleGroup>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">동</label>
                <ToggleGroup 
                  type="single" 
                  value={selectedRegion.dong}
                  onValueChange={(value) => value && setSelectedRegion({...selectedRegion, dong: value})}
                  className="flex flex-wrap gap-1"
                >
                  {dongOptions[selectedRegion.district as keyof typeof dongOptions]?.map(dong => (
                    <ToggleGroupItem 
                      key={dong} 
                      value={dong} 
                      className="px-3 py-1 text-sm"
                    >
                      {dong}
                    </ToggleGroupItem>
                  )) || null}
                </ToggleGroup>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-sky-700">주거 환경</h4>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="nearSubway" 
                  checked={aiPreferences.nearSubway}
                  onCheckedChange={(checked) => 
                    setAiPreferences({...aiPreferences, nearSubway: !!checked})
                  }
                />
                <label htmlFor="nearSubway">역세권 (도보 5분 이내)</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="nearSchool" 
                  checked={aiPreferences.nearSchool}
                  onCheckedChange={(checked) => 
                    setAiPreferences({...aiPreferences, nearSchool: !!checked})
                  }
                />
                <label htmlFor="nearSchool">학교 근처 (도보 10분 이내)</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="lowNoise" 
                  checked={aiPreferences.lowNoise}
                  onCheckedChange={(checked) => 
                    setAiPreferences({...aiPreferences, lowNoise: !!checked})
                  }
                />
                <label htmlFor="lowNoise">소음이 적은 환경</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="goodSecurity" 
                  checked={aiPreferences.goodSecurity}
                  onCheckedChange={(checked) => 
                    setAiPreferences({...aiPreferences, goodSecurity: !!checked})
                  }
                />
                <label htmlFor="goodSecurity">보안 시설 우수</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="newBuilding" 
                  checked={aiPreferences.newBuilding}
                  onCheckedChange={(checked) => 
                    setAiPreferences({...aiPreferences, newBuilding: !!checked})
                  }
                />
                <label htmlFor="newBuilding">신축 (5년 이내)</label>
              </div>
              
              <h4 className="font-medium text-sky-700 mt-4">목적</h4>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="investment" 
                  checked={aiPreferences.investment}
                  onCheckedChange={(checked) => 
                    setAiPreferences({...aiPreferences, investment: !!checked})
                  }
                />
                <label htmlFor="investment">투자용</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="livingSpace" 
                  checked={aiPreferences.livingSpace}
                  onCheckedChange={(checked) => 
                    setAiPreferences({...aiPreferences, livingSpace: !!checked})
                  }
                />
                <label htmlFor="livingSpace">실거주용</label>
              </div>
              
              <h4 className="font-medium text-sky-700 mt-4">예산</h4>
              <Select 
                value={aiPreferences.budget}
                onValueChange={(value) => setAiPreferences({...aiPreferences, budget: value})}
              >
                <SelectTrigger className="border-emerald-300 focus:ring-emerald-500">
                  <SelectValue placeholder="예산 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1억 ~ 5억">1억 ~ 5억</SelectItem>
                  <SelectItem value="5억 ~ 10억">5억 ~ 10억</SelectItem>
                  <SelectItem value="10억 ~ 15억">10억 ~ 15억</SelectItem>
                  <SelectItem value="15억 이상">15억 이상</SelectItem>
                </SelectContent>
              </Select>
              
              <h4 className="font-medium text-sky-700 mt-4">평수</h4>
              <Select 
                value={aiPreferences.size}
                onValueChange={(value) => setAiPreferences({...aiPreferences, size: value})}
              >
                <SelectTrigger className="border-emerald-300 focus:ring-emerald-500">
                  <SelectValue placeholder="평수 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="소형 (20평 이하)">소형 (20평 이하)</SelectItem>
                  <SelectItem value="중소형 (20평 ~ 30평)">중소형 (20평 ~ 30평)</SelectItem>
                  <SelectItem value="중형 (30평 ~ 40평)">중형 (30평 ~ 40평)</SelectItem>
                  <SelectItem value="대형 (40평 이상)">대형 (40평 이상)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowAIDialog(false)}>
              취소
            </Button>
            <Button type="button" className="bg-emerald-500 hover:bg-emerald-600" onClick={handleAISubmit}>
              AI 추천받기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Map;
