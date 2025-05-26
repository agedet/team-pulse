import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

export function VerifyForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const { verify, user } = useAuth();

  if (user) {
    router.push("/dashboard");
    return null;
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required for verification.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await verify(email, otp);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("min-h-screen flex items-center justify-center px-4 bg-slate-50 flex flex-col gap-6", className)} {...props}>
      <Card className="w-full max-w-md border-slate-200 shadow-lg">
        <CardHeader className='space-y-1'>
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">TeamPulse</CardTitle>
          <CardDescription className="text-center">Enter the verification code sent to <strong>{email}</strong>.</CardDescription>
          {/* Error Message */}
          {error && 
            <p className="text-red-500 text-center mb-4">
              {error}
            </p>
          }
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">
                    Token
                </Label>
                
                <Input
                    value={otp}
                    placeholder="enter verification token"
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border rounded p-2 mb-4"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}