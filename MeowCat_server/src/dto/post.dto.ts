export default interface PostDto {
  id: number;
  text: string;
  user: {
    id: number;
    username: string;
    avatar: string;
  };
  createdAt: Date;
  likes: number;
  likedByMe: boolean;
}
