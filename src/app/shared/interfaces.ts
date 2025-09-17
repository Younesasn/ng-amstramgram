export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
}

export interface User {
  id: number;
  email: string;
  displayName: string;
  password: string;
  role: string;
  pictures: Picture[];
  comments: Comment[];
  favourites: Picture[];
}

export interface Picture {
  id: number;
  image: string;
  description: string;
  title: string;
  createdAt: Date;
  comments: Comment[];
  author: User;
  likes: User[];
}

export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  author: User;
}
