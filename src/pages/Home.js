import React from 'react'
import {Link} from "react-router-dom"
import Footer from '../components/Footer'
import Header from '../components/Header'

//MAIN
function Home() {
  return (
    <div>
      <Header/>

      <main class="grid grid-cols-[repeat(auto-fit,_minmax(20rem,_2fr))] h-main text-center text-white font-bold bg-black">
          <Link class="duration-200 bg-red-600 hover:bg-red-500 " to="jogoDaVelha">
            Jogo da Velha
          </Link>
          <Link class="duration-200 bg-lime-500 hover:bg-lime-400" to="forca">
            Forca
          </Link>
          <Link class="duration-200 bg-sky-500 hover:bg-sky-400" to="wordle">
            Wordle
          </Link>
          <Link class="duration-200 bg-pink-600 hover:bg-pink-500" to="combineTres">
            Combine 3
          </Link>
      </main>

      <Footer/>
    </div>
  );
}

export default Home;
