// app/_components/ProtectedRoute.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login page
    } else {
      setLoading(false); // Set loading to false if authenticated
    }
  }, [router, pathname]);

  if (loading) {
    return <div>Loading...</div>; // Provide a loading state
  }

  return <>{children}</>;
}
