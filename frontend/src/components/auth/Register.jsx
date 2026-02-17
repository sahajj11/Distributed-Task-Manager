import React, { useState } from 'react';
import api from '../../services/api';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export const Register = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Hits your POST /api/auth/register endpoint
      await api.post('/auth/register', formData);
      
      toast.success('Account created! You can now sign in.');
      
      // Call the prop to switch the UI back to the Login form
      if (onSuccess) onSuccess(); 
      
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Registration failed. Try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-[#1c1f26] border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
        <input
          type="text"
          placeholder="Sahaj Rajput"
          className={inputClass}
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
        <input
          type="email"
          placeholder="sahaj@adit.ac.in"
          className={inputClass}
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-400 ml-1">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          className={inputClass}
          required
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-6"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Creating Account...
          </>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
};