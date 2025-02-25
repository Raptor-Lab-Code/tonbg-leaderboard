import { useLocation } from "react-router-dom";

export default function useQueryParams() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId');
    const embedded = queryParams.get('embedded') === 'true';

    console.log(`userid`, userId);

    return {
        userId,
        embedded
    }
}