function CepSearch() {
    var CEP = document.getElementById("inputCep").value;
    var url = `https://viacep.com.br/ws/${CEP}/json/`;

    $.getJSON(url, (response) => {
        if (!response.erro) {
            
            document.getElementById("inputAddress").value = response.logradouro;
            document.getElementById("inputCity").value = response.localidade;
            document.getElementById("inputNeighboor").value = response.bairro;
            document.getElementById("inputState").value = response.uf;

            var errorElement = document.getElementById("error");
            if (errorElement) {
                errorElement.innerText = "";
            }

            var inputNumber = document.getElementById("inputNumber");
            if (inputNumber) {
                inputNumber.readOnly = false;
                inputNumber.classList.remove("bg-body-secondary");
            }
        } else {
            
            document.getElementById("inputAddress").value = "";
            document.getElementById("inputCity").value = "";
            document.getElementById("inputNeighboor").value = "";
            document.getElementById("inputState").value = "";

            var errorElement = document.getElementById("error");
            if (errorElement) {
                errorElement.innerText = "CEP não encontrado.";
            }

            var inputNumber = document.getElementById("inputNumber");
            if (inputNumber) {
                inputNumber.readOnly = true;
                inputNumber.classList.add("bg-body-secondary"); 
            }
        }
    }).fail(function() {
       
        var errorElement = document.getElementById("error");
        if (errorElement) {
            errorElement.innerText = "CEP Inválido."; 
        }

        var inputNumber = document.getElementById("inputNumber");
        if (inputNumber) {
            inputNumber.readOnly = true;
            inputNumber.classList.add("bg-body-secondary");
        }
    });
}

var dados = []; 

function save() {
    event.preventDefault(); 

    var name = document.getElementById("inputName").value;
    var lastname = document.getElementById("inputLastname").value;
    var address = document.getElementById("inputAddress").value;
    var number = document.getElementById("inputNumber").value;
    var CEP = document.getElementById("inputCep").value;
    var neighboor = document.getElementById("inputNeighboor").value;
    var city = document.getElementById("inputCity").value;
    var state = document.getElementById("inputState").value;

    var clientData = {
        id: dados.length + 1,
        name: name,
        lastname: lastname,
        address: address,
        number: number,
        CEP: CEP,
        neighboor: neighboor,
        city: city,
        state: state
    };

    dados.push(clientData);

    addNewRow(clientData);

    document.getElementById("inputName").value = "";
    document.getElementById("inputLastname").value = "";
    document.getElementById("inputAddress").value = "";
    document.getElementById("inputNumber").value = "";
    document.getElementById("inputCep").value = "";
    document.getElementById("inputNeighboor").value = "";
    document.getElementById("inputCity").value = "";
    document.getElementById("inputState").value = "";
}

function addNewRow(data) {
    
    var tbody = document.getElementById("clientesTableBody");

    var newRow = document.createElement("tr");
    newRow.innerHTML = `
        <th scope="row">${data.id}</th>
        <td>${data.name} ${data.lastname}</td>
        <td>${data.address}, ${data.number}</td>
        <td>${data.CEP}</td>
        <td>${data.neighboor}</td>
        <td>${data.city}</td>
        <td>${data.state}</td>
    `;

    tbody.appendChild(newRow);
}
