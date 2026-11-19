import {Register } from "../api/auth";
import RegisterForm from "../components/RegisterForm";
import { useAuth } from "../context/AuthContext";
import { useMessage } from "../context/MessageContext";
import type { RegisterRequest } from "../types";

export default function RegisterPage() {
    const {login} = useAuth();
    const {showError} = useMessage();
    const onSubmit =  async (data: RegisterRequest)=>{
        try{
            await Register(data);
            await login({email: data.email, password: data.password});
        }
        catch(err){
            showError(err instanceof Error?err.message:"Error")
        }
    }

    return <RegisterForm onSubmit={onSubmit}/>;
}