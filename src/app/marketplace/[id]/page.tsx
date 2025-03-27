"use client"
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { ShieldIcon, GlobeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Risk level colors mapping
const RISK_COLORS = {
  'Low': 'bg-green-100 text-green-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'High': 'bg-red-100 text-red-800'
};

const InsuranceDetailsPage = () => {
  // State for dynamic pricing and form inputs
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [coverageAmount, setCoverageAmount] = useState(5000);
  const [premium, setPremium] = useState(50);

  // Premium calculation logic (simplified)
  const calculatePremium = (amount: number, destination: string, deviceType: string): number => {
    let basePremium = amount * 0.01;
    
    // Adjust premium based on destination risk
    switch(destination) {
      case 'High Risk':
        basePremium *= 1.5;
        break;
      case 'Medium Risk':
        basePremium *= 1.2;
        break;
      default:
        basePremium *= 1;
    }

    // Adjust for device type
    if (deviceType === 'Smartphone') {
      basePremium *= 1.1;
    } else if (deviceType === 'Laptop') {
      basePremium *= 1.3;
    }

    return Math.round(basePremium);
  };

  // Update premium when inputs change
  React.useEffect(() => {
    const newPremium = calculatePremium(coverageAmount, destination, deviceType);
    setPremium(newPremium);
  }, [coverageAmount, destination, deviceType]);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        {/* Item Header */}
        <CardHeader className="flex flex-row items-center space-x-4">
          <ShieldIcon className="w-10 h-10 text-blue-500" />
          <div>
            <CardTitle>Travel Insurance</CardTitle>
            <Badge 
              className={`mt-2 ${RISK_COLORS['Medium']}`}
            >
              Medium Risk
            </Badge>
          </div>
        </CardHeader>

        {/* Dynamic Pricing Section */}
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Coverage Amount ($)
              </label>
              <Input 
                type="number" 
                value={coverageAmount}
                onChange={(e) => setCoverageAmount(Number(e.target.value))}
                min={1000} 
                max={50000}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Premium ($)
              </label>
              <div className="mt-1 p-2 bg-gray-100 rounded">
                {premium}
              </div>
            </div>
          </div>

          {/* Input Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Destination
              </label>
              <Select onValueChange={setDestination}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low Risk">Low Risk Country</SelectItem>
                  <SelectItem value="Medium Risk">Medium Risk Country</SelectItem>
                  <SelectItem value="High Risk">High Risk Country</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Travel Date
              </label>
              <Input 
                type="date" 
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Device Type
              </label>
              <Select onValueChange={setDeviceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Smartphone">Smartphone</SelectItem>
                  <SelectItem value="Laptop">Laptop</SelectItem>
                  <SelectItem value="Tablet">Tablet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Smart Contract Info Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4">
                View Contract Terms
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Smart Contract Terms</DialogTitle>
              </DialogHeader>
              <div className="text-sm text-gray-600">
                <p>Detailed smart contract terms would be displayed here...</p>
              </div>
            </DialogContent>
          </Dialog>

          {/* CTA */}
          <Button 
            className="w-full mt-6" 
            disabled={!destination || !travelDate || !deviceType}
          >
            Buy with Crypto
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceDetailsPage;