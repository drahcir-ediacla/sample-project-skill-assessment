import { useState, useEffect, useMemo } from "react";
import axiosHandler from "../utils/axiosHandler";

interface User {
    message: string; // Matches "Authorized"
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    type: "Writer" | "Editor";
    status: "Active" | "Inactive";
}

const useAuthentication = () => {
    const [authUser, setAuthUser] = useState<User | null>(null); // Define the state type

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosHandler.get<User>("/api/auth/check-auth"); // Response is of type User
                if (response?.status === 200) {
                    setAuthUser(response.data); // Assign response.data to authUser
                } else {
                    console.warn(`Unexpected response status: ${response?.status}`);
                    setAuthUser(null); // Reset state if the status is not OK
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setAuthUser(null); // Reset state in case of error
            }
        };

        fetchUserData();
    }, []);

    // Memoize user to maintain a stable reference
    const memoizedUser = useMemo(() => authUser, [authUser]);

    return { user: memoizedUser };
};

export default useAuthentication;
