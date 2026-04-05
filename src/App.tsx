import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, BookOpen, User, LogIn, LogOut, ChevronRight, Heart, Activity, Plus } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { mockService } from './services/mockService';
import { UserProfile } from './types';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Components
import LandingPage from './components/LandingPage';
import FoodDiary from './components/FoodDiary';
import AboutUs from './components/AboutUs';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    mockService.getUser().then(setUser);
  }, []);

  const handleLogout = async () => {
    await mockService.logout();
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <div className="fixed top-0 left-0 w-full flex justify-center p-4 md:p-6 z-50">
          <nav className="bg-stoma-dark w-full max-w-6xl rounded-full px-6 md:px-10 py-3 flex items-center shadow-2xl border border-white/10">
            <Link to="/" className="flex items-center gap-3 no-underline">
              <img 
                src="/image%201%20(logo_stomacare).png" 
                alt="StomaCare Logo" 
                className="w-10 h-10 object-contain bg-white rounded-full p-0.5"
                referrerPolicy="no-referrer"
              />
              <span className="text-xl font-bold text-white tracking-tight">StomaCare</span>
            </Link>

            <div className="ml-auto flex items-center gap-2 md:gap-4">
              <div className="hidden md:flex items-center gap-1">
                <NavLink to="/">Home</NavLink>
                {user && <NavLink to="/diary">Food Diary</NavLink>}
                <NavLink to="/about">About Us</NavLink>
              </div>

              <div className="hidden md:block ml-2">
                {user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-white/80 text-sm font-medium">Hi, {user.displayName}</span>
                    <button 
                      onClick={handleLogout}
                      className="bg-white/10 text-white hover:bg-white/20 px-5 py-2 rounded-full font-bold text-xs btn-hover inline-flex items-center gap-2"
                    >
                      <LogOut className="w-3 h-3" /> Logout
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/login"
                    className="bg-white text-stoma-dark px-7 py-2.5 rounded-full font-bold text-xs btn-hover inline-block shadow-lg no-underline"
                  >
                    Login/Register
                  </Link>
                )}
              </div>

              <button 
                className="md:hidden text-white p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-stoma-dark z-40 pt-24 px-6 md:hidden"
            >
              <div className="flex flex-col gap-4">
                <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
                {user && <MobileNavLink to="/diary" onClick={() => setIsMenuOpen(false)}>Food Diary</MobileNavLink>}
                <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>About Us</MobileNavLink>
                {!user && (
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-white text-stoma-dark p-4 rounded-2xl font-bold text-center no-underline"
                  >
                    Login/Register
                  </Link>
                )}
                {user && (
                  <button 
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="bg-white/10 text-white p-4 rounded-2xl font-bold"
                  >
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={user ? <Dashboard user={user} /> : <LandingPage />} />
            <Route path="/diary" element={<FoodDiary user={user} />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<LoginPage onLogin={setUser} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-stoma-green py-16 px-6 text-white text-center">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <span className="text-3xl font-bold tracking-widest uppercase">StomaCare</span>
              <p className="text-sm text-white/70 mt-3">© 2026 StomaCare. Solusi Pintar Kesehatan Lambung Anda.</p>
            </div>
            <p className="text-[11px] text-white/50 max-w-3xl mx-auto leading-relaxed italic">
              Disclaimer: Informasi ini untuk edukasi, bukan pengganti diagnosis atau saran medis dari dokter profesional.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function NavLink({ to, children }: { to: string, children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "nav-link",
        isActive && "nav-link-active"
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, onClick, children }: { to: string, onClick: () => void, children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={cn(
        "p-4 rounded-2xl text-lg font-bold no-underline",
        isActive ? "bg-white text-stoma-dark" : "text-white/80"
      )}
    >
      {children}
    </Link>
  );
}
