"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getToken } from "../auth/storage";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push('/auth')
    }
  }, [router, getToken])


  return (
    <h1>Dashboard</h1>
  )
}

export default DashboardPage;
