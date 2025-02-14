'use client';

import { useLocation } from "react-router-dom";
import LBRow from "@/components/LBRow";
import { useEffect, useState } from "react";

import Azara from '@public/Azara.png';
import STONfi from '@public/STON.fi.png';
import TONFrance from '@public/TON France.jpg';
import TONKeeper from '@public/TON Keeper.webp';

import testData from '../assets/CommunityTournamentTestData.json';

export default function Airdrop() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId');

    const [ranks, setRanks] = useState<typeof testData>([]);
    const [personal, setPersonal] = useState<{ rank: number, score: number, name: string }>({ rank: 3, score: 10, name: 'Test user' });

    useEffect(() => {
        const fetchLB = async () => {
            //const result = await fetch(`http://164.92.227.238/leaderboards/CommunityTournament_leaderboard.json`).then(res => res.json());
            setRanks(testData)
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
            <h1 className="text-center m-4">Community Tournament</h1>
            <LBRow rank={personal.rank} name={personal.name} logo={'/ga.png'} score={personal.score} />
            <div className="flex flex-col w-full flex-1 items-center justify-start gap-2 overflow-y-auto scrollbar-hide mt-[72px] mb-[56px]">
                {ranks.map((rank: any, index) => {
                    console.log(rank.Community)
                    return <LBRow key={index} rank={index + 1} name={rank.Community} logo={getLogo(rank.Community)} score={rank.TotalPoints} />
                })}
            </div>
        </div>
    );
}

function getLogo(community: string) {
    switch (community) {
        case 'Azara': return Azara;
        case 'STON.fi': return STONfi;
        case 'TON France': return TONFrance;
        case 'TON Keeper': return TONKeeper;
        default: return Azara;
    }
}