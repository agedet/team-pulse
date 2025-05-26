'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StatusForm() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const API_URL = process.env.BASE_URL || 'http://localhost:5000';

    setLoading(true);
    setError('');

    try {
        const res = await axios.post(`${API_URL}/status`);
        const data = res.data;

        setStatus(data.status);

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
        <Card className="w-full max-w-md border-slate-200 shadow-lg">
            <CardHeader className='space-y-1'>
                <CardTitle className="text-lg font-semibold mb-2">Status</CardTitle>
            
                {/* Error Message */}
                {error && 
                    <p className="text-red-500 text-center mb-4">
                        {error}
                    </p>
                }
            </CardHeader>
          <CardContent>
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

                <Button 
                    type="submit" 
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-500"
                    disabled={loading || !status}
                >
                    {loading ? "Updating Status..." : "Update status"}
                </Button>
            </CardContent>
        </Card>
    </form>
  );
}