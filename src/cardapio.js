// Carrega do LocalStorage
let itensCardapio = JSON.parse(localStorage.getItem("itens")) || [];

function CalcPlantio(dataPlantio){
    let plantio = new Date(dataPlantio); // Converte a data de plantio para um objeto Date
    let hoje = new Date(); // Data atual
    let meses = (hoje.getFullYear() - plantio.getFullYear()) * 12 + (hoje.getMonth() - plantio.getMonth()) // Calcula a diferença total em meses (considerando anos e meses)
    if (hoje.getDate() < plantio.getDate()) meses--; // Ajusta caso o "dia do mês" de hoje ainda não tenha chegado (ou seja, mês atual ainda não completou o ciclo)
    return meses >= 0 ? meses : 0; // Garante que o retorno nunca seja negativo (caso a data seja futura)
}

function renderTabela() {
    let container = document.querySelector("#cards-container");
    container.innerHTML = ""; // limpa antes de renderizar de novo

    itensCardapio.forEach((item) => {
        // se não tiver id ainda, gera um
        if (!item.id) {
            item.id = Date.now();
        }

        let card = document.createElement("div");
        card.className = "card m-2";
        card.style.width = "18rem";
        //Montando os cards com as informações passadas pelo usuário
        card.innerHTML = `
            <div class="card-body">
                <img src="${item.imagemFrutifera}">
                <h5 class="card-title">${item.nomeEspecie}</h5>
                <h6 class="card-subtitle mb-2 text-muted"><i>${item.nomeCientifico}</i></h6>
                <p class="card-text">
                    Produção média: ${item.produçãoMediaSafra}<br>
                    Data de plantio: ${item.dataPlantio}<br>
                    <strong>Idade:</strong> ${CalcPlantio(item.dataPlantio)} mês(es)
                </p>
                <strong>ID:</strong> ${item.id}<br>
            </div>
        `;

        container.appendChild(card);
    });

    // salvar itens no localStorage
    localStorage.setItem("itens", JSON.stringify(itensCardapio));
}

// Evento submit
let handleSubmit = (event) => {
    event.preventDefault();

    let cardapioForm = document.getElementById("formCardapio");
    let formData = new FormData(cardapioForm);
    let itemCardapio = Object.fromEntries(formData);

    itemCardapio.id = Date.now();

    itensCardapio.push(itemCardapio);
    localStorage.setItem("itens", JSON.stringify(itensCardapio));

    renderTabela(); // atualiza tabela

    Toastify({
        text: "Dados Enviados",
        duration: 2000,
        gravity: "top",
        position: "right",
        style: { background: "linear-gradient(to right, #00b09b, #96c93d)" }
    }).showToast();

    $("#botaoModal").modal("toggle");
    cardapioForm.reset();
};

// Ativa evento e renderiza tabela ao carregar
document.getElementById("formCardapio").onsubmit = handleSubmit;
renderTabela();
