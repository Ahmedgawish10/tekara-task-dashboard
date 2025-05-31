"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
export default function DashboardLayout({ children }) {
  const router = useRouter();

  // check if the user is not authenticated redirect to login page for every time route this page(protected route)
  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  //    handle logout func
  const handleLogout = () => {
    Cookies.remove("auth_token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* nav bar for dashboard */}
      <div className="container mx-auto px-5">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <span className="text-xl font-semibold">Dashboard</span>
              </div>
              <div className="flex items-center">
                <Button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 cursor-pointer"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
