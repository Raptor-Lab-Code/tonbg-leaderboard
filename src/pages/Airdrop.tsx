'use client';

import { useLocation } from "react-router-dom";

export default function Airdrop() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get query parameters
  const param1 = queryParams.get("param1");
  const param2 = queryParams.get("param2");

  return (
    <div>
      <h1>Airdrop Page</h1>
      <p>Param 1: {param1}</p>
      <p>Param 2: {param2}</p>
    </div>
  );
}
