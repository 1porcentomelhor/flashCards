// ================== VARIÁVEIS ==================

let card = document.getElementById('card');
let cardAtualTexto = document.getElementById('cardAtualTexto');
let cardTotal = document.getElementById('cardTotal');
let textCard = document.getElementById('contText');

let btnHard = document.getElementById('hard');
let btnGood = document.getElementById('good');
let btnEasy = document.getElementById('easy');

document.getElementById('btn-historico').addEventListener('click', visualizarHistorico);
document.getElementById('del').addEventListener('click', deleteCard);

btnHard.addEventListener('click', CountHard);
btnGood.addEventListener('click', CountGood);
btnEasy.addEventListener('click', CountEasy);

let hardCount = 0;
let goodCount = 0;
let easyCount = 0;

let btnPrevious = document.getElementById('previous');
let btnNext = document.getElementById('next');
let btnAdicionar = document.getElementById('adicionar');

btnPrevious.addEventListener('click', previousQuestion);
btnNext.addEventListener('click', nextQuestion);
btnAdicionar.addEventListener('click', openPoupup);

card.addEventListener("click", function(e){
  if(e.target.classList.contains("btnCard")) return;
  virarCard();
});

let cardAtual = Number(localStorage.getItem("cardAtual")) || 0;
let mostrandoPergunta = true;


// ================== STORAGE DO HISTÓRICO ==================

let historico = JSON.parse(localStorage.getItem("historico")) || [];


// ================== CARDS ==================

let cards = JSON.parse(localStorage.getItem("cards")) || [
  { pergunta: 'O que é JavaScript?', resposta: 'Uma linguagem de programação' },
  { pergunta: 'O que é HTML?', resposta: 'Uma linguagem de marcação' },
  { pergunta: 'O que é CSS?', resposta: 'Uma linguagem de estilos' }
];


// ================== MOSTRAR CARD ==================

function mostrarCard(){

  if (!cards[cardAtual]) {

    if(cards.length === 0){
      textCard.innerText = "Nenhum card cadastrado";
      cardAtualTexto.innerText = "";
      cardTotal.innerText = "";
      return;
    }

    cardAtual = 0;
  }

  mostrandoPergunta = true;

  textCard.innerText = cards[cardAtual].pergunta;

  cardAtualTexto.innerText = `Card ${cardAtual + 1}`;
  cardTotal.innerText = `de ${cards.length} Cards`;
}

mostrarCard();


// ================== NAVEGAÇÃO ==================

function previousQuestion(){
  if(cardAtual > 0){
    cardAtual--;
    localStorage.setItem("cardAtual", cardAtual);
    mostrarCard();
  }
}

function nextQuestion(){
  if(cardAtual === cards.length - 1){
    alert("Você chegou ao fim!");
    return;
  }

  cardAtual++;
  localStorage.setItem("cardAtual", cardAtual);
  mostrarCard();
}


// ================== DELETAR CARD ==================

function deleteCard() {

  if(cards.length === 0) return;

  cards.splice(cardAtual, 1);

  localStorage.setItem("cards", JSON.stringify(cards));

  if(cardAtual >= cards.length){
    cardAtual = cards.length - 1;
  }

  if(cards.length > 0){
    mostrarCard();
  } else {
    textCard.innerText = "Nenhum card cadastrado";
    cardAtualTexto.innerText = "";
    cardTotal.innerText = "";
  }
}


// ================== VIRAR CARD ==================

function virarCard(){

  if(!cards[cardAtual]){
    textCard.innerText = "Sem cards disponíveis";
    return;
  }

  if (mostrandoPergunta){
    textCard.innerText = cards[cardAtual].resposta;
  } else {
    textCard.innerText = cards[cardAtual].pergunta;
  }

  mostrandoPergunta = !mostrandoPergunta;
}


// ================== POPUP ==================

function openPoupup(){

  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.5)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";

  const box = document.createElement("div");
  box.style.background = "grey";
  box.style.padding = "20px";
  box.style.borderRadius = "10px";
  box.style.width = "500px";

  const t = document.createElement("h3");
  t.innerText = "Novo Card";

  const pergunta = document.createElement("input");
  pergunta.placeholder = "Pergunta";

  const resposta = document.createElement("input");
  resposta.placeholder = "Resposta";

  const salvar = document.createElement("button");
  salvar.innerText = "Salvar";

  const fechar = document.createElement("button");
  fechar.innerText = "Fechar";


  salvar.onclick = function(){

    if(!pergunta.value || !resposta.value){
      alert("Preencha tudo!");
      return;
    }

    cards.push({
      pergunta: pergunta.value,
      resposta: resposta.value
    });

    localStorage.setItem("cards", JSON.stringify(cards));

    mostrarCard();

    document.body.removeChild(overlay);
  }

  fechar.onclick = function(){
    document.body.removeChild(overlay);
  }

  box.appendChild(t);
  box.appendChild(pergunta);
  box.appendChild(resposta);
  box.appendChild(salvar);
  box.appendChild(fechar);

  overlay.appendChild(box);

  document.body.appendChild(overlay);
}



// ================== HISTÓRICO AGRUPADO POR DIA ==================

const btnLimpar = document.createElement("button");
btnLimpar.innerText = "Limpar histórico";
btnLimpar.style.padding = "8px";
btnLimpar.style.marginTop = "10px";
//btnLimpar.style.marginLeft = "30px";
btnLimpar.style.cursor = "pointer";
btnLimpar.style.borderRadius = "8px";
btnLimpar.style.border = "none";
btnLimpar.style.backgroundColor = "purple";
btnLimpar.style.color = "white";

btnLimpar.onclick = function (){
   localStorage.removeItem("historico");
   alert("Histórico apagado!");
   location.reload(); // (opcional) recarrega a página
};
// botão de fechar o histórico

const btnClose = document.createElement("button");
btnClose.innerText = 'X';
btnClose.style.padding='3px';
btnClose.style.width='30px';
btnClose.style.height='25px';
btnClose.style.backgroundColor = 'purple';
btnClose.style.color = 'white';
btnClose.style.marginLeft = '40px';
btnClose.style.marginTop = '-42px';


btnClose.onclick = function(){
 areaHistorico.remove();

}


// ================== FUNÇÃO ==================
function visualizarHistorico(){

    // Já existe histórico aberto?
  let existente = document.getElementById("areaHistorico");
  if (existente) return;  // então não cria outro

  

  const areaHistorico = document.createElement("div");
  areaHistorico.id = "areaHistorico";
  areaHistorico.style.width = "300px";
  areaHistorico.style.paddingTop = "25px";
  areaHistorico.style.paddingBottom = "15px";
  areaHistorico.style.alignItems ='center' ;
  areaHistorico.style.textAlign ='center'
  areaHistorico.style.backgroundColor = "white";
  areaHistorico.style.color = "black";
  areaHistorico.style.border = "1px solid gray";
  areaHistorico.style.borderRadius = "10px";
  areaHistorico.style.marginTop = "-300px";
  areaHistorico.style.marginLeft = "30px";
  areaHistorico.style.maxHeight = "150px";
  areaHistorico.style.overflowY = "auto";

  let agrupado = {};

  historico.forEach(item => {
    if(!agrupado[item.dia]){
      agrupado[item.dia] = { hard:0, good:0, easy:0 };
    }
    agrupado[item.dia][item.tipo]++;
  });

  let texto = "HISTÓRICO POR DIA:\n\n";

  for(let dia in agrupado){
    texto += `${dia}\n\n`;
    texto += ` Difícil: ${agrupado[dia].hard}\n`;
    texto += ` Bom: ${agrupado[dia].good}\n`;
    texto += ` Fácil: ${agrupado[dia].easy}\n\n`;
  }

  areaHistorico.innerText = texto;

  
  areaHistorico.appendChild(btnLimpar);
  areaHistorico.appendChild(btnClose);

  document.body.appendChild(areaHistorico);
}



// ================== CONTADORES ==================

function CountHard(){
  hardCount++;
  document.getElementById("countHard").innerText = hardCount;

  historico.push({
    tipo: "hard",
    dia: new Date().toLocaleDateString("pt-BR")
  });

  localStorage.setItem("historico", JSON.stringify(historico));
}


function CountGood(){
  goodCount++;
  document.getElementById("countGood").innerText = goodCount;

  historico.push({
    tipo: "good",
    dia: new Date().toLocaleDateString("pt-BR")
  });
  

  localStorage.setItem("historico", JSON.stringify(historico));
}


function CountEasy(){
  easyCount++;
  document.getElementById("countEasy").innerText = easyCount;

  historico.push({
    tipo: "easy",
    dia: new Date().toLocaleDateString("pt-BR")
  });

  localStorage.setItem("historico", JSON.stringify(historico));
}
