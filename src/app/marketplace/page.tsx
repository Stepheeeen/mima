"use client"
import React, { useState } from 'react';
import {
    Shield,
    Filter,
    Plane,
    Smartphone,
    Luggage,
    Search,
    User,
    ShoppingCart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink
} from '@/components/ui/navigation-menu';
import { useTheme } from '@/contextProviders/ThemeProvider';
import { InsuranceDetailsModal, MainFooter, MainHeader, ProductGrid, QuickActionsSidebar, SidebarFilters } from './supportingComponent';

// Insurance products data
const insuranceProducts = [
    {
        id: '1',
        type: 'Travel',
        name: 'Flight Delay Insurance',
        summary: '$2/day, $100 payout',
        icon: <Plane className="w-12 h-12 text-blue-500" />,
        riskLevel: 2,
        dailyRate: 2,
        payoutAmount: 100,
    },
    {
        id: '2',
        type: 'Electronics',
        name: 'Smartphone Protection',
        summary: '$5/month, $500 coverage',
        icon: <Smartphone className="w-12 h-12 text-green-500" />,
        riskLevel: 3,
        dailyRate: 5,
        payoutAmount: 500,
    },
    {
        id: '3',
        type: 'Luggage',
        name: 'Baggage Loss Cover',
        summary: '$3/day, $750 payout',
        icon: <Luggage className="w-12 h-12 text-purple-500" />,
        riskLevel: 4,
        dailyRate: 3,
        payoutAmount: 750,
    },
    {
        id: '4',
        type: 'Travel',
        name: 'Trip Cancellation',
        summary: '$4/day, $1000 payout',
        icon: <Plane className="w-12 h-12 text-red-500" />,
        riskLevel: 5,
        dailyRate: 4,
        payoutAmount: 1000,
    },
    {
        id: '5',
        type: 'Electronics',
        name: 'Laptop Insurance',
        summary: '$6/month, $1500 coverage',
        icon: <Smartphone className="w-12 h-12 text-indigo-500" />,
        riskLevel: 3,
        dailyRate: 6,
        payoutAmount: 1500,
    },
    {
        id: '6',
        type: 'Luggage',
        name: 'Luggage Delay Protection',
        summary: '$2/day, $250 payout',
        icon: <Luggage className="w-12 h-12 text-orange-500" />,
        riskLevel: 2,
        dailyRate: 2,
        payoutAmount: 250,
    }
];

export default function InsuranceMarketplace() {
    const { tailwindClasses, typography } = useTheme();
    const [activeTab, setActiveTab] = useState('home');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [riskLevel, setRiskLevel] = useState<number[]>([2]);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    // Filter products based on selected types and risk level
    const filteredProducts = insuranceProducts.filter(product =>
        (selectedTypes.length === 0 || selectedTypes.includes(product.type)) &&
        product.riskLevel <= riskLevel[0]
    );

    return (
        <div className={`min-h-screen ${tailwindClasses.backgroundLight} ${typography.fontFamily}`}>
            {/* Header Navigation */}
            <MainHeader
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 grid md:grid-cols-4 gap-6">
                {/* Sidebar Filters */}
                <div className="md:col-span-1 space-y-6">
                    <SidebarFilters
                        selectedTypes={selectedTypes}
                        onTypesChange={setSelectedTypes}
                        riskLevel={riskLevel}
                        onRiskLevelChange={setRiskLevel}
                    />

                    <QuickActionsSidebar />
                </div>

                {/* Product Grid */}
                <div className="md:col-span-3">
                    <ProductGrid
                        products={filteredProducts}
                        onProductSelect={setSelectedProduct}
                    />
                </div>
            </div>

            {/* Footer */}
            <MainFooter />

            {/* Insurance Details Modal */}
            {selectedProduct && (
                <InsuranceDetailsModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}