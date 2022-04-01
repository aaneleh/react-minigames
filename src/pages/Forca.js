import React, { useEffect, useState } from 'react'
import jsonData from '../assets/palavras.json';

function Forca() {
    const alfabeto = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
    const [palavra, setPalavra] = useState([]);
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
    }
    useEffect(() => {
        criarTabuleiro() //roda essa função quando é iniciado o programa
    }, [])

    /* FUNÇÕES PRINCIPAIS */
    /* CHUTA A LETRA */
    const chutaLetra = (chute) => {
        if(!terminou){
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
        <main className="text-center h-main p-4 bg-slate-50 text-black dark:text-white dark:bg-slate-900">
            <h2 className="font-bold text-3xl">Forca</h2>
            
                <div className="mt-8 grid overflow-hidden grid-row-3 justify-center"> 
                    {/* SEÇÃO DE CIMA */}
                    <div className="w-screen overflow-hidden flex justify-around order-solid border-2 border-black dark:border-white">
                        {/* VIDAS */}
                        <div className="relative">
                            <svg width="200" height="270" viewBox="0 0 252 271" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line className="stroke-black dark:stroke-white" y1="269.054" x2="89.897" y2="269.054"strokeWidth="2"/>
                                <line className="stroke-black dark:stroke-white" x1="43.9275" y1="270.054" x2="43.9275" y2="2" strokeWidth="2"/>
                                <line className="stroke-black dark:stroke-white" x1="44.9485" y1="1.00665" x2="206.143" y2="1.00665" strokeWidth="2"/>
                                <line className="stroke-black dark:stroke-white" x1="205.143" y1="48.4206" x2="205.143" y2="2.00664" strokeWidth="2"/>
                                <line className="stroke-black dark:stroke-white" x1="167.394" y1="47.4027" x2="243.358" y2="47.4027" strokeWidth="2"/>
                                <circle className={letrasErradas.length > 0 ? 'visible stroke-black dark:stroke-white' : 'invisible'} cx="205.646" cy="69.8653" r="20.8653"  strokeWidth="2"/>
                                <line   className={letrasErradas.length > 1 ? 'visible stroke-black dark:stroke-white' : 'invisible'} x1="204.646" y1="175.559" x2="204.646" y2="91.7426"strokeWidth="2"/>
                                <line   className={letrasErradas.length > 2 ? 'visible stroke-black dark:stroke-white' : 'invisible'} x1="205.624" y1="97.583" x2="251.225" y2="143.184" strokeWidth="2"/>
                                <line   className={letrasErradas.length > 3 ? 'visible stroke-black dark:stroke-white' : 'invisible'} x1="158.293" y1="144.493" x2="205.203" y2="97.583" strokeWidth="2"/>
                                <line   className={letrasErradas.length > 4 ? 'visible stroke-black dark:stroke-white' : 'invisible'} x1="205.783" y1="175.047" x2="238.028" y2="230.897"strokeWidth="2"/>
                                <line   className={letrasErradas.length > 5 ? 'visible stroke-black dark:stroke-white' : 'invisible'} x1="171.253" y1="232.5" x2="204.423" y2="175.047"  strokeWidth="2"/>
                            </svg>
                        </div>
                        
                        <div className="h-64 w-main flex flex-col justify-around">
                            {/* TABULEIROS */}
                            <div className="text-2xl">
                                {tabuleiro}
                            </div>

                            {/* LETRAS CHUTADAS */}
                            <div className="flex justify-center font-bold text-red-600">
                                Letras Erradas: 
                                {letrasErradas.map((letra, index) => (
                                    <p key={index} className="ml-2">
                                        {letra}
                                    </p>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* SEÇÃO DO MEIO */}
                    <div className="grid grid-row-3 grid-cols-10 gap-1 m-2 border-solid border-2 border-black p-4 dark:border-white">
                        { alfabeto.map((letra, index) => (
                            <p className="cursor-pointer border-solid border-2 border-black p-2 duration-100 hover:bg-lime-300 dark:border-white"
                                key={index}
                                letra={letra}
                                onClick={recebeLetra}
                                >
                                {letra}
                            </p>
                        ))}
                    </div>

                    {/* SEÇÃO DE BAIXO */}
                    <div className="relative h-24 ">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className={foiClicada ? "visible" : "absolute invisible"}>
                                <p className="font-bold text-lime-700">Você já tentou essa letra!</p>
                            </div>
                            <div className={terminou && letrasErradas.length > 5 ? "visible" : "absolute invisible"}>
                                <div className="font-bold text-lime-700">
                                    <p> Você perdeu! </p>
                                    <p> A palavra era "
                                        {palavra.map((letra, index) => (
                                        <span key={index} className="ml-2">
                                            {letra}
                                        </span>
                                        ))}"
                                    </p>
                                </div>
                            </div>
                            <div className={terminou && letrasCertas.length === palavra.length ? "visible" : "absolute invisible"}>
                                <p className= "font-bold text-lime-700">Você ganhou!</p>
                            </div>
                        </div>
                    </div>

                    {/* ULTIMA SEÇÃO */}
                    <div className={terminou ? "visible flex justify-center" : "invisible flex justify-center"}>
                        <p onClick={criarTabuleiro} className="p-2 w-32 cursor-pointer text-center border-solid border-2 border-black duration-200 hover:bg-lime-400" >Gerar nova palavra</p>
                    </div>
                </div>
        </main>
    );
}

export default Forca;