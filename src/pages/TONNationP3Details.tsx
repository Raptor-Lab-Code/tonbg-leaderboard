import LBRow from "@/components/LBRow";
import { useEffect, useState } from "react";
import useQueryParams from "@/hooks/useQueryParams";

type Player = {
    Points: number;
    Rank: number;
}

export default function TONNationP1Details() {
    const { userId, embedded, community } = useQueryParams();

    useEffect(() => {
        document.title = `TON BG - ${community}`;
    }, []);

    const [personal, setPersonal] = useState<Player | null>(null);
    const [ranks, setRanks] = useState<Player[]>([]);
    const [height, setHeight] = useState<number>(65);
    const [communityName, setName] = useState<string>('');

    useEffect(() => {
        const fetchLB = async () => {
            const result = await fetch(`https://api.tonbg.com/leaderboards/TON%20Nation%20Third%20Round_leaderboard.json`)
                .then(res => res.json());

            const communityData = result.find((d: any) => d.Community == community);
            setName(communityData.Community)
            setRanks(communityData?.Leaderboard || []);
        }
        fetchLB();
    }, []);

    /*
    useEffect(() => {
        const fetchUser = async () => {
            const result = await fetch(`https://api.tonbg.com/get_tournament_points`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "PlayerID": userId,
                    "EventName": "Community Tournament 2"
                })
            }).then((res) => res.json());

            if (result?.data?.length > 0) {
                const score = result.data.find((score: any) => score.Community == community)
                if (score && score.Points > 0) {
                    const userData: Player = {
                        Rank: score.Rank,
                        Points: score.Points
                    }
                    setPersonal(userData);
                    setHeight(embedded ? 40 : 60);
                }
            }
        }
        fetchUser();
    }, []);
    */

    return (
        <div className="w-[90%]">
            <div className="flex flex-col justify-start items-center text-out h-[30%] mb-4">
                {!embedded && <div className="TON-Nation-title w-full h-[66%]"></div>}
                <div className={`h-[33%] flex flex-row items-center gap-4 ${`mt-16`}`}>
                    <img className="h-8" src={getLogo(communityName)} />
                    <div className="text-center text-2xl">
                        <div style={{ color: '#FFD700' }} /*href={getLink(communityName)}*/>{community}</div>
                    </div>
                </div>
            </div>
            {personal && <LBRow className="mt-4 mb-4" rank={personal.Rank} name={'You'} score={personal.Points} />}
            <div style={{ height: `${height}%` }} className={`flex flex-col w-full flex-1 items-center justify-start gap-2 overflow-y-auto scrollbar-hide`}>
                {ranks.map((rank: any, index) => (
                    <LBRow key={index} style={{ color: '#FFD700' }} className="w-full no-underline" rank={index + 1} name={rank.PlayerName} score={rank.Points} />
                ))}
            </div>
        </div>
    );
}

function getLogo(name: string) {
    return `/img/communities/TONation/${name}.png`
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