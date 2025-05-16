
import React, { useState } from 'react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Search } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  comments: number;
  category: string;
}

const samplePosts: Post[] = [
  {
    id: 1,
    title: "강남 아파트 시세가 또 올랐네요",
    content: "최근 강남 지역 아파트들이 3개월 만에 10% 상승했습니다. 어떻게 생각하시나요?",
    author: "부동산전문가",
    date: "2023-05-15",
    comments: 13,
    category: "시장동향"
  },
  {
    id: 2,
    title: "전세 계약시 주의사항 공유합니다",
    content: "최근 전세 사기가 많아지고 있어 제가 알고 있는 주의사항을 공유합니다...",
    author: "계약달인",
    date: "2023-05-10",
    comments: 32,
    category: "정보공유"
  },
  {
    id: 3,
    title: "신혼부부 내집마련 어떻게 하셨나요?",
    content: "곧 결혼을 앞두고 있는데 내집마련 어떻게 준비하셨는지 경험 공유 부탁드려요.",
    author: "예비신랑",
    date: "2023-05-08",
    comments: 28,
    category: "질문"
  },
  {
    id: 4,
    title: "정부 부동산 정책 새로 발표됐네요",
    content: "오늘 발표된 정부의 부동산 정책에 대해 논의해봤으면 합니다.",
    author: "정책연구가",
    date: "2023-05-05",
    comments: 45,
    category: "정책토론"
  },
  {
    id: 5,
    title: "역세권 vs 학세권 어떤 것이 더 좋을까요?",
    content: "투자 목적으로 매물을 알아보고 있는데 역세권과 학세권 중 어떤 것이 더 좋을지 고민입니다.",
    author: "초보투자자",
    date: "2023-05-03",
    comments: 23,
    category: "질문"
  },
  {
    id: 6,
    title: "리모델링 견적 공유 및 팁",
    content: "최근 아파트 리모델링을 마쳤습니다. 견적과 진행 과정에서 알게 된 팁을 공유합니다.",
    author: "인테리어고수",
    date: "2023-04-28",
    comments: 31,
    category: "정보공유"
  }
];

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '정보공유'
  });

  // 카테고리로 게시글 필터링
  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(post => post.category === activeCategory);

  // 검색어로 게시글 필터링
  const searchedPosts = searchTerm
    ? filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredPosts;

  // 게시글 상세보기
  const handleViewPost = (post: Post) => {
    setSelectedPost(post);
    setIsViewModalOpen(true);
  };

  // 검색 수행
  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // 검색 로직은 실시간으로 이미 수행중이지만 실제 앱에서는 여기서 API 호출을 할 수 있음
  };

  // 새 게시글 작성
  const handleWritePost = () => {
    setIsWriteModalOpen(true);
  };

  // 게시글 저장
  const handleSavePost = () => {
    if (!newPost.title || !newPost.content) return;
    
    const newPostObj: Post = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: "현재사용자",
      date: new Date().toISOString().split('T')[0],
      comments: 0,
      category: newPost.category
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost({ title: '', content: '', category: '정보공유' });
    setIsWriteModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen community-bg pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">부동산 커뮤니티</h1>
            <div className="flex flex-col w-full md:w-auto gap-2">
              <div className="flex space-x-2 w-full">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="검색어를 입력하세요"
                  className="w-full md:w-64"
                />
                <Button onClick={handleSearch} className="bg-sky-500 hover:bg-sky-600">
                  <Search size={18} />
                  <span className="ml-1">검색</span>
                </Button>
              </div>
              <Button 
                onClick={handleWritePost} 
                className="w-full md:w-[calc(100%+48px)] bg-emerald-500 hover:bg-emerald-600"
              >
                글쓰기
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="시장동향">시장동향</TabsTrigger>
              <TabsTrigger value="정보공유">정보공유</TabsTrigger>
              <TabsTrigger value="질문">질문</TabsTrigger>
              <TabsTrigger value="정책토론">정책토론</TabsTrigger>
            </TabsList>

            <TabsContent value={activeCategory}>
              <div className="space-y-4">
                {searchedPosts.length > 0 ? (
                  searchedPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-lg shadow p-5 cursor-pointer hover:shadow-md transition"
                      onClick={() => handleViewPost(post)}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-medium mb-2">{post.title}</h3>
                        <span className="text-sm px-2 py-1 bg-gray-100 rounded-full">{post.category}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.content}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <div>
                          <span>{post.author}</span>
                          <span className="mx-2">•</span>
                          <span>{post.date}</span>
                        </div>
                        <div>
                          <span>💬 {post.comments}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <p>검색 결과가 없습니다.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* 게시글 상세보기 모달 */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedPost.title}</DialogTitle>
                <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                  <div>
                    <span>{selectedPost.author}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedPost.date}</span>
                    <span className="mx-2">•</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full">{selectedPost.category}</span>
                  </div>
                  <div>
                    <span>💬 {selectedPost.comments}</span>
                  </div>
                </div>
              </DialogHeader>
              <div className="py-4 border-t border-b">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedPost.content}</p>
              </div>
              <div className="pt-4">
                <h4 className="font-medium mb-2">댓글</h4>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between">
                      <span className="font-medium">댓글작성자</span>
                      <span className="text-sm text-gray-500">2023-05-16</span>
                    </div>
                    <p className="text-gray-700 text-sm mt-1">정말 도움이 되는 내용이네요! 감사합니다.</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between">
                      <span className="font-medium">또다른댓글작성자</span>
                      <span className="text-sm text-gray-500">2023-05-15</span>
                    </div>
                    <p className="text-gray-700 text-sm mt-1">저도 비슷한 경험이 있어요. 좋은 정보 공유 감사합니다.</p>
                  </div>
                </div>
                <div className="flex mt-4">
                  <Input placeholder="댓글을 입력하세요..." />
                  <Button className="ml-2">등록</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 게시글 작성 모달 */}
      <Dialog open={isWriteModalOpen} onOpenChange={setIsWriteModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>새 게시글 작성</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                카테고리
              </label>
              <select 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newPost.category}
                onChange={(e) => setNewPost({...newPost, category: e.target.value})}
              >
                <option value="시장동향">시장동향</option>
                <option value="정보공유">정보공유</option>
                <option value="질문">질문</option>
                <option value="정책토론">정책토론</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                제목
              </label>
              <Input
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                placeholder="제목을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                내용
              </label>
              <Textarea
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                placeholder="내용을 입력하세요"
                className="min-h-[200px]"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsWriteModalOpen(false)}>취소</Button>
            <Button onClick={handleSavePost} className="bg-emerald-500 hover:bg-emerald-600">등록하기</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Community;
