export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  birthDate: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  phone: string;
  position: string;
  birthDate: string;
  message: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  position?: string;
  birthDate?: string;
  message?: string;
}