import { useMemo } from "react";

export default function useQueryParams() {
    return useMemo(() => {
        const params = new URLSearchParams(window.location.search);
        return {
            userId: params.get("userId") || "",
            embedded: params.get("embedded") === "true",
        };
    }, []);
}
