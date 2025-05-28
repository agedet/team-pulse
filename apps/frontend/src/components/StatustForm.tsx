'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

export default function StatusForm() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { token, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!status) {
      toast.error('Please select a status');
      return;
    }
    
    const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

    setLoading(true);
    setError('');

    try {
        await axios.post(`${API_URL}/team/status`, 
            {status},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        toast.success('Status updated successfully');
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Failed to update status. Please try again');
        }

        toast.error('Failed to update status');
        
    } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">  
        <Card className="w-full shadow-none py-0 px-0 rounded-none bg-transparent border-0 space-y-0">
            <CardHeader className='py-0 px-0'>
                <CardTitle className="text-lg font-semibold">Status Update</CardTitle>
            
                {/* Error Message */}
                {error && 
                    <p className="text-red-500 text-center mb-4">
                        {error}
                    </p>
                }
            </CardHeader>
            <CardContent className='px-0'>
                <div className="flex justify-between items-center gap-2">
                    <div className="flex gap-2">
                        <Select
                            value={status}
                            name='status'
                            onValueChange={setStatus}
                        >
                            <SelectTrigger 
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <SelectValue placeholder="set availability" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="onleave">On Leave</SelectItem>
                                <SelectItem value="working">Working</SelectItem>
                                <SelectItem value="blocked">Blocked</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button 
                        type="submit" 
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-500"
                        disabled={loading || !status}
                    >
                        {loading ? "Updating..." : "Update"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    </form>
  );
}