import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
interface FeatureCardProps {
    title: string;
    description: string;
    illustration: React.ReactNode;
    badge?: React.ReactNode;
    className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
    title,
    description,
    illustration,
    badge = null,
    className = ""
}) => {
    return (
        <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg  pt-0${className}`}>
            <div className="relative h-44 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
                {/* Placeholder for illustration */}
                <div className="w-44 h-44 text-primary">
                    {illustration}
                </div>
            </div>
            <CardHeader className="pb-2">
                {badge && (
                    <div className="mb-2">
                        <Badge variant="outline" className="bg-blue-600/90 text-white shadow rounded-full">
                            {badge}
                        </Badge>
                    </div>
                )}
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-sm text-gray-600">
                    {description}
                </CardDescription>
            </CardContent>
        </Card>
    );
};