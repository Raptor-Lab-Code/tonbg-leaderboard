import { useLocation } from "react-router-dom";

export default function useQueryParams() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const userId = queryParams.get('userId');
    const embedded = queryParams.get('embedded') === 'true';
    const community = queryParams.get('community');

    return {
        userId,
        embedded,
        community
    }
}