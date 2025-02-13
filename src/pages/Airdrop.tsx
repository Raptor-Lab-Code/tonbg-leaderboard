'use client';

import { useLocation } from "react-router-dom";
import LBRow from "@/components/LBRow";

export default function Airdrop() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Get query parameters
    const param1 = queryParams.get("param1");
    const param2 = queryParams.get("param2");

    const partners = [
        {
            partnerName: 'swagman',
            icon: '/background.jpg',
            score: 1
        },
        {
            partnerName: 'swagman',
            icon: '/background.jpg',
            score: 1
        },
        {
            partnerName: 'swagman',
            icon: '/background.jpg',
            score: 1
        },
        {
            partnerName: 'swagman',
            icon: '/background.jpg',
            score: 1
        },
    ]

    return (
        <div>
            <div className="flex flex-col w-full flex-1 items-center justify-start gap-2 overflow-y-auto scrollbar-hide mt-[72px] mb-[56px]">
                {partners.map((quest, index) =>
                    <LBRow key={index} rank={index + 1} name={quest.partnerName} logo={quest.icon} score={quest.score} />
                )}
            </div>
        </div>
    );
}
