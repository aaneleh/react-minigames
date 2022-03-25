import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

function JogoDaVelha() {
    const [tabuleiro, setTabuleiro] = useState([]);
    const [jogadorAtual, setJogadorAtual] = useState('X');
    const [terminou, setTerminou] = useState(false); //se verdade mostra o botão de nova partida
    const [vencedor, setVencedor] = useState(null); //caso continue como null, só mostra vencedor, se estiver mostra o valor como vencedor

    const iniciar = () => {
        //reinicia variaveis
        setTerminou(false);
        setVencedor(null);
        //reiniciar tabuleiro
        var array = [];
        for(var i =0;i<9;i++){
            array.push(' ');
        }
        setTabuleiro(array);
        //sorteia o jogador inicial
        /* 
        var aleatorio = Math.round(Math.random());
        aleatorio === 1 ? setJogadorAtual('O') : setJogadorAtual('X'); 
        //isso funciona mas decidi deixar o X sempre começar e quando reiniciado o perdedor começa
        */
    }
    const verificaGanhador = () => {
        //TESTA TODAS AS POSSIBILIDADES, SE UMA DELAS RETORNAR VERDADE => SETVENCEDOR
        //LOOP PRA TESTAR AS 3 LINHAS E 3 COLUNAS
        for(var i = 0; i < 3; i ++) {
            //linhas: {0,1,2}, {3,4,5} e {6,7,8}
            if(tabuleiro[i*3] != " " && tabuleiro[i*3] === tabuleiro[i*3+1] && tabuleiro[i*3+1] === tabuleiro[i*3+2]){
                setTerminou(true);
                setVencedor(tabuleiro[i*3]);
                return true;
            //colunas: {0,3,6}, {1,4,7} e {2,5,8} 
            } else if (tabuleiro[i] != " " && tabuleiro[i] === tabuleiro[i+3] && tabuleiro[i+3] === tabuleiro[i+6]){
                setTerminou(true);
                setVencedor(tabuleiro[i]);
                return true;
            }
        }
        //diagonal principal {0,4,8}
        if(tabuleiro[0] != " " && tabuleiro[0] === tabuleiro[4] && tabuleiro[4] === tabuleiro[8]) {
            setTerminou(true);
            setVencedor(tabuleiro[0]);
            return true;
        //diagonal secundária {2,4,6}
        } else if(tabuleiro[2] != " " && tabuleiro[2] === tabuleiro[4] && tabuleiro[4] === tabuleiro[6]) {
            setTerminou(true);
            setVencedor(tabuleiro[2]);
            return true;
        }
        //caso nada seja verdade
        return false;
    }
    const verificaTerminou = () => {
        var preenchidas = 0;
        for(var i = 0;i<9;i++){
            if(tabuleiro[i] !== " "){
                preenchidas ++;
            }
        }
        if(preenchidas === 9){
            setTerminou(true);
        }
    }
    const jogar = (e) => {
        if(!terminou){
            e.preventDefault();
            var index = e.target.getAttribute('index');
            var char = e.target.getAttribute('char');
            if(char === ' '){
                tabuleiro[index] = jogadorAtual;
                setTabuleiro([...tabuleiro]);
                if(jogadorAtual === "X"){
                    setJogadorAtual("O");
                } else if (jogadorAtual === "O"){
                    setJogadorAtual("X");
                }
                //se ninguem ganhou, verifica se ta tudo preenchido
                if(!verificaGanhador()) {
                    verificaTerminou();
                }
            }
        }
    }
    
    useEffect(() => {
        iniciar();
    }, []);

    return (
        <div>
            <Header/>
            <main className="flex h-main flex-col justify-evenly items-center">
                <h2 className="font-bold text-3xl">Jogo da Velha</h2>
                
                {/* JOGADOR ATUAL */}
                <div className='bg-red-200 p-2 rounded text-bold'>
                    {terminou ? (vencedor === null ? "Deu Velha" : vencedor + " venceu") : "Rodada de " + jogadorAtual}
                </div>

                {/* TABULEIRO */}
                <div className="grid grid-rows-3 grid-cols-3 ">
                    {tabuleiro.map((char,key) => (
                        <div
                            className="flex justify-center items-center border-solid border-2 border-black w-20 h-20 cursor-pointer"
                            key={key}
                            index={key}
                            char={char}
                            onClick={jogar}
                        >        
                            {char}
                        </div>
                    ))}
                </div>

                {/* RECOMEÇAR */}
                <div className={terminou ? "visible pointer" : "invisible"} >
                    <div className='rounded border-solid border-2 border-black p-2 cursor-pointer duration-200 hover:bg-red-400' onClick={iniciar}>
                        Reiniciar Jogo
                    </div>
                </div>

            </main>
            <Footer/>
        </div>
    );
}

export default JogoDaVelha;