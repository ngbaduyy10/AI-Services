import { LayoutDashboard, MessageSquareMore, Image, Video, Music, Code, Settings } from 'lucide-react';

export const sidebarLinks = [
    {
        route: "/dashboard",
        label: "Dashboard",
        logo: LayoutDashboard,
    },
    {
        route: "/conversation",
        label: "Conversation",
        logo: MessageSquareMore,
    },
    {
        route: "/image",
        label: "Image Generation",
        logo: Image,
    },
    {
        route: "/video",
        label: "Video Generation",
        logo: Video,
    },
    {
        route: "/music",
        label: "Music Generation",
        logo: Music,
    },
    {
        route: "/code",
        label: "Code Generation",
        logo: Code,
    },
    {
        route: "/settings",
        label: "Settings",
        logo: Settings,
    },
];