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

const Transaction = {
    all: [
        {
            description: 'Luz',
            amount: -50000,
            date: '23/01/2021',
        }, 
            
        {
            description: 'Website',
            amount: 500000,
            date: '23/01/2021', 
        }, 
    
        {
            description: 'Internet',
            amount: -20000,
            date: '23/01/2021',
        }
    
    ],

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index){
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes(){
        let income = 0;
        // pegar todas as transações 
        // para cada transação verificar se a transação é maior que 0
        Transaction.all.forEach(transaction => {
            // se for maior que 0
            if (transaction.amount > 0) {
                // somar a uma var e retornar a var
                income += transaction.amount;
            }
        })
        return income
    },

    expenses(){
        let expense = 0;
        // pegar todas as transações 
        // para cada transação verificar se a transação é maior que 0
        Transaction.all.forEach(transaction => {
            // se for menor que 0
            if (transaction.amount < 0) {
                // somar a uma var e retornar a var
                expense += transaction.amount;
            }
        })
        return expense
    },

    total(){
        // Entradas - saídas
        return Transaction.incomes() + Transaction.expenses()
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
        <td class="${CSSclass}">${amount}</td>
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
    },

    updateBalance(){
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())

        document
            .getElementById('expenseDisplay')
            .innerHTML =  Utils.formatCurrency(Transaction.expenses())

        document
            .getElementById('totalDisplay')
            .innerHTML =  Utils.formatCurrency(Transaction.total())
    },

    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "") 

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return(signal + value)
    }
}

const Form = {

    description: document.querySelector('input#description'),
    description: document.querySelector('input#amount'),
    description: document.querySelector('input#date'),

    getValues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields(){
        const { description, amount, date } = Form.getValues()

        if (description.trim() === "" || 
            amount.trim() === "" || 
            date.trim() === ""){
                throw new Error("Por favor, preencha todos os campos")
        }
    },

    submit(event) {
        event.preventDefault()

        try {
            Form.validateFields()   
        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init(){
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        }) // forEach para cada elemento ele executa algo que for declarado

        DOM.updateBalance()
    },

    reload(){
        DOM.clearTransactions()

        App.init()
    }
}

App.init()