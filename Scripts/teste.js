// Definir uma lista vazia para armazenar os professores
let professores = [];

// Elementos do formulário e botões
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const addBtn = document.getElementById("add-btn");
const saveBtn = document.getElementById("save-btn");
const closeBtn = document.getElementById("close-btn");
const professorInput = document.querySelector("input[name=addr_ing_name]");
const disciplinasInput = document.querySelector("input[name=diciplinas_D]");
const laboratoriosInput = document.querySelector("input[name=laboratoarios_L]");
const cargaHorariaInput = document.querySelector("input[name=carga_horaria]");
const asInput = document.querySelector("input[name=a_s]");
const descricaoInput = document.querySelector("input[name=descricao_D]");
const addrBookList = document.getElementById("addr-book-list");

// Abrir o formulário para adicionar um novo professor
addBtn.addEventListener("click", () => {
  modal.style.display = "block";
  modalTitle.textContent = "Adicionar Professor";
  saveBtn.textContent = "Adicionar";
  clearFormInputs();
});

// Fechar o formulário
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  clearFormInputs();
});

// Adicionar ou editar um professor
modal.addEventListener("submit", (e) => {
  e.preventDefault();
  const professor = {
    nome: professorInput.value,
    disciplinas: disciplinasInput.value,
    laboratorios: laboratoriosInput.value,
    cargaHoraria: cargaHorariaInput.value,
    as: asInput.value,
    descricao: descricaoInput.value,
  };

  if (saveBtn.textContent === "Salvar") {
    // Editar o professor
    const index = modal.dataset.index;
    professores[index] = professor;
    updateProfessorList();
    clearFormInputs();
    modal.style.display = "none";
  } else {
    // Adicionar um novo professor
    professores.push(professor);
    updateProfessorList();
    clearFormInputs();
    modal.style.display = "none";
  }
});

// Editar um professor
addrBookList.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("edit-icon")) {
    const index = e.target.dataset.index;
    modal.style.display = "block";
    modalTitle.textContent = "Editar Professor";
    saveBtn.textContent = "Salvar";
    fillFormInputs(professores[index]);
    modal.dataset.index = index;
  }
});

// Excluir um professor
addrBookList.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("delete-icon")) {
    const index = e.target.dataset.index;
    professores.splice(index, 1);
    updateProfessorList();
  }
});

// Função para atualizar a lista de professores na página
function updateProfessorList() {
  addrBookList.innerHTML = "";
  professores.forEach((professor, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${professor.nome}</td>
      <td>${professor.disciplinas}</td>
      <td>${professor.laboratorios}</td>
      <td>${professor.cargaHoraria}</td>
      <td>${professor.as}</td>
      <td>${professor.descricao}</td>
      <td><button class="edit-icon" data-index="${index}"><i class="fas fa-pencil-alt"></i></button></td>
      <td><button class="delete-icon" data-index="${index}"><i class="fas fa-trash-alt"></i></button></td>
    `;
    addrBookList.appendChild(row);
  });
}

// Função para limpar os campos do formulário
function clearFormInputs() {
  professorInput.value = "";
  disciplinasInput.value = "";
  laboratoriosInput.value = "";
  cargaHorariaInput.value = "";
  asInput.value = "";
  descricaoInput.value = "";
}

// Função para preencher os campos do formulário com os dados de um professor
function fillFormInputs(professor) {
  professorInput.value = professor.nome;
  disciplinasInput.value = professor.disciplinas;
  laboratoriosInput.value = professor.laboratorios;
  cargaHorariaInput.value = professor.cargaHoraria;
  asInput.value = professor.as;
  descricaoInput.value = professor.descricao;
}

// Inicializar a lista de professores
updateProfessorList();
