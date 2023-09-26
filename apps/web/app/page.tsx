"use client"

import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { getToken } from "./auth/storage";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push('/auth')
    }
  }, [router, getToken])
  

  return (
    <Suspense>
      <div>
        <button>Login</button>
      </div>
    </Suspense>
  );
}
