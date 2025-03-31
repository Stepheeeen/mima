import React from 'react'

export const ShoppingCart = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        {/* <!-- Shopping Cart --> */}
        <g transform="translate(30, 30) scale(0.9)">
            {/* <!-- Cart Body --> */}
            <path d="M40,40 L160,40 L140,100 L60,100 Z" fill="#e2e8f0" stroke="#475569" stroke-width="3" stroke-linejoin="round" />
            {/* <!-- Cart Handle --> */}
            <path d="M140,100 L150,120 Q155,125 160,120 L170,100" fill="none" stroke="#475569" stroke-width="3" stroke-linecap="round" />
            {/* <!-- Wheels --> */}
            <circle cx="80" cy="120" r="10" fill="#94a3b8" stroke="#475569" stroke-width="2" />
            <circle cx="120" cy="120" r="10" fill="#94a3b8" stroke="#475569" stroke-width="2" />
            {/* <!-- Items in cart --> */}
            <rect x="70" y="60" width="20" height="20" rx="2" fill="#cbd5e1" />
            <rect x="100" y="50" width="25" height="30" rx="2" fill="#cbd5e1" />
        </g>

        {/* <!-- Shield overlay --> */}
        <g transform="translate(100, 100) scale(0.6)">
            {/* <!-- Shield shape --> */}
            <path d="M0,-70 C20,-60 40,-65 60,-50 C70,-30 80,-10 80,30 C60,60 30,80 0,90 C-30,80 -60,60 -80,30 C-80,-10 -70,-30 -60,-50 C-40,-65 -20,-60 0,-70 Z" fill="#3b82f6" fill-opacity="0.7" stroke="#1e40af" stroke-width="3" />
            {/* <!-- Checkmark inside shield --> */}
            <path d="M-30,0 L-10,25 L40,-30" fill="none" stroke="white" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
        </g>
    </svg>
)

export const ContractCode = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        {/* <!-- Document Shape --> */}
        <path d="M50,20 L130,20 L150,40 L150,180 L50,180 Z" fill="#f1f5f9" stroke="#64748b" stroke-width="3" />
        <path d="M130,20 L130,40 L150,40" fill="none" stroke="#64748b" stroke-width="3" />

        {/* <!-- Document Lines --> */}
        <line x1="70" y1="60" x2="130" y2="60" stroke="#94a3b8" stroke-width="2" />
        <line x1="70" y1="80" x2="110" y2="80" stroke="#94a3b8" stroke-width="2" />

        {/* <!-- Code Bracket Overlay --> */}
        <g transform="translate(100, 125) scale(0.6)">
            {/* <!-- Left bracket --> */}
            <path d="M-50,-40 L-70,-20 L-50,40" fill="none" stroke="#0f172a" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
            {/* <!-- Right bracket --> */}
            <path d="M50,-40 L70,-20 L50,40" fill="none" stroke="#0f172a" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />

            {/* <!-- Code symbols --> */}
            <circle cx="-20" cy="0" r="8" fill="#3b82f6" />
            <rect x="12" y="-8" width="16" height="16" fill="#3b82f6" />
            <path d="M-40,20 L40,20" stroke="#3b82f6" stroke-width="4" stroke-linecap="round" />
        </g>

        {/* <!-- Blockchain Nodes --> */}
        <g transform="translate(100, 120)">
            <circle cx="-35" cy="40" r="8" fill="#a855f7" stroke="#7e22ce" stroke-width="1.5" />
            <circle cx="0" cy="45" r="8" fill="#a855f7" stroke="#7e22ce" stroke-width="1.5" />
            <circle cx="35" cy="40" r="8" fill="#a855f7" stroke="#7e22ce" stroke-width="1.5" />

            {/* <!-- Connection lines --> */}
            <line x1="-35" y1="40" x2="0" y2="45" stroke="#7e22ce" stroke-width="1.5" />
            <line x1="0" y1="45" x2="35" y2="40" stroke="#7e22ce" stroke-width="1.5" />
        </g>
    </svg>
)

export const AIBrain = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        {/* <!-- Brain outline --> */}
        <path d="M100,30 
           C130,30 140,50 140,70 
           C160,70 170,90 165,110 
           C175,120 170,140 160,145
           C165,160 155,170 140,170
           C130,180 110,180 100,170
           C90,180 70,180 60,170
           C45,170 35,160 40,145
           C30,140 25,120 35,110
           C30,90 40,70 60,70
           C60,50 70,30 100,30Z"
            fill="#f0fdfa" stroke="#0d9488" stroke-width="3" />

        {/* <!-- Circuit paths --> */}
        <path d="M60,70 L70,80 L80,70 L90,90 L100,70 L110,90 L120,70 L130,80 L140,70"
            fill="none" stroke="#0d9488" stroke-width="2" stroke-linecap="round" />
        <path d="M40,110 L60,110 L70,100 L80,120 L90,100 L100,120 L110,100 L120,120 L130,100 L140,110 L160,110"
            fill="none" stroke="#0d9488" stroke-width="2" stroke-linecap="round" />
        <path d="M60,150 L70,140 L80,160 L90,140 L100,160 L110,140 L120,160 L130,140 L140,150"
            fill="none" stroke="#0d9488" stroke-width="2" stroke-linecap="round" />

        {/* <!-- Circuit nodes --> */}
        <circle cx="70" cy="80" r="3" fill="#0d9488" />
        <circle cx="90" cy="90" r="3" fill="#0d9488" />
        <circle cx="110" cy="90" r="3" fill="#0d9488" />
        <circle cx="130" cy="80" r="3" fill="#0d9488" />

        <circle cx="60" cy="110" r="3" fill="#0d9488" />
        <circle cx="80" cy="120" r="3" fill="#0d9488" />
        <circle cx="100" cy="120" r="3" fill="#0d9488" />
        <circle cx="120" cy="120" r="3" fill="#0d9488" />
        <circle cx="140" cy="110" r="3" fill="#0d9488" />

        <circle cx="70" cy="140" r="3" fill="#0d9488" />
        <circle cx="90" cy="140" r="3" fill="#0d9488" />
        <circle cx="110" cy="140" r="3" fill="#0d9488" />
        <circle cx="130" cy="140" r="3" fill="#0d9488" />

        {/* <!-- AI data pulse effect --> */}
        <circle cx="100" cy="100" r="20" fill="#0891b2" fill-opacity="0.2">
            <animate attributeName="r" values="15;25;15" dur="2s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* <!-- Digital elements --> */}
        <text x="95" y="105" font-family="monospace" font-size="12" fill="#0891b2" font-weight="bold">AI</text>
    </svg>
)

export const ClockCheck = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        {/* <!-- Clock face --> */}
        <circle cx="100" cy="100" r="70" fill="#f8fafc" stroke="#64748b" stroke-width="3" />
        <circle cx="100" cy="100" r="5" fill="#64748b" />

        {/* <!-- Clock border ticks --> */}
        <g stroke="#64748b" stroke-width="2">
            <line x1="100" y1="40" x2="100" y2="50" />
            <line x1="100" y1="150" x2="100" y2="160" />
            <line x1="40" y1="100" x2="50" y2="100" />
            <line x1="150" y1="100" x2="160" y2="100" />

            <line x1="129" y1="71" x2="136" y2="64" />
            <line x1="129" y1="129" x2="136" y2="136" />
            <line x1="71" y1="71" x2="64" y2="64" />
            <line x1="71" y1="129" x2="64" y2="136" />
        </g>

        {/* <!-- Clock hands --> */}
        <line x1="100" y1="100" x2="100" y2="70" stroke="#475569" stroke-width="3" stroke-linecap="round">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 100 100" to="360 100 100" dur="60s" repeatCount="indefinite" />
        </line>
        <line x1="100" y1="100" x2="130" y2="100" stroke="#475569" stroke-width="3" stroke-linecap="round">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 100 100" to="360 100 100" dur="3600s" repeatCount="indefinite" />
        </line>

        {/* <!-- Checkmark overlay --> */}
        <g transform="translate(140, 140) scale(0.7)">
            <circle cx="0" cy="0" r="30" fill="#22c55e" fill-opacity="0.8" />
            <path d="M-15,0 L-5,10 L15,-10" fill="none" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        </g>

        {/* <!-- Real-time data stream --> */}
        <g transform="translate(0, 0)">
            <path d="M25,100 C35,90 45,110 55,90 C65,70 75,130 85,110"
                fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round">
                <animate attributeName="d"
                    values="M25,100 C35,90 45,110 55,90 C65,70 75,130 85,110;
                      M25,100 C35,110 45,90 55,110 C65,130 75,70 85,90;
                      M25,100 C35,90 45,110 55,90 C65,70 75,130 85,110"
                    dur="4s" repeatCount="indefinite" />
            </path>
        </g>
    </svg>
)

export const WalletShield = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        {/* <!-- Wallet body --> */}
        <rect x="30" y="60" width="140" height="90" rx="5" fill="#f1f5f9" stroke="#475569" stroke-width="3" />

        {/* <!-- Wallet top flap --> */}
        <path d="M30,60 V50 C30,45 35,40 40,40 H150 C155,40 160,45 160,50 V60" fill="#e2e8f0" stroke="#475569" stroke-width="3" />

        {/* <!-- Card slot --> */}
        <rect x="140" y="85" width="30" height="40" rx="3" fill="#cbd5e1" stroke="#475569" stroke-width="2" />

        {/* <!-- Wallet contents --> */}
        <rect x="45" y="75" width="80" height="50" rx="3" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2" />
        <text x="57" y="105" font-family="monospace" font-size="12" fill="#1e40af">CRYPTO</text>

        {/* <!-- QR code representation --> */}
        <g transform="translate(70, 115) scale(0.3)">
            <rect x="-30" y="-30" width="60" height="60" fill="#0f172a" />
            <rect x="-20" y="-20" width="10" height="10" fill="white" />
            <rect x="10" y="-20" width="10" height="10" fill="white" />
            <rect x="-20" y="10" width="10" height="10" fill="white" />
            <rect x="0" y="0" width="10" height="10" fill="white" />
        </g>

        {/* <!-- Shield overlay --> */}
        <g transform="translate(150, 75) scale(0.5) rotate(15)">
            {/* <!-- Shield shape --> */}
            <path d="M0,-40 C10,-35 20,-37 30,-30 C35,-20 40,-5 40,20 C30,35 15,45 0,50 C-15,45 -30,35 -40,20 C-40,-5 -35,-20 -30,-30 C-20,-37 -10,-35 0,-40 Z" fill="#3b82f6" fill-opacity="0.7" stroke="#1e40af" stroke-width="2.5" />
            {/* <!-- Lock symbol inside shield --> */}
            <rect x="-10" y="-5" width="20" height="15" rx="2" fill="white" />
            <path d="M-5,-5 V-15 C-5,-20 5,-20 5,-15 V-5" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" />
        </g>

        {/* <!-- Connection lines representing blockchain/security --> */}
        <g transform="translate(0, 0)" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="3,2">
            <path d="M50,140 C40,150 30,160 30,170 C30,180 40,175 50,180 C60,185 70,175 80,180" />
            <path d="M120,140 C130,150 140,160 140,170 C140,180 150,175 160,180 C170,185 180,175 170,160" />
        </g>
    </svg>
)

export const MultiCoins = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        {/* <!-- Bitcoin coin --> */}
        <g transform="translate(65, 60) scale(0.8)">
            <circle cx="0" cy="0" r="30" fill="#f7931a" stroke="#e67e22" stroke-width="2" />
            <text x="0" y="5" font-family="Arial" font-size="24" fill="white" text-anchor="middle" font-weight="bold">₿</text>
        </g>

        {/* <!-- Ethereum coin --> */}
        <g transform="translate(110, 85) scale(0.8)">
            <circle cx="0" cy="0" r="30" fill="#627eea" stroke="#3b5998" stroke-width="2" />
            <g transform="translate(0, 3) scale(0.9)">
                <path d="M0,-15 L15,5 L0,15 L-15,5 Z" fill="none" stroke="white" stroke-width="2" />
                <path d="M0,-15 L0,15" stroke="white" stroke-width="2" />
            </g>
        </g>

        {/* <!-- Stablecoin (USDC-like) --> */}
        <g transform="translate(55, 120) scale(0.8)">
            <circle cx="0" cy="0" r="30" fill="#2775ca" stroke="#1e60d6" stroke-width="2" />
            <text x="0" y="5" font-family="Arial" font-size="15" fill="white" text-anchor="middle" font-weight="bold">$</text>
        </g>

        {/* <!-- Platform token --> */}
        <g transform="translate(130, 140) scale(0.8)">
            <circle cx="0" cy="0" r="30" fill="#8b5cf6" stroke="#7c3aed" stroke-width="2" />
            <g transform="translate(0, 0) scale(0.6)">
                <polygon points="0,-20 17,-7 10,18 -10,18 -17,-7" fill="none" stroke="white" stroke-width="3" />
                <circle cx="0" cy="0" r="8" fill="white" />
            </g>
        </g>

        {/* <!-- Connection lines between coins --> */}
        <g stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,2">
            <path d="M75,75 L100,85" />
            <path d="M75,105 L90,125" />
            <path d="M110,115 L115,130" />
        </g>

        {/* <!-- Digital sparkles --> */}
        <g fill="#f8fafc">
            <circle cx="50" cy="70" r="2">
                <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="140" cy="60" r="2">
                <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="140" r="2">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="150" cy="110" r="2">
                <animate attributeName="opacity" values="1;0;1" dur="3s" repeatCount="indefinite" />
            </circle>
        </g>
    </svg>
)