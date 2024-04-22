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