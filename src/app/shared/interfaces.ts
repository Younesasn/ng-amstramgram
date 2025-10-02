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

export interface Register {
  email: string;
  displayName: string;
  password: string;
}

export interface Picture {
  id: number;
  image: string;
  description: string;
  title: string;
  createdAt: Date;
  author: User;
  likes: User[];
  imageLink: string;
  thumbnailLink: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  author: User;
}
