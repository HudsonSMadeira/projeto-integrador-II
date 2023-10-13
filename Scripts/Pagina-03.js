
// ----------------------- Adicionar Professores --------------------------- //


// regular expression for validation
const strRegex =  /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

// -------------------------------------------------- //

const countryList = document.getElementById('country-list');
const fullscreenDiv = document.getElementById('fullscreen-div');
const modal = document.getElementById('modal');
const addBtn = document.getElementById('add-btn');
const closeBtn = document.getElementById('close-btn');
const modalBtns = document.getElementById('modal-btns');
const form = document.getElementById('modal');
const addrBookList = document.querySelector('#addr-book-list tbody');

// -------------------------------------------------- //
let professor = cargahoraria = ensino = turmas = Observações = AtivDidaticaPedagogica = Orientações = AtivAdministrativas = AtivRepresentações = AtivPesquisaExtensão = Capacitação = "";

// Address class
class Address{
    constructor(id, professor, cargahoraria, ensino, turmas, Observações, AtivDidaticaPedagogica, Orientações, AtivAdministrativas, AtivRepresentações, AtivPesquisaExtensão, Capacitação){
        this.id = id;
        this.professor = professor;
        this.cargahoraria = cargahoraria;
        this.ensino = ensino;
        this.turmas = turmas;
        this.Observações = Observações;
        this.AtivDidaticaPedagogica = AtivDidaticaPedagogica;
        this.Orientações = Orientações;
        this.AtivAdministrativas = AtivAdministrativas;
        this.AtivRepresentações = AtivRepresentações;
        this.AtivPesquisaExtensão = AtivPesquisaExtensão;
        this.Capacitação = Capacitação;
    }

    static getAddresses(){
        // from local storage
        let addresses;
        if(localStorage.getItem('addresses') == null){
            addresses = [];
        } else {
            addresses = JSON.parse(localStorage.getItem('addresses'));
        }
        return addresses;
    }

    static addAddress(address){
        const addresses = Address.getAddresses();
        addresses.push(address);
        localStorage.setItem('addresses', JSON.stringify(addresses));
    }

    static deleteAddress(id){
        const addresses = Address.getAddresses();
        addresses.forEach((address, index) => {
            if(address.id == id){
                addresses.splice(index, 1);
            }
        });

        localStorage.setItem('addresses', JSON.stringify(addresses));
        form.reset();
        UI.closeModal();
        addrBookList.innerHTML = "";
        UI.showAddressList();
    }

    static updateAddress(item){
        const addresses = Address.getAddresses();
        addresses.forEach(address => {
            if(address.id == item.id){
                address.professor = item.professor
                address.cargahoraria = item.cargahoraria;
                address.ensino = item.ensino;
                address.turmas = item.turmas;
                address.Observações = item.Observações;
                address.AtivDidaticaPedagogica = item.AtivDidaticaPedagogica;
                address.Orientações = item.Orientações;
                address.AtivAdministrativas = item.AtivAdministrativas;
                address.AtivRepresentações = item.AtivRepresentações;
                address.AtivPesquisaExtensão = item.AtivPesquisaExtensão;
                address.Capacitação = item.Capacitação;
                
            }
        });

        localStorage.setItem('addresses', JSON.stringify(addresses));
        addrBookList.innerHTML = "";
        UI.showAddressList();
    }
}

// UI class
class UI{
    static showAddressList(){
        const addresses = Address.getAddresses();
        addresses.forEach(address => UI.addToAddressList(address));
    }

    static addToAddressList(address){
        const tableRow = document.createElement('tr');
        tableRow.setAttribute('data-id', address.id);
        tableRow.innerHTML = `
            <td>${address.id}</td>
            <td>${address.professor}</td>
            <td>${address.cargahoraria}</td>   
            <td>${address.ensino}</td>
            <td>${address.turmas}</td>
            <td>${address.Observações}</td>
            <td>${address.AtivDidaticaPedagogica}</td>
            <td>${address.Orientações}</td>
            <td>${address.AtivAdministrativas}</td>
            <td>${address.AtivRepresentações}</td>
            <td>${address.AtivPesquisaExtensão}</td>
            <td>${address.Capacitação}</td>
        `;
        addrBookList.appendChild(tableRow);

    }

    static showModalData(id){
        const addresses = Address.getAddresses();
        addresses.forEach(address => {
            if(address.id == id){
                form.professor.value = address.professor;
                form.carga_horaria.value = address.cargahoraria;
                form.ensino.value = address.ensino;
                form.turmas.value = address.turmas;
                form.Observações.value = address.Observações;
                form.Ativ_Didatica_Pedagogica.value = address.AtivDidaticaPedagogica;
                form.Orientações.value = address.Orientações;
                form.Ativ_Administrativas.value = address.AtivAdministrativas;
                form.Ativ_Representações.value = address.AtivRepresentações;
                form.Ativ_Pesquisa_Extensão.value = address.AtivPesquisaExtensão;
                form.Capacitação.value = address.Capacitação;
                document.getElementById('modal-title').innerHTML = "Change Address Details";

                document.getElementById('modal-btns').innerHTML = `
                    <button type = "submit" id = "update-btn" data-id = "${id}">Update </button>
                    <button type = "button" id = "delete-btn" data-id = "${id}">Delete </button>
                `;
            }
        });
    }

    static showModal(){
        modal.style.display = "block";
        fullscreenDiv.style.display = "block";
    }

    static closeModal(){
        modal.style.display = "none";
        fullscreenDiv.style.display = "none";
    }

}

// DOM Content Loaded
window.addEventListener('DOMContentLoaded', () => {
    loadJSON(); // loading country list from json file
    eventListeners();
    UI.showAddressList();
});

// event listeners
function eventListeners(){
    // show add item modal
    addBtn.addEventListener('click', () => {
        form.reset();
        document.getElementById('modal-title').innerHTML = "Adicionar Professores";
        UI.showModal();
        document.getElementById('modal-btns').innerHTML = `
            <button type = "submit" id = "save-btn"> Salvar </button>
        `;
    });

    // close add item modal
    closeBtn.addEventListener('click', UI.closeModal);

    // add an address item
    modalBtns.addEventListener('click', (event) => {
        event.preventDefault();
        if(event.target.id == "save-btn"){
            let isFormValid = getFormData();
            if(!isFormValid){
                form.querySelectorAll('input').forEach(input => {
                    setTimeout(() => {
                        input.classList.remove('errorMsg');
                    }, 1500);
                });
            } else {
                let allItem = Address.getAddresses();
                let lastItemId = (allItem.length > 0) ? allItem[allItem.length - 1].id : 0;
                lastItemId++;

                const addressItem = new Address(lastItemId, professor, cargahoraria, ensino, turmas, Observações, AtivDidaticaPedagogica, Orientações, AtivRepresentações, AtivPesquisaExtensão, Capacitação);
                Address.addAddress(addressItem);
                UI.closeModal();
                UI.addToAddressList(addressItem);
                form.reset();
            }
        }
    });

    // table row items
    addrBookList.addEventListener('click', (event) => {
        UI.showModal();
        let trElement;
        if(event.target.parentElement.tagName == "TD"){
            trElement = event.target.parentElement.parentElement;
        }

        if(event.target.parentElement.tagName == "TR"){
            trElement = event.target.parentElement;
        }

        let viewID = trElement.dataset.id;
        UI.showModalData(viewID);
    });

    // delete an address item
    modalBtns.addEventListener('click', (event) => {
        if(event.target.id == 'delete-btn'){
            Address.deleteAddress(event.target.dataset.id);
        }
    });

    // update an address item
    modalBtns.addEventListener('click', (event) => {
        event.preventDefault();
        if(event.target.id == "update-btn"){
            let id = event.target.dataset.id;
            let isFormValid = getFormData();
            if(!isFormValid){
                form.querySelectorAll('input').forEach(input => {
                    setTimeout(() => {
                        input.classList.remove('errorMsg');
                    }, 1500);
                });
            } else {
                const addressItem = new Address(id, professor, cargahoraria, ensino, turmas, Observações, AtivDidaticaPedagogica, Orientações, AtivRepresentações, AtivPesquisaExtensão, Capacitação);
                Address.updateAddress(addressItem);
                UI.closeModal();
                form.reset();
            }
        }
    });
}


// load countries list
function loadJSON(){
    fetch('countries.json')
    .then(response => response.json())
    .then(data => {
        let html = "";
        data.forEach(AtivPesquisaExtensão => {
            html += `
                <option> ${AtivPesquisaExtensão.AtivPesquisaExtensão} </option>
            `;
        });
        countryList.innerHTML = html;
    })
}


// get form data
function getFormData(){
    let inputValidStatus = [];
    // console.log(professor.value, form.professor.value, form.carga_horaria.value, form.ensino.value, form.turmas.value, form.Observações.value, form.Ativ_Didatica_Pedagogica.value, form.Orientações.value, form.Ativ_Administrativas.value, form.labels.value);

    if(!strRegex.test(form.professor.value) || form.professor.value.trim().length == 0){
        addErrMsg(form.professor);
        inputValidStatus[0] = false;
    } else {
        professor = form.professor.value;
        inputValidStatus[0] = true;
    }

    if(!strRegex.test(form.cargahoraria.value) || form.cargahoraria.value.trim().length == 0){
        addErrMsg(form.cargahoraria);
        inputValidStatus[1] = false;
    } else {
        cargahoraria = form.cargahoraria.value;
        inputValidStatus[1] = true;
    }

    if(!strRegex.test(form.ensino.value) || form.ensino.value.trim().length == 0){
        addErrMsg(form.ensino);
        inputValidStatus[2] = false;
    } else {
        ensino = form.ensino.value;
        inputValidStatus[2] = true;
    }

    if(!emailRegex.test(form.turmas.value)){
        addErrMsg(form.turmas);
        inputValidStatus[3] = false;
    } else {
        turmas = form.turmas.value;
        inputValidStatus[3] = true;
    }

    if(!phoneRegex.test(form.Observações.value)){
        addErrMsg(form.Observações);
        inputValidStatus[4] = false;
    } else {
        Observações = form.Observações.value;
        inputValidStatus[4] = true;
    }

    if(!(form.AtivDidaticaPedagogica.value.trim().length > 0)){
        addErrMsg(form.AtivDidaticaPedagogica);
        inputValidStatus[5] = false;
    } else {
        AtivDidaticaPedagogica = form.AtivDidaticaPedagogica.value;
        inputValidStatus[5] = true;
    }

    if(!digitRegex.test(form.Orientações.value)){
        addErrMsg(form.Orientações);
        inputValidStatus[6] = false;
    } else {
        Orientações = form.Orientações.value;
        inputValidStatus[6] = true;
    }

    if(!strRegex.test(form.AtivRepresentações.value) || form.AtivRepresentações.value.trim().length == 0){
        addErrMsg(form.city);
        inputValidStatus[7] = false;
    } else {
        AtivRepresentações = form.AtivRepresentações.value;
        inputValidStatus[7] = true;
    }
    AtivPesquisaExtensão = form.AtivPesquisaExtensão.value;
    AtivPesquisaExtensão = form.AtivPesquisaExtensão.value;
    return inputValidStatus.includes(false) ? false : true;
}


function addErrMsg(inputBox){
    inputBox.classList.add('errorMsg');
}

/*------------------ Barra de Pesquisar ------------------------*/ 


let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");


searchBox.addEventListener("click", ()=>{
  navbar.classList.toggle("showInput");
  if(navbar.classList.contains("showInput")){
    searchBox.classList.replace("bx-search" ,"bx-x");
  }else {
    searchBox.classList.replace("bx-x" ,"bx-search");
  }
});


let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function() {
navLinks.style.left = "0";
}
menuCloseBtn.onclick = function() {
navLinks.style.left = "-100%";
}


let htmlcssArrow = document.querySelector(".htmlcss-arrow");
htmlcssArrow.onclick = function() {
 navLinks.classList.toggle("show1");
}
let moreArrow = document.querySelector(".more-arrow");
moreArrow.onclick = function() {
 navLinks.classList.toggle("show2");
}
let jsArrow = document.querySelector(".js-arrow");
jsArrow.onclick = function() {
 navLinks.classList.toggle("show3");
}