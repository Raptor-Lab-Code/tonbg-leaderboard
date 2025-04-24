import LBRow from "@/components/LBRow";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type Player = {
    Points: number;
    Rank: number;
}

export default function PrivateGame() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const params = Object.fromEntries(queryParams.entries());
    const { id, userId, embedded, name } = params;

    useEffect(() => { document.title = `${name} - Leaderboard`; }, []);

    const [personal, setPersonal] = useState<Player | null>(null);
    const [ranks, setRanks] = useState<Player[]>([]);
    const [height, setHeight] = useState<number>(65);

    useEffect(() => {
        const fetchLB = async () => {
            const result = await fetch(`https://api.tonbg.com/get_private_game_leaderboard?PrivateGameID=${id}`).then(res => res.json());
            console.log(result);

            setRanks(result.Leaderboard);
        }
        fetchLB();
    }, []);

    return (
        <div className="w-[90%]">
            <div className={`flex justify-center TON-title ${embedded ? `h-[15%] portrait:mt-16` : `h-[20%]`}`}></div>
            <div className="flex flex-col justify-start items-center text-out mb-4">
                <div className={`h-[33%] flex flex-row items-center gap-4`}>
                    <div className="text-center text-2xl">
                        {name} - Leaderboard
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