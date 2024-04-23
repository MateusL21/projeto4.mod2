document.addEventListener("DOMContentLoaded", function () {
    // Seletor para o campo de entrada do CEP
    const inputCep = document.getElementById("inputCep");

    // Adiciona um evento de escuta para o evento de mudança de valor no campo de CEP
    inputCep.addEventListener("change", function () {
        const cep = inputCep.value.replace(/\D/g, ''); // Remove caracteres não numéricos do CEP

        // Verifica se o CEP tem o tamanho correto
        if (cep.length === 8) {
            const url = `https://viacep.com.br/ws/${cep}/json/`;

            // Faz a requisição para a API do ViaCEP
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Exemplo de como você pode utilizar os dados recebidos da API
                    document.getElementById("inputAdress").value = data.logradouro;
                    document.getElementById("inputNeighboor").value = data.bairro;
                    document.getElementById("inputCity").value = data.localidade;
                    document.getElementById("inputState").value = data.uf;
                })
                .catch(error => {
                    console.error('Erro ao buscar o CEP:', error);
                });
        }
    });
});

function onblur(){
    const inputCep = document.getElementById("inputCep");
        const cep = inputCep.value.replace(/\D/g, ''); // Remove caracteres não numéricos do CEP

        if (cep.length !== 8) {
            alert('CEP inválido. O CEP deve conter exatamente 8 dígitos.');
            return;
        }

        const url = `https://viacep.com.br/ws/${cep}/json/`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('CEP não encontrado.');
                }
                return response.json();
            })
            .then(data => {
                // Preenche os campos de endereço com os dados obtidos
                document.getElementById("inputAdress").value = data.logradouro;
                document.getElementById("inputNeighboor").value = data.bairro;
                document.getElementById("inputCity").value = data.localidade;
                document.getElementById("inputState").value = data.uf;
            })
            .catch(error => {
                alert('Erro ao buscar o CEP. Verifique se o CEP está correto e tente novamente.');
                console.error('Erro ao buscar o CEP:', error);
            });
}

var dados = [
    {
        id: 1,
        name: "Glauco",
        lastname: "Todesco",
        adress: "Rua Leite Penteado",
        CEP: "18010-050",
        neighboor: "Centro",
        city: "Sorocaba",
        state: "SP"
    },
];

function loadDados() {
    for (let data of dados) {
        addNewRow(data);
    }
}

function save() {
    var data = {
        id: dados.length + 1,
        name: document.getElementById("inputName").value,
        lastname: document.getElementById("inputLastname").value,
        adress: document.getElementById("inputAdress").value,
        CEP: document.getElementById("inputCep").value,
        neighboor: document.getElementById("inputNeighboor").value,
        city: document.getElementById("inputCity").value,
        state: document.getElementById("inputState").value,
    };

    // Adiciona os dados à tabela e ao array 'dados'
    addNewRow(data);
    dados.push(data);

    // Limpa o formulário após salvar os dados
    document.getElementById("formAdress").reset();
}

function addNewRow(data) {
    // Seleciona a tabela e seu corpo (tbody)
    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');

    // Cria uma nova linha (tr) para os dados recebidos
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <th scope="row">${data.id}</th>
        <td>${data.name} ${data.lastname}</td>
        <td>${data.adress}</td>
        <td>${data.CEP}</td>
        <td>${data.neighboor}</td>
        <td>${data.city}</td>
        <td>${data.state}</td>
    `;

    // Adiciona a nova linha ao corpo da tabela
    tbody.appendChild(newRow);
}
