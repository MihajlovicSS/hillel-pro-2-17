'use strict'

const CLASS_DELETE_BTN = 'deleteBtn'
const CLASS_CONTACT_ROW = '.main-table__tr'
const CLASS_ID = '.id'
const form = document.querySelector('#contactForm')
const table = document.querySelector('#table')

form.addEventListener('submit', onFormSubmit)
table.addEventListener('click', onTableContactClick)
inputName.focus()

ContactApi.getList()
    .then((data) => {
        renderList(data)
    })
    .catch((error) => {
        showError(error)
    })

function onFormSubmit(e){
    e.preventDefault()
    const contact = getData()
    clearInputs()
    inputName.focus()
    if(!isDataValid(contact)){
        showError(new Error('Введенные данные не валидны!'))
        return
    }
    ContactApi.create(contact)
        .then((contact) => {
            createTableRowWithNewData(contact)
        })
        .catch(() => {
            showError(error)
        })
}

function onTableContactClick(e){
    const target = e.target
    const contactRow = findContactRow(target)
    const id = contactRow.querySelector(CLASS_ID).textContent
    if(findDeleteButton(target)){
        ContactApi.delete(id)
            .then(() => {
                deleteRow(contactRow)
            })
            .catch(() => {
                showError(error)
            })
    }
    else changeColorContactRow(contactRow)
}

function getData(){
    return {
        name: form.inputName.value,
        surname: form.inputSurname.value,
        phone: form.inputPhone.value
    }
}

function createTableRowWithNewData(data){
    const HTMLTemplate = `
    <tr class='main-table__tr'>
        <td class="main-table__td">
            <span>${data.name}</span>
        </td>
        <td class="main-table__td">
            <span>${data.surname}</span>
        </td>
        <td class="main-table__td">
            <span>${data.phone}</span>
        </td>
        <td class="main-table__td id">${data.id}</td>
        <td>
            <span>
                <button type="button" class="deleteBtn">Delete</button>
            </span>
        </td>
    </tr>
    `
    table.insertAdjacentHTML('beforeend', HTMLTemplate)
}

function renderList(list){
    list.map(createTableRowWithNewData).join('')
}

function findContactRow(element){
    return element.closest(CLASS_CONTACT_ROW)
}

function findDeleteButton(target){
    return target.classList.contains(CLASS_DELETE_BTN)
}
function deleteRow(row){
    row.remove()
}

function changeColorContactRow(row){
    row.classList.toggle('green')
}

function isDataValid(data){
    return isValidName(data.name) && isValidName(data.surname) && isNumber(data.phone)
}

function clearInputs(){
    form.reset()
}

function showError(error){
    alert(error.message)
}

function isNotEmpty (value){
    return value.trim()
}

function isNumber (value){
    return !isNaN(value) && isNotEmpty(value)
}

function isValidName (value){
    return isNotEmpty(value) && !isNumber(value)
}