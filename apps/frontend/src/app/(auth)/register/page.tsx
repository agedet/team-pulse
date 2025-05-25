'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, user } = useAuth();
  const router = useRouter();

  // Redirect if user is already logged in
  if (user) {
    router.push("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    try {
      setIsSubmitting(true);
      await register(fullName, email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      // Error is already handled in the auth context with toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='min-h-screen flex items-center justify-center px-4 bg-slate-50'>
      <Card className='w-full max-w-md border-slate-200 shadow-lg'>
        <CardHeader className='space-y-1'>
          <div className='flex justify-center mb-4'>
            <div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <CardTitle className='text-2xl font-bold text-center'>
            Create Account
          </CardTitle>
          <CardDescription className='text-center'>
            Enter your details to create a TeamPulse account.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='fullName' className='text-sm font-medium'>Full Name</Label>
              <Input 
                id='fullName'
                type='text'
                placeholder='enter your full name'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

             <div className='space-y-2'>
              <Label htmlFor='email' className='text-sm font-medium'>Email</Label>
              <Input 
                id='email'
                type='email'
                placeholder='enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

             <div className='space-y-2'>
              <Label htmlFor='password' className='text-sm font-medium'>Password</Label>
              <Input 
                id="password"
                type="password"
                placeholder="enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

             <div className='space-y-2'>
              <Label htmlFor='confirmPassword' className='text-sm font-medium'>Confirm Password</Label>
              <Input 
                id="confrimPassword"
                type="password"
                placeholder="re-type your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>

          <CardFooter className='flex flex-col space-y-4 mt-8'>
            <Button 
              type='submit'
              className='w-full disabled:bg-blue-400'
              disabled={isSubmitting || !email || !fullName || !password || !confirmPassword}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-sm text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
import { useRouter } from 'next/navigation'

export default RegisterPage;