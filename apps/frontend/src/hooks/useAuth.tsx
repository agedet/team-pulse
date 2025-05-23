import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"


export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("use Auth must be used with an authProvider");
    }

    return context;
}