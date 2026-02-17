import React, { useState } from 'react';
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import { Zap, Layout, Shield } from 'lucide-react';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#090a0c] text-white flex">
      {/* Left Side: Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-20 bg-[#0f1115] border-r border-gray-800 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-11 w-11 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="text-white font-bold text-2xl">W</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">WorkSync</span>
          </div>

          <h1 className="text-5xl font-extrabold leading-tight mb-8">
            Manage projects <br />
            <span className="text-blue-500 text-glow">without the chaos.</span>
          </h1>

          <div className="space-y-8">
            <Feature title="Real-time Collaboration" icon={<Zap size={20} className="text-yellow-500" />} desc="Sync tasks instantly across your entire team." />
            <Feature title="Visual Workflows" icon={<Layout size={20} className="text-blue-500" />} desc="Clean Kanban boards designed for focus." />
            <Feature title="Secure by Design" icon={<Shield size={20} className="text-green-500" />} desc="Enterprise-grade JWT authentication." />
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-md">
          <div className="bg-[#12141a] border border-gray-800 p-10 rounded-3xl shadow-2xl">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-3">
                {isLogin ? 'Welcome back' : 'Get started'}
              </h2>
              <p className="text-gray-500">
                {isLogin ? "New to WorkSync?" : "Already have an account?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-blue-500 hover:text-blue-400 font-medium transition-colors"
                >
                  {isLogin ? 'Create an account' : 'Sign in instead'}
                </button>
              </p>
            </div>

            {isLogin ? <Login /> : <Register onSuccess={() => setIsLogin(true)} />}
          </div>
          
          <p className="mt-8 text-center text-gray-600 text-sm">
            By continuing, you agree to our Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ title, desc, icon }) => (
  <div className="flex gap-5">
    <div className="h-10 w-10 shrink-0 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-semibold text-gray-200">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);