import React, {useState, useEffect} from 'react'
import Circulo from '../assets/Circulo.png';
import Diamante from '../assets/Diamante.png';
import Pentagono from '../assets/Pentagono.png';
import Quadrado from '../assets/Quadrado.png';
import Triangulo from '../assets/Triangulo.png';
import Vazio from '../assets/Vazio.png';


function CombineTres() {
    var posicaoAleatoria;
    const Formas = [Circulo,Diamante,Pentagono,Quadrado,Triangulo];
    const [tabuleiro, setTabuleiro] = useState([]);
    const [pecaMovida, setPecaMovida] = useState(null);
    const [pecaDestino, setPecaDestino] = useState(null);

    //INICIAR
    const iniciar = () => {
        var tabuleiro = [];
        for(var i = 0; i < 64; i++){
            posicaoAleatoria = Math.floor(Math.random() * Formas.length);
            tabuleiro.push(Formas[posicaoAleatoria]);
        }
        setTabuleiro(tabuleiro);
    }
    useEffect(() => {
        iniciar();
    },[]);

    //CHECAR POR COMBINAÇÕES
    const checarVerticais = () => {
        var newTabuleiro = tabuleiro;
        
        for(var i = 0; i < 48; i++){
            if(tabuleiro[i] === tabuleiro[i+8] && tabuleiro[i] === tabuleiro[i+16]){
                newTabuleiro[i] = Vazio;
                newTabuleiro[i+8] = Vazio;
                newTabuleiro[i+16] = Vazio;
                return true;
            }
        }
        setTabuleiro([...newTabuleiro]);
        return false;
    }
    const checarHorizontais = () => {
        var newTabuleiro = tabuleiro;
        var bordas = [6,7,14,15,22,23,30,31,38,39,46,47,54,55];
        for(var i = 0; i < 62; i++){
            if(!bordas.includes(i)){
                if(tabuleiro[i] === tabuleiro[i+1] && tabuleiro[i] === tabuleiro[i+2]){
                    newTabuleiro[i] = Vazio;
                    newTabuleiro[i+1] = Vazio;
                    newTabuleiro[i+2] = Vazio;
                    return true;
                }
            }
        }
        setTabuleiro([...newTabuleiro]);
        return false;
    }

    //MOVER PRA BAIXO
    const moverPraBaixo = () => {
        var newTabuleiro = tabuleiro;
        for(var i = 63; i >= 0; i--){
            if(tabuleiro[i] === Vazio){
                if(i < 8){
                    posicaoAleatoria = Math.floor(Math.random() * Formas.length);
                    tabuleiro[i] = Formas[posicaoAleatoria];
                } else {
                    //traz a peça de cima pra baixo
                    newTabuleiro[i] = newTabuleiro[i-8];
                    newTabuleiro[i-8] = Vazio;
                }
            }
        }
        setTabuleiro([...newTabuleiro])
    }

    //LIDAR COM O JOGADOR
    const handlePecaMovida = (e) => {
        setPecaMovida(parseInt(e.target.getAttribute('index')));
    }
    const handlePecaDestino = (e) => {
        setPecaDestino(parseInt(e.target.getAttribute('index')));
    }
    const MoverPeca = () => {
        //CHECA DISTANCIA
        if( //horizontal, verificar se mesma linha
        (pecaDestino === pecaMovida+1 && Math.floor(pecaMovida/8) === Math.floor(pecaDestino/8)) ||
        (pecaDestino === pecaMovida-1 && Math.floor(pecaMovida/8) === Math.floor(pecaDestino/8)) ||
        //vertical, sem problemas
        pecaDestino === pecaMovida+8 ||
        pecaDestino === pecaMovida-8 )
        {            
            //MOVIMENTAÇÃO
            //faz o movimento
            var novoTabuleiro = tabuleiro;
            var peca = tabuleiro[pecaDestino];
            novoTabuleiro[pecaDestino] = novoTabuleiro[pecaMovida];
            novoTabuleiro[pecaMovida] = peca;
            setTabuleiro([...novoTabuleiro]);
            //se nenhuma combinação for feita, volta o movimento
            if(!checarHorizontais() && !checarVerticais()){
                novoTabuleiro[pecaMovida] = novoTabuleiro[pecaDestino];
                novoTabuleiro[pecaDestino] = peca;
                setTabuleiro([...novoTabuleiro]);
            }
        }
        setPecaDestino(null);
        setPecaMovida(null);
    }
    
    //Checar por tudo
    useEffect(() => {
        const timer = setInterval(() => {
            checarVerticais();
            checarHorizontais();
            moverPraBaixo();
        }, 250)
        return () => clearInterval(timer);
    }, [checarVerticais, checarHorizontais, moverPraBaixo]);

    return (
        <div className='bg-slate-50 h-main text-black dark:text-white dark:bg-slate-900'>
            <h2 className="p-4 font-bold text-3xl text-center">Combine 3</h2>
            <div className="m-16 p-4 flex justify-around">
                <div className="w-[min(100%,32rem)] grid grid-cols-8 grid-rows-8 gap-1">
                    {tabuleiro.map((src, index) => (
                        <img className="order-solid border-2 border-black rounded dark:border-white" width="50px" key={index}
                            src={src}
                            index={index}
                            draggable={true}
                            onDragStart={handlePecaMovida}
                            onDrop={handlePecaDestino}
                            onDragEnd={MoverPeca}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnter={(e) => e.preventDefault()}
                            onDragLeave={(e) => e.preventDefault()}
                            >
                        </img>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CombineTres;