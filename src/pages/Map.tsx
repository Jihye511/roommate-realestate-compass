
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Card,
  CardContent
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Check, X, Search, MapPin, Heart, Building, ArrowRight } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface Property {
  id: number;
  name: string;
  address: string;
  price: string;
  size: string;
  type: string;
  imageUrl: string;
  aiScore?: string;
  isFavorite?: boolean;
}

const sampleProperties: Property[] = [
  {
    id: 1,
    name: "래미안 아파트 101동",
    address: "서울시 강남구 역삼동 123-45",
    price: "15억 5,000만원",
    size: "84m² (25평)",
    type: "아파트",
    imageUrl: "https://via.placeholder.com/150",
    aiScore: "94점"
  },
  {
    id: 2,
    name: "자이 아파트 210동",
    address: "서울시 강남구 삼성동 234-56",
    price: "12억 2,000만원",
    size: "76m² (23평)",
    type: "아파트",
    imageUrl: "https://via.placeholder.com/150",
    aiScore: "88점"
  },
  {
    id: 3,
    name: "삼성 래미안 1차 305동",
    address: "서울시 강남구 대치동 345-67",
    price: "18억 8,000만원",
    size: "112m² (34평)",
    type: "아파트",
    imageUrl: "https://via.placeholder.com/150",
    aiScore: "96점"
  },
  {
    id: 4,
    name: "힐스테이트 2차 507동",
    address: "서울시 서초구 반포동 456-78",
    price: "21억 5,000만원",
    size: "125m² (38평)",
    type: "아파트",
    imageUrl: "https://via.placeholder.com/150",
    aiScore: "92점"
  },
  {
    id: 5,
    name: "롯데캐슬 골드파크 3차 1201동",
    address: "서울시 송파구 잠실동 567-89",
    price: "17억 3,000만원",
    size: "103m² (31평)",
    type: "아파트",
    imageUrl: "https://via.placeholder.com/150",
    aiScore: "90점"
  },
];

const Map = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sizeRange, setSizeRange] = useState([0, 50]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const [isShowingAiResults, setIsShowingAiResults] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<Property[]>([]);

  // AI Recommendation Form States
  const [region, setRegion] = useState({ city: '서울시', district: '강남구', neighborhood: '삼성동' });
  const [budget, setBudget] = useState('15억 이하');
  const [propertyType, setPropertyType] = useState('아파트');
  const [requirements, setRequirements] = useState({
    nearSubway: false,
    goodSchool: false,
    quiet: false,
    park: false,
    shopping: false,
    newBuilding: false,
  });

  const handleToggleFavorite = (property: Property) => {
    const isFavorite = favorites.some(fav => fav.id === property.id);
    
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== property.id));
      toast({
        title: "찜 목록에서 제거되었습니다.",
        description: `${property.name}이(가) 찜 목록에서 제거되었습니다.`,
        variant: "default",
      });
    } else {
      setFavorites([...favorites, { ...property, isFavorite: true }]);
      toast({
        title: "찜 목록에 추가되었습니다.",
        description: `${property.name}이(가) 찜 목록에 추가되었습니다.`,
        variant: "default",
      });
    }
  };

  const handleSearch = () => {
    setIsShowingAiResults(false);
    setShowFavorites(false);
    // In a real application, this would trigger an API call
    console.log('Searching for:', searchTerm, 'Price range:', priceRange, 'Size range:', sizeRange);
  };

  const handleAiSubmit = () => {
    setIsAiDialogOpen(false);
    setIsShowingAiResults(true);
    setShowFavorites(false);
    // In a real application, this would trigger an API call with the AI parameters
    console.log('AI Search with:', region, budget, propertyType, requirements);
  };

  const displayedProperties = showFavorites 
    ? favorites 
    : isShowingAiResults 
      ? sampleProperties.sort((a, b) => {
          const scoreA = parseInt(a.aiScore?.replace('점', '') || '0');
          const scoreB = parseInt(b.aiScore?.replace('점', '') || '0');
          return scoreB - scoreA;
        }) 
      : sampleProperties;

  return (
    <>
      <Header />
      <div className="flex h-screen pt-16 bg-gray-50">
        {/* Left sidebar for search */}
        <div className="w-80 bg-white shadow-md z-10 p-4 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-emerald-700 mb-2">부동산 검색</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="search">지역, 단지명</Label>
                <div className="flex mt-1">
                  <Input
                    id="search"
                    placeholder="예: 강남구 삼성동, 래미안"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="outline" className="ml-2" onClick={handleSearch}>
                    <Search size={16} />
                  </Button>
                </div>
              </div>

              <div>
                <Label>가격대 (억)</Label>
                <div className="flex items-center justify-between mt-1 text-sm">
                  <span>{priceRange[0]}억</span>
                  <span>{priceRange[1]}억+</span>
                </div>
                <Slider
                  defaultValue={priceRange}
                  max={50}
                  step={1}
                  className="mt-2"
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
              </div>

              <div>
                <Label>면적 (평)</Label>
                <div className="flex items-center justify-between mt-1 text-sm">
                  <span>{sizeRange[0]}평</span>
                  <span>{sizeRange[1]}평+</span>
                </div>
                <Slider
                  defaultValue={sizeRange}
                  max={50}
                  step={1}
                  className="mt-2"
                  onValueChange={(value) => setSizeRange(value as [number, number])}
                />
              </div>

              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowFavorites(true)} 
                  className="w-full bg-white text-sky-600 border-sky-200 hover:bg-sky-50"
                >
                  <Heart size={16} className="mr-2" />
                  찜한 매물 보기
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowFavorites(false)} 
                  className="w-full bg-sky-500 text-white border-sky-500 hover:bg-sky-600"
                >
                  <Building size={16} className="mr-2" />
                  구역 탐색
                </Button>
                
                <Button 
                  className="w-full bg-emerald-500 hover:bg-emerald-600" 
                  onClick={() => setIsAiDialogOpen(true)}
                >
                  AI 추천 받기
                </Button>
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-900">
                {showFavorites 
                  ? '찜한 매물'
                  : isShowingAiResults
                    ? 'AI 추천 매물'
                    : '검색 결과'
                } 
                <span className="text-sm text-gray-500 ml-1">
                  ({displayedProperties.length}건)
                </span>
              </h3>
              {isShowingAiResults && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-emerald-600 p-1 h-auto"
                  onClick={() => setIsAiDialogOpen(true)}
                >
                  필터 수정
                </Button>
              )}
            </div>

            <div className="space-y-3 max-h-[calc(100vh-380px)] overflow-y-auto pr-1">
              {displayedProperties.length > 0 ? (
                displayedProperties.map((property) => (
                  <div 
                    key={property.id}
                    className={`p-3 border rounded-lg cursor-pointer ${
                      selectedProperty?.id === property.id 
                        ? 'border-sky-500 bg-sky-50' 
                        : 'border-gray-200 hover:border-sky-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedProperty(property)}
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium text-sm">{property.name}</h4>
                      <Button 
                        variant="ghost" 
                        className="p-0 h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(property);
                        }}
                      >
                        <Heart 
                          size={16} 
                          className={favorites.some(fav => fav.id === property.id) 
                            ? "fill-red-500 text-red-500" 
                            : "text-gray-400"}
                        />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{property.address}</div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-medium text-emerald-700">{property.price}</span>
                      <span className="text-xs text-gray-500">{property.size}</span>
                    </div>
                    {isShowingAiResults && property.aiScore && (
                      <div className="mt-2 text-xs bg-emerald-50 text-emerald-700 font-medium px-2 py-1 rounded inline-flex items-center">
                        <span>AI 매칭 점수:</span>
                        <span className="ml-1 text-emerald-600">{property.aiScore}</span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {showFavorites ? '찜한 매물이 없습니다.' : '검색 결과가 없습니다.'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main map area */}
        <div className="flex-1 relative">
          {/* Full-screen map as background */}
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="text-center p-8 max-w-md">
              <img 
                src="https://via.placeholder.com/800x600?text=카카오맵+지도+영역" 
                alt="카카오맵 영역" 
                className="w-full h-auto rounded-lg shadow-md mb-4" 
              />
              <p className="text-gray-500 text-sm">
                실제 구현시 카카오맵 API로 대체됩니다.
              </p>
            </div>
          </div>

          {/* Property details panel if property selected */}
          {selectedProperty && (
            <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-lg p-4 overflow-y-auto max-h-[calc(100vh-100px)]">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900">{selectedProperty.name}</h3>
                <Button 
                  variant="ghost" 
                  className="p-0 h-8 w-8"
                  onClick={() => handleToggleFavorite(selectedProperty)}
                >
                  <Heart 
                    size={18} 
                    className={favorites.some(fav => fav.id === selectedProperty.id) 
                      ? "fill-red-500 text-red-500" 
                      : "text-gray-500"}
                  />
                </Button>
              </div>

              <div className="mt-2 flex items-start">
                <MapPin size={16} className="text-gray-500 mr-1 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">{selectedProperty.address}</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-xs text-gray-500">가격</div>
                  <div className="text-base font-medium text-emerald-700">{selectedProperty.price}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-xs text-gray-500">면적</div>
                  <div className="text-base font-medium">{selectedProperty.size}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-xs text-gray-500">유형</div>
                  <div className="text-base font-medium">{selectedProperty.type}</div>
                </div>
                {isShowingAiResults && selectedProperty.aiScore && (
                  <div className="bg-emerald-50 p-3 rounded-md">
                    <div className="text-xs text-emerald-600">AI 점수</div>
                    <div className="text-base font-medium text-emerald-700">{selectedProperty.aiScore}</div>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-4">
                <h4 className="font-medium text-gray-900">상세 정보</h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">입주가능일</span>
                    <span className="text-sm font-medium">즉시입주가능</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">준공년도</span>
                    <span className="text-sm font-medium">2020년</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">방향</span>
                    <span className="text-sm font-medium">남향</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">방/욕실</span>
                    <span className="text-sm font-medium">3/2</span>
                  </div>
                </div>
                
                <h4 className="font-medium text-gray-900 pt-2">주변 환경</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">지하철역</span>
                    <span className="text-sm font-medium">도보 5분</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">학교</span>
                    <span className="text-sm font-medium">도보 10분</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">마트</span>
                    <span className="text-sm font-medium">도보 7분</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full bg-sky-500 text-white border-sky-500 hover:bg-sky-600"
                  to="/community"
                >
                  <Link to="/community">
                    주변 커뮤니티 글 보기 
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Recommendation Dialog */}
      <Dialog open={isAiDialogOpen} onOpenChange={setIsAiDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>AI 맞춤 매물 추천</DialogTitle>
            <DialogDescription>
              원하는 조건을 입력하시면 AI가 최적의 매물을 추천해 드립니다.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>지역 선택</Label>
              <div className="grid grid-cols-3 gap-2">
                <Select 
                  defaultValue={region.city} 
                  onValueChange={(value) => setRegion({...region, city: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="시" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="서울시">서울시</SelectItem>
                      <SelectItem value="경기도">경기도</SelectItem>
                      <SelectItem value="인천시">인천시</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                <Select 
                  defaultValue={region.district} 
                  onValueChange={(value) => setRegion({...region, district: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="구" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="강남구">강남구</SelectItem>
                      <SelectItem value="서초구">서초구</SelectItem>
                      <SelectItem value="송파구">송파구</SelectItem>
                      <SelectItem value="영등포구">영등포구</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                <Select 
                  defaultValue={region.neighborhood} 
                  onValueChange={(value) => setRegion({...region, neighborhood: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="동" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="삼성동">삼성동</SelectItem>
                      <SelectItem value="역삼동">역삼동</SelectItem>
                      <SelectItem value="대치동">대치동</SelectItem>
                      <SelectItem value="반포동">반포동</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>예산</Label>
              <RadioGroup 
                defaultValue={budget} 
                onValueChange={setBudget}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5억 이하" id="b1" />
                  <Label htmlFor="b1" className="font-normal">5억 이하</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="10억 이하" id="b2" />
                  <Label htmlFor="b2" className="font-normal">5억-10억</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="15억 이하" id="b3" />
                  <Label htmlFor="b3" className="font-normal">10억-15억</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="20억 이하" id="b4" />
                  <Label htmlFor="b4" className="font-normal">15억-20억</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="20억 초과" id="b5" />
                  <Label htmlFor="b5" className="font-normal">20억 초과</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>주택 유형</Label>
              <RadioGroup 
                defaultValue={propertyType} 
                onValueChange={setPropertyType}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="아파트" id="t1" />
                  <Label htmlFor="t1" className="font-normal">아파트</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="빌라" id="t2" />
                  <Label htmlFor="t2" className="font-normal">빌라</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="오피스텔" id="t3" />
                  <Label htmlFor="t3" className="font-normal">오피스텔</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>우선 조건 (중요한 항목 선택)</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="c1" 
                    checked={requirements.nearSubway}
                    onCheckedChange={(checked) => 
                      setRequirements({...requirements, nearSubway: checked === true})
                    }
                  />
                  <Label htmlFor="c1" className="font-normal text-sm">지하철역 인접</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="c2" 
                    checked={requirements.goodSchool}
                    onCheckedChange={(checked) => 
                      setRequirements({...requirements, goodSchool: checked === true})
                    }
                  />
                  <Label htmlFor="c2" className="font-normal text-sm">학군 우수</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="c3" 
                    checked={requirements.quiet}
                    onCheckedChange={(checked) => 
                      setRequirements({...requirements, quiet: checked === true})
                    }
                  />
                  <Label htmlFor="c3" className="font-normal text-sm">조용한 환경</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="c4" 
                    checked={requirements.park}
                    onCheckedChange={(checked) => 
                      setRequirements({...requirements, park: checked === true})
                    }
                  />
                  <Label htmlFor="c4" className="font-normal text-sm">공원 인접</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="c5" 
                    checked={requirements.shopping}
                    onCheckedChange={(checked) => 
                      setRequirements({...requirements, shopping: checked === true})
                    }
                  />
                  <Label htmlFor="c5" className="font-normal text-sm">쇼핑 편리</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="c6" 
                    checked={requirements.newBuilding}
                    onCheckedChange={(checked) => 
                      setRequirements({...requirements, newBuilding: checked === true})
                    }
                  />
                  <Label htmlFor="c6" className="font-normal text-sm">신축 건물</Label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAiDialogOpen(false)}
            >
              취소
            </Button>
            <Button 
              className="bg-emerald-500 hover:bg-emerald-600"
              onClick={handleAiSubmit}
            >
              추천 받기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Map;
