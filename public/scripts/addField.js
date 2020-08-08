const button = document.querySelector("#add-time")

const cleanFields = fieldsToBeClean => fieldsToBeClean.forEach(field => field.value = '')
const cloneField = () => {
    const fieldsContainerCopy = document.querySelector('.schedule-item').cloneNode(true)
    const fieldsToBeClean = fieldsContainerCopy.querySelectorAll('input')
    
    cleanFields(fieldsToBeClean)
    
    document.querySelector('#schedule-items').appendChild(fieldsContainerCopy)
}

button.addEventListener('click', cloneField)