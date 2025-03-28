'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/Logo.png'
import {
  Menu,
  X,
  ShieldCheck,
  Zap,
  CreditCard,
  Globe,
  CheckCircle,
  Headphones,
  Shield
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
import customerCare from "../../public/illustration/customer-care.png"
import Payment from "../../public/illustration/payment.png"
import AuthModal from './AuthModal/page';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-blue-50/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Image alt='' src={logo} className='w-18'/>
            <span className="text-xl font-bold text-blue-600">InsureNet</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/marketplace" className="text-gray-700 hover:text-blue-600 transition-colors">
              Marketplace
            </Link>
            <Link href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
              Reach us
            </Link>
            {/* <Link href="/marketplace">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">

                Get Insured
              </Button>
            </Link> */}
            <Link href="/marketplace">
  <Button 
    variant="outline" 
    className="border-blue-600 text-blue-600 hover:bg-blue-50"
    onClick={(e) => {
      e.preventDefault();
      setIsAuthModalOpen(true);
    }}
  >
    Get Insured
  </Button>
</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  {mobileMenuOpen ? <X className="h-6 w-6 text-blue-600" /> : <Menu className="h-6 w-6 text-blue-600" />}
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full h-full max-h-screen max-w-screen bg-blue-50">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-3">
                  <Image alt='' src={logo} className='w-12'/>
                    <span className="text-black">InsureNet</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Link
                    href="#marketplace"
                    className="text-gray-700 hover:text-blue-600 py-2"
                    onClick={toggleMobileMenu}
                  >
                    Marketplace
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="text-gray-700 hover:text-blue-600 py-2"
                    onClick={toggleMobileMenu}
                  >
                    How It Works
                  </Link>
                  <Link
                    href="#pricing"
                    className="text-gray-700 hover:text-blue-600 py-2"
                    onClick={toggleMobileMenu}
                  >
                    Pricing
                  </Link>
                  {/* <Link
                    href="#marketplace"
                    onClick={toggleMobileMenu}
                  >
                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                      Get Insured
                    </Button>
                  </Link> */}
                  <Link href="#marketplace" onClick={toggleMobileMenu}>
  <Button 
    className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
    onClick={(e) => {
      e.preventDefault();
      setIsAuthModalOpen(true);
    }}
  >
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
        <section className="relative bg-gradient-to-br from-blue-100 to-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-6 leading-tight">
                AI-Powered <br />
                <span className="text-blue-600">Micro-Insurance</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8 max-w-xl">
                Instant, smart insurance for travel, gadgets, and gear.
                Powered by AI and secured by blockchain technology.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="#marketplace">
                  <Button className="bg-blue-600 hover:bg-blue-700">
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
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 place-items-center gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-all bg-white border-blue-100">
                  <CardHeader className='justify-center'>
                    <div className="text-blue-600 mb-4">
                      <Image src={feature.icon} alt='alt' className='h-30 w-auto' />
                    </div>
                    <CardTitle className='text-center text-black'>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-blue-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-black mb-12">
              How InsureNet Works
            </h2>
            <Accordion type="single" collapsible className="grid md:grid-cols-2 gap-6">
              {steps.map((step, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-blue-50 rounded-lg"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex flex-col items-start w-full">
                      <div className="text-blue-600 font-bold text-6xl mb-4">
                        0{index + 1}
                      </div>
                      <h3 className="font-semibold text-black text-xl text-left mb-2">
                        {step.title}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-gray-700 text-left">
                      {step.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Customer Support Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">
                  24/7 Dedicated Support
                </h2>
                <p className="text-gray-700 mb-8">
                  Our AI-powered support team is always ready to help. From policy inquiries to instant claim processing, we're here to make your insurance experience seamless and stress-free.
                </p>
                <div className="space-y-4">
                  {supportFeatures.map((feature) => (
                    <div key={feature.title} className="flex items-center space-x-4">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                      <span className="text-black">{feature.title}</span>
                    </div>
                  ))}
                </div>
                <Button className="mt-8 bg-blue-600 hover:bg-blue-700">
                  Contact Support
                </Button>
              </div>
              <div className="hidden md:block">
                <Image
                  src={customerCare}
                  alt="Customer Support"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Risk Assessment Section */}
        <section className="py-16 bg-blue-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-black mb-6">
              Advanced Risk Assessment
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-12">
              Our cutting-edge AI analyzes multiple data points to provide the most accurate and personalized insurance coverage tailored to your unique profile.
            </p>
            <div className="grid md:grid-cols-3 gap-8 bg-white">
              {riskAssessmentFeatures.map((feature) => (
                <div key={feature.title} className="relative bg-blue-50 p-15 rounded-lg">
                  <h3 className="text-xl font-semibold text-black mb-4">{feature.title}</h3>
                  <p className="text-gray-700 mb-7">{feature.description}</p>
                  <feature.icon className="absolute h-24 w-24 bottom-0 right-0 text-blue-600/30" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Get Covered in 60 Seconds
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Protect what matters most with just a few clicks.
              No paperwork, no waiting.
            </p>
            <Link href="#marketplace">
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Start Your Insurance Journey
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-50 text-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
            <Image alt='' src={logo} className='w-13'/>
              <span className="text-xl font-bold text-black">InsureNet</span>
            </div>
            <p className="text-gray-700">
              AI-powered micro-insurance for the digital age.
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-700">
            © InsureNet. All rights reserved.
          </p>
        </div>
      </footer>
      <AuthModal 
  isOpen={isAuthModalOpen} 
  onClose={() => setIsAuthModalOpen(false)} 
/>
    </div>
  );
}

// The arrays for features, steps, supportFeatures, and riskAssessmentFeatures remain the same as in the original code
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
    description: 'Browse our comprehensive marketplace of micro-insurance options. From international travel protection to device coverage and specialized event insurance, customize your plan to match your exact needs with just a few clicks.'
  },
  {
    title: 'Quick Profile',
    description: 'Our advanced AI analyzes multiple data points in seconds, creating a personalized risk profile. By examining factors like travel history, device specifications, and real-time global risk databases, we generate a tailored insurance recommendation.'
  },
  {
    title: 'Crypto Payment',
    description: 'Complete your policy purchase using cryptocurrency through secure blockchain networks. Support for MetaMask, WalletConnect, and multiple stablecoins ensures fast, transparent, and globally accessible transactions with minimal fees.'
  },
  {
    title: 'Auto-Claim',
    description: 'Experience the future of insurance claims with our smart contract technology. Predefined claim conditions automatically trigger instant payouts directly to your wallet, eliminating paperwork, reducing processing time to minutes, not days.'
  },
];

const supportFeatures = [
  {
    icon: Headphones,
    title: 'Instant Chat Support'
  },
  {
    icon: CheckCircle,
    title: 'Quick Claim Processing'
  },
  {
    icon: Shield,
    title: 'Comprehensive Coverage Guidance'
  }
];

const riskAssessmentFeatures = [
  {
    icon: Globe,
    title: 'Global Data Analysis',
    description: 'Leverage worldwide risk databases for precise assessment.'
  },
  {
    icon: Zap,
    title: 'Real-Time Risk Scoring',
    description: 'Continuous monitoring and dynamic risk evaluation.'
  },
  {
    icon: CreditCard,
    title: 'Personalized Pricing',
    description: 'Tailored insurance rates based on individual profiles.'
  }
];