const HeaderBox = ({ title, subtext, dashboard } : { title: string, subtext: string, dashboard: boolean }) => {
    return (
        <div className={`w-full flex flex-col gap-3 ${dashboard && 'text-center'}`}>
            <h1 className="text-3xl font-bold font-ibm-plex-serif text-black-1">{title}</h1>
            <p className="text-sm text-gray-600">{subtext}</p>
        </div>
    )
}

export default HeaderBox;