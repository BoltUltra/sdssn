'use client';

import { useDataStore } from '@/app/stores/dataStore';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface AssignAdminProps {
  onAssign?: (email: string, role: string) => Promise<void>;
}

const AssignAdmin: React.FC<AssignAdminProps> = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');
  const [isLoading, setIsLoading] = useState(false);
  const { assignRole } = useDataStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email) {
        toast.error('Please enter an email address');
        return;
      }
      await assignRole(email, role);
      setEmail('');
    } catch (error) {
      console.error('Error assigning admin:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Assign Admin Role</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="Enter email address"
            required
          />
        </div>
        <div>
          <label htmlFor="role" className="block mb-2">
            Role
          </label>
          <div className="form-input">
            <select
              id="role"
              value={role}
              disabled
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-transparent outline-none cursor-not-allowed"
            >
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`flex items-center justify-center space-x-3 bg-primary text-white py-3 px-10 md:w-fit w-full rounded-lg disabled:bg-primary/50 ${
            isLoading ? 'bg-primary/50' : ''
          } `}
        >
          {isLoading ? <div className="loader"></div> : 'Assign Admin'}
        </button>
      </form>
    </div>
  );
};

export default AssignAdmin;
