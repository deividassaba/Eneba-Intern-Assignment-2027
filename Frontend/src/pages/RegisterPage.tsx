import {Register } from "../api/auth";
import RegisterForm from "../components/RegisterForm";
import { useAuth } from "../context/AuthContext";
import type { RegisterRequest } from "../types";

export default function RegisterPage() {
    const {login} = useAuth();
    const onSubmit =  async (data: RegisterRequest)=>{
        await Register(data);
        await login({email: data.email, password: data.password});
    }

    return <RegisterForm onSubmit={onSubmit}/>;
}