import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Accessibility, ArrowRight, Github, Chrome } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 p-6 animate-in fade-in duration-700">
      <div className="w-full max-w-xl bg-white rounded-[3.5rem] shadow-2xl border-2 border-border p-8 md:p-16 space-y-10 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-8 text-primary/5 hidden md:block">
            <Accessibility size={200} className="rotate-12 group-hover:rotate-0 transition-transform duration-700" />
         </div>
         
         <div className="text-center space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
               <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-black italic">S</div>
               <span className="text-2xl font-black text-primary italic">SalamaHub</span>
            </Link>
            <h1 className="text-4xl font-black text-slate-900 leading-tight">Welcome Back</h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Log in to your safe, private SRHR platform.
            </p>
         </div>

         <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
               <div className="relative group/field">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-primary transition-colors" size={20} />
                  <input 
                    type="email" 
                    placeholder="Email address"
                    required
                    className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-border bg-slate-50/50 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:font-bold"
                  />
               </div>
               <div className="relative group/field">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-primary transition-colors" size={20} />
                  <input 
                    type="password" 
                    placeholder="Password"
                    required
                    className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-border bg-slate-50/50 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:font-bold"
                  />
               </div>
            </div>

            <div className="flex items-center justify-between px-2">
               <label className="flex items-center gap-2 text-sm font-bold text-slate-600 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-2 border-border text-primary focus:ring-primary" />
                  Remember me
               </label>
               <a href="#" className="text-sm font-black text-primary hover:underline">Forgot password?</a>
            </div>

            <button type="submit" className="w-full btn btn-primary h-14 text-lg rounded-[2rem] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
               Log In <ArrowRight className="ml-2" size={20} />
            </button>
         </form>

         <div className="relative pt-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
               <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm font-black uppercase tracking-widest">
               <span className="bg-white px-4 text-slate-400">Or continue with</span>
            </div>
         </div>

         <div className="grid grid-cols-1 gap-4">
            <button className="h-14 rounded-2xl border-2 border-border bg-white flex items-center justify-center gap-3 font-bold hover:bg-slate-50 transition-colors">
               <Chrome size={20} className="text-red-500" />
               Google Account
            </button>
         </div>

         <div className="text-center pt-6">
            <p className="text-slate-500 font-bold text-lg">
               New to SalamaHub? <Link to="/signup" className="text-primary hover:underline underline-offset-4 decoration-2">Create an account</Link>
            </p>
         </div>
      </div>
    </div>
  );
};

export default Login;
