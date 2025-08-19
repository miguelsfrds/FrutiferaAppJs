// Carrega do LocalStorage
let itensCardapio = JSON.parse(localStorage.getItem("itens")) || [];

// Renderiza tabela
function renderTabela() {
    let tbody = document.querySelector("#tr");
    tbody.innerHTML = "";

    itensCardapio.forEach((item, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nomeEspecie}</td>
            <td>${item.nomeCientifico}</td>
            <td>${item.produçãoMediaSafra}</td>
            <td>${item.dataPlantio}</td>
        `;
        tbody.appendChild(tr);
    });
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
