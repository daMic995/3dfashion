"use client"
import { LifeBuoy, Receipt, Bell, Package, LayoutDashboard, Settings, Pencil, Ruler} from "lucide-react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useContext, useState, useEffect } from "react";

import { useRouter, useSearchParams } from 'next/navigation';
import { Sidebar, SidebarItem, SidebarContext } from './sidebar';

import { ThreeCircles } from 'react-loader-spinner';
import { MdOutlineFileDownload } from "react-icons/md";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Loader = () => {
    return (
        <div className='flex items-center justify-center'>
            <ThreeCircles color="#6366F1" height={60} width={60} />
        </div>
    );
}

export default function Dashboard() {
    const [user, setUser] = useState<{first_name: string; last_name: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeItem, setActiveItem] = useState<string>('Dashboard');
    const {expanded} = useContext(SidebarContext);

    // Initialize router
    const router = useRouter();

    interface Measurements {
        [bodyPart: string]: { [key: string]: { measurement: number; unit: string; provided: boolean } };
    };

    const [measurements, setMeasurements] = useState<Measurements | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userId = localStorage.getItem('user_id');
        
            const bodyMeasurements = localStorage.getItem('measurements');
            if (bodyMeasurements) {
                setMeasurements(JSON.parse(bodyMeasurements));
            }

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
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white">
                <div className='flex flex-col'>
                    <h1 className="text-2xl lg:md:text-3xl font-bold mb-8">Redirecting to Dashboard...</h1>
                    <Loader />
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white">
                <div className='flex flex-col'>
                    <h1 className="text-2xl lg:md:text-3xl font-bold mb-8">Failed to load user info</h1>
                    <button className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700'
                    onClick={() => router.push('/login')}>Login</button>
                </div>
            </div>
        );
    }

    // Handle tab switch
    const handleItemClick = (item: string) => {
        setActiveItem(item);
    };

    // Get search params from url
    const searchParams = useSearchParams();
    console.log(searchParams);
    const tab = searchParams.get('tab');
    // Check if tab is in search params url
    if (tab) {
        setActiveItem(tab);
    };

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'New Connections',
                data: [0, 0, 0, 0, 0, 0, 0],
                fill: true,
                backgroundColor: 'rgb(69, 3, 101)',
                borderColor: 'rgba(192, 128, 223, 0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Line Chart',
            },
        },
    };

    return (
        <SidebarContext.Provider value={{expanded}}>
            <div className="flex w-full overflow-hidden-x">
                <Sidebar user={user}>
                    <SidebarItem icon={<LayoutDashboard size={20}/>} text="Dashboard" active={activeItem === "Dashboard"} onClick={() => handleItemClick("Dashboard")}/>
                    <SidebarItem icon={<Pencil size={20}/>} text="Designs" active={activeItem === "Designs"} onClick={() => handleItemClick("Designs")}/>
                    <SidebarItem icon={<Ruler size={20}/>} text="Measurement" active={activeItem === "Measurements"} onClick={() => handleItemClick("Body Measurements")}/>
                    <SidebarItem icon={<Package size={20}/>} text="Orders" active={activeItem === "Orders"} onClick={() => handleItemClick("Orders")} alert/>
                    <SidebarItem icon={<Receipt size={20}/>} text="Billings" active={activeItem === "Billings"} onClick={() => handleItemClick("Billings")}/>

                    <hr className="my-3"/>

                    <SidebarItem icon={<Settings size={20}/>} text="Settings" active={activeItem === "Settings"} onClick={() => handleItemClick("Settings")} />
                    <SidebarItem icon={<LifeBuoy size={20}/>} text="Help" active={activeItem === "Help"} onClick={() => handleItemClick("Help")}/>
                </Sidebar>
                
                <div id ="content" className={`flex-1 flex flex-col border-outline shadow-sm ${expanded ? "w-full" : "w-64"}`}>
                    <header className="flex justify-between items-center py-4 px-6 bg-white border-b">
                        <h2 className="font-semibold text-lg">{activeItem}</h2>
                        <div className="flex items-center p-2">
                            <button className="text-gray-500 hover:text-gray-600 mr-4">
                                <Bell size={25}/>
                            </button>
                            <div className="ml-4">
                                <a href="/logout" className="px-5 py-3 rounded font-bold text-sm leading-none bg-indigo-700 text-white w-full inline-block text-center relative">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 h-full overflow-y-auto bg-gray-100 mb-full">
                        {/* Dashboard */}
                        {activeItem === "Dashboard" &&
                        <div className="p-6 transform transition-all duration-700">
                            <h3 className="text-lg text-center font-semibold p-6 mb-4">Welcome, {user.first_name}!</h3>
                            
                            <div className="bg-white h-full shadow-md rounded-lg p-6 m-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-lg font-semibold mb-4">3D Avatar</h4>
                                        <p className="text-gray-600">View your most recent 3D avatar</p>
                                    </div>
                                    <div className="mt-4 style" style={{height: "50vh"}}>
                                        {/* Model Goes Here */}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6 h-96">
                                <div className="bg-white h-full shadow-md rounded-lg p-6 m-2">
                                    <h4 className="text-lg font-semibold mb-4">Community Growth</h4>
                                    <hr className="my-3"/>
                                    <Line data={data} options={options} />
                                </div>
                                <div className="bg-white h-full shadow-md rounded-lg p-6 m-2">
                                    <h4 className="text-lg font-semibold mb-4">Chats</h4>
                                    <hr className="my-3"/>
                                    <div>
                                        <p className="text-gray-600">Your chats will be displayed here...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }

                        {/* Designs */}
                        {activeItem === "Designs" &&
                        <div className="p-6 text-center">
                            <h3 className="text-lg font-semibold p-6 mb-4"> View and manage all your designs in one place</h3>
                            <div className="bg-white shadow-md rounded-lg p-6 m-4">
                                <div className="grid grid-cols-2 gap-4" style={{height: "80vh"}}>
                                    <div className="flex flex-col justify-center items-center p-4 m-6 rounded-lg shadow-md hover:shadow-xl cursor-pointer">
                                        {/* Model Goes Here */}
                                    </div>
                                    <div className="flex flex-col justify-center items-center p-4 m-6 rounded-lg shadow-md hover:shadow-xl cursor-pointer">
                                        {/* Model Goes Here */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        }

                        {/* Body Measurements */}
                        {(activeItem === "Measurements") &&
                        <div className="p-6 text-center">
                            <h3 className="text-lg font-semibold p-6 mb-4">Access your AI Generated Body Measurements</h3>
                            {measurements ?
                            <div className="flex flex-col text-left bg-white rounded-lg p-8 m-4">
                                <h1 className="justify-end text-right">
                                    <MdOutlineFileDownload size={30} className="inline-block mr-2 cursor-pointer text-gray-600"/>
                                </h1>
                                <div className="grid grid-cols-2 gap-2">

                            {Object.keys(measurements).map((part) => {
                                return (
                                    <div key={part}>
                                        <table>
                                            <tr>
                                                <th colSpan={2} className="text-xl font-semibold pb-4">{part}</th>
                                            </tr>
                                            <tr className="text-gray-600 border-indigo-600 border ml-2">
                                                <td className="pt-4 pb-4 pl-2" style={{width: "80%"}}>Measurement</td>
                                                <td>Value</td>
                                            </tr>                                   
                                            {Object.keys(measurements[part]).map((key) => {
                                                return (
                                                    <tr key={key} className="border-b">
                                                        <td className="pt-4 pb-4 pl-2">{key}</td>
                                                        <th className="pt-4 pb-4">{measurements[part][key].measurement} {measurements[part][key].unit}</th>
                                                    </tr>
                                                );
                                            })}
                                        </table>
                                    </div>
                                )
                            })}
                                </div>
                                
                            </div> :
                            <div>
                                <h4 className="text-lg text-gray-600 mb-8">No measurements available</h4>
                                <button className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700'
                                onClick={() => router.push('/upload')}>Get Body Measurements</button>
                            </div>
                            }
                        </div>
                        }
                    </main>
                </div>
            </div>
        </SidebarContext.Provider>
    )
}