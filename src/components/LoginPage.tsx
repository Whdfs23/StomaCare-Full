import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ChevronRight, Github, Linkedin, Facebook, Eye, EyeOff } from 'lucide-react';
import { mockService } from '../services/mockService';
import { UserProfile } from '../types';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

interface LoginPageProps {
  onLogin: (user: UserProfile) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      let user;
      if (isRegister) {
        user = await mockService.register(username, email, password);
      } else {
        user = await mockService.login(email, password);
      }
      onLogin(user);
      navigate('/diary');
    } catch (error: any) {
      alert(error.message || 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#e2e2e2] to-[#c9ffd6] p-4 font-poppins">
      <div className={clsx("auth-container", isRegister && "active")}>
        
        {/* Login Form */}
        <div className="form-box login">
          <form onSubmit={handleAuth} className="w-full">
            <h1 className="text-4xl font-bold mb-8">Login</h1>
            <div className="relative my-8">
              <input 
                type="email" 
                placeholder="Email" 
                required 
                className="w-full py-3 px-5 pr-12 bg-[#eee] rounded-lg border-none outline-none text-base font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-[#888] w-5 h-5" />
            </div>
            <div className="relative my-8">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                required 
                className="w-full py-3 px-5 pr-12 bg-[#eee] rounded-lg border-none outline-none text-base font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#555] focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="mb-4 text-right">
              <a href="#" className="text-sm text-[#333] no-underline">Forgot Password?</a>
            </div>
            <button type="submit" className="w-full h-12 bg-stoma-accent rounded-lg shadow-md text-white font-semibold text-lg btn-hover">
              {isLoading ? "Loading..." : "Login"}
            </button>
            <p className="text-sm my-4">or login with social media platforms</p>
            <div className="flex justify-center gap-2">
              <SocialIcon icon={<Facebook className="w-4 h-4" />} />
              <SocialIcon icon={<Github className="w-4 h-4" />} />
              <SocialIcon icon={<Linkedin className="w-4 h-4" />} />
            </div>
          </form>
        </div>

        {/* Register Form */}
        <div className="form-box register">
          <form onSubmit={handleAuth} className="w-full">
            <h1 className="text-4xl font-bold mb-8">Registration</h1>
            <div className="relative my-8">
              <input 
                type="text" 
                placeholder="Username" 
                required 
                className="w-full py-3 px-5 pr-12 bg-[#eee] rounded-lg border-none outline-none text-base font-medium"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <User className="absolute right-5 top-1/2 -translate-y-1/2 text-[#888] w-5 h-5" />
            </div>
            <div className="relative my-8">
              <input 
                type="email" 
                placeholder="E-mail" 
                required 
                className="w-full py-3 px-5 pr-12 bg-[#eee] rounded-lg border-none outline-none text-base font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-[#888] w-5 h-5" />
            </div>
            <div className="relative my-8">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                required 
                className="w-full py-3 px-5 pr-12 bg-[#eee] rounded-lg border-none outline-none text-base font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#555] focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <button type="submit" className="w-full h-12 bg-stoma-accent rounded-lg shadow-md text-white font-semibold text-lg btn-hover">
              {isLoading ? "Loading..." : "Register"}
            </button>
            <p className="text-sm my-4">or register with social media platforms</p>
            <div className="flex justify-center gap-2">
              <SocialIcon icon={<Facebook className="w-4 h-4" />} />
              <SocialIcon icon={<Github className="w-4 h-4" />} />
              <SocialIcon icon={<Linkedin className="w-4 h-4" />} />
            </div>
          </form>
        </div>

        {/* Toggle Panels */}
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1 className="text-3xl font-bold mb-4">Hello, Welcome!</h1>
            <p className="text-sm mb-6">Don't have an account?</p>
            <button 
              onClick={() => setIsRegister(true)}
              className="w-40 h-11 bg-transparent border-2 border-white rounded-lg text-white font-semibold btn-hover"
            >
              Register
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-sm mb-6">Already have an account?</p>
            <button 
              onClick={() => setIsRegister(false)}
              className="w-40 h-11 bg-transparent border-2 border-white rounded-lg text-white font-semibold btn-hover"
            >
              Login
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="inline-flex p-2 border-2 border-[#ccc] rounded-full text-[#333] hover:bg-gray-100 transition-colors">
      {icon}
    </a>
  );
}
