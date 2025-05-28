'use client'

import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import axios from 'axios'
import { useRouter } from "next/navigation";

interface User {
  id: string; 
  fullName?: string;
  email: string;
  otp: string;
  password: string;
  teamRole: "admin" | "member";
  teamId?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  verify: (email: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
}

export const AuthContext = createContext<AuthContextType> ({
    user: null,
    isLoading: true,
    login: async () => {},
    register: async () => {},
    verify: async () => {},
    logout: async () => {},
    token: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);
    const router = useRouter();

    // Check for existing session on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken as any);
            setUser(JSON.parse(storedUser));
        }

        setIsLoading(false);
    }, []);


    const login = async (email: string, password: string) => {
        const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

        try {
            setIsLoading(true);
        
            const res = await axios.post(`${API_URL}/auth/login`, { 
                email, 
                password
            });
            const { token, user } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user',JSON.stringify(user));
            setToken(token)
            setUser(user);
            
            toast.success("Login successful");

            if (res.data.user.teamRole === 'admin') {
                router.push('/dashboard/admin');
            } else if (res.data.user.teamRole === 'member') {
                router.push('/dashboard');
            } else {
                router.push('/unauthorized');
            }

            
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed. Please check your credentials.");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (fullName: string, email: string, password: string) => {
        const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

        try {
            setIsLoading(true);
            
            await axios.post(`${API_URL}/auth/register`, {
                email,
                password,
                fullName,
                teamRole: 'member'
            });

            toast.success("Registration successful! Check your email for a verification code.");

            router.push('/verify?email=' + email);
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("Registration failed. Please try again.");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const verify = async (email: string, otp: string) => {
        const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

        try {
            setIsLoading(true);
            
            const res = await axios.post(`${API_URL}/auth/verify`, {
                email,
                otp,
            });

            const { token, user } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user))
            setToken(token);
            setUser(user);

            if (res.data.user.teamRole === 'admin') {
                router.push('/dashboard/admin');
            } else if (res.data.user.teamRole === 'member') {
                router.push('/dashboard');
            } else {
                router.push('/unauthorized')
            } 
        
            toast.success("Verification successful");
        } catch (error) {
            console.error("Verification error:", error);
            toast.error("Verification failed. Please try again.");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = useCallback( async () => {
        try {
            setIsLoading(true);
        
            localStorage.removeItem("token");
            localStorage.removeItem("user")
            setToken(null);
            setUser(null);

            router.push("/login");

            toast.success("Logged out successfully");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Logout failed");
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, verify, logout, token}}>
            {children}
        </AuthContext.Provider>
    )
}