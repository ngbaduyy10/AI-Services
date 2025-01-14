'use client'
import Link from 'next/link';
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-2">
            <Link href="/dashboard" className="sidebar-logo">
                Bright
            </Link>

            {sidebarLinks.map((item) => {
                const active = pathname === item.route;

                return (
                    <Link href={item.route} key={item.label} className={`sidebar-link ${active && 'bg-bank-gradient'}`}>
                        <item.logo width={24} height={24} color={active ? 'white' : 'black'} />
                        <div className={`text-[14px] font-semibold ${active ? 'text-white' : 'text-black-2'}`}>{item.label}</div>
                    </Link>
                )
            })}
        </div>
    );
}

export default Sidebar;