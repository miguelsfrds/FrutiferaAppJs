// Carrega do LocalStorage
let itensCardapio = JSON.parse(localStorage.getItem("itens")) || [];

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

        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${item.nomeEspecie}</h5>
                <h6 class="card-subtitle mb-2 text-muted"><i>${item.nomeCientifico}</i></h6>
                <p class="card-text">
                    <strong>ID:</strong> ${item.id}<br>
                    Produção média: ${item.produçãoMediaSafra}<br>
                    Data de plantio: ${item.dataPlantio}
                </p>
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
