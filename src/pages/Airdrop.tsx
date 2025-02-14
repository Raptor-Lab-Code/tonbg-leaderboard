'use client';

import { useLocation } from "react-router-dom";
import LBRow from "@/components/LBRow";
import { useEffect, useState } from "react";

import testData from '../assets/CommunityTournamentTestData.json';

export default function Airdrop() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [ranks, setRanks] = useState<typeof testData>([]);

    useEffect(() => {
        const fetchLB = async () => {
            //const result = await fetch(`http://164.92.227.238/leaderboards/CommunityTournament_leaderboard.json`).then(res => res.json());
            setRanks(testData)
        }
        fetchLB();
    }, []); 

    /*
    useEffect(() => {
        const fetchLB = async () => {
            const result = await fetch(`https://api.tonbg.com/get_tournament_points`,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    "PlayerID": "123458999",
                    "EventName": "CommunityTournament"
                })
            }).then(res => res.json());
            setRanks(result);
            console.log(result)
        }
        fetchLB();
    }, []);
    */

    return (
        <div>
            <div className="flex flex-col w-full flex-1 items-center justify-start gap-2 overflow-y-auto scrollbar-hide mt-[72px] mb-[56px]">
                {ranks.map((rank:any , index) =>
                    <LBRow key={index} rank={index + 1} name={rank.Community} logo={'/ga.png'} score={rank.TotalPoints} />
                )}
            </div>
        </div>
    );
}
