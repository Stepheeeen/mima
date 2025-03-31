// ComingSoonModal.jsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import comingSoon from "../../../public/illustration/coming_soon.png"
import Image from 'next/image';

interface ComingSoonModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ isOpen, setIsOpen }) => {
    const [email, setEmail] = React.useState("");
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Here you would typically handle the email submission
        // For example, sending it to your API or a newsletter service
        console.log("Email submitted:", email);
        setIsSubmitted(true);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Coming Soon!</DialogTitle>
                </DialogHeader>

                <div className="flex items-center justify-center py-4">
                    <Image alt='coming soon' src={comingSoon} />
                </div>
                <DialogDescription className="text-gray-500">
                    We're working hard to bring you something amazing.
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};