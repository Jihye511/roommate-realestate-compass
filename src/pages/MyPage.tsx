
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCog, Heart } from 'lucide-react';
import Header from '../components/Header';

interface User {
  id: string;
  name: string;
  email: string;
  nickname: string;
  avatarUrl: string;
}

const MyPage = () => {
  const [user, setUser] = useState<User>({
    id: 'user123',
    name: '김부동',
    email: 'user@example.com',
    nickname: '부동산고수',
    avatarUrl: '',
  });

  const [editedUser, setEditedUser] = useState<User>({...user});
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({...editedUser, [name]: value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({...editedUser});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({...user});
    setIsEditing(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <Tabs defaultValue="profile" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-emerald-700">마이페이지</h1>
              <TabsList>
                <TabsTrigger value="profile">내 정보</TabsTrigger>
                <TabsTrigger value="favorites">찜한 매물</TabsTrigger>
                <TabsTrigger value="activities">나의 활동</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>내 정보 관리</CardTitle>
                  <CardDescription>계정 정보를 확인하고 수정할 수 있습니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center mb-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback className="text-xl bg-emerald-100 text-emerald-700">
                          {user.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">이름</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={editedUser.name} 
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="border-emerald-200 focus:border-emerald-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="nickname">닉네임</Label>
                        <Input 
                          id="nickname" 
                          name="nickname" 
                          value={editedUser.nickname} 
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="border-emerald-200 focus:border-emerald-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">이메일</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={editedUser.email} 
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="border-emerald-200 focus:border-emerald-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="id">아이디</Label>
                        <Input 
                          id="id" 
                          name="id" 
                          value={editedUser.id} 
                          disabled={true}
                          className="bg-gray-100"
                        />
                      </div>
                      
                      {isEditing && (
                        <div className="space-y-2">
                          <Label htmlFor="avatarUrl">프로필 이미지 URL</Label>
                          <Input 
                            id="avatarUrl" 
                            name="avatarUrl" 
                            value={editedUser.avatarUrl} 
                            onChange={handleInputChange}
                            className="border-emerald-200 focus:border-emerald-500"
                            placeholder="이미지 URL을 입력하세요"
                          />
                        </div>
                      )}
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={handleCancel}>
                        취소
                      </Button>
                      <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={handleSubmit}>
                        저장
                      </Button>
                    </>
                  ) : (
                    <Button className="bg-sky-500 hover:bg-sky-600" onClick={() => setIsEditing(true)}>
                      정보 수정
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>찜한 매물</CardTitle>
                  <CardDescription>관심있게 보신 매물 목록입니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">찜한 매물이 없습니다.</p>
                    <p className="text-gray-400 text-sm mt-2">지도에서 마음에 드는 매물을 찜해보세요!</p>
                    <Button className="mt-4 bg-emerald-500 hover:bg-emerald-600" asChild>
                      <a href="/map">지도로 이동</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities">
              <Card>
                <CardHeader>
                  <CardTitle>나의 활동</CardTitle>
                  <CardDescription>작성한 게시글과 댓글을 확인할 수 있습니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">내가 쓴 글</h3>
                      <div className="rounded-lg border border-gray-200 p-6 text-center">
                        <p className="text-gray-500">아직 작성한 글이 없습니다.</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">내가 쓴 댓글</h3>
                      <div className="rounded-lg border border-gray-200 p-6 text-center">
                        <p className="text-gray-500">아직 작성한 댓글이 없습니다.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default MyPage;
