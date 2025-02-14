'use client';

import { Link, useLocation } from "react-router-dom";
import LBRow from "@/components/LBRow";
import { useEffect, useState } from "react";

import testData from '../assets/CommunityTournamentTestData.json';

export default function Airdrop() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId');
    const community = queryParams.get('community');
    const communityData = testData.find(d => d.Community == community)

    console.log(testData)

    const [personal, setPersonal] = useState<{ rank: number, score: number, name: string }>({ rank: 3, score: 10, name: 'Test user' });

    useEffect(() => {
        const fetchLB = async () => {
            //const result = await fetch(`http://164.92.227.238/leaderboards/CommunityTournament_leaderboard.json`).then(res => res.json());
            //setRanks(testData)
        }
        fetchLB();
    }, []);

    useEffect(() => {
        const fetchLB = async () => {
            const result = await fetch(`https://api.tonbg.com/get_tournament_points`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "PlayerID": userId,
                    "EventName": "CommunityTournament"
                })
            }).then(res => res.json());

            if (result.data) setPersonal(result);
        }
        fetchLB();
    }, []);

    return (
        <div>
            <h1 className="text-center m-4 mb-32">Community Tournament</h1>
            {/*<LBRow rank={personal.rank} name={personal.name} logo={'/ga.png'} score={personal.score} />*/}
            <div className="flex flex-col w-full flex-1 items-center justify-start gap-2 overflow-y-auto scrollbar-hide mt-[72px] mb-[56px]">
                {communityData?.Leaderboard.map((player: any, index) => {
                    return <LBRow key={index} rank={index + 1} name={player.PlayerName} logo={getLogo(community || '')} score={player.Points} />
                })}
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