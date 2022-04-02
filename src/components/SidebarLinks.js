import React from 'react'
import {Link} from "react-router-dom"

//MAIN
function SidebarLinks() {
    return (
        <div className="grid grid-rows-4 h-main w-48 text-center text-white font-bold bg-black">
            <Link className="flex justify-around items-center duration-200 bg-red-500 hover:bg-red-400" to="/jogoDaVelha">
                Jogo da Velha
            </Link>
            <Link className="flex justify-around items-center duration-200 bg-sky-500 hover:bg-sky-400" to="/termo">
                Termo
            </Link>
            <Link className="flex justify-around items-center duration-200 bg-pink-500 hover:bg-pink-400" to="/combineTres">
                Combine 3
            </Link>
            <Link className="flex justify-around items-center duration-200 bg-lime-500 hover:bg-lime-400" to="/forca">
                Forca
            </Link>
        </div>
    );
}

export default SidebarLinks;