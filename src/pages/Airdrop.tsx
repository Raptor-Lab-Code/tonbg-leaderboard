'use client';

import { Link, useLocation } from "react-router-dom";
import LBRow from "@/components/LBRow";
import { useEffect, useState } from "react";

import testData from '../assets/CommunityTournamentTestData.json';

export default function Airdrop() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId');

    const [ranks, setRanks] = useState<typeof testData>([]);

    useEffect(() => {
        document.title = "TON BG - Community Tournament";
    }, []);

    useEffect(() => {
        const fetchLB = async () => {
            const result = await fetch(`https://api.tonbg.com/leaderboards/CommunityTournament_leaderboard.json`)
                .then(res => res.json())
            setRanks(result)
        }
        fetchLB();
    }, []);

    return (
        <div className="w-[90%]">
            <div className="text-center text-4xl h-[20%]">Community Tournament</div>
            <div className="flex flex-col w-full h-[80%] flex-1 items-center justify-start gap-2 overflow-y-auto scrollbar-hide">
                {ranks.map((rank: any, index) => (
                    <Link
                        key={index}
                        to={`/Community/?community=${rank.Community}&userId=${userId}`}
                        className="w-full no-underline"
                        style={{ color: '#FFD700' }} // Gold color for text
                    >
                        <LBRow rank={index + 1} name={rank.Community} logo={getLogo(rank.Community)} score={rank.TotalPoints} />
                    </Link>

                ))}
            </div>
        </div>
    );
}

function getLogo(community: string) {
    console.log(community)
    switch (community) {
        case 'Azara': return '/Azara.png';
        case 'STON.fi': return '/STON.fi.png';
        case 'TON France': return '/TON France.jpg';
        case 'TON Keeper': return '/TON Keeper.webp';
        default: return '/Azara.png';
    }
}