"use client"
import React, { useState, useMemo } from 'react';
import { ChevronRight, ShieldCheck, FileText, Calendar, DollarSign, CreditCard } from "lucide-react";

// Enhanced Mock Data with More Comprehensive Information
const policies: Policy[] = [
  { 
    id: 1, 
    itemName: "iPhone Pro Max", 
    type: "Device Protection",
    provider: "TechGuard Insurance",
    coveragePeriod: {
      start: "Mar 10, 2025",
      end: "Mar 15, 2025"
    },
    status: "Active",
    coverageAmount: 800,
    premium: 29.99,
    isClaimEligible: true
  },
  { 
    id: 2, 
    itemName: "MacBook Pro 16\"", 
    type: "Electronics Insurance",
    provider: "DeviceCare",
    coveragePeriod: {
      start: "Jan 5, 2025",
      end: "Feb 5, 2025"
    },
    status: "Expired",
    coverageAmount: 2500,
    premium: 49.99,
    isClaimEligible: false
  },
  { 
    id: 3, 
    itemName: "Samsung Galaxy S24", 
    type: "Mobile Protection",
    provider: "MobileShield",
    coveragePeriod: {
      start: "Feb 15, 2025",
      end: "Mar 15, 2025"
    },
    status: "InProgress",
    coverageAmount: 600,
    premium: 24.99,
    isClaimEligible: false
  }
];

const claims = [
  {
    id: 1, 
    itemName: "iPhone Pro Max",
    claimNumber: "CLM-2025-001",
    totalClaimAmount: 750,
    timeline: [
      { 
        date: "Mar 12, 2025", 
        status: "Claim Initiated", 
        description: "Accidental Damage Reported" 
      },
      { 
        date: "Mar 13, 2025", 
        status: "Approved", 
        description: "Claim Verified and Processed" 
      },
      { 
        date: "Mar 14, 2025", 
        status: "Completed", 
        description: "Funds Transferred" 
      }
    ]
  }
];

const PolicyStatusBadge = ({ status }: { status: "Active" | "Expired" | "InProgress" }) => {
  const badgeStyles = {
    "Active": "bg-green-100 text-green-800",
    "Expired": "bg-red-100 text-red-800",
    "InProgress": "bg-yellow-100 text-yellow-800"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeStyles[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
};

type Policy = {
  id: number;
  itemName: string;
  type: string;
  provider: string;
  coveragePeriod: {
    start: string;
    end: string;
  };
  status: "Active" | "Expired" | "InProgress";
  coverageAmount: number;
  premium: number;
  isClaimEligible: boolean;
};

const PolicyCard = ({ policy }: { policy: Policy }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="text-blue-600 w-8 h-8" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{policy.itemName}</h3>
            <p className="text-sm text-gray-500">{policy.type}</p>
          </div>
        </div>
        <PolicyStatusBadge status={policy.status} />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">Coverage Period</p>
            <p className="text-sm font-medium">{policy.coveragePeriod.start} - {policy.coveragePeriod.end}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">Coverage Amount</p>
            <p className="text-sm font-medium">${policy.coverageAmount}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CreditCard className="w-4 h-4 text-gray-500" />
          <p className="text-sm text-gray-600">Monthly Premium: ${policy.premium}</p>
        </div>
        {policy.isClaimEligible && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
            File Claim
          </button>
        )}
      </div>
    </div>
  );
};

type Claim = {
  id: number;
  itemName: string;
  claimNumber: string;
  totalClaimAmount: number;
  timeline: {
    date: string;
    status: string;
    description: string;
  }[];
};

const ClaimTimeline = ({ claim }: { claim: Claim }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <FileText className="text-blue-600 w-8 h-8" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{claim.itemName} Claim</h3>
            <p className="text-sm text-gray-500">Claim Number: {claim.claimNumber}</p>
          </div>
        </div>
        <span className="text-green-600 text-sm font-medium">Completed</span>
      </div>

      <div className="space-y-3 border-l-2 border-blue-200 pl-4">
        {claim.timeline.map((event, index) => (
          <div key={index} className="relative pl-6">
            <div className="absolute -left-6 top-4 w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
            <p className="text-sm font-medium text-gray-700">{event.date}</p>
            <p className="text-xs text-gray-500">{event.status}</p>
            <p className="text-xs text-gray-500">{event.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">Total Claim Amount: ${claim.totalClaimAmount}</p>
        <button className="text-blue-600 hover:underline text-sm flex items-center">
          View Details <ChevronRight className="ml-1 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function InsuranceDashboard() {
  const [activeTab, setActiveTab] = useState("policies");
  const activePolicies = useMemo(() => policies.filter(p => p.status !== "Expired"), []);
  const expiredPolicies = useMemo(() => policies.filter(p => p.status === "Expired"), []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Manage and track your insurance policies and claims</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex border-b">
            {["policies", "claims"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium transition-colors 
                  ${activeTab === tab 
                    ? "text-blue-600 border-b-2 border-blue-600" 
                    : "text-gray-500 hover:text-gray-700"}`}
              >
                {tab === "policies" ? "My Policies" : "Claim History"}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "policies" ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Policies</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activePolicies.map(policy => (
                      <PolicyCard key={policy.id} policy={policy} />
                    ))}
                  </div>
                </div>

                {expiredPolicies.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Expired Policies</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {expiredPolicies.map(policy => (
                        <PolicyCard key={policy.id} policy={policy} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {claims.map(claim => (
                    <ClaimTimeline key={claim.id} claim={claim} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}