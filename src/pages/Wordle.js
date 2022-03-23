import React, {useState, useEffect} from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import jsonData from '../assets/palavras5letras.json';

function Wordle() {
    const alfabeto = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
    const [palavra, setPalavra] = useState([]);

    const [chutes, setChutes] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [linhaAtual, setlinhaAtual] = useState(0);

    const [palavraRuim, setPalavraRuim] = useState(false);
    const [terminou, setTerminou] = useState(false);


    const inicializarTabuleiro = () => {
        setTerminou(false);
        setlinhaAtual(0);

        //SORTEIA A PALAVRA
        const posicaoAleatoria = Math.floor(Math.random() * jsonData.length);
        const palavraAleatoria = jsonData[posicaoAleatoria];
        var palavra = [];
        for(var i =0;i < palavraAleatoria.length;i++){
            palavra.push(palavraAleatoria.charAt(i));
        }
        setPalavra(palavra);

        //MONTANDO TABULEIRO
        var chutes = [];
        var feedback = [];
        for (var i = 0 ; i < 6; i ++){
            chutes.push([' ',' ',' ',' ',' ']);
            for (var j = 0 ; j < 5; j ++){
                feedback.push("bg-white");
            }
        }
        setChutes(chutes);
        setFeedback(feedback);
    }
    useEffect(() => {
        inicializarTabuleiro();
    }, [])
    
    
    const clicaLetra = (e) => {
        if(!terminou){
            setPalavraRuim(false);
            if(linhaAtual <= 5) {
                e.preventDefault();
                var letra = e.target.getAttribute('letra');
                var colocada = false;
                for(var i=0; i < 5 && !colocada; i++){
                    if(chutes[linhaAtual][i] === ' '){
                        chutes[linhaAtual][i] = letra;
                        colocada = true;
                    }
                }
                setChutes([...chutes]);
            } else {
                setTerminou(true);
            }
        }
    }

    const enviaPalavra = () => {
        if(linhaAtual <= 5) {
            var array = chutes[linhaAtual];
            var completa = 0;
            for(var i=0; i < 6; i++){
                if(array[i] !== ' '){
                    completa++
                }
            }
            if(completa === 6){
                var chute = "";
                var chutou = false;
                var certas = 0;
                //transforma o vetor me uma string
                for(i = 0; i < chutes[linhaAtual].length; i++){
                    chute += chutes[linhaAtual][i];
                }
                //compara com todas as palavras da lista
                for(i = 0; i < jsonData.length && !chutou; i++){
                    if(chute === jsonData[i]){
                        var linha = linhaAtual;
                        linha++;
                        setlinhaAtual(linha);
                        chutou = true;
                        //feedback
                        for(var j = 0; j < chutes[linhaAtual].length; j++){
                            //AMARELO
                            if(palavra.includes(chutes[linhaAtual][j])){
                                feedback[linhaAtual*5 + j] = "bg-amber-500";
                                //VERDE
                                if(chutes[linhaAtual][j] === palavra[j]){
                                    feedback[linhaAtual*5 + j] = "bg-green-500";
                                    certas++;
                                }
                            //VERMELHA
                            } else {
                                feedback[linhaAtual*5 + j] = "bg-red-500";
                            }
                        }
                        setFeedback([...feedback]);
                    }
                } 
                //caso a palavra não esteja na lista
                if(!chutou){
                    setPalavraRuim(true);
                }
                //verifica se ganhou
                if(certas === 5){
                    setTerminou(true);
                }
                console.log('palavra', palavra);
            }
        } else {
            console.log('O JOGO ACABOU');
            setTerminou(true);
        }
    }

    const deletaLetra = () => {
        setPalavraRuim(false);
        if(linhaAtual <= 5) {
            var deletada = false;
            for(var i = chutes[linhaAtual].length-1; i >= 0 && !deletada; i--){
                if(chutes[linhaAtual][i]!== ' '){
                    chutes[linhaAtual][i] = ' ';
                    deletada = true;
                }
            }
            setChutes([...chutes]);
        } else {
            setTerminou(true);
        }
    }

    return (
        <div>
            <Header/>
            <main className="bg-white text-center h-main p-4 ">
                <h2 className="text-black text-3xl">Wordle</h2>
                
                {/* TABULEIRO  */}
                <div className="flex flex-col font-mono">
                    <br></br>

                        {chutes.map((palavra,index) => (
                            <div key={index} className="flex justify-center" >
                                <span className={feedback[index*5 + 0]}>
                                    <p className="flex justify-center items-center border-solid border-2 border-black w-10 h-10">
                                        {palavra[0]}
                                    </p>
                                </span>
                                <span className={feedback[index*5 + 1]}>
                                    <p className="flex justify-center items-center border-solid border-2 border-black w-10 h-10">
                                        {palavra[1]}
                                    </p>
                                </span>
                                <span className={feedback[index*5 + 2]}>
                                    <p className="flex justify-center items-center border-solid border-2 border-black w-10 h-10">
                                        {palavra[2]}
                                    </p>
                                </span>
                                <span className={feedback[index*5 + 3]}>
                                    <p className="flex justify-center items-center border-solid border-2 border-black w-10 h-10">
                                        {palavra[3]}
                                    </p>
                                </span>
                                <span className={feedback[index*5 + 4]}>
                                    <p className="flex justify-center items-center border-solid border-2 border-black w-10 h-10">
                                        {palavra[4]}
                                    </p>
                                </span>
                            </div>
                        ))}
                        

                    <br></br>
                </div>

                {/* TECLADO */}
                <div className="border-solid border-2 border-black ">
                    <div className="grid grid-row-3 grid-cols-10 gap-1 m-2 p-4 font-mono">
                        { alfabeto.map((letra, index) => (
                            <p className="cursor-pointer border-solid border-2 border-black p-2 duration-100 hover:bg-sky-400"
                            key={index}
                            letra={letra}
                            onClick={clicaLetra}
                            >
                                {letra}
                            </p>
                        ))}
                    </div>
                    <div className="p-4">
                        <p onClick={deletaLetra} className="text-center cursor-pointer border-solid border-2 border-black p-2 duration-100 hover:bg-sky-400">Deletar</p>
                        <br></br>
                        <p onClick={enviaPalavra} className="text-center cursor-pointer border-solid border-2 border-black p-2 duration-100 hover:bg-sky-400">Enviar</p>
                    </div>
                </div>

                {/* BOTÃO */}
                <div className={palavraRuim ? "visible flex justify-center m-2" : "invisible flex justify-center m-2"}>
                    <p className="font-bold text-red-500">
                        Palavra Ruim
                    </p>
                </div>

                {/* BOTÃO */}
                <div className={terminou ? "visible flex justify-center m-2" : "invisible flex justify-center m-2"}>
                    <p onClick={inicializarTabuleiro} className="p-2 w-32 cursor-pointer text-center border-solid border-2 border-black duration-200 hover:bg-sky-400" >Gerar nova palavra</p>
                </div>

            </main>
            <Footer/>
        </div>
    );
}

export default Wordle;