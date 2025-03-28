'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Menu,
  X,
  ShieldCheck,
  Zap,
  CreditCard,
  Globe
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AiPricing from "../../public/illustration/ai-pricing.png"
import Coverage from "../../public/illustration/coverage.png"
import Payment from "../../public/illustration/payment.png"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">QuickShield</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="#marketplace" className="text-muted-foreground hover:text-primary transition-colors">
              Marketplace
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
              Reach us
            </Link>
            <Link href="#marketplace">
              <Button variant="outline">
                Get Insured
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full h-full max-h-screen max-w-screen">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-3">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                    <span>QuickShield</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Link
                    href="#marketplace"
                    className="text-muted-foreground hover:text-primary py-2"
                    onClick={toggleMobileMenu}
                  >
                    Marketplace
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="text-muted-foreground hover:text-primary py-2"
                    onClick={toggleMobileMenu}
                  >
                    How It Works
                  </Link>
                  <Link
                    href="#pricing"
                    className="text-muted-foreground hover:text-primary py-2"
                    onClick={toggleMobileMenu}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="#marketplace"
                    onClick={toggleMobileMenu}
                  >
                    <Button className="w-full mt-4">
                      Get Insured
                    </Button>
                  </Link>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative bg-gradient-to-br from-primary/10 to-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight">
                AI-Powered <br />
                <span className="text-primary">Micro-Insurance</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Instant, smart insurance for travel, gadgets, and gear.
                Powered by AI and secured by blockchain technology.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="#marketplace">
                  <Button>
                    Explore Insurance
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block rounded-md shadow">
              <video
                loop
                playsInline
                muted
                autoPlay
                preload="auto"
                className='rounded-md'
              >
                <source src="/HeroIllustrate.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="text-primary mb-4 justify-end w-full">
                      <Image src={feature.icon} alt='alt' className='h-28 w-auto'/>
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-12">
              How QuickShield Works
            </h2>
            <Accordion type="single" collapsible className="grid md:grid-cols-2 gap-6">
              {steps.map((step, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-primary/10 rounded-lg"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex flex-col items-start w-full">
                      <div className="text-primary font-bold text-4xl mb-4">
                        0{index + 1}
                      </div>
                      <h3 className="font-semibold text-foreground text-left mb-2">
                        {step.title}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-muted-foreground text-left">
                      {step.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Get Covered in 60 Seconds
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Protect what matters most with just a few clicks.
              No paperwork, no waiting.
            </p>
            <Link href="#marketplace">
              <Button variant="secondary">
                Start Your Insurance Journey
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">QuickShield</span>
            </div>
            <p className="text-muted-foreground">
              AI-powered micro-insurance for the digital age.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {['Travel Insurance', 'Gadget Protection', 'Event Coverage'].map((product) => (
                <li key={product}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Press'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'Contact Us', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-secondary-foreground/10 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 QuickShield. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Coverage,
    title: 'Global Coverage',
    description: 'Instant protection anywhere in the world.',
  },
  {
    icon: AiPricing,
    title: 'AI-Powered Pricing',
    description: 'Smart, fair pricing based on your profile.',
  },
  {
    icon: Payment,
    title: 'Crypto Payments',
    description: 'Pay securely with MetaMask or WalletConnect.',
  },
];

const steps = [
  {
    title: 'Select Coverage',
    description: 'Choose from travel, device, or event insurance.'
  },
  {
    title: 'Quick Profile',
    description: 'AI instantly assesses your unique risk.'
  },
  {
    title: 'Crypto Payment',
    description: 'Seamless on-chain policy activation.'
  },
  {
    title: 'Auto-Claim',
    description: 'Smart contract triggers instant payouts.'
  },
];