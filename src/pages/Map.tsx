
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Map as MapIcon, Calculator, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Property {
  id: number;
  name: string;
  address: string;
  price: string;
  size: string;
  type: string;
  imageUrl: string;
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
  const [showDetails, setShowDetails] = useState(false);

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
    setShowDetails(true);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-16 bg-gray-900 flex flex-col items-center py-6">
        <Link to="/" className="mb-8">
          <Home size={24} className="text-white" />
        </Link>
        <Link to="/map" className="mb-8">
          <MapIcon size={24} className="text-blue-400" />
        </Link>
        <Link to="/calculator" className="mb-8">
          <Calculator size={24} className="text-white" />
        </Link>
        <Link to="/community" className="mb-8">
          <Users size={24} className="text-white" />
        </Link>
      </div>

      {/* Search panel */}
      <div className="w-80 bg-white border-r overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">검색</h2>
          
          {/* Address search */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">지역으로 검색</h3>
            <div className="space-y-2">
              <Select onValueChange={setCity}>
                <SelectTrigger>
                  <SelectValue placeholder="시 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seoul">서울특별시</SelectItem>
                  <SelectItem value="busan">부산광역시</SelectItem>
                  <SelectItem value="incheon">인천광역시</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder="구 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gangnam">강남구</SelectItem>
                  <SelectItem value="seocho">서초구</SelectItem>
                  <SelectItem value="songpa">송파구</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setDong}>
                <SelectTrigger>
                  <SelectValue placeholder="동 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apgujeong">압구정동</SelectItem>
                  <SelectItem value="cheongdam">청담동</SelectItem>
                  <SelectItem value="samseong">삼성동</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleAddressSearch} className="w-full">검색</Button>
            </div>
          </div>
          
          {/* Apartment search */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">아파트로 검색</h3>
            <div className="flex space-x-2">
              <Input
                value={searchApartment}
                onChange={(e) => setSearchApartment(e.target.value)}
                placeholder="아파트 이름을 입력하세요"
              />
              <Button onClick={handleApartmentSearch}>검색</Button>
            </div>
          </div>

          {/* Search results */}
          <div>
            <h3 className="font-medium mb-2">검색 결과</h3>
            <div className="space-y-4">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="flex border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => handlePropertyClick(property)}
                >
                  <img
                    src={property.imageUrl}
                    alt={property.name}
                    className="w-16 h-16 rounded object-cover mr-3"
                  />
                  <div>
                    <h4 className="font-medium">{property.name}</h4>
                    <p className="text-sm text-gray-600">{property.address}</p>
                    <p className="text-sm font-semibold text-blue-600">{property.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map area */}
      <div className="flex-1 relative">
        <img 
          src="https://via.placeholder.com/1600x900?text=Map+Area" 
          alt="Map" 
          className="w-full h-full object-cover"
        />
        
        {/* User profile button */}
        <div className="absolute top-4 right-4">
          <Button variant="outline" className="rounded-full w-10 h-10 p-0 bg-white">
            <span className="text-lg">👤</span>
          </Button>
        </div>
        
        {/* AI recommendation button */}
        <div className="absolute bottom-6 right-6">
          <Button className="rounded-full h-14 w-14 flex items-center justify-center bg-blue-600 hover:bg-blue-700">
            <span className="text-lg">AI</span>
          </Button>
        </div>
      </div>

      {/* Property details dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedProperty && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProperty.name}</DialogTitle>
                <DialogDescription>{selectedProperty.address}</DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div>
                  <img 
                    src="https://via.placeholder.com/400x300?text=Property+Image" 
                    alt={selectedProperty.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  
                  <div className="mt-4 space-y-2">
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
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">시세 그래프</h3>
                    <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
                      시세 그래프 영역
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">거주자 리뷰</h3>
                    <div className="space-y-2">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm">
                          "교통이 편리하고 주변 편의시설이 잘 갖춰져 있어요."
                        </p>
                        <p className="text-xs text-gray-500 mt-1">김** | 2023.05.12</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm">
                          "층간소음이 조금 있지만 전반적으로 만족스러워요."
                        </p>
                        <p className="text-xs text-gray-500 mt-1">이** | 2023.04.23</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Map;
