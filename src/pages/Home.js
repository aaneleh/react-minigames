import React from 'react'
import {Link} from "react-router-dom"

import jogoDaVelha from '../assets/JogoDaVelha.png';
import Forca from '../assets/Forca.png';
import Termo from '../assets/Termo.png';
import CombineTres from '../assets/combineTres.png';

//MAIN
function Home() {
  return (
      <div className="h-main grid grid-cols-1 grid-rows-4 lg:grid-cols-4 lg:grid-rows-1">
          <Link className="border-b-2 border-black lg:border-r-2 lg:border-b-0" to="/jogoDaVelha">
            <img className="w-full h-full object-cover object-top duration-200 hover:brightness-150" src={jogoDaVelha} alt="jogo da velha"></img>  
          </Link>

          <Link className="border-b-2 border-black lg:border-r-2 lg:border-b-0" to="/termo">
            <img className="w-full h-full object-cover object-top duration-200 hover:brightness-150" src={Termo} alt="Termo"></img>  
          </Link>

          <Link className="border-b-2 border-black lg:border-r-2 lg:border-b-0" to="/combineTres">
            <img className="w-full h-full object-cover object-top duration-200 hover:brightness-150" src={CombineTres} alt="Combine Tres"></img>  
          </Link>

          <Link className="border-b-2 border-black lg:border-r-2 lg:border-b-0" to="/forca">
            <img className="w-full h-full object-cover object-top duration-200 hover:brightness-150" src={Forca} alt="Forca"></img>  
          </Link>
      </div>
  );
}

export default Home;
