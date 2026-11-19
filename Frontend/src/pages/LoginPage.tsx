import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";
import type { LoginRequest } from "../types";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {  
  const { login } = useAuth()
  const navigate = useNavigate();

    const onSubmit =  async (data: LoginRequest)=>{
      try{ 
        await login(data);
        navigate("/");
      // 
      }
      catch (error) {
      console.error("Login failed:", error);
      }
    }

    return <LoginForm onSubmit={onSubmit}/>;
}