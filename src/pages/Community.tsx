'use client';

import { Link, useLocation } from "react-router-dom";
import LBRow from "@/components/LBRow";
import { useEffect, useState } from "react";

import testData from '../assets/CommunityTournamentTestData.json';

type Player = {
    PlayerID: string;
    Points: number;
    Rank: number;
    PlayerName?: string | null;
}

export default function Airdrop() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const userId = queryParams.get('userId');
    const community = queryParams.get('community');

    const [personal, setPersonal] = useState<{ Rank: number, Points: number, PlayerName: string, PlayerID: string } | null>(null);
    const [ranks, setRanks] = useState<Player[]>([]);
    const [height, setHeight] = useState<number>(80);

    useEffect(() => {
        const fetchLB = async () => {
            const result = await fetch(`https://api.tonbg.com/leaderboards/CommunityTournament_leaderboard.json`)
                .then(res => res.json());

            const communityData = result.find((d: any) => d.Community == community);

            console.log(communityData.Leaderboard)
            setRanks(communityData?.Leaderboard || []);

            const user = communityData?.Leaderboard.find((p: any) => p.PlayerID == userId?.toString())

            if (user) { setPersonal(user); setHeight(55) }
        }
        fetchLB();
    }, []);

    return (
        <div className="w-[90%]">
            <div className="text-center text-4xl h-[20%]">{community}</div>
            {personal && <LBRow className="mt-4 mb-4" rank={personal.Rank} name={personal.PlayerName} logo={'/ga.png'} score={personal.Points} />}
            <div style={{ height: `${height}%` }} className={`flex flex-col w-full flex-1 items-center justify-start gap-2 overflow-y-auto scrollbar-hide`}>
                {ranks.map((rank: any, index) => (
                    <Link
                        key={index}
                        to={`/Community/?community=${rank.Community}&userId=${userId}`}
                        className="w-full no-underline"
                        style={{ color: '#FFD700' }} // Gold color for text
                    >
                        <LBRow rank={index + 1} name={rank.PlayerName} logo={getLogo(rank.Community)} score={rank.Points} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

function getLogo(community: string) {
    switch (community) {
        case 'Azara': return '/Azara.png';
        case 'STON.fi': return '/STON.fi.png';
        case 'TON France': return 'TON France.jpg';
        case 'TON Keeper': return '/TON Keeper.webp';
        default: return '/Azara.png';
    }
}