

import { Link, useLocation } from "react-router-dom";
import LBRow from "@/components/LBRow";
import { useEffect, useState } from "react";
import useQueryParams from "@/hooks/useQueryParams";

import testData from '../assets/CommunityTournamentTestData.json';

export default function CommunityTournament() {
    const { userId, embedded } = useQueryParams();
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
            <div className={`flex justify-center CB-title mb-8 ${embedded ? `h-[15%] portrait:mt-16`:`h-[20%]` }`}></div>
            <div className="flex flex-col w-full h-[70%] flex-1 items-center justify-start gap-2 overflow-y-auto scrollbar-hide">
                {ranks.map((rank: any, index) => (
                    <Link
                        key={index}
                        to={`/Community/?community=${rank.Community}&userId=${userId}&embedded=${embedded}`}
                        className="w-full no-underline"
                        style={{ color: '#FFD700' }} // Gold color for text
                    >
                        <LBRow rank={index + 1} name={rank.Community} logo={getLogo(rank.Community)} score={rank.TotalPoints} className="p-3" />
                    </Link>

                ))}
            </div>
        </div>
    );
}

function getLogo(community: string) {
    let picture = `/img/communities`;
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
        case 'NOT Punks': return picture + '/NotPunks.jpg';
        default: return picture + '/Azara.png';
    }
}