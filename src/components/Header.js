import React, {useState} from 'react'
import {Link} from "react-router-dom"
import SidebarLinks from './SidebarLinks'

function Header() {

    const [sidebar, setSidebar] = useState(false);
    const toggleSidebar = () => setSidebar(!sidebar);

    return (
        <div>
            <nav className={sidebar ? 'translate-x-0 fixed duration-200 z-50' : '-translate-x-full fixed duration-200 z-50'} >
                <div className="h-screen border-r-solid border-r-2 border-r-black">
                    <div className="h-16 bg-black flex items-center justify-center" onClick={toggleSidebar}>
                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                    </div>
                    <SidebarLinks/>
                </div>
            </nav>

            <header className="h-16 relative z-10 flex items-center justify-between bg-black p-4 text-white">
                <div onClick={toggleSidebar}>
                    <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                    </svg>
                </div>

                <h1 className="font-bold text-2xl ">
                    <Link to="/">
                        REACT MINIGAMES
                    </Link>
                </h1>

                <h1 className="text-transparent">.</h1>
            </header>

        </div>
    );
}

export default Header;