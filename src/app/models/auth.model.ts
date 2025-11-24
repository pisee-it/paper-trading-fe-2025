// Định nghĩa kiểu dữ liệu khớp chính xác với JSON từ Backend.
// Check các interface trùng khớp với các class trong package dto của backend.

export interface RegisterRequest{
    username: string;
    email: string;
    password: string;
    fullName: string;
}

export interface LoginRequest{
    username: string;
    password: string;
}

// JwtResponse in Backend
export interface AuthResponse{
    token: string;
    type: string;
    id: number;
    username: string;
    email: string;
    role: string;
}