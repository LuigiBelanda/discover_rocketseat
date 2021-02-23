const Modal = {

    open(){
        // abrir modal
        // adicionar a class active ao modal
        document
        .querySelector('.modal-overlay')
        .classList
        .add('active')
    },

    close(){
        // fechar o modal
        // remover a class active do modal
        document
        .querySelector('.modal-overlay')
        .classList
        .remove('active') 
    }

}

// um array de objetos
const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    }, 
        
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021', 
    }, 

    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    }

]  

const Transaction = {

    incomes(){
        // Somar as entradas
    },

    expenses(){
        // Somar as saídas
    },

    total(){
        // Entradas - saídas
    }

}

const DOM = {

    transactionsContainer: document.querySelector('#data-table tbody'),  // vai procurar no html o id #data-table e a tag <tbody>

    addTransaction(transaction, index){
        console.log(transaction) // mostra algo no console do browser
        const tr = document.createElement('tr') //pega a var tr e cria nela o elemento HTML <tr>
        tr.innerHTML = DOM.innerHTMLTransaction(transaction) // aqui ele pega a var tr e coloca nela todo o conteúdo da const html do método innerHTMLTransaction

        DOM.transactionsContainer.appendChild(tr) // append = add algo
    },

    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ?  "income" : "expense" // se o valor amount do objeto transaction for menor que 0 ele coloca como classe "income" se não ele coloca "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${transaction.amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="remover transação">
        </td>
        `

        // ${} == uma forma de adicionar variáveis nesse texto texto
        // nesta caso estamos pegando as informações que estão no no array de objetos e selecionando os dados que nos queremos
        // então ${transaction} == da qual é a var que está esse informação
        // ${transaction.date} == a informação que eu quero mostrar na tela 

        return html
    }
}

const Utils = {
    formatCurrency(value){
        const signal = Number(value)
    }
}

transactions.forEach(function (transaction) {
    DOM.addTransaction(transaction)
}) // forEach para cada elemento ele executa algo que for declarado