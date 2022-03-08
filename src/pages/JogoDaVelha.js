import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

function JogoDaVelha() {

    const alfabeto = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    const palavra = ['p','a','l','a','v','r','a'];
    const numLetras = palavra.length;

    var numLetrasCertas = 0;
    //se numLetras = numLetrasCertas ganhou!

    

    var letrasErradas = [];
    var numLetrasErradas = letrasErradas.length;
    //se numLetrasErradas > 6 perdeu!

    var chute;
    //quando chutar, se palavra.includes(chute)
    //loopa por todas as letras, se palavra[i] == chute, numLetrasCertas++, atualizaDisplay(i)
    //atualizaDisplay(i) => display[i] = palavra[i]
    //transformar display em um useState

    var display = [];
    
    
    const inicializarDisplay = () => {
        for(var i = 0; i< numLetras; i++){
            display.push('_');
        }
    }

    useEffect(() => {
        inicializarDisplay()
    }, [])


    const testarLetra = (e) => {
        e.preventDefault();
        chute = e.target.getAttribute('letra');
        console.log(chute);
    }


    return (
        <div>
            <Header/>
            <main>
                <h2 class="text-center">Jogo da Velha</h2>
                
                <div class="grid text-center">
                    <div class="flex justify-between m-6">
                        <div>Vidas</div>
                        <div>{display}</div>
                    </div>
                    <div>H, J, P, L, W, Q</div>
                    <div >
                        { alfabeto.map((letra, index) => (

                            <p class="border-black" key={index} letra={letra} onClick={testarLetra}>
                                {letra} 
                            </p>

                        ))}
                    </div>
                    
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default JogoDaVelha;