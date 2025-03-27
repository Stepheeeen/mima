"use client"
import React, { useState } from 'react';
import {
  Shield,
  Filter,
  Search,
  User,
  ShoppingCart,
  ShieldIcon,
  GlobeIcon
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink 
} from '@/components/ui/navigation-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useTheme } from '@/contextProviders/ThemeProvider';

// Risk level colors mapping
const RISK_COLORS = {
  'Low': 'bg-green-100 text-green-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'High': 'bg-red-100 text-red-800'
};

// Sidebar Filters Component
interface SidebarFiltersProps {
  selectedTypes: string[];
  onTypesChange: (types: string[]) => void;
  riskLevel: number[];
  onRiskLevelChange: (level: number[]) => void;
}

export const SidebarFilters = ({ 
  selectedTypes, 
  onTypesChange, 
  riskLevel, 
  onRiskLevelChange 
}: SidebarFiltersProps) => {
  const { tailwindClasses, typography } = useTheme();

  return (
    <Card className={tailwindClasses.surface}>
      <CardHeader className={`flex flex-row items-center space-x-2 ${tailwindClasses.border} border-b p-4`}>
        <Filter className={tailwindClasses.textMuted} />
        <h2 className={`${typography.headings} ${tailwindClasses.textDark}`}>
          Filters
        </h2>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Insurance Type Filter */}
        <Accordion type="single" collapsible defaultValue="insurance-type">
          <AccordionItem value="insurance-type">
            <AccordionTrigger className={`${tailwindClasses.textDark} hover:no-underline`}>
              Insurance Type
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {['Travel', 'Electronics', 'Luggage'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        onTypesChange(
                          checked
                            ? [...selectedTypes, type]
                            : selectedTypes.filter((t: string) => t !== type)
                        );
                      }}
                    />
                    <Label htmlFor={type}>{type}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Risk Level Filter */}
        <Accordion type="single" collapsible defaultValue="risk-level">
          <AccordionItem value="risk-level">
            <AccordionTrigger className={`${tailwindClasses.textDark} hover:no-underline`}>
              Risk Level
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Max Risk Level</span>
                  <span>{riskLevel[0]}</span>
                </div>
                <Slider
                  defaultValue={[2]}
                  max={5}
                  step={1}
                  value={riskLevel}
                  onValueChange={onRiskLevelChange}
                  className="py-2"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

// Quick Actions Sidebar Component
export const QuickActionsSidebar = () => {
  const { tailwindClasses, typography } = useTheme();

  return (
    <Card className={`${tailwindClasses.surface} shadow-md`}>
      <CardHeader>
        <CardTitle className={`${tailwindClasses.textDark} ${typography.headings}`}>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          variant="outline" 
          className={`
            w-full 
            ${tailwindClasses.border} 
            hover:${tailwindClasses.primary} 
            hover:text-white 
            transition-colors
          `}
        >
          File a Claim
        </Button>
        <Button 
          variant="outline" 
          className={`
            w-full 
            ${tailwindClasses.border} 
            hover:${tailwindClasses.success} 
            hover:text-white 
            transition-colors
          `}
        >
          Renew Policy
        </Button>
      </CardContent>
    </Card>
  );
};

interface Product {
    id: string;
    type: string;
    name: string;
    summary: string;
    icon: {
      component: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
      props: Record<string, any>;
    };
    riskLevel: number;
    dailyRate: number;
    payoutAmount: number;
  }

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export const ProductGrid = ({ products, onProductSelect }: ProductGridProps) => {
  const { tailwindClasses, typography } = useTheme();

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {products.length > 0 ? (
        products.map((product) => (
          <Card
            key={product.id}
            className={`
              ${tailwindClasses.surface} 
              hover:shadow-lg 
              transition-shadow 
              duration-300
            `}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="mb-4">
                {React.createElement(product.icon.component, product.icon.props)}
              </div>
              <h3 className={`
                text-lg 
                ${typography.headings} 
                ${tailwindClasses.textDark} 
                mb-2
              `}>
                {product.name}
              </h3>
              <p className={`
                mb-4 
                ${tailwindClasses.textMuted}
              `}>
                {product.summary}
              </p>
              <div className="flex items-center space-x-2 mb-4">
                <span className={`
                  px-2 py-1 rounded-full 
                  text-xs 
                  ${product.riskLevel <= 2
                    ? 'bg-green-100 text-green-800'
                    : product.riskLevel <= 4
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }
                `}>
                  Risk Level: {product.riskLevel}
                </span>
              </div>
              <Button
                onClick={() => onProductSelect(product)}
                className={`
                  w-full 
                  ${tailwindClasses.primary} 
                  hover:opacity-90
                `}
              >
                Get Coverage
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className={`
          text-center 
          p-8 
          ${tailwindClasses.surface} 
          rounded-lg
          col-span-3
        `}>
          <p className={`
            ${tailwindClasses.textMuted}
            text-lg
          `}>
            No insurance products match your filters
          </p>
        </div>
      )}
    </div>
  );
};

// Insurance Details Modal Component
interface InsuranceDetailsModalProps {
  product: Product;
  onClose: () => void;
}

export const InsuranceDetailsModal = ({ product, onClose }: InsuranceDetailsModalProps) => {
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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-4">
          </DialogTitle>
            <ShieldIcon className="w-10 h-10 text-blue-500" />
            <span>{product.name}</span>
          </DialogHeader>
        
        <Card>
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

            <Button 
              className="w-full mt-6" 
              disabled={!destination || !travelDate || !deviceType}
            >
              Buy with Crypto
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

// Main Header Component
interface MainHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MainHeader = ({ activeTab, onTabChange }: MainHeaderProps) => {
  const { tailwindClasses, typography } = useTheme();

  return (
    <header className={`${tailwindClasses.surface} shadow-sm`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Shield className={`${tailwindClasses.primary}`} size={32} />
          <h1 className={`text-xl ${typography.headings} ${tailwindClasses.textDark}`}>
            InsureNet
          </h1>
        </div>

        {/* Navigation Menu */}
        {/* <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            {['Home', 'Products', 'Claims', 'About'].map((item) => (
              <NavigationMenuItem key={item}>
                <NavigationMenuLink 
                  href={`/${item.toLowerCase()}`}
                  className={`
                    px-3 py-2 rounded-md transition-colors duration-300
                    ${activeTab === item.toLowerCase() ? tailwindClasses.primary + ' text-white' : tailwindClasses.textMuted}
                    hover:${tailwindClasses.primary} hover:text-white
                  `}
                  onClick={() => onTabChange(item.toLowerCase())}
                >
                  {item}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu> */}

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${tailwindClasses.textMuted}`} size={20} />
            <Input 
              placeholder="Search insurance" 
              className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <Button 
            variant="outline" 
            className={`${tailwindClasses.border} hover:${tailwindClasses.primary} transition-colors`}
          >
            <ShoppingCart size={20} className="mr-2" /> Cart
          </Button>
          <Button 
            className={`${tailwindClasses.primary} hover:opacity-90 transition-opacity`}
          >
            <User size={20} className="mr-2" /> Login
          </Button>
        </div>
      </div>
    </header>
  );
};

// Main Footer Component
export const MainFooter = () => {
  const { tailwindClasses } = useTheme();

  return (
    <footer className={`${tailwindClasses.surface} border-t py-6`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p className={tailwindClasses.textMuted}>
          © 2024 InsureNet. All rights reserved.
        </p>
        <div className="space-x-4">
          {['Privacy', 'Terms', 'Contact'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className={`
                ${tailwindClasses.textMuted} 
                hover:${tailwindClasses.primary} 
                transition-colors
              `}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};