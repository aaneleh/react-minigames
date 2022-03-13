import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

function Wordle() {
    return (
        <div>
            <Header/>
            <main>
                <h2 class="text-center">Wordle</h2>
                
                {/* https://www.dicio.com.br/palavras-com-5-letras-10/ */}
            </main>
            <Footer/>
        </div>
    );
}

export default Wordle;