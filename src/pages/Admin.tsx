
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Trash2, Edit, UserCog, Check, X, FileText } from 'lucide-react';
import Header from '../components/Header';
import { toast } from '@/components/ui/use-toast';

// Sample user data
interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  nickname: string;
  role: string;
  joinDate: string;
  residenceVerification: {
    status: 'none' | 'pending' | 'approved' | 'rejected';
    file?: string;
  };
}

const sampleUsers: User[] = [
  { 
    id: 1, 
    username: "user1", 
    name: "김민수", 
    email: "user1@example.com", 
    nickname: "부동산왕",
    role: "일반회원", 
    joinDate: "2023-01-15",
    residenceVerification: { status: 'none' }
  },
  { 
    id: 2, 
    username: "user2", 
    name: "이지은", 
    email: "user2@example.com", 
    nickname: "집을찾는중",
    role: "일반회원", 
    joinDate: "2023-02-20",
    residenceVerification: { status: 'pending', file: "residence_proof_user2.pdf" }
  },
  { 
    id: 3, 
    username: "user3", 
    name: "박준호", 
    email: "user3@example.com", 
    nickname: "전세족",
    role: "일반회원", 
    joinDate: "2023-03-05",
    residenceVerification: { status: 'approved' }
  },
  { 
    id: 4, 
    username: "admin1", 
    name: "관리자", 
    email: "admin@example.com", 
    nickname: "어드민",
    role: "관리자", 
    joinDate: "2022-12-01",
    residenceVerification: { status: 'approved' }
  },
  { 
    id: 5, 
    username: "user4", 
    name: "최유진", 
    email: "user4@example.com", 
    nickname: "월세족",
    role: "일반회원", 
    joinDate: "2023-04-12",
    residenceVerification: { status: 'rejected' }
  },
  { 
    id: 6, 
    username: "user5", 
    name: "장서연", 
    email: "user5@example.com", 
    nickname: "부동산전문가",
    role: "일반회원", 
    joinDate: "2023-05-22",
    residenceVerification: { status: 'pending', file: "residence_proof_user5.pdf" }
  },
];

// Sample post data
interface Post {
  id: number;
  title: string;
  author: string;
  category: string;
  date: string;
  comments: number;
}

const samplePosts: Post[] = [
  { id: 1, title: "강남 아파트 시세가 또 올랐네요", author: "부동산전문가", category: "시장동향", date: "2023-05-15", comments: 13 },
  { id: 2, title: "전세 계약시 주의사항 공유합니다", author: "계약달인", category: "정보공유", date: "2023-05-10", comments: 32 },
  { id: 3, title: "신혼부부 내집마련 어떻게 하셨나요?", author: "예비신랑", category: "질문", date: "2023-05-08", comments: 28 },
  { id: 4, title: "정부 부동산 정책 새로 발표됐네요", author: "정책연구가", category: "정책토론", date: "2023-05-05", comments: 45 },
  { id: 5, title: "역세권 vs 학세권 어떤 것이 더 좋을까요?", author: "초보투자자", category: "질문", date: "2023-05-03", comments: 23 },
];

const Admin = () => {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [postSearchTerm, setPostSearchTerm] = useState("");
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Filter users based on search term
  const filteredUsers = userSearchTerm
    ? users.filter(user => 
        user.username.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.nickname.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
      )
    : users;

  // Filter posts based on search term
  const filteredPosts = postSearchTerm
    ? posts.filter(post => 
        post.title.toLowerCase().includes(postSearchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(postSearchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(postSearchTerm.toLowerCase())
      )
    : posts;

  // Delete user
  const handleDeleteUser = (userId: number) => {
    const userToDelete = users.find(user => user.id === userId);
    if (userToDelete) {
      setUserToDelete(userToDelete);
      setIsDeleteConfirmOpen(true);
    }
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete.id));
      toast({
        title: "계정 삭제 완료",
        description: `${userToDelete.name}(${userToDelete.username})님의 계정이 삭제되었습니다.`,
        variant: "default",
      });
      setIsDeleteConfirmOpen(false);
      setUserToDelete(null);
    }
  };

  // Delete post
  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast({
      title: "게시글 삭제 완료",
      description: "선택한 게시글이 성공적으로 삭제되었습니다.",
      variant: "default",
    });
  };

  // Open verification dialog
  const openVerificationDialog = (user: User) => {
    setCurrentUser(user);
    setIsVerificationDialogOpen(true);
  };

  // Handle verification approval
  const handleVerificationResponse = (approved: boolean) => {
    if (!currentUser) return;
    
    setUsers(prev => prev.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          residenceVerification: {
            ...user.residenceVerification,
            status: approved ? 'approved' : 'rejected'
          }
        };
      }
      return user;
    }));

    toast({
      title: approved ? "거주지 인증 승인됨" : "거주지 인증 거부됨",
      description: `${currentUser.name}님의 거주지 인증이 ${approved ? '승인' : '거부'}되었습니다.`,
      variant: "default",
    });
    
    setIsVerificationDialogOpen(false);
    setCurrentUser(null);
  };

  // Get verification status badge
  const getVerificationStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">승인 대기중</span>;
      case 'approved':
        return <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs">승인됨</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">거부됨</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">미신청</span>;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-emerald-700">관리자 페이지</h1>
            <div className="flex items-center">
              <UserCog className="mr-2 text-emerald-600" size={24} />
              <span className="font-medium">관리자</span>
            </div>
          </div>

          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="users">회원 관리</TabsTrigger>
              <TabsTrigger value="posts">게시글 관리</TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>회원 목록</CardTitle>
                  <CardDescription>전체 회원 {users.length}명</CardDescription>
                  <div className="flex mt-4">
                    <Input 
                      placeholder="회원 검색 (이름, 아이디, 닉네임, 이메일)"
                      value={userSearchTerm}
                      onChange={(e) => setUserSearchTerm(e.target.value)}
                      className="max-w-sm" 
                    />
                    <Button variant="outline" className="ml-2">
                      <Search size={16} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>이름</TableHead>
                        <TableHead>아이디</TableHead>
                        <TableHead>닉네임</TableHead>
                        <TableHead>이메일</TableHead>
                        <TableHead>권한</TableHead>
                        <TableHead>거주지 인증</TableHead>
                        <TableHead>가입일</TableHead>
                        <TableHead>관리</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.nickname}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <span className={user.role === "관리자" ? "text-emerald-600 font-medium" : ""}>
                              {user.role}
                            </span>
                          </TableCell>
                          <TableCell>
                            {getVerificationStatusBadge(user.residenceVerification.status)}
                            {user.residenceVerification.status === 'pending' && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="ml-2 h-7 text-sky-600 hover:text-sky-700"
                                onClick={() => openVerificationDialog(user)}
                              >
                                <FileText size={14} className="mr-1" />
                                검토
                              </Button>
                            )}
                          </TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="posts">
              <Card>
                <CardHeader>
                  <CardTitle>게시글 관리</CardTitle>
                  <CardDescription>전체 게시글 {posts.length}개</CardDescription>
                  <div className="flex mt-4">
                    <Input 
                      placeholder="게시글 검색 (제목, 작성자, 카테고리)"
                      value={postSearchTerm}
                      onChange={(e) => setPostSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                    <Button variant="outline" className="ml-2">
                      <Search size={16} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead className="w-[300px]">제목</TableHead>
                        <TableHead>작성자</TableHead>
                        <TableHead>카테고리</TableHead>
                        <TableHead>작성일</TableHead>
                        <TableHead>댓글</TableHead>
                        <TableHead>관리</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>{post.id}</TableCell>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                              {post.category}
                            </span>
                          </TableCell>
                          <TableCell>{post.date}</TableCell>
                          <TableCell>{post.comments}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                onClick={() => handleDeletePost(post.id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Residence Verification Dialog */}
      <Dialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>거주지 인증 검토</DialogTitle>
            <DialogDescription>
              {currentUser?.name}님({currentUser?.username})의 거주지 인증 요청을 검토합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-md border border-gray-200">
              <FileText className="text-sky-500 mr-4" size={40} />
              <div>
                <p className="font-medium">{currentUser?.residenceVerification.file}</p>
                <p className="text-sm text-gray-500">첨부된 거주지 인증 서류</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              해당 서류를 검토한 후 승인 또는 거부 결정을 해주세요. 
            </p>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button 
              variant="outline" 
              className="bg-red-50 hover:bg-red-100 border-red-200 text-red-600"
              onClick={() => handleVerificationResponse(false)}
            >
              <X size={16} className="mr-2" />
              인증 거부
            </Button>
            <Button 
              className="bg-emerald-500 hover:bg-emerald-600" 
              onClick={() => handleVerificationResponse(true)}
            >
              <Check size={16} className="mr-2" />
              인증 승인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>계정 삭제 확인</DialogTitle>
            <DialogDescription>
              {userToDelete?.name}님({userToDelete?.username})의 계정을 삭제하시겠습니까?
              이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              취소
            </Button>
            <Button 
              variant="destructive"
              onClick={confirmDeleteUser}
            >
              <Trash2 size={16} className="mr-2" />
              계정 삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Admin;
