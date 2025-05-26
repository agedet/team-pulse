'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import axios from 'axios';

export default function StatusForm() {
  const [status, setStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        setIsUpdating(true);

        const res = await axios.post('/api/status');
        const data = res.data;

        setStatus(data.status);

        toast.success('Status updated successfully');
    } catch (error) {
        toast.error('Failed to update status');
        setIsUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">      
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
            disabled={isUpdating || !status}
        >
            {isUpdating ? "Updating Status..." : "Update status"}
        </Button>
    </form>
  );
}