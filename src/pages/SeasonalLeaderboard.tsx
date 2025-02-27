import LBRow from "@/components/LBRow";
import useQueryParams from "@/hooks/useQueryParams";
import { useEffect, useState } from "react";

export default function SeasonalLeaderboard() {
    const { embedded } = useQueryParams();

    const [ranks, setRanks] = useState([]);
    useEffect(() => {
        document.title = "TON BG - Community Tournament";
    }, []);

    useEffect(() => {
        const fetchLB = async () => {
            const result = await fetch(`https://api.tonbg.com/leaderboards/global/Season%201_leaderboard.json`)
                .then(res => res.json());

            setRanks(result.Leaderboard)
        }
        fetchLB();
    }, []);

    return (
        <div className="w-[90%]">
            <div className={`flex justify-center TON-title mb-8 ${embedded ? `h-[15%] portrait:mt-16` : `h-[20%]`}`}></div>
            <div className="flex flex-col justify-start items-center text-out mb-4">
                <div className="h-[33%] flex flex-row items-center gap-4">
                    <div className="text-center text-2xl [text-shadow:_-2px_-2px_0_black,_2px_-2px_0_black,_-2px_2px_0_black,_2px_2px_0_black]">
                        Season 1
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full h-[70%] flex-1 items-center justify-start gap-2 overflow-y-auto scrollbar-hide">
                {ranks.map((rank: any, index) => (
                    <LBRow className="text-yellow-400" key={index} rank={index + 1} name={rank.PlayerName} logo={''} score={rank.Points} />
                ))}
            </div>
        </div>
    );
}