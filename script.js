// Lista de pedras disponíveis
const pedras = [
  "agata",
  "agua marinha",
  "amazonita",
  "ametista",
  "ambar",
  "apatita",
  "azurita",
  "basalto",
  "bismuto",
  "bornita",
  "calcita",
  "cianita negra",
  "cianita azul",
  "charoita",
  "citrino",
  "cornalina",
  "crisocola",
  "crosoprasio",
  "dendrita",
  "enxofre",
  "esmeralda",
  "fluorita",
  "galena",
  "granada",
  "hematita",
  "howlita",
  "serpentina",
  "jaspe paisagem",
  "jaspe sangue de dragao",
  "jaspe vermelha",
  "kunzita",
  "labradorita",
  "lepidolita",
  "lapis lazuli",
  "larimar",
  "malaquita",
  "morganita",
  "obsidiana",
  "olho de tigre",
  "onix",
  "opala",
  "pedra da lua",
  "pirita",
  "quartzo azul",
  "quartzo cereja",
  "quartzo cristal",
  "quartzo rosa",
  "rodocrosita",
  "rodonita",
  "sodalita",
  "topazio imperial",
  "turmalina negra",
  "turmalina rosa",
  "turquesa",
  "zoizita com rubi"
];

// Elementos do DOM
const searchInput = document.getElementById("search-input");
const suggestionsList = document.getElementById("suggestions");

// Função para normalizar nomes em IDs
function normalizeId(name) {
  return name
    .toLowerCase() // Minúsculas
    .replace(/ /g, "-") // Espaços por traços
    .replace(/[^\w-]/g, ""); // Remove caracteres especiais
}

// Função debounce para otimizar eventos frequentes
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Atualizar sugestões no campo de pesquisa
function updateSuggestions() {
  const query = searchInput.value.toLowerCase(); // Texto digitado
  suggestionsList.innerHTML = ""; // Limpa a lista

  if (query) {
    const filtered = pedras
      .filter(pedra => pedra.toLowerCase().includes(query)) // Filtra pedras compatíveis
      .sort(); // Ordena alfabeticamente

    if (filtered.length > 0) {
      suggestionsList.classList.add("active"); // Exibe a lista
      filtered.forEach(pedra => {
        const li = document.createElement("li");
        li.textContent = pedra; // Texto da sugestão
        li.setAttribute("role", "option"); // Acessibilidade
        li.addEventListener("click", () => {
          searchInput.value = pedra; // Preenche o campo com a sugestão
          suggestionsList.innerHTML = ""; // Limpa a lista
          suggestionsList.classList.remove("active"); // Oculta a lista
        });
        suggestionsList.appendChild(li);
      });
    } else {
      suggestionsList.classList.remove("active"); // Oculta a lista
    }
  } else {
    suggestionsList.classList.remove("active"); // Oculta se não houver texto
  }
}

// Rolar até a pedra ao enviar o formulário
function scrollToTarget(event) {
  event.preventDefault(); // Evita recarregar a página
  const query = searchInput.value.toLowerCase();
  const targetId = normalizeId(query);
  const target = document.getElementById(targetId);

  if (target) {
    const headerHeight = document.querySelector("header").offsetHeight; // Altura do header
    const mainMarginTop = parseInt(window.getComputedStyle(document.querySelector("main")).marginTop); // margin-top da main
    const targetPosition = target.offsetTop; // Posição do elemento
    const scrollPosition = targetPosition - headerHeight - mainMarginTop;

    // Evitar rolagem se o elemento já estiver visível
    const rect = target.getBoundingClientRect();
    if (rect.top >= headerHeight && rect.bottom <= window.innerHeight) {
      console.log("Elemento já visível.");
      return;
    }

    // Rola até o elemento
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth"
    });
  } else {
    alert("Pedra não encontrada! Verifique se o nome foi digitado corretamente.");
  }
}

// Adicionar eventos
searchInput.addEventListener("input", debounce(updateSuggestions, 300)); // Debounce na entrada
document.getElementById("search-form").addEventListener("submit", scrollToTarget);
