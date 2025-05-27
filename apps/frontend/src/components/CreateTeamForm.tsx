'use client'

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CreateTeamForm() {
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.BASE_URL || 'http://localhost:5000';

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamName) {
      setError('Team name is required.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      await axios.post(`${API_URL}/admin/create-team`, { teamName });
      toast.success("Team created successfully");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create team. Please try again');
      }

      toast.error("Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded mb-4">
      <form onSubmit={handleCreate}>
        <Card className="w-full max-w-md border-slate-200 ">
          <CardHeader className='space-y-1'>
            <CardTitle className="text-lg font-semibold mb-2">Create Team</CardTitle>
          
            {/* Error Message */}
            {error && 
              <p className="text-red-500 text-center mb-4">
                {error}
              </p>
            }
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center gap-2">
              <div className="grid gap-2">
                <Input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Team Name"
                  className="w-full border px-3 py-2"
                />
              </div>

              <Button 
                onClick={handleCreate} 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-500"
                disabled={loading || !teamName}
              >
                {loading ? 'Creating team...' : 'Create Team '}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
