import React, {useState} from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";

//icones
import dark from '../assets/dark_mode_black_24dp.svg';
import light from '../assets/light_mode_black_24dp.svg';

//componentes
import Header from '../components/Header';
import Footer from '../components/Footer';

//paginas
import Home from './Home'
import JogoDaVelha from './JogoDaVelha'
import Forca from './Forca'
import Termo from './Termo'
import CombineTres from './CombineTres'

const Pagina404 = () => (
    <div>
        Caminho inválido
    </div>
)

function Main() {
    const [modo, setModo] = useState('light');

    const ToogleModo = () => {
        if(modo === "light"){
            setModo("dark");
        } else {
            setModo("light");
        }
    }

    return (
        <BrowserRouter>
            <img
                className="bg-black cursor-pointer h-9 absolute z-50 right-4 top-3"
                src={modo === "dark" ? light : dark}
                onClick={ToogleModo}
                alt={modo === "dark" ? "light mode icon" : "dark mode icon" }
                >
            </img>

            <div className={modo}>
                <div className="relative">
                    <Header/>

                    <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/jogoDaVelha" element={<JogoDaVelha />} />
                    <Route path="/forca" element={<Forca />} />
                    <Route path="/termo" element={<Termo />} />
                    <Route path="/combineTres" element={<CombineTres />} />
                    <Route path="*" element={<Pagina404/>}/>
                    </Routes>

                    <Footer/>
                </div>
            </div>
        </BrowserRouter> 
    );  
}

export default Main;