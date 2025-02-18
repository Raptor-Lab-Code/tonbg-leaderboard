

import { Link, useLocation } from "react-router-dom";
import LBRow from "@/components/LBRow";
import { useEffect, useState } from "react";

const testData = [
    { PlayerID: "123458999", PlayerName: "Dev", Points: 84, Rank: 1 },
    { PlayerID: "123458999", PlayerName: "Test 1", Points: 82, Rank: 2 },
    { PlayerID: "123458999", PlayerName: "Test 2", Points: 72, Rank: 3 },
    { PlayerID: "123458999", PlayerName: "Test 3", Points: 60, Rank: 4 },
    { PlayerID: "123458999", PlayerName: "Test 4", Points: 57, Rank: 5 },
    { PlayerID: "123458999", PlayerName: "Test 5", Points: 56, Rank: 6 },
    { PlayerID: "123458999", PlayerName: "Test 6", Points: 45, Rank: 7 },
    { PlayerID: "123458999", PlayerName: "Test 7", Points: 23, Rank: 8 },
    { PlayerID: "123458999", PlayerName: "Test 8", Points: 14, Rank: 9 },
    { PlayerID: "123458999", PlayerName: "Test 9", Points: 3, Rank: 10 },
]

type Player = {
    PlayerID: string;
    Points: number;
    Rank: number;
    PlayerName?: string | null;
}

export default function CommunityDetail() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const userId = queryParams.get('userId');
    const community = queryParams.get('community');

    useEffect(() => {
        document.title = `TON BG - ${community}`;
    }, []);

    const [personal, setPersonal] = useState<{ Rank: number, Points: number, PlayerName: string, PlayerID: string } | null>(null);
    const [ranks, setRanks] = useState<Player[]>([]);
    const [height, setHeight] = useState<number>(80);
    const [communityName, setName] = useState<string>('');

    useEffect(() => {
        const fetchLB = async () => {
            const result = await fetch(`https://api.tonbg.com/leaderboards/CommunityTournament_leaderboard.json`)
                .then(res => res.json());

            const communityData = result.find((d: any) => d.Community == community);
            setName(communityData.Community)
            setRanks(communityData?.Leaderboard || []);
            //setRanks(testData);

            const user = communityData?.Leaderboard.find((p: any) => p.PlayerID == userId?.toString())

            if (user) { setPersonal(user); setHeight(55) }
        }
        fetchLB();
    }, []);

    return (
        <div className="w-[90%]">
            <div className="flex justify-center items-center text-out h-[20%] CB-title">
                <div className="text-center text-4xl
                [text-shadow:_-2px_-2px_0_black,_2px_-2px_0_black,_-2px_2px_0_black,_2px_2px_0_black]">{community}</div>
            </div>
            {personal && <LBRow className="mt-4 mb-4" rank={personal.Rank} name={personal.PlayerName} score={personal.Points} />}
            <div style={{ height: `${height}%` }} className={`flex flex-col w-full flex-1 items-center justify-start gap-2 overflow-y-auto scrollbar-hide`}>
                {ranks.map((rank: any, index) => (
                    <LBRow style={{ color: '#FFD700' }} className="w-full no-underline" rank={index + 1} name={rank.PlayerName} score={rank.Points} />
                ))}
            </div>
        </div>
    );
}