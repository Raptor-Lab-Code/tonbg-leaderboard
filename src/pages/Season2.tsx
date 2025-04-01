import LBRow from "@/components/LBRow";
import { useEffect, useState } from "react";
import useQueryParams from "@/hooks/useQueryParams";

type Player = {
    Points: number;
    Rank: number;
}

export default function Season2() {
    const { userId, embedded } = useQueryParams();

    useEffect(() => {
        document.title = `TON BG - Season 2`;
    }, []);

    const [personal, setPersonal] = useState<Player | null>(null);
    const [ranks, setRanks] = useState<Player[]>([]);
    const [height, setHeight] = useState<number>(65);
    const [communityName, setName] = useState<string>('');

    useEffect(() => {
        const fetchLB = async () => {
            const result = await fetch(`https://api.tonbg.com/leaderboards/global/Season2_leaderboard.json`)
                .then(res => res.json());

            setRanks(result.Leaderboard);
        }
        fetchLB();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const result = await fetch(`https://api.tonbg.com/get_airdrop_points_season`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "PlayerID": userId,
                    "EventName": "Season 2"
                })
            }).then((res) => res.json());

            if (result.Rank) {
                const userData: Player = {
                    Rank: result.Rank,
                    Points: result.NewPoints
                }
                setPersonal(userData);
                setHeight(embedded ? 40 : 60);
            }
        }
        fetchUser();
    }, []);

    return (
        <div className="w-[90%]">
            <div className={`flex justify-center TON-title ${embedded ? `h-[15%] portrait:mt-16` : `h-[20%]`}`}></div>
            <div className="flex flex-col justify-start items-center text-out mb-4">
                <div className={`h-[33%] flex flex-row items-center gap-4`}>
                    <div className="text-center text-2xl">
                        Season 2
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