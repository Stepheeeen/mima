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
import { insuranceProducts } from '@/mock-database/db';

// Insurance products data


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
            <MainHeader onRiskLevelChange={setRiskLevel} onTypesChange={setSelectedTypes} riskLevel={riskLevel} selectedTypes={selectedTypes} />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 md:grid flex flex-col-reverse md:grid-cols-4 gap-6">
                {/* Sidebar Filters */}
                <div className="md:col-span-1 space-y-6 hidden md:grid">
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