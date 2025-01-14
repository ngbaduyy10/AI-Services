import React from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex h-screen w-full font-inter">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-4 xl:p-6">
                    {children}
                </div>
            </div>
        </main>
    )
}