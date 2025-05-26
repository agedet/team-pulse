'use client'

import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import axios from 'axios'
import { redirect, useRouter } from "next/navigation";

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
}

export const AuthContext = createContext<AuthContextType> ({
    user: null,
    isLoading: true,
    login: async () => {},
    register: async () => {},
    verify: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const API_URL = process.env.BASE_URL || 'http://localhost:5000';

    // Check for existing session on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoading(false);
            return;
        }

        axios.get(`${API_URL}/auth/me`, {
            headers: {Authorization: `Bearer ${token}`},
        })
        .then((res) => setUser(res.data))
        .catch(() => logout())
        .finally(() => setIsLoading(false));
    }, [API_URL]);


    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
        
            const res = await axios.post(`${API_URL}/auth/login`, { 
                email, 
                password
            });
            const { token, user } = res.data;

            localStorage.setItem('token', token);
            setUser(user);

            if (res.data.user.teamRole === 'admin') {
                router.push('/dashboard/admin');
            } else if (res.data.user.teamRole === 'member') {
                router.push('/dashboard');
            } else {
                router.push('/unauthorized');
            }
            
            console.log(JSON.stringify(user));

            toast.success("Login successful");
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed. Please check your credentials.");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (fullName: string, email: string, password: string) => {
        try {
            setIsLoading(true);
            
            await axios.post(`${API_URL}/auth/register`, {
                email,
                password,
                fullName,
                teamRole: 'member'
            });

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
        try {
            setIsLoading(true);
            
            const res = await axios.post(`${API_URL}/auth/verify`, {
                email,
                otp,
            });

            const { token, user } = res.data;

            localStorage.setItem('token', token);
            setUser(user);

            if (res.data.user.teamRole === 'admin') {
                router.push('/dashboard/admin');
            } else if (res.data.user.teamRole === 'member') {
                router.push('/dashboard');
            } else {
                router.push('/unauthorized')
            } 

            console.log(JSON.stringify(token));
            
            console.log(JSON.stringify(user));
        
            toast.success("Verification successful");
        } catch (error) {
            console.error("Verification error:", error);
            toast.error("Verification failed. Please try again.");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
        
            localStorage.removeItem("token");
            setUser(null);
            router.push("/login");
            toast.success("Logged out successfully");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Logout failed");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, verify, logout}}>
            {children}
        </AuthContext.Provider>
    )
}