import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css'

//components
import Home from './pages/Home'
import JogoDaVelha from './pages/JogoDaVelha'
import Forca from './pages/Forca'
import Wordle from './pages/Wordle'
import CombineTres from './pages/CombineTres'

const Pagina404 = () => (
  <div>
    Caminho inválido
  </div>
)

ReactDOM.render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jogoDaVelha" element={<JogoDaVelha />} />
        <Route path="/forca" element={<Forca />} />
        <Route path="/wordle" element={<Wordle />} />
        <Route path="/combineTres" element={<CombineTres />} />
        <Route path="*" element={<Pagina404/>}/>
      </Routes>
    </BrowserRouter> ,
    document.getElementById('root')
);