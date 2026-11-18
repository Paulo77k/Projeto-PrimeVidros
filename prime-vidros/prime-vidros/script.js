/* =========================================================
   PRIME VIDROS - JavaScript
   Faz duas coisas:
   1. Abre a foto ampliada (lightbox) quando você clica num card
   2. Monta os links do WhatsApp com o nome do serviço escolhido
   ========================================================= */


/* ---------- PASSO 1: dados do WhatsApp ----------
   Se o número mudar, altere só esta linha. */
const WHATS_BASE = "https://wa.me/5511948963581?text=";

// Monta o link do WhatsApp já com a mensagem do serviço.
// encodeURIComponent troca espaços e acentos por códigos que a internet entende.
function linkDoServico(nomeDoServico) {
  const mensagem =
    "Olá! Vim pelo site da Prime Vidros e gostaria de solicitar um orçamento de: " +
    nomeDoServico + ".";
  return WHATS_BASE + encodeURIComponent(mensagem);
}


/* ---------- PASSO 2: pegar os elementos da página ---------- */
const lightbox     = document.getElementById("lightbox");
const lbImagem     = document.getElementById("lb-imagem");
const lbTitulo     = document.getElementById("lb-titulo");
const lbDescricao  = document.getElementById("lb-descricao");
const lbDetalhes   = document.getElementById("lb-detalhes");
const lbOrcamento  = document.getElementById("lb-orcamento");
const lbFechar     = document.getElementById("lb-fechar");

// Todos os cards de serviço (os 6 <figure class="card">)
const cards = document.querySelectorAll(".card");


/* ---------- PASSO 3: abrir a foto ampliada ---------- */
function abrirLightbox(card) {
  // Lê os textos guardados no HTML (atributos data-...)
  const titulo    = card.dataset.titulo;
  const descricao = card.dataset.descricao;
  const detalhes  = card.dataset.detalhes.split("|"); // separa a lista em pedaços
  const foto      = card.querySelector("img");

  // Preenche a janela com as informações desse card
  lbImagem.src = foto.src;
  lbImagem.alt = foto.alt;
  lbTitulo.textContent = titulo;
  lbDescricao.textContent = descricao;

  // Limpa a lista anterior e cria um <li> para cada detalhe
  lbDetalhes.innerHTML = "";
  detalhes.forEach(function (texto) {
    const li = document.createElement("li");
    li.textContent = texto;
    lbDetalhes.appendChild(li);
  });

  // O botão do modal pede orçamento DESTE modelo
  lbOrcamento.href = linkDoServico(titulo);

  lightbox.showModal();                     // abre a janela
  document.body.style.overflow = "hidden";  // trava a rolagem do fundo
}

// Liga o clique de cada card à função acima
cards.forEach(function (card) {
  card.querySelector(".card-abrir").addEventListener("click", function () {
    abrirLightbox(card);
  });
});


/* ---------- PASSO 4: fechar a foto ampliada ---------- */
lbFechar.addEventListener("click", function () {
  lightbox.close();
});

// Clicar fora da janela (no fundo escuro) também fecha
lightbox.addEventListener("click", function (evento) {
  if (evento.target === lightbox) {
    lightbox.close();
  }
});

// Quando a janela fecha (botão, fundo ou tecla Esc), destrava a rolagem
lightbox.addEventListener("close", function () {
  document.body.style.overflow = "";
});


/* ---------- PASSO 5: links "Solicitar orçamento" dos cards ----------
   Cada mini botão abre o WhatsApp falando do serviço do próprio card. */
document.querySelectorAll(".js-orcamento-card").forEach(function (botao) {
  const titulo = botao.closest(".card").dataset.titulo;
  botao.href = linkDoServico(titulo);
});


/* ---------- PASSO 6: ano atual no rodapé ---------- */
document.getElementById("ano").textContent = new Date().getFullYear();
