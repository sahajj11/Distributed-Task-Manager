import React, { useState } from 'react';
import api from "../../services/api.js"
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Input from '../Input.jsx';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      toast.success(`Welcome back, ${data.user.name}`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      <Input label="Email" type="email" placeholder="name@company.com" onChange={(e) => setEmail(e.target.value)} />
      <Input label="Password" type="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} />
      <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]">
        Sign In
      </button>
    </form>
  );
};