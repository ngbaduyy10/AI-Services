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

export const amountOptions = [
    { value: "1", label: "1 Photo" },
    { value: "2", label: "2 Photos" },
    { value: "3", label: "3 Photos" },
    { value: "4", label: "4 Photos" },
];

export const resolutionOptions = [
    { value: "256x256", label: "256x256" },
    { value: "512x512", label: "512x512" },
    { value: "1024x1024", label: "1024x1024" },
];