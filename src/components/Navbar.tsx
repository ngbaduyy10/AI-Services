import {UserButton} from "@clerk/nextjs";
import SidebarSheet from "@/components/SidebarSheet";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="md:hidden">
                <SidebarSheet />
            </div>
            <UserButton showName />
        </div>
    )
}

export default Navbar;