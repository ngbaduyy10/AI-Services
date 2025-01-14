import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const SidebarSheet = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Menu height={28} width={28} className="cursor-pointer" />
            </SheetTrigger>

            <SheetContent side="left" className="bg-white w-[270px]">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

export default SidebarSheet;