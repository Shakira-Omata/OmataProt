import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Eye, EyeOff, User, ArrowRight, Chrome } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo4 from '../assets/logo4.png';

const SignUp: React.FC = () => {
   const navigate = useNavigate();
   const { signup, loginWithGoogle, isLoading } = useAuth();

   const [name, setName] = useState('');
   const [identifier, setIdentifier] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [error, setError] = useState('');

   const handleSignUp = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      if (password !== confirmPassword) {
         setError('Passwords do not match!');
         return;
      }
      await signup(name, identifier, password);
      navigate('/');
   };

   const handleGoogleLogin = async () => {
      await loginWithGoogle();
      navigate('/');
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/50 p-6 animate-in fade-in duration-700">
         <div className="w-full max-w-xl bg-white rounded-[3.5rem] shadow-2xl border-2 border-border p-8 md:p-14 space-y-8 relative overflow-hidden group">

            <div className="text-center space-y-4">
               <Link to="/" className="inline-flex items-center gap-3 mb-4">
                  <img src={logo4} alt="SalamaHub Logo" className="h-16 w-auto object-contain" />
                  <span className="text-2xl font-black text-primary italic">SalamaHub</span>
               </Link>
               <h1 className="text-4xl font-black text-slate-900 leading-tight">Join Our Community</h1>
               <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  Create your account to start your SRHR journey.
               </p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-6">
               <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                     <label className="text-sm font-bold text-slate-900 ml-1">Full Name</label>
                     <div className="relative group/field">
                        <input
                           type="text"
                           placeholder="John Doe"
                           required
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           className="w-full h-12 pl-4 pr-11 rounded-full border border-slate-300 bg-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-700 font-medium text-sm"
                        />
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/field:text-primary transition-colors" size={18} />
                     </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                     <label className="text-sm font-bold text-slate-900 ml-1">Email</label>
                     <div className="relative group/field">
                        <input
                           type="text"
                           placeholder="name@example.com"
                           required
                           value={identifier}
                           onChange={(e) => setIdentifier(e.target.value)}
                           className="w-full h-12 pl-4 pr-11 rounded-full border border-slate-300 bg-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-700 font-medium text-sm"
                        />
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/field:text-primary transition-colors" size={18} />
                     </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                     <label className="text-sm font-bold text-slate-900 ml-1">Password</label>
                     <div className="relative group/field">
                        <input
                           type={showPassword ? "text" : "password"}
                           placeholder=".........."
                           required
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className="w-full h-12 pl-4 pr-11 rounded-full border border-slate-300 bg-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-700 font-bold tracking-widest text-sm"
                        />
                        <button
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 group-focus-within/field:text-primary transition-colors focus:outline-none"
                        >
                           {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                     </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                     <label className="text-sm font-bold text-slate-900 ml-1">Confirm Password</label>
                     <div className="relative group/field">
                        <input
                           type={showConfirmPassword ? "text" : "password"}
                           placeholder=".........."
                           required
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           className="w-full h-12 pl-4 pr-11 rounded-full border border-slate-300 bg-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-700 font-bold tracking-widest text-sm"
                        />
                        <button
                           type="button"
                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                           className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 group-focus-within/field:text-primary transition-colors focus:outline-none"
                        >
                           {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                     </div>
                  </div>
               </div>

               {error && <p className="text-red-500 text-sm font-bold text-center px-2">{error}</p>}

               <div className="p-4 rounded-2xl bg-slate-50 text-slate-500 font-medium text-sm border-2 border-border/60">
                  By creating an account, you agree to our <a href="#" className="font-bold text-primary underline">Privacy Policy</a> and <a href="#" className="font-bold text-primary underline">Terms of Use</a>.
               </div>

               <button type="submit" disabled={isLoading} className="w-full btn btn-primary h-12 rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:pointer-events-none font-bold text-lg">
                  {isLoading ? 'Creating Account...' : 'Sign Up Now'}
               </button>
            </form>

            <div className="relative pt-4 pb-2">
               <div className="relative flex justify-center text-sm font-medium">
                  <span className="bg-transparent px-4 text-slate-800">Or</span>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
               <button onClick={handleGoogleLogin} type="button" disabled={isLoading} className="h-14 rounded-full border border-border bg-slate-50/50 flex items-center justify-center gap-3 font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-sm disabled:opacity-70 disabled:pointer-events-none">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                     <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                     <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                     <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                     <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Sign Up with Google
               </button>
            </div>

            <div className="text-center pt-4">
               <p className="text-slate-500 font-bold text-lg">
                  Already have an account? <Link to="/login" className="text-primary hover:underline underline-offset-4 decoration-2">Log in here</Link>
               </p>
            </div>
         </div>
      </div>
   );
};

export default SignUp;
