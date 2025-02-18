'use client';

import { Link, useLocation } from "react-router-dom";
import LBRow from "@/components/LBRow";
import { useEffect, useState } from "react";

import testData from '../assets/CommunityTournamentTestData.json';

export default function CommunityTournament() {
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
            <div className="flex justify-center h-[20%] CB-title"></div>
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
    let picture = `/img/communities/`;
    switch (community) {
        case 'Azara': return picture + '/Azara.png';
        case 'Elympics': return picture + '/Elympics.png';
        case 'Pluton': return picture + '/Pluton.png';
        case 'Pools Games': return picture + '/Pools Games.png';
        case 'STON.fi': return picture + '/STON.fi.png';
        case 'Titan': return picture + '/Titan.png';
        case 'TON France': return picture + '/TON France.jpg';
        case 'TON Keeper': return picture + '/TON Keeper.webp';
        case 'TON Punks': return picture + '/TON Punks.png';
        default: return picture + '/Azara.png';
    }
}