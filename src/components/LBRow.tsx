'use client'

import type { FC } from 'react';

import toOrdinal from '@/utils/toOrdinal';

export type LBRowProps = {
    rank: number,
    name: string,
    score: number,
    logo?: string,
    className?: string,
    style?: React.CSSProperties
}

const LBRow: FC<LBRowProps> = ({ rank, name, logo, score, className, style }) => (
    <div style={style} className={`flex flex-row text-center items-center bg-black/90 w-full justify-between p-1 border-yellow-100 border-[1px] ${className}`}>
        <div className='w-16'>{toOrdinal(rank)}</div>
        {logo && <img src={logo} height={35} width={35} className='rounded-full ml-4' />}
        <div className='flex flex-row justify-between w-full ml-4 mr-4'>
            <div title={name} className="max-[640px]:truncate max-[640px]:max-w-[70%]">{name}</div>
            <div>{score.toLocaleString()}</div>
        </div>
    </div>
);

export default LBRow;
