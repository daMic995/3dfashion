"use client"
import { LifeBuoy, Receipt, Bell, UserCircle, Package, LayoutDashboard, Settings, Pencil, Ruler, ChevronFirst, MoreVertical } from "lucide-react";
import { createContext, useContext, useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SidebarContext = createContext({expanded: true});

function Sidebar({children, user}: {children: React.ReactNode, user: { id: string; name: string; email: string }}) {
    const [expanded, setExpanded] = useState(true);

    return (
        <aside className={`h-screen ${expanded? "w-64" : "w-20"} transition-all duration-200 bg-white border-r shadow-sm`}>
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <Link href="/">
                        <img src="/3dfashion.png" alt="" 
                            className={`overflow-hidden transition-all duration-200 h-16
                            ${expanded? "w-16" : "w-0"}`}/>
                    </Link>
                    <button onClick={() => setExpanded(!expanded)} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
                        {expanded? <ChevronFirst size={20}/> : <ChevronFirst size={20} style={{transform: "rotate(180deg)"}}/>}
                    </button>
                </div>

                <SidebarContext.Provider value={{expanded}}>
                    <ul className="flex-1 px-4">{children}</ul>
                </SidebarContext.Provider>

                <div className="border-t flex px-5 py-4">
                    <img src={`https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=${user.name.replace(" ", "+")}`}
                         className="w-10 h-10 rounded-md" alt="avatar"/>

                    <div className={`flex justify-between items-center overflow-hidden transition-all duration-200
                        ${expanded? "w-52 ml-3" : "w-0"}`}>

                        <div className="leading-4">
                            <h4 className="text-gray-600 flex font-semibold">{user.name}</h4>
                            <span className="text-xs text-gray-400">{user.email}</span>
                        </div>
                        <MoreVertical size={20}/>
                    </div>
                </div>
            </nav>
        </aside>
    )
}

function SidebarItem({icon, text, active, alert, onClick}: {icon: React.ReactNode, text: string, active?: boolean, alert?: boolean, onClick: () => void}) {
    const {expanded} = useContext(SidebarContext);

    return (
        <li onClick={onClick} className={`
            relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer 
            transition-colors group
            ${active ? "bg-gradient-to-r from-indigo-200 to-indigo-100 text-indigo-800" 
            : "hover:bg-indigo-50 text-gray-600"}`}>

            {icon}
            <span className={`overflow-hidden transition-all
                        ${expanded ? "w-52 ml-3" : "w-0"}`}>
                {text}
            </span>

            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 
                ${ expanded ? "" : "top-2"}`}/>
            )}
            
            {!expanded && 
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6
                bg-indigo-100 text-sm text-indigo-800 invisible opacity-20 -translate-x-3 transition-all
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            }
        </li>
    )
}

export default function Dashboard() {
    const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userId = localStorage.getItem('user_id');
            console.log(userId);
            if (!userId) {
                router.push('/login');
                return;
            }

            try {
                const response = await fetch(`/api/python/authenticate/?user_id=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setUser(data.user_info);
                } else {
                    // Handle unauthorized access
                    router.push('/login');
                }
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Failed to load user info</div>;
    }

    const handleItemClick = (item: string) => {
        setActiveItem(item);
    };

    return (
        <div className="flex w-full">
            <Sidebar user={user}>
                <SidebarItem icon={<LayoutDashboard size={20}/>} text="Dashboard" active={activeItem === "Dashboard"} onClick={() => handleItemClick("Dashboard")}/>
                <SidebarItem icon={<Pencil size={20}/>} text="Designs" active={activeItem === "Designs"} onClick={() => handleItemClick("Designs")}/>
                <SidebarItem icon={<Ruler size={20}/>} text="Measurement" active={activeItem === "Body Measurements"} onClick={() => handleItemClick("Body Measurements")}/>
                <SidebarItem icon={<Package size={20}/>} text="Orders" active={activeItem === "Orders"} onClick={() => handleItemClick("Orders")} alert/>
                <SidebarItem icon={<Receipt size={20}/>} text="Billings" active={activeItem === "Billings"} onClick={() => handleItemClick("Billings")}/>

                <hr className="my-3"/>

                <SidebarItem icon={<Settings size={20}/>} text="Settings" active={activeItem === "Settings"} onClick={() => handleItemClick("Settings")} />
                <SidebarItem icon={<LifeBuoy size={20}/>} text="Help" active={activeItem === "Help"} onClick={() => handleItemClick("Help")}/>
            </Sidebar>
            
            <div className="flex-1 flex flex-col overflow-hidden w-full">
                <header className="flex justify-between items-center py-4 px-6 bg-white border-b">
                    <h2 className="font-semibold text-lg">{activeItem}</h2>
                    <div className="flex items-center p-2">
                        <button className="text-gray-500 hover:text-gray-600 mr-4">
                            <Bell size={20}/>
                        </button>
                        <button className="text-gray-500 hover:text-gray-600">
                            <UserCircle size={20}/>
                        </button>
                        <div className="ml-4">
                            <a href="/logout" className="px-5 py-3 rounded font-bold text-sm leading-none bg-indigo-700 text-white w-full inline-block text-center relative">
                                Logout
                            </a>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Welcome, {user.name}!</h3>
                        <p className="text-gray-600">This is your dashboard page.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}