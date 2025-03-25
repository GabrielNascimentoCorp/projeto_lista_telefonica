// Aguarda até que o DOM esteja totalmente carregado antes de executar o código.
document.addEventListener("DOMContentLoaded", function () {
    // Obtém o formulário de telefone
    const form = document.getElementById("form-telefone");
    // Obtém o corpo da tabela onde os contatos serão listados
    const tbody = document.querySelector("tbody");
    // Obtém o elemento onde será exibida a última data e hora de adição
    const dataHoraCampo = document.querySelector("#data-hora-adesao span");

    // Cria um alerta estilizado na tela
    const alertBox = document.createElement("div");
    alertBox.style.position = "fixed"; // Fixa o alerta na tela
    alertBox.style.top = "10px"; // Define a posição no topo
    alertBox.style.left = "50%"; // Centraliza horizontalmente
    alertBox.style.transform = "translateX(-50%)"; // Ajusta o alinhamento
    alertBox.style.backgroundColor = "#ff4d4d"; // Define cor de fundo vermelha
    alertBox.style.color = "#fff"; // Define a cor do texto como branco
    alertBox.style.padding = "10px 20px"; // Adiciona espaçamento interno
    alertBox.style.borderRadius = "5px"; // Arredonda as bordas
    alertBox.style.display = "none"; // Inicialmente esconde o alerta
    document.body.appendChild(alertBox); // Adiciona o alerta ao corpo da página

    // Cria um conjunto para armazenar contatos únicos e evitar duplicatas
    const contatos = new Set();

    // Função para exibir alertas personalizados na tela
    function showAlert(message) {
        alertBox.textContent = message; // Define o texto do alerta
        alertBox.style.display = "block"; // Exibe o alerta
        setTimeout(() => {
            alertBox.style.display = "none"; // Esconde o alerta após 3 segundos
        }, 3000);
    }

    // Evento que escuta o envio do formulário
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede que o formulário recarregue a página

        // Obtém os valores dos campos de entrada e remove espaços extras
        const nome = document.getElementById("nome-contato").value.trim();
        const ddd = document.getElementById("ddd-contato").value.trim();
        const numero = document.getElementById("número-contato").value.trim();
        
        // Cria um identificador único para o contato
        const identificador = `${nome}-${ddd}-${numero}`;

        // Verifica se todos os campos foram preenchidos
        if (!nome || !ddd || !numero) {
            showAlert("Preencha todos os campos!"); // Exibe alerta se algum campo estiver vazio
            return;
        }

        // Verifica se o contato já existe na lista
        if (contatos.has(identificador)) {
            showAlert("Contato já existe!"); // Exibe alerta se for um contato duplicado
            return;
        }

        // Adiciona o contato ao conjunto para evitar duplicações
        contatos.add(identificador);
        
        // Obtém a data e hora atuais no formato brasileiro
        const dataHoraAdicao = new Date().toLocaleString("pt-BR");

        // Cria uma nova linha para adicionar o contato à tabela
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>${nome}</td>
            <td>${ddd}</td>
            <td>${numero}</td>
            <td>${dataHoraAdicao}</td>
        `;
        tbody.appendChild(novaLinha); // Adiciona a nova linha à tabela

        // Atualiza a última data e hora de adição
        if (dataHoraCampo) {
            dataHoraCampo.textContent = dataHoraAdicao;
        }
        
        // Reseta o formulário para limpar os campos
        form.reset();
    });
});