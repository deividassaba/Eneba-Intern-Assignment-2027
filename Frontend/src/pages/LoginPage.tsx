import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";
import { useMessage } from "../context/MessageContext";
import type { LoginRequest } from "../types";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {  
  const { login } = useAuth();
  const { showError} = useMessage();
  const navigate = useNavigate();

    const onSubmit =  async (data: LoginRequest)=>{
      try{ 
        await login(data);
        navigate("/");
      }
      catch (err) {
        showError(err instanceof Error ? err.message : "Login failed.")
      }
    }

    return <LoginForm onSubmit={onSubmit}/>;
}