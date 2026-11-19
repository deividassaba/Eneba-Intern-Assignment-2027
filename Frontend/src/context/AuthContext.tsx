import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";

import type { AuthContextType, LoginRequest } from "../types";
import { ApiLoginRequest } from "../api/auth";
// import { GetCurrentUser } from "../api/user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const logout = () => {
        setToken(null);
        setEmail(null);
        localStorage.removeItem("token");
        localStorage.removeItem("email");
    };
    const login = async (data : LoginRequest) => {
        const res = await ApiLoginRequest(data);
        localStorage.setItem("email", res.email);
        localStorage.setItem("token", res.token);
        setToken(res.token);
        setEmail(res.email);
    };
    useEffect(() => {
        setToken(localStorage.getItem("token"));
        setEmail(localStorage.getItem("email"));
        // const initializeAuth = async () => {
        //     await refreshUser();
        setLoading(false);
        // };

        // initializeAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                email,
                loading,
                logout,
                login,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}