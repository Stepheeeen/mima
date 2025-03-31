"use client"
import React, { useState } from 'react';
import {
    Filter,
    Search,
    ShoppingCart,
    X,
    Menu,
    LayoutDashboard,
    Loader2
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
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { useTheme } from '@/contextProviders/ThemeProvider';
import { Separator } from "@/components/ui/separator";
import logo from "../../../public/Logo.png"
import Image from 'next/image';
import Link from 'next/link';
import { ComingSoonModal } from '@/components/reusable/ComingSoonModal';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

// Risk level colors mapping
const RISK_COLORS = {
    'Low': 'bg-green-100 text-green-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'High': 'bg-red-100 text-red-800'
};

// Sidebar Filters Component
interface SidebarFiltersProps {
    selectedTypes?: string[] | undefined;
    onTypesChange?: (types: string[]) => void;
    riskLevel?: number[] | undefined;
    onRiskLevelChange?: (level: number[]) => void;
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
                                            checked={selectedTypes?.includes(type)}
                                            onCheckedChange={(checked) => {
                                                onTypesChange &&
                                                    onTypesChange?.(
                                                        checked
                                                            ? [...(selectedTypes || []), type]
                                                            : (selectedTypes || []).filter((t: string) => t !== type)
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
                                    <span>{riskLevel?.[0] ?? 'N/A'}</span>
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
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            hover:${tailwindClasses.success} 
            transition-colors
          `}
                    onClick={() => setIsModalOpen(true)}>
                    File a Claim
                </Button>
                <Button
                    variant="outline"
                    className={`
            w-full 
            ${tailwindClasses.border} 
            hover:${tailwindClasses.success} 
            transition-colors
          `}
                    onClick={() => setIsModalOpen(true)}>
                    Renew Policy
                </Button>
            </CardContent>

            <ComingSoonModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
            />
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
    const [formData, setFormData] = useState({
        organization: "",
        insurancePlan: "",
        amount: "",
        premium: "",
        startingDate: "",
        endingDate: ""
    });

    const [showAnalysis, setShowAnalysis] = useState(true);
    const [acceptedRisks, setAcceptedRisks] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setShowAnalysis(true);
        // Here you would typically handle the form submission
        console.log("Form submitted:", formData);
    };

    // Sample organization options
    const organizations = [
        { value: "org1", label: "ABC Corporation" },
        { value: "org2", label: "XYZ Insurance" },
        { value: "org3", label: "123 Global" }
    ];

    // Sample insurance plan options
    const insurancePlans = [
        { value: "plan1", label: "Basic Coverage" },
        { value: "plan2", label: "Standard Coverage" },
        { value: "plan3", label: "Premium Coverage" }
    ];

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-4">
                        <Image alt='' src={logo} className='w-10' />
                        <span>{product.name}</span>
                    </DialogTitle>
                </DialogHeader>

                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4">
                                {/* Organization Selection - Fixed to full width */}
                                <div className="space-y-2 col-span-1">
                                    <label htmlFor="organization" className="text-sm font-medium">
                                        Select Organization
                                    </label>
                                    <Select
                                        onValueChange={(value) => handleChange("organization", value)}
                                        required
                                    >
                                        <SelectTrigger id="organization" className="w-full">
                                            <SelectValue placeholder="Select an organization" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {organizations.map((org) => (
                                                <SelectItem key={org.value} value={org.value}>
                                                    {org.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Insurance Plan - Fixed to full width */}
                                <div className="space-y-2 col-span-1">
                                    <label htmlFor="insurancePlan" className="text-sm font-medium">
                                        Insurance Plan
                                    </label>
                                    <Select
                                        onValueChange={(value) => handleChange("insurancePlan", value)}
                                        required
                                    >
                                        <SelectTrigger id="insurancePlan" className="w-full">
                                            <SelectValue placeholder="Select insurance plan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {insurancePlans.map((plan) => (
                                                <SelectItem key={plan.value} value={plan.value}>
                                                    {plan.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Amount and Premium on the same line */}
                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="Amount" className="text-sm font-medium">
                                            Amount ($)
                                        </label>
                                        <Input
                                            type="number"
                                            placeholder="Amount"
                                            value={formData.amount}
                                            onChange={(e) => handleChange("amount", e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="Premium" className="text-sm font-medium">
                                            Premium ($)
                                        </label>
                                        <Input
                                            type="number"
                                            placeholder="Premium"
                                            value={formData.premium}
                                            onChange={(e) => handleChange("premium", e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Starting and Ending Date on the same line */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Starting date, Ending date</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        type="date"
                                        value={formData.startingDate}
                                        onChange={(e) => handleChange("startingDate", e.target.value)}
                                        required
                                    />
                                    <Input
                                        type="date"
                                        value={formData.endingDate}
                                        onChange={(e) => handleChange("endingDate", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Fixed conditional rendering - Changed !FormData to Object.values(formData).some(val => !val) */}
                            {!Object.values(formData).some(val => !val) && showAnalysis && (
                                <div className="mt-8 p-4 border rounded-md bg-gray-50">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                                        <p className="text-gray-700">Analyzing and generating risk and policy...</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="risks"
                                            checked={acceptedRisks}
                                            onCheckedChange={(checked) => setAcceptedRisks(checked === true)}
                                            required
                                        />
                                        <Label
                                            htmlFor="risks"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Accept Risks
                                        </Label>
                                    </div>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={Object.values(formData).some(val => !val) || !acceptedRisks}
                                onClick={() => { setIsModalOpen(true) }}
                            >
                                Submit Information
                            </Button>
                        </form>
                    </CardContent>

                    <ComingSoonModal
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                    />
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter()
    const pathname = usePathname()

    return (
        <aside
            className={`fixed top-0 left-0 h-[100vh] overflow-scroll z-50 w-72 bg-white dark:bg-gray-900 shadow-lg transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:static md:hidden`}
        >
            {/* Sidebar Header */}
            <div className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Image alt='' src={logo} className='w-20' />
                    <h1 className={`text-xl font-semibold ${typography.headings} ${tailwindClasses.textDark}`}>Meemi</h1>
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
                                                checked={selectedTypes?.includes(type)}
                                                onCheckedChange={(checked) => {
                                                    onTypesChange?.(
                                                        checked
                                                            ? [...(selectedTypes || []), type]
                                                            : (selectedTypes || []).filter((t: string) => t !== type)
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
                                        <span>{riskLevel?.[0]}</span>
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
                        onClick={() => setIsModalOpen(true)} >
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
                        onClick={() => setIsModalOpen(true)} >
                        Renew Policy
                    </Button>
                </CardContent>
            </Card>

            <Separator className="my-4" />

            {/* User Actions */}
            <div className="px-6">
                <Button variant="outline" className="w-full flex items-center justify-center mt-3" onClick={() => setIsModalOpen(true)}>
                    <ShoppingCart size={20} className="mr-2" /> Cart
                </Button>
                <Button variant={`${pathname === "/dashboard" ? "secondary" : "outline"}`} className="w-full flex items-center justify-center mt-3" onClick={() => { router.push("/dashboard") }}>
                    <LayoutDashboard size={20} className="mr-2" /> My Dashboard
                </Button>
            </div>

            <ComingSoonModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
            />
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter()
    const pathname = usePathname()

    return (
        <header className={`shadow-sm ${tailwindClasses.surface}`}>
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Sidebar Toggle (Mobile) */}
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <Menu size={24} />
                </Button>

                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 cursor-pointer">
                    <Image alt='' src={logo} className='w-10' />
                    <h1 className={`text-xl font-semibold ${typography.headings} ${tailwindClasses.textDark}`}>Meemi</h1>
                </Link>

                {/* Search Bar */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <Input placeholder="Search insurance" className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500" />
                </div>
                {/* Actions */}
                <div className="flex items-center space-x-4">

                    {/* Cart & Login */}
                    <Button variant="outline" className='hidden md:flex' onClick={() => setIsModalOpen(true)}>
                        <ShoppingCart size={20} className="mr-2" /> Cart
                    </Button>
                    <Button variant={`${pathname === "/dashboard" ? "secondary" : "outline"}`} className={`hidden md:flex`} onClick={() => { router.push("/dashboard") }}>
                        <LayoutDashboard size={20} className="mr-2" /> My Dashboard
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

            <ComingSoonModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
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
                            © Meemi
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