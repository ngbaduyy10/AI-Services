'use client';
import HeaderBox from "@/components/HeaderBox";
import {sidebarLinks} from "@/constants";
import {Card} from "@/components/ui/card";
import {MoveRight} from "lucide-react";
import {useRouter} from "next/navigation";

const Dashboard = () => {
    const router = useRouter();
    const dashboardLinks = sidebarLinks.filter((item) =>
        item.label !== 'Dashboard' && item.label !== 'Settings'
    );

    return (
        <div className="flex flex-col items-center gap-10">
            <HeaderBox
                title={"Explore the power of Bright AI"}
                subtext={"Transforming Your Business with Intelligent Solutions – Unlock Efficiency, Innovation, and Growth."}
                dashboard={true}
            />

            <div className="flex flex-col gap-4 w-[400px]">
                {dashboardLinks.map((item) => (
                    <Card key={item.label} className="dashboard-card" onClick={() => router.push(item.route)}>
                        <div className="flex items-center gap-3">
                            <item.logo size={24} color={'black'}/>
                            <div className="text-[16px] font-semibold text-black-2">{item.label}</div>
                        </div>
                        <MoveRight size={24} />
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;