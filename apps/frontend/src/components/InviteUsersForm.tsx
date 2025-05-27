'use client'

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function InviteUserForm() {
    const [email, setEmail] = useState("");
    const [teamRole, setTeamRole] = useState("member");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_URL = process.env.BASE_URL || 'http://localhost:5000';
  
    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setLoading(true);
        setError('');

        try {
            await axios.post(`${API_URL}/admin/invite`, {
                email,
                teamRole,
            });

            toast.success("User invited successfully");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to invite user. Please try again');
            }

            toast.error("Failed to invite user");
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 rounded mb-4">
            <Card className="w-full max-w-md border-slate-200">
                <CardHeader className='space-y-1'>
                    <CardTitle className="text-lg font-semibold mb-2">Invite User</CardTitle>
                
                {/* Error Message */}
                {error && 
                    <p className="text-red-500 text-center mb-4">
                        {error}
                    </p>
                }
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex gap-2">
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="User Email"
                                className="border px-2 py-1 mr-2"
                            />

                            <Select
                                value={teamRole} 
                                onValueChange={setTeamRole}
                            >
                                <SelectTrigger 
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                >
                                    <SelectValue placeholder="set team role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="member">Member</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                   
                        <Button 
                            type="submit"
                            onClick={handleInvite} 
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-500"
                            disabled={loading || !email || !teamRole}
                        >
                            {loading ? 'Inviting user...' : 'Invite User'}
                        </Button> 
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
