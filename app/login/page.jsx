'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [loginData, setLoginData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: true,
  });

  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    accountType: 'advertiser', // 'advertiser' or 'user'
    agreeTerms: false,
  });

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Supabase / NextAuth Authentication Logic
    alert('Logged in successfully!');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Supabase / NextAuth Registration Logic
    alert('Account created successfully!');
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Top Header Logo / Title */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block text-2xl font-black tracking-wider text-amber-500">
            SKOKKA<span className="text-white">AU</span>
          </Link>
          <p className="text-xs text-zinc-400">
            Manage your listings, messages, and profile preferences
          </p>
        </div>

        {/* Auth Card Box */}
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Tab Switcher */}
          <div className="grid grid-cols-2 rounded-xl bg-zinc-950 p-1 border border-zinc-800">
            <button
              onClick={() => setActiveTab('login')}
              className={`py-2 text-xs font-bold rounded-lg transition ${
                activeTab === 'login'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`py-2 text-xs font-bold rounded-lg transition ${
                activeTab === 'register'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Register
            </button>
          </div>

          {/* ================= LOGIN FORM ================= */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Email or Phone Number *
                </label>
                <input
                  type="text"
                  name="emailOrPhone"
                  required
                  value={loginData.emailOrPhone}
                  onChange={handleLoginChange}
                  placeholder="e.g. user@example.com or +61 400 000 000"
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-zinc-300">
                    Password *
                  </label>
                  <a href="#" className="text-[11px] text-amber-500 hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Enter your password"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 pr-10 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-xs text-zinc-500 hover:text-zinc-300"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={handleLoginChange}
                    className="rounded border-zinc-800 bg-zinc-950 text-amber-500 focus:ring-0"
                  />
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-amber-500/20 mt-2"
              >
                Log In
              </button>
            </form>
          )}

          {/* ================= REGISTER FORM ================= */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setRegisterData((p) => ({ ...p, accountType: 'advertiser' }))
                    }
                    className={`py-2 text-xs rounded-xl border text-center font-semibold transition ${
                      registerData.accountType === 'advertiser'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    Advertiser / Independent
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setRegisterData((p) => ({ ...p, accountType: 'user' }))
                    }
                    className={`py-2 text-xs rounded-xl border text-center font-semibold transition ${
                      registerData.accountType === 'user'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    Client / User
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Full Name / Agency Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={registerData.fullName}
                  onChange={handleRegisterChange}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="user@example.com"
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Australian Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                  placeholder="+61 400 000 000"
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="Create a strong password"
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 text-[11px] text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    required
                    checked={registerData.agreeTerms}
                    onChange={handleRegisterChange}
                    className="mt-0.5 rounded border-zinc-800 bg-zinc-950 text-amber-500 focus:ring-0"
                  />
                  <span>
                    I confirm that I am at least <strong>18 years of age</strong> and agree to the Terms of Service.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-amber-500/20 mt-2"
              >
                Create Account
              </button>
            </form>
          )}
        </div>

        {/* Security Footer */}
        <p className="text-[11px] text-zinc-500 text-center">
          🔒 Encrypted SSL Connection. Your data is protected under Australian Privacy Laws.
        </p>
      </div>
    </main>
  );
                      }
                      
