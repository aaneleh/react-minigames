import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

function Forca() {
    const alfabeto = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
    const palavra = ['a','n','d','r','e']; //quando for inicializar isso, se tiver ç transformar em c, e tirar acentos
    const numLetras = palavra.length;
    const [tabuleiro, setTabuleiro] = useState();
    const [letrasErradas, setletrasErradas] = useState([]);
    const [letrasCertas, setletrasCertas] = useState([]);
    const [terminou, setTerminou] = useState(false);
    const [foiClicada, setFoiClicada] = useState(false);


    /* INICIALIZANDO */
    const inicializarDisplay = () => {
        var tabuleiro = [];
        for(var i = 0; i < numLetras; i++){
            tabuleiro.push(' _ '); //cria um array de underlines de acordo com o numero de letras
        }
        setTabuleiro(tabuleiro); //atribui essa array ao tabuleiro
    }
    useEffect(() => {
        inicializarDisplay() //roda essa função quando é iniciado o programa
    }, [])

    /* FUNÇÕES PRINCIPAIS */
    /* CHUTA A LETRA */
    const chutaLetra = (chute) => {
        if (tabuleiro.includes(chute) || letrasErradas.includes(chute)){ //se a letra já está no tabuleiro ou nas letras erradas dá um aviso e não chuta ela
            setFoiClicada(true);
        } else { //se ainda não foi chutada continua normalmente
            setFoiClicada(false); //tira o aviso (caso tenha)
            var temLetra = false; //decide se vai perder vida ou não
            for(var i = 0; i < numLetras; i++){ //testa a palavra chutada com todas as posições
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
                if(letrasErradas.length > 6){ //checa se você perdeu
                    setTerminou(true);
                }
            }
        }
    }
    /* QUANDO CLICADO PEGA A LETRA E SE PUDER CHUTA A PALAVRA */
    const recebeLetra = (e) => {
        e.preventDefault();
        var chute = e.target.getAttribute('letra');
        if(7 - letrasErradas.length > 0 && letrasCertas.length < palavra.length) {
            chutaLetra(chute);
        } else {
            setTerminou(true);
        }
    }

    return (
        <div>
            <Header/>

            <main class="text-center h-main ">
                <h2 >Forca</h2>
                
                    {/* Três linhas */}
                    <div class="grid overflow-hidden grid-row-3 justify-center"> 

                        {/* Duas colunas */}
                        <div class="w-screen overflow-hidden grid grid-cols-2">
                            {/* VIDAS */}
                            <div>
                                Vidas: {7 - letrasErradas.length}
                            </div>

                            {/* Duas linhas */}
                            <div class="w-main grid grid-row-2">
                                {/* TABULEIROS */}
                                <div>
                                    {tabuleiro}
                                </div>

                                {/* LETRAS CHUTADAS */}
                                <div class="flex justify-center font-bold text-red-700">
                                    Letras Erradas: 
                                    {letrasErradas.map((letra, index) => (
                                        <p key={index} class="ml-2">
                                            {letra}
                                        </p>
                                    ))}
                                </div>

                            </div>

                        </div>

                        {/* TODAS AS LETRAS */}
                        <div class="grid grid-row-3 grid-cols-10 gap-1 m-2">
                            { alfabeto.map((letra, index) => (
                                <p class="cursor-pointer border-solid border-2 border-black p-2 duration-100 hover:bg-gray-200"
                                    key={index}
                                    letra={letra}
                                    onClick={recebeLetra}
                                    >
                                    {letra}
                                </p>
                            ))}
                        </div>

                        {/* AVISOS */}
                        <div class={foiClicada ? "visible" : "invisible"}>
                            <button class="font-bold text-red-700">Você já tentou essa letra</button>
                        </div>

                        {/* BOTÃO PARA REINICIAR */}
                        <div class={terminou ? "visible" : "invisible"}>
                            <button class="border-solid border-2 border-black">Gerar nova palavra</button>
                        </div>
                    </div>
            </main>

            <Footer/>
        </div>
    );
}

export default Forca;