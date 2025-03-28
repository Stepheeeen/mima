"use client"
import React, { useState } from 'react';
import {
    Shield,
    Filter,
    Search,
    User,
    ShoppingCart,
    ShieldIcon,
    GlobeIcon,
    FileText,
    X,
    RefreshCw,
    Menu
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
import { Separator } from "@/components/ui/separator";
import logo from "../../../public/Logo.png"
import Image from 'next/image';
import Link from 'next/link';

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
        <Card className={`${tailwindClasses.surface} shadow-md `}>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        switch (destination) {
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
                    <Image alt='' src={logo} className='w-10'/>
                    <span>{product.name}</span>
                </DialogHeader>

                <Card>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Amount ($)
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

export const Sidebar = ({
    isOpen,
    onClose,
    selectedTypes,
    onTypesChange,
    riskLevel,
    onRiskLevelChange
}: SidebarFiltersProps & { isOpen: boolean; onClose: () => void }) => {
    const { tailwindClasses, typography } = useTheme();

    return (
        <aside
            className={`fixed top-0 left-0 h-[100vh] overflow-scroll z-50 w-72 bg-white dark:bg-gray-900 shadow-lg transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:static md:hidden`}
        >
            {/* Sidebar Header */}
            <div className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                <Image alt='' src={logo} className='w-20'/>
                    <h1 className={`text-xl font-semibold ${typography.headings} ${tailwindClasses.textDark}`}>InsureNet</h1>
                </div>
                <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
                    <X size={24} />
                </Button>
            </div>

            {/* Search Bar */}
            <div className="px-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <Input placeholder="Search insurance" className="pl-10" />
                </div>
            </div>

            <Separator className="mt-2" />

            {/* Filters */}
            <Card className={`shadow-none border-0`}>
                <CardHeader className={`flex flex-row items-center space-x-2 ${tailwindClasses.border} border-b p-4`}>
                    <Filter className={tailwindClasses.textMuted} />
                    <h2 className={`${typography.headings} ${tailwindClasses.textDark}`}>
                        Filters
                    </h2>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
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

            <Separator className="my-4" />

            {/* Quick Actions */}
            <Card className={`shadow-none border-0`}>
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

            <Separator className="my-4" />

            {/* User Actions */}
            <div className="px-6">
                <Button className="w-full flex items-center justify-center">
                    <User size={20} className="mr-2" /> Login
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center mt-3">
                    <ShoppingCart size={20} className="mr-2" /> Cart
                </Button>
            </div>
        </aside>
    );
};

export const MainHeader = ({
    selectedTypes,
    onTypesChange,
    riskLevel,
    onRiskLevelChange
}: SidebarFiltersProps) => {
    const { tailwindClasses, typography } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <header className={`shadow-sm ${tailwindClasses.surface}`}>
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Sidebar Toggle (Mobile) */}
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <Menu size={24} />
                </Button>

                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 cursor-pointer">
                <Image alt='' src={logo} className='w-10'/>
                    <h1 className={`text-xl font-semibold ${typography.headings} ${tailwindClasses.textDark}`}>InsureNet</h1>
                </Link>

                {/* Search Bar */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <Input placeholder="Search insurance" className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500" />
                </div>
                {/* Actions */}
                <div className="flex items-center space-x-4">

                    {/* Cart & Login */}
                    <Button variant="outline" className='hidden md:flex'>
                        <ShoppingCart size={20} className="mr-2" /> Cart
                    </Button>
                    <Button className={`${tailwindClasses.primary} hover:opacity-90 hidden md:flex`} >
                        <User size={20} className="mr-2" /> Login
                    </Button>
                </div>
            </div>

            {/* Sidebar (Mobile Only) */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                selectedTypes={selectedTypes} // Provide appropriate state or default value
                onTypesChange={onTypesChange} // Replace with actual handler
                riskLevel={riskLevel} // Provide appropriate state or default value
                onRiskLevelChange={onRiskLevelChange} // Replace with actual handler
            />
        </header>
    );
};

// Main Footer Component
export const MainFooter = () => {
    const { tailwindClasses } = useTheme();

    return (
        <footer className={`${tailwindClasses.surface} border-t py-6`}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                        <p className={`${tailwindClasses.textMuted} text-sm`}>
                            © InsureNet
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end space-x-4">
                        {['Privacy', 'Terms', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className={`
                    ${tailwindClasses.textMuted} 
                    hover:${tailwindClasses.primary} 
                    transition-colors 
                    text-sm 
                    mb-2 md:mb-0
                  `}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};