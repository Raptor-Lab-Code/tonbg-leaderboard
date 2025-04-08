import LBRow from "@/components/LBRow";
import JoinBtn from "@/components/JoinBtn";
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
            const result = await fetch(`https://api.tonbg.com/get_all_seasons_airdrop_points/${userId}`).then((res) => res.json());
            const data = result.Season2;

            if (data && data.Rank) {
                const userData: Player = {  
                    Rank: data.Rank,
                    Points: data.NewPoints
                }
                setPersonal(userData);
            }
        }
        fetchUser();
    }, []);

    return (
        <div className="w-[90%] h-screen flex flex-col p-4">
            <JoinBtn/>
            <div className="flex flex-col justify-start items-center mb-4">
                <div className={`flex flex-row items-center gap-4`}>
                    <div className="text-center text-2xl">
                        Season 2
                    </div>
                </div>
            </div>
            {personal && <LBRow className="mb-4" rank={personal.Rank} name={'You'} score={personal.Points} />}
            <div className={`flex flex-col flex-grow w-full h-full items-center justify-start overflow-y-auto scrollbar-hide`}>
                {ranks.map((rank: any, index) => (
                    <LBRow key={index} style={{ color: '#FFD700' }} className="w-full no-underline" rank={index + 1} name={rank.PlayerName} score={rank.Points} />
                ))}
            </div>
        </div>
    );
}