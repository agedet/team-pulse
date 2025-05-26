'use client'
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function InviteUserForm() {
    const [email, setEmail] = useState("");
    const [teamRole, setTeamRole] = useState<"admin" | "member">("member");
  

    const handleInvite = async () => {
        try {
            await axios.post("http://localhost:5000/admin/invite", {
                email,
                teamRole,
            });

            toast.success("User invited successfully");
            setEmail("");
        } catch (error) {
            toast.error("Failed to invite user");
        }
    };

    return (
        <div className="p-4 border rounded mb-4">
            <h3 className="text-lg font-semibold mb-2">Invite User</h3>

            <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="User Email"
                className="border px-2 py-1 mr-2"
            />

            <select
                value={teamRole}
                onChange={(e) => setTeamRole(e.target.value as "admin" | "member")}
                className="border px-2 py-1 mr-2"
            >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
            </select>

            <Button 
                onClick={handleInvite} 
                className="bg-green-500 text-white px-4 py-1 rounded"
            >
                Invite
            </Button>
        </div>
    );
}
