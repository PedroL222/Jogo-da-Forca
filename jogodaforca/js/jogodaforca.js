//Pegando itens do DOM

const palavraAdivinha = document.querySelector(".palavraAdivinha");

const palavraRes = document.querySelector("#palavraRes");

const inputTentativa = document.querySelector("#inputTentativa");

const btn_tentar = document.querySelector("#btn_tentar");

const cabeca = document.querySelector("#cabeca");

const bracoEsq = document.querySelector("#bracoEsq");

const torso = document.querySelector("#torso");

const bracoDir = document.querySelector("#bracoDir");

const peEsq = document.querySelector("#peEsq");

const peDir = document.querySelector("#peDir");

//Criando variáveis para controle da Vitória, das letras tentadas,das palavras tentadas que estão no DOM, das palavras que podem ser adivinhadas, e da quantidade de letras da palavra a ser adivinhada

let vitoria = 0;

let tentativas = []

let arraypalavraRes = []

const palavrasAleatorias = ['ovo','bonde','graviola','cama','boceja','gato', 'casa', 'banana', 'amarelo', 'livro', 'futebol', 'amigo', 'abacaxi', 'vermelho', 'janela', 'azul', 'sapato', 'uva', 'mesa', 'melancia', 'cachorro', 'praia', 'coracao', 'pipoca', 'escola', 'pimenta', 'caderno', 'macaco', 'couve', 'sabao', 'mamao', 'chave', 'laranja', 'fogao', 'pizza']

let qtd_letra = 0

//Sorteando a palavra adivinhada e colocando a quantidade de vidas

const palavrasArray = [palavrasAleatorias[Math.round(Math.random() * (palavrasAleatorias.length-1))]]

let vidas = 6;

//Função para mostrar na tela a palavra sorteada, porém escondida

mostrarAdivinha=()=>{
    palavrasArray.map((el)=>{
        for(let i = 0; i<el.length;i++){
            const divAdivinha = document.createElement("div");
            divAdivinha.setAttribute("class","adivinha");
            const divSumir = document.createElement("div");
            divSumir.setAttribute("class","divSumir");
            divAdivinha.innerHTML = el[i];
            palavraAdivinha.appendChild(divAdivinha);
            divAdivinha.appendChild(divSumir);
            qtd_letra++
            console.log(qtd_letra)
        }
    })
}

mostrarAdivinha();

//Botão para fazer uma tentativa com uma letra digitada

btn_tentar.addEventListener("click",(evt)=>{
    verificarTentativa(inputTentativa.value);

//Soma-se 1 na variavel vitoria para cada letra igual à tentativa que tiver na palavra

    palavrasArray.map((el)=>{
        for(let i = 0; i<el.length;i++){
            if(inputTentativa.value == el[i] && !tentativas.includes(inputTentativa.value)){
                vitoria++;
            }
        }
        tentativas.push(inputTentativa.value);
    })
    inputTentativa.innerHTML=""

//Se o numeros de tentativas certas for igual ao tamanho da palavra a ser adivinhada então vc Ganhou!

    if(vitoria == qtd_letra){
        encerrarJogo("Parabens vc ganhou!")
    }
    
//Se no DOM das letras já usadas não tiver nada vai ser criado a div da letra usada, e já estiver no DOM não criará outra div da mesma

if(inputTentativa.value != ""){
    if(arraypalavraRes.length == 0){
        const divpalavraRes = document.createElement("div");
        divpalavraRes.setAttribute("class","adivinha");
        divpalavraRes.innerHTML = inputTentativa.value;
        palavraRes.appendChild(divpalavraRes)
        arraypalavraRes.push(inputTentativa.value); 
    }

    let seguroPalavraRes = arraypalavraRes.some(el=>el == inputTentativa.value);

    if(!seguroPalavraRes){
        const divpalavraRes = document.createElement("div");
        divpalavraRes.setAttribute("class","adivinha");
        divpalavraRes.innerHTML = inputTentativa.value;
        palavraRes.appendChild(divpalavraRes);
        arraypalavraRes.push(inputTentativa.value); 
    }
}

})

//Verificando se todas as palavras ja foram adivinhadas para então salvar o jogo

let divSumir = [...document.querySelectorAll(".a")];

    const adivinha = document.querySelectorAll(".adivinha");

    if(divSumir.length==adivinha.length){
        setTimeout(encerrarJogo("Que pena você perdeu!"),3000);
    }

//Verificar se a lettra tentada é igual a alguma da palavra a ser adivinhada e retirando a divSumir se sim, e se não diminuindo a quantidade de vidas

verificarTentativa=(letra)=>{

    let veriArray =[]
           
    const tentativaArray = [...document.querySelector(".palavraAdivinha").children];
  
        tentativaArray.map((el)=>{
        if(letra == el.firstChild.textContent){
           const divElemento = el.lastChild;
           
            divElemento.style.display = "none";
            divElemento.classList.add("a")
            veriArray.push(1);
        }else{
            veriArray.push(2)
        }
    })
    
    veriArray.filter((el)=>{
        if(el==1){
            veriArray = el;
        }
    })

   if(veriArray.length){
    vidas--;
   }

//Verificando a quantidade de vida e criando o boneco no DOM de acordo com a quantidade

    if(vidas == 0){
        peDir.classList.add("sumir");

        tentativaArray.map((el)=>{
            el.lastChild.style.display = "none"
        })

        setTimeout(encerrarJogo,3000,"Você Perdeu!")
    }else if(vidas==1){
        peEsq.classList.add("sumir");
    }else if(vidas==2){
        bracoDir.classList.add("sumir");
    }else if(vidas==3){
        bracoEsq.classList.add("sumir");
        torso.style = "margin-left: 26px;";
    }else if(vidas==4){
        torso.classList.add("sumir");
        torso.style = "margin-left: 35px;";
    }else if(vidas==5){
        cabeca.classList.add("sumir");
    }

}

//Função que encerra o jogo

encerrarJogo=(msg)=>{

    const escura = document.querySelector("#escura");
    const h2 = document.createElement("h2");
    h2.innerHTML=msg
    escura.style.display = "flex";
    escura.appendChild(h2);

    const h3 = document.createElement("h3");
    escura.style.display = "flex";
    escura.appendChild(h3);

    setTimeout(h3.innerHTML = "Reiniciando jogo",2500);
    setTimeout( () => location.reload(),4000);
}
