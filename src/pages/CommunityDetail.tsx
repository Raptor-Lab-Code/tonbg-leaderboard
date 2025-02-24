

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
    Points: number;
    Rank: number;
}

export default function CommunityDetail() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const userId = queryParams.get('userId');
    const community = decodeURI(queryParams.get('community') || '');

    useEffect(() => {
        document.title = `TON BG - ${community}`;
    }, []);

    const [personal, setPersonal] = useState<Player | null>(null);
    const [ranks, setRanks] = useState<Player[]>([]);
    const [height, setHeight] = useState<number>(70);
    const [communityName, setName] = useState<string>('');

    useEffect(() => {
        const fetchLB = async () => {
            const result = await fetch(`https://api.tonbg.com/leaderboards/CommunityTournament_leaderboard.json`)
                .then(res => res.json());

            const communityData = result.find((d: any) => d.Community == community);
            setName(communityData.Community)
            setRanks(communityData?.Leaderboard || []);
        }
        fetchLB();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const result = await fetch(`https://api.tonbg.com/get_tournament_points`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "PlayerID": userId,
                    "EventName": "CommunityTournament"
                })
            }).then((res) => res.json());

            if (result?.data?.length > 0) {
                const score = result.data.find((score: any) => score.Community == community)

                result.data.forEach((element: any) => {
                    console.log(`${element.Community} == ${community}`, element.Community == community)
                });

                if (score) {
                    const userData: Player = {
                        Rank: score.Rank,
                        Points: score.Points
                    }
                    setPersonal(userData);
                }
            }
        }
        fetchUser();
    }, []);

    return (
        <div className="w-[90%]">
            <div className="flex flex-col justify-start items-center text-out h-[30%] mb-4">
                <div className="CB-title w-full h-[66%]"></div>
                <div className="h-[33%] flex flex-row items-center gap-4">
                    <img className="h-10" src={getLogo(communityName)} />
                    <div className="text-center text-2xl [text-shadow:_-2px_-2px_0_black,_2px_-2px_0_black,_-2px_2px_0_black,_2px_2px_0_black]">
                        <a style={{ color: '#FFD700' }} href={getLink(communityName)}>{community}</a>
                    </div>
                </div>
            </div>
            {personal && <LBRow className="mt-4 mb-8" rank={personal.Rank} name={'You'} score={personal.Points} />}
            <div style={{ height: `${height}%` }} className={`flex flex-col w-full flex-1 items-center justify-start gap-2 overflow-y-auto scrollbar-hide`}>
                {ranks.map((rank: any, index) => (
                    <LBRow key={index} style={{ color: '#FFD700' }} className="w-full no-underline" rank={index + 1} name={rank.PlayerName} score={rank.Points} />
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

function getLink(community: string) {
    switch (community) {
        case 'Elympics': return 'http://x.com/elympics_ai';
        case 'Pluton': return 'http://x.com/PlutonFinance';
        case 'Pools Games': return 'http://x.com/p00lsgames';
        case 'STON.fi': return 'http://x.com/ston_fi';
        case 'Titan': return 'http://x.com/TitanAggregator';
        case 'TON Punks': return 'http://x.com/TonPunks';
        case 'NOT Punks': return 'https://x.com/thenotpunks';
        default: return '';
    }
}