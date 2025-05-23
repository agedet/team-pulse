'use client'

import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import axios from 'axios'

interface User {
  id: string; 
  fullName?: string;
  email: string;
  password: string;
  role: "admin" | "member";
  teamId?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}


export const AuthContext = createContext<AuthContextType> ({
    user: null,
    isLoading: true,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
        
            const res = await axios.post(`${API_URL}/auth/login`, { email, password});
            const { token, user } = res.data;

            localStorage.setItem('token', JSON.stringify(token));
            setUser(user);

            // const isAdmin = email.includes("admin");
            // const mockUser: User = {
            //     id: Math.random().toString(36).substring(7),
            //     role: isAdmin ? "admin" : "member",
            //     email: email.split("@")[0],
            //     password,
            // };
        
            // localStorage.setItem("teamPulseUser", JSON.stringify(mockUser));
            // setUser(mockUser);

            toast.success("Login successful");
        
            // return mockUser;
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
            
            const res = await axios.post(`${API_URL}/auth/register`, {
                email,
                password,
                fullName,
                role: 'member',
            });

            const { token, user } = res.data;

            localStorage.setItem('token', JSON.stringify(token));
            setUser(user);
        
            // // Mock user creation - in a real app, this would be done by Supabase
            // const mockUser: User = {
            //     id: Math.random().toString(36).substring(7),
            //     fullName,
            //     role: "member",  // New users are members by default
            //     email: email.split("@")[0],
            //     password,
            // };
        
            // localStorage.setItem("teamPulseUser", JSON.stringify(mockUser));
            // setUser(mockUser);
            toast.success("Registration successful");
            
            // return mockUser;
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("Registration failed. Please try again.");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
        
            // Clear local storage
            localStorage.removeItem("token");
            setUser(null);
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
        <AuthContext.Provider value={{ user, isLoading, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}