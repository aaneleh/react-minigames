import React from 'react'
import {Link} from "react-router-dom"

//MAIN
function Home() {
  return (
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(20rem,_2fr))] h-main text-center text-white font-bold bg-black">
          <Link className="duration-200 bg-red-600 hover:bg-red-500 " to="/jogoDaVelha">
            Jogo da Velha
          </Link>
          <Link className="duration-200 bg-lime-500 hover:bg-lime-400" to="/forca">
            Forca
          </Link>
          <Link className="duration-200 bg-sky-500 hover:bg-sky-400" to="/wordle">
            Wordle
          </Link>
          <Link className="duration-200 bg-pink-600 hover:bg-pink-500" to="/combineTres">
            Combine 3
          </Link>
      </div>
  );
}

export default Home;
