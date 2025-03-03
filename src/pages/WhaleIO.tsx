import LBRow from "@/components/LBRow";
import useQueryParams from "@/hooks/useQueryParams";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function WhaleIOLeaderboard() {
    const { embedded } = useQueryParams();

    const [ranks, setRanks] = useState([]);
    useEffect(() => {
        document.title = "TON BG - Whale.io Tournament";
    }, []);

    useEffect(() => {
        const fetchLB = async () => {
            const result = await fetch(`https://api.tonbg.com/leaderboards/WhaleIO_leaderboard.json`)
                .then(res => res.json());

            setRanks(result[0].Leaderboard)
        }
        fetchLB();
    }, []);

    return (
        <div className="w-[90%]">
            <div className={`flex justify-center TON-title mb-8 ${embedded ? `h-[15%] portrait:mt-16` : `h-[20%]`}`}></div>
            <div className="flex flex-col justify-start items-center text-out mb-4">
                <div className="h-[33%] flex flex-row items-center gap-4">
                    <div className="text-center text-2xl">
                        <Link target="_blank" style={{ color: 'white' }} to="http://whalegames.gg/?start=tonbg">Whale.io</Link>
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