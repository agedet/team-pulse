'use client'

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "./ui/input";

export function CreateTeamForm() {
  const [teamName, setTeamName] = useState("");

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:4000/admin/create-team", { teamName });
      toast.success("Team created successfully");
      setTeamName("");
    } catch (error) {
      toast.error("Failed to create team");
    }
  };

  return (
    <div className="p-4 border rounded mb-4">
        <h3 className="text-lg font-semibold mb-2">Create Team</h3>
        <Input
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Team Name"
            className="border px-2 py-1 mr-2"
        />
        <button 
            onClick={handleCreate} 
            className="bg-blue-500 text-white px-4 py-1 rounded"
        >
            Create
        </button>
    </div>
  );
}
