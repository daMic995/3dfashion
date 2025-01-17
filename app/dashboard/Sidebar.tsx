import {ChevronFirst} from "lucide-react";
import { createContext, useContext, useState} from 'react';
import Link from 'next/link';


export const SidebarContext = createContext({expanded: true});

export function SidebarItem({icon, text, active, alert, onClick}: {icon: React.ReactNode, text: string, active?: boolean, alert?: boolean, onClick: () => void}) {
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

export function Sidebar({children, user}: {children: React.ReactNode, user: {first_name: string; last_name: string; email: string }}) {
    const [expanded, setExpanded] = useState(true);

    return (
        <aside id='sidebar' className={`h-auto ${expanded? "w-64" : "w-20"} transition-all duration-200 bg-white border-r shadow-sm z-10`}>
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    {expanded && 
                    <Link href="/" className={`inline-block transition-all duration-200 flex items-center h-16 relative font-black leading-none`}>
                        <span className={`text-xl bg-clip-text ml-3 transition-all duration-200 text-transparent bg-gradient-to-r from-indigo-500 to-black`}>
                            3D Fashion.
                        </span>
                    </Link>}

                    <button onClick={() => setExpanded(!expanded)} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
                        {expanded? <ChevronFirst size={20}/> : <ChevronFirst size={20} style={{transform: "rotate(180deg)"}}/>}
                    </button>
                </div>

                <SidebarContext.Provider value={{expanded}}>
                    <ul className="flex-1 px-4">{children}</ul>
                </SidebarContext.Provider>

                <div className="border-t flex px-5 py-4">
                    <img src={`https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=${user.first_name}+${user.last_name}`}
                         className="w-10 h-10 rounded-md" alt="avatar"/>

                    <div className={`flex justify-between items-center overflow-hidden transition-all duration-200
                        ${expanded? "w-52 ml-3" : "w-0"}`}>

                        <div className="leading-4">
                            <h4 className="text-gray-600 flex font-semibold">{user.first_name}</h4>
                            <span className="text-xs text-gray-400">{user.email}</span>
                        </div>
                    </div>
                </div>
            </nav>
        </aside>
    )
}