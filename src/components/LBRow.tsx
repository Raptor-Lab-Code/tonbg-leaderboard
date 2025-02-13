'use client'

import type { FC } from 'react';

import toOrdinal from '@/utils/toOrdinal';

export type LBRowProps = {
    rank: number,
    name: string
    logo: string
    score: number
}

const LBRow: FC<LBRowProps> = ({ rank, name, logo, score }) => (
    <div className={`flex flex-row text-center items-center bg-black bg-opacity-80 w-full justify-between p-2 border-yellow-100 border-[1px]`}>
        <div className='w-16'>{toOrdinal(rank)}</div>
        <image height={35} width={35} className='rounded-full ml-4' />
        <div className='flex flex-row justify-between w-full ml-4'>
            <div>{name}</div>
            <div>{score}</div>
        </div>
    </div>
);

export default LBRow;
