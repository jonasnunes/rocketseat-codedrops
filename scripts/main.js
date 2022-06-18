// procurar todas as tags que possuem o atributo required
const fields = document.querySelectorAll('[required]')

function validateField(field){

    // verificar se existem erros
    function verifyErrors(){
        let foundError = false

        for(let error in field.validity){
            // se não for customError, então verifica se tem erro
            if(field.validity[error] && !field.validity.valid){
                foundError = error
            }
        }

        return foundError
    }

    function customMessage(typeError){
        const messages = {
            text: {
                valueMissing: 'Campo Obrigatório!'
            },
            email: {
                valueMissing: 'Campo Obrigatório!',
                typeMismatch: 'Informe um email válido!'
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message){

        const spanError = field.parentNode.querySelector('span.error')

        if(message){
            spanError.classList.add('active')
            spanError.innerHTML = message
        } else{
            spanError.classList.remove('active')
            spanError.innerHTML = ''
        }
    }

    return function(){

        const error = verifyErrors()

        if(error){
            const message = customMessage(error)

            field.style.borderColor = 'red'
            setCustomMessage(message)
        } else{
            field.style.borderColor = 'green'
            setCustomMessage()
        }
    }
}

function customValidation(event){

    const field = event.target
    const validation = validateField(field)

    validation()
    
}

for(let field of fields){
    field.addEventListener('invalid', event => {
        // eliminar o bubble
        event.preventDefault()
        customValidation(event)
    })
    field.addEventListener('blur', customValidation)
}