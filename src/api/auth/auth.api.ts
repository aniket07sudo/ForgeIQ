
/**
 * =========================
 * Types
 * =========================
 */

import api from "../axios";

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  email:string;
  tokenType:string;
  userId:string;
  role:string;
}

/**
 * =========================
 * Auth APIs
 * =========================
 */

export const signup = async (
  payload: SignupRequest
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>(
    "/auth/signup",
    payload
  );

  return data;
};

export const signin = async (
  payload: LoginRequest
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>(
    "/auth/login",
    payload
  );

  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const refreshToken = async (): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>(
    "/auth/refresh"
  );

  return data;
};