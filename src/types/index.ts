export interface Post {
  id: string;
  authorId: string;
  title: string;
  slug: string;
  content: string;
  thumbnailUrl: string | null;
  status: "DRAFT" | "PUBLISHED";
  createdAt: string;
  updatedAt: string;
  author?: { fullName: string; avatarUrl: string | null };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: "ADMIN" | "TEACHER" | "CONTENT_CREATOR" | "STUDENT";
  avatarUrl: string | null;
  isActive: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
