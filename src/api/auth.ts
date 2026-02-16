import axios from 'axios'
import type { LoginCredentials, LoginResponse } from '@/types/auth'

const API_URL = 'https://dummyjson.com'

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username: credentials.username,
      password: credentials.password,
      expiresInMins: 60,
    })
    return response.data
  }
}