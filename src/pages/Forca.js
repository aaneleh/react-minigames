import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

function JogoDaVelha() {
    const alfabeto = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    const palavra = ['p', 'a','l','a','v','r','a'];
    const numLetras = palavra.length;
    const [tabuleiro, setTabuleiro] = useState();
    const [letrasErradas, setletrasErradas] = useState([]);
    const [numLetrasCertas, setnumLetrasCertas] = useState(0);

    /* INICIALIZANDO */
    const inicializarDisplay = () => {
        var display = [];
        for(var i = 0; i < numLetras; i++){
            display.push('_');
        }
        setTabuleiro(display);
    }
    useEffect(() => {
        inicializarDisplay()
    }, [])

    /* FUNÇÕES PRINCIPAIS */
    const chutaLetra = (chute) => {
        if (tabuleiro.includes(chute) || letrasErradas.includes(chute)){
            console.log(chute + " já foi clicado!")

        } else {
            var temLetra = false;
            for(var i = 0; i < numLetras; i++){
                if(palavra[i] == chute){
                    //ESSE SET NÃO TA FUNCIONANDO QUANDO TEM VARIAS LETRAS
                    setnumLetrasCertas(numLetrasCertas + 1);

                    console.log('a palavra tem ' + chute);

                    tabuleiro[i] = chute;
                    temLetra = true;
                    setTabuleiro([...tabuleiro]);

                    //ESSA COMPARAÇÃO NÃO TA FUNCIONANDO
                    console.log('comparação: ' + tabuleiro == palavra);
                    //CONSEQUENTEMENTE O NUMLETRAS CERTAS NÃO TA FUNCIONANDO AQUI TAMBÉM
                    if(numLetrasCertas == numLetras){
                        console.log('GANHASTE');
                    } else {
                        console.log(numLetrasCertas + ' / ' + numLetras);
                    }
                }
            }

            if(!temLetra){
                console.log('a palavra não tem ' + chute);
                letrasErradas.push(chute);
                setletrasErradas([...letrasErradas]);
                if(letrasErradas.length > 6){
                    console.log(letrasErradas);
                    console.log('PERDESTE');
                }
            }
            console.log(tabuleiro);
        }
    }
    const recebeLetra = (e) => {
        e.preventDefault();
        var chute = e.target.getAttribute('letra');
        
        // O NUMLETRAS CERTAS NÃO TA FUNCIONANDO AQUI TAMBÉM, OBVIAMENTE
        // MAS O DE LETRAS ERRADAS TA 👌
        if(7 - letrasErradas.length > 0 || tabuleiro == palavra) {
            chutaLetra(chute);
        } else {
            console.log('O jogo acabou');
        }
    }

    return (
        <div>
            <Header/>

            <main class="flex-row text-center">
                <h2 class="text-center">Forca</h2>
                
                {/* VIDAS */}
                <div class="bg-green-200">
                    Vidas: {7 - letrasErradas.length}
                </div>

                    {/* TABULEIROS */}
                <div class="bg-blue-200">
                    {tabuleiro}
                </div>

                {/* LETRAS CHUTADAS */}
                <div class="bg-red-200">
                    Letras Erradas: 
                    {letrasErradas.map((letra, index) => (
                        <p key={index}>
                            {letra} 
                        </p>
                    ))}
                </div>

                {/* TODAS AS LETRAS */}
                <div class="flex-col bg-yellow-200">
                    { alfabeto.map((letra, index) => (
                        <p class="border-black" key={index} letra={letra} onClick={recebeLetra}>
                            {letra} 
                        </p>
                    ))}
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default JogoDaVelha;