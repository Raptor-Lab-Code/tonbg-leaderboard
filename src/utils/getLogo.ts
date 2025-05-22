export default function getLogo(community: string) {
    let picture = `/img/communities`;
    switch (community) {
        case 'Azara': return picture + '/Azara.png';
        case 'Elympics': return picture + '/Elympics.png';
        case 'Pluton': return picture + '/Pluton.png';
        case 'Pools Games': return picture + '/Pools Games.png';
        case 'STON.fi': return picture + '/STON.fi.png';
        case 'Titan': return picture + '/Titan.png';
        case 'TON France': return picture + '/TON France.jpg';
        case 'TON Keeper': return picture + '/TON Keeper.webp';
        case 'TON Punks': return picture + '/TON Punks.png';
        case 'NOT Punks': return picture + '/NotPunks.jpg';
        case 'Boinkers': return picture + '/Boinkers.png';
        case 'Ton Trading Bot': return picture + '/Ton_Trading_Bot.png';
        default: return picture + '/Azara.png';
    }
}