import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import jsonData from '../assets/palavras.json';

function Forca() {
    const alfabeto = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];

    const [palavra, setPalavra] = useState([]);
    const [numLetras, setNumLetras] = useState(0);

    const [tabuleiro, setTabuleiro] = useState();
    const [letrasErradas, setletrasErradas] = useState([]);
    const [letrasCertas, setletrasCertas] = useState([]);
    const [terminou, setTerminou] = useState(false);
    const [foiClicada, setFoiClicada] = useState(false);

    /* INICIALIZANDO */
    const criarTabuleiro = () => {
        const posicaoAleatoria = Math.floor(Math.random() * jsonData.length);
        const palavraAleatoria = jsonData[posicaoAleatoria];

        setTerminou(false);
        setNumLetras(palavraAleatoria.length);
        setletrasErradas([]);
        setletrasCertas([]);
        setPalavra([]);
        var tabuleiro = [];
        var palavra = [];

        for(var i =0;i < palavraAleatoria.length;i++){
            palavra.push(palavraAleatoria.charAt(i));
            tabuleiro.push(' _ '); //cria um array de underlines de acordo com o numero de letras
        }

        setPalavra(palavra);
        setTabuleiro(tabuleiro); //atribui essa array ao tabuleiro
        setNumLetras(palavra.length);
        console.log("\n------------------------------------------");

        console.log("palavra aleatoria:" + palavraAleatoria);
        console.log("palavra:" + palavra);
        console.log("tabuleiro:" + tabuleiro);
        console.log("num letras:" + numLetras);
    }
    useEffect(() => {
        criarTabuleiro() //roda essa função quando é iniciado o programa
    }, [])


    /* FUNÇÕES PRINCIPAIS */
    /* CHUTA A LETRA */
    const chutaLetra = (chute) => {
        if (tabuleiro.includes(chute) || letrasErradas.includes(chute)){ //se a letra já está no tabuleiro ou nas letras erradas dá um aviso e não chuta ela
            setFoiClicada(true);
        } else { //se ainda não foi chutada continua normalmente
            setFoiClicada(false); //tira o aviso (caso tenha)
            var temLetra = false; //decide se vai perder vida ou não
            for(var i = 0; i < palavra.length; i++){ //testa a palavra chutada com todas as posições
                if(palavra[i] === chute){
                    temLetra = true;            //faz não perder vida
                    letrasCertas.push(chute);   //adiciona na lista de letras certas
                    setletrasCertas([...letrasCertas]);
                    tabuleiro[i] = chute;       //coloca a letra no tabuleiro que aparece na tela
                    setTabuleiro([...tabuleiro]);
                    if(letrasCertas.length === palavra.length){ //checa se você venceu
                        setTerminou(true);
                    }
                }
            }
            if(!temLetra){ //se não tem a perde uma vida
                letrasErradas.push(chute); //adiciona na lista de letras erradas
                setletrasErradas([...letrasErradas]);
                if(letrasErradas.length > 5){ //checa se você perdeu
                    setTerminou(true);
                }
            }
        }
    }
    /* QUANDO CLICADO PEGA A LETRA E SE PUDER CHUTA A PALAVRA */
    const recebeLetra = (e) => {
        e.preventDefault();
        var chute = e.target.getAttribute('letra');
        //console.log(letrasCertas.length + " < " + tabuleiro.length)
        chutaLetra(chute);
        /* if(6 - letrasErradas.length > 0 && letrasCertas.length < palavra.length) {
            chutaLetra(chute);
        } else {
            setTerminou(true);
        } */
    }

    return (
        <div>
            <Header/>

            <main class="text-center h-main p-4 bg-white">
                <h2 class="font-bold text-3xl">Forca</h2>
                
                    <div class="mt-8 grid overflow-hidden grid-row-3 justify-center"> 
                        {/* SEÇÃO DE CIMA */}
                        <div class="w-screen overflow-hidden flex justify-evenly order-solid border-2 border-black">
                            {/* VIDAS */}
                            <div class="relative">
                                <svg width="200" height="270" viewBox="0 0 252 271" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line y1="269.054" x2="89.897" y2="269.054" stroke="black" strokeWidth="2"/>
                                    <line x1="43.9275" y1="270.054" x2="43.9275" y2="2" stroke="black" strokeWidth="2"/>
                                    <line x1="44.9485" y1="1.00665" x2="206.143" y2="1.00665" stroke="black" strokeWidth="2"/>
                                    <line x1="205.143" y1="48.4206" x2="205.143" y2="2.00664" stroke="black" strokeWidth="2"/>
                                    <line x1="167.394" y1="47.4027" x2="243.358" y2="47.4027" stroke="black" strokeWidth="2"/>
                                    <circle class={letrasErradas.length > 0 ? 'visible' : 'invisible'} cx="205.646" cy="69.8653" r="20.8653" stroke="black" strokeWidth="2"/>
                                    <line class={letrasErradas.length > 1 ? 'visible' : 'invisible'} x1="204.646" y1="175.559" x2="204.646" y2="91.7426" stroke="black" strokeWidth="2"/>
                                    <line class={letrasErradas.length > 2 ? 'visible' : 'invisible'} x1="205.624" y1="97.583" x2="251.225" y2="143.184" stroke="black" strokeWidth="2"/>
                                    <line class={letrasErradas.length > 3 ? 'visible' : 'invisible'} x1="158.293" y1="144.493" x2="205.203" y2="97.583" stroke="black" strokeWidth="2"/>
                                    <line class={letrasErradas.length > 4 ? 'visible' : 'invisible'} x1="205.783" y1="175.047" x2="238.028" y2="230.897" stroke="black" strokeWidth="2"/>
                                    <line class={letrasErradas.length > 5 ? 'visible' : 'invisible'} x1="171.253" y1="232.5" x2="204.423" y2="175.047" stroke="black" strokeWidth="2"/>
                                </svg>

                            </div>

                            
                            <div class="h-64 w-main flex flex-col justify-around">
                                {/* TABULEIROS */}
                                <div class="text-2xl">
                                    {tabuleiro}
                                </div>

                                {/* LETRAS CHUTADAS */}
                                <div class="flex justify-center font-bold text-lime-700">
                                    Letras Erradas: 
                                    {letrasErradas.map((letra, index) => (
                                        <p key={index} class="ml-2">
                                            {letra}
                                        </p>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* SEÇÃO DO MEIO */}
                        <div class="grid grid-row-3 grid-cols-10 gap-1 m-2 border-solid border-2 border-black p-4">
                            { alfabeto.map((letra, index) => (
                                <p class="cursor-pointer border-solid border-2 border-black p-2 duration-100 hover:bg-lime-300"
                                    key={index}
                                    letra={letra}
                                    onClick={recebeLetra}
                                    >
                                    {letra}
                                </p>
                            ))}
                        </div>

                        {/* SEÇÃO DE BAIXO */}
                        <div class="relative h-24 ">
                            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div class={foiClicada ? "visible" : "absolute invisible"}>
                                    <p class="font-bold text-lime-700">Você já tentou essa letra!</p>
                                </div>
                                <div class={terminou && letrasErradas.length > 5 ? "visible" : "absolute invisible"}>
                                    <div class="font-bold text-lime-700">
                                        <p> Você perdeu! </p>
                                        <p> A palavra era "
                                            {palavra.map((letra, index) => (
                                            <span key={index} class="ml-2">
                                                {letra}
                                            </span>
                                            ))}"
                                        </p>
                                    </div>
                                </div>
                                <div class={terminou && letrasCertas.length === palavra.length ? "visible" : "absolute invisible"}>
                                    <p class= "font-bold text-lime-700">Você ganhou!</p>
                                </div>
                            </div>
                        </div>

                        {/* ULTIMA SEÇÃO */}
                        <div class={terminou ? "visible flex justify-center" : "invisible flex justify-center"}>
                            <p onClick={criarTabuleiro} class="p-2 w-32 cursor-pointer text-center border-solid border-2 border-black duration-200 hover:bg-lime-400" >Gerar nova palavra</p>
                        </div>
                    </div>
            </main>

            <Footer/>
        </div>
    );
}

export default Forca;