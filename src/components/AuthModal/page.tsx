"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet, User, Building2 } from 'lucide-react';

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
    };
  }
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {

  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState<'user' | 'organization' | null>(null);
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    walletAddress: "",
    organizationName: "",
    organizationType: "",
  });

  const handleWalletConnect = async () => {
    setIsWalletConnecting(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setForm(prev => ({ ...prev, walletAddress: accounts[0] }));
        if (!isSignUp) {
          // If logging in, redirect immediately after wallet connection
          onClose();
          router.push("/marketplace");
        }
      } else {
        alert('Please install MetaMask to continue');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
    setIsWalletConnecting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.walletAddress) {
      alert('Please connect your wallet first');
      return;
    }
    console.log(isSignUp ? "Signing Up:" : "Logging In:", form);
    onClose();
    router.push("/dashboard");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">&times;</button>

        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          {isSignUp ? "Create an Account" : "Connect Wallet"}
        </h2>

        {isSignUp && !userType ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center mb-4">Choose Account Type</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setUserType('user')}
                className="p-6 border rounded-lg hover:border-primary flex flex-col items-center gap-2"
              >
                <User size={24} />
                <span>Individual User</span>
              </button>
              <button
                onClick={() => setUserType('organization')}
                className="p-6 border rounded-lg hover:border-primary flex flex-col items-center gap-2"
              >
                <Building2 size={24} />
                <span>Organization</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <button
              type="button"
              onClick={handleWalletConnect}
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              disabled={isWalletConnecting}
            >
              <Wallet size={20} />
              {form.walletAddress ? 'Wallet Connected' : 'Connect Wallet'}
            </button>

            {isSignUp && form.walletAddress && (
              <>
                {userType === 'organization' ? (
                  <>
                    <div>
                      <label className="block text-gray-600 mb-2">Organization Name</label>
                      <input
                        type="text"
                        name="organizationName"
                        value={form.organizationName}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg"
                        placeholder="Enter organization name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-2">Organization Type</label>
                      <select
                        name="organizationType"
                        value={form.organizationType}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg"
                      >
                        <option value="">Select type</option>
                        <option value="insurance">Insurance Provider</option>
                        <option value="medical">Medical Facility</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-gray-600 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-lg"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-primary text-white p-3 rounded-lg hover:bg-accent"
                >
                  Complete Sign Up
                </button>
              </>
            )}
          </form>
        )}

        <p className="mt-6 text-center text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setUserType(null);
              setForm(prev => ({ ...prev, walletAddress: "" }));
            }}
            className="text-primary underline"
          >
            {isSignUp ? "Login Instead" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};