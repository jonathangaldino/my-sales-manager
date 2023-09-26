"use client";

import { useEffect } from "react";
import { getToken } from "../../auth/storage";

const DashboardPage = () => {

  useEffect(() => {
    const token = getToken();

    if (!token) {
      // router.push('/auth')
    }
  }, [])


  return (
    <h1>Dashboard</h1>
  )
}

export default DashboardPage;
