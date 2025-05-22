

import { Link, useLocation } from "react-router-dom";
import LBRow from "@/components/LBRow";
import { useEffect, useState } from "react";
import useQueryParams from "@/hooks/useQueryParams";
import getLogo from "@/utils/getLogo";

import testData from '../assets/CommunityTournamentTestData.json';

export default function TONNationP1() {
    const { userId, embedded } = useQueryParams();
    const [ranks, setRanks] = useState<typeof testData>([]);

    useEffect(() => {
        document.title = "TON BG - Community Tournament";
    }, []);

    useEffect(() => {
        const fetchLB = async () => {
            const result = await fetch(`https://api.tonbg.com/leaderboards/TON%20Nation%20First%20Round_leaderboard.json`)
                .then(res => res.json());
            setRanks(result);
        }
        fetchLB();
    }, []);

    return (
        <div className="w-[90%]">
            <div className={`flex justify-center CB-title mb-8 ${embedded ? `h-[15%] portrait:mt-16`:`h-[20%]` }`}></div>
            <div className="flex flex-col w-full h-[70%] flex-1 items-center justify-start gap-2 overflow-y-auto scrollbar-hide">
                {ranks.map((rank: any, index) => (
                    <Link
                        key={index}
                        to={`/CommunityDetails/?community=${rank.Community}&userId=${userId}&embedded=${embedded}`}
                        className="w-full no-underline"
                        style={{ color: '#FFD700' }} // Gold color for text
                    >
                        <LBRow rank={index + 1} name={rank.Community} logo={getLogo(rank.Community)} score={rank.TotalPoints} className="p-3" />
                    </Link>

                ))}
            </div>
        </div>
    );
}