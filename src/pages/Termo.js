import React, {useState, useEffect} from 'react'
import jsonData from '../assets/palavras5letras.json';

function Wordle() {
    const alfabeto = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
    const [palavra, setPalavra] = useState([]);
    const [string, setString] = useState();
    const [chutes, setChutes] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [linhaAtual, setlinhaAtual] = useState(0);
    const [palavraRuim, setPalavraRuim] = useState(false);
    const [terminou, setTerminou] = useState(false);
    const [ganhou, setGanhou] = useState(false);

    const inicializarTabuleiro = () => {
        setTerminou(false);
        setlinhaAtual(0);
        setGanhou(false);

        //SORTEIA A PALAVRA
        const posicaoAleatoria = Math.floor(Math.random() * jsonData.length);
        const palavraAleatoria = jsonData[posicaoAleatoria];
        setString(palavraAleatoria);
        var palavra = [];
        for(var i =0;i < palavraAleatoria.length;i++){
            palavra.push(palavraAleatoria.charAt(i));
        }
        setPalavra(palavra);

        //MONTANDO TABULEIRO
        var chutes = [];
        var feedback = [];
        for (i = 0 ; i < 6; i ++){
            chutes.push([' ',' ',' ',' ',' ']);
            for (var j = 0 ; j < 5; j ++){
                feedback.push("bg-slate-50 dark:bg-slate-900");
            }
        }
        setChutes(chutes);
        setFeedback(feedback);
    }
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
        if(!terminou || linhaAtual <= 5) {
            var array = chutes[linhaAtual];
            var completa = 0;
            for(var i=0; i < 6; i++){
                if(array[i] !== ' '){
                    completa++
                }
            }
            //SE PALAVRA EST?? COMPLETA CONTINUA
            if(completa === 6){
                var chute = "";
                var chutou = false;
                var certas = 0;
                var copiaChute = [];
                //TRANSFORMA VETOR EM STRING
                for(i = 0; i < chutes[linhaAtual].length; i++){
                    chute += chutes[linhaAtual][i];
                    copiaChute.push(chutes[linhaAtual][i]);
                }
                //VERIFICA LISTA DE PALAVRA
                for(i = 0; i < jsonData.length && !chutou; i++){
                    if(chute === jsonData[i]){
                        console.log(palavra);

                        var linha = linhaAtual;
                        linha++;
                        if(linha > 5){
                            setTerminou(true);
                        }
                        setlinhaAtual(linha);
                        chutou = true;
                        
                        console.log("1: "+chute);
                        var letra;
                        //FEEDBACK vermelho e verde
                        for(var j = 0; j < 5; j++){
                            feedback[linhaAtual*5 + j] = "bg-red-500"; 
                            if(chute.charAt(j) === palavra[j]){
                                feedback[linhaAtual*5 + j] = "bg-green-500";
                                letra = chute.charAt(j);
                                chute = chute.replace(letra, " ");
                                certas++;
                            }
                        }
                        console.log("2: "+chute);

                        //FEEDBACK amarelo
                        for(j = 0; j < 5; j++){
                            if(palavra.includes(chute.charAt(j) ) ) {                                
                                feedback[linhaAtual*5 + j] = "bg-amber-500";
                                letra = chute.charAt(j);
                                chute = chute.replace(letra, " ");
                            }
                        }
                        console.log("3: "+chute);

                        setFeedback([...feedback]);
                    }
                } 
                //caso a palavra n??o esteja na lista
                if(!chutou){
                    setPalavraRuim(true);
                }
                //verifica se ganhou
                if(certas === 5){
                    setTerminou(true);
                    setGanhou(true);
                    setPalavraRuim(false);
                }
            }
        } else {
            setTerminou(true);
        }
    }
    const deletaLetra = () => {
        if(!terminou){
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
    }
    useEffect(() => {
        inicializarTabuleiro();
    }, [])
    
    return (
        <div className="bg-slate-50 text-black text-center h-main p-4 dark:bg-slate-900 dark:text-white">
            <h2 className="font-bold text-3xl">Termo</h2>
            
            {/* TABULEIRO  */}
            <div className="flex flex-col font-mono">
                <br></br>

                    {chutes.map((palavra,index) => (
                        <div key={index} className="flex justify-center dark:bg-slate-900" >
                            <span className={feedback[index*5 + 0]}>
                                <p className="flex justify-center items-center border-solid border-2 border-black w-10 h-10 dark:border-white">
                                    {palavra[0]}
                                </p>
                            </span>
                            <span className={feedback[index*5 + 1]}>
                                <p className="flex justify-center items-center border-solid border-2 border-black w-10 h-10 dark:border-white">
                                    {palavra[1]}
                                </p>
                            </span>
                            <span className={feedback[index*5 + 2]}>
                                <p className="flex justify-center items-center border-solid border-2 border-black w-10 h-10 dark:border-white">
                                    {palavra[2]}
                                </p>
                            </span>
                            <span className={feedback[index*5 + 3]}>
                                <p className="flex justify-center items-center border-solid border-2 border-black w-10 h-10 dark:border-white">
                                    {palavra[3]}
                                </p>
                            </span>
                            <span className={feedback[index*5 + 4]}>
                                <p className="flex justify-center items-center border-solid border-2 border-black w-10 h-10 dark:border-white">
                                    {palavra[4]}
                                </p>
                            </span>
                        </div>
                    ))}
                    

                <br></br>
            </div>

            {/* TECLADO */}
            <div className="border-solid border-2 border-black dark:border-white">
                <div className="grid grid-row-3 grid-cols-10 gap-1 m-2 p-3 font-mono">
                    { alfabeto.map((letra, index) => (
                        <p className="cursor-pointer border-solid border-2 border-black p-2 duration-100 hover:bg-sky-400 dark:border-white"
                        key={index}
                        letra={letra}
                        onClick={clicaLetra}
                        >
                            {letra}
                        </p>
                    ))}
                </div>
                <div className="p-3">
                    <p onClick={deletaLetra} className="text-center cursor-pointer border-solid border-2 border-black p-2 duration-100 hover:bg-sky-400 dark:border-white">Deletar</p>
                    <br></br>
                    <p onClick={enviaPalavra} className="text-center cursor-pointer border-solid border-2 border-black p-2 duration-100 hover:bg-sky-400 dark:border-white">Enviar</p>
                </div>
            </div>

            {/* AVISOS */}
            <div className="justify-center m-2">
                <p className="font-bold text-red-500">
                    {ganhou ? "Voc?? ganhou!" : terminou ? "A palavra era " + string : ""}
                </p>
                <p className="font-bold text-red-500">
                    {palavraRuim ? "Est?? palavra n??o ?? reconhecida" : ""}
                </p>
            </div>

            {/* BOT??O */}
            <div className={terminou ? "visible flex justify-center m-2" : "invisible flex justify-center m-2"}>
                <p onClick={inicializarTabuleiro} className="p-2 w-32 cursor-pointer text-center border-solid border-2 border-black duration-200 hover:bg-sky-400 dark:border-white" >Gerar nova palavra</p>
            </div>

        </div>
    );
}

export default Wordle;