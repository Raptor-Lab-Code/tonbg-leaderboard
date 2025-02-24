import LBRow from "@/components/LBRow";
import { useEffect, useState } from "react";

export default function SeasonalLeaderboard() {
    const [ranks, setRanks] = useState([]);
    useEffect(() => {
        document.title = "TON BG - Community Tournament";
    }, []);

    useEffect(() => {
        const fetchLB = async () => {
            const result = await fetch(`https://api.tonbg.com/leaderboards/global/Season%201_leaderboard.json`)
                .then(res => res.json());
            console.log(result.Leaderboard);

            setRanks(result.Leaderboard)
        }
        fetchLB();
    }, []);

    return (
        <div className="w-[90%]">
            <div className="flex justify-center h-[20%] CB-title"></div>
            <div className="flex flex-col w-full h-[80%] flex-1 items-center justify-start gap-2 overflow-y-auto scrollbar-hide">
                {ranks.map((rank: any, index) => (
                    <LBRow className="text-yellow-400" key={index} rank={index + 1} name={rank.PlayerName} logo={''} score={rank.Points} />
                ))}
            </div>
        </div>
    );
}