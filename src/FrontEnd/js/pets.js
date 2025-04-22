
/* puxar infos do pet do banco de dados onde possui o user_id igual ao user_id do token*/
// Função para buscar pets
const API_URL_PETDELETE = "http://localhost:3000/api/petdelete";


async function buscarPets() {
    const response = await fetch('http://localhost:3000/api/pets', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar pets');
    }

    const data = await response.json();
    return data;
}

// Função para renderizar pets na página
function renderizarPets(pets) {
    const container = document.getElementById('containerPets');
    container.innerHTML = ''; 

    pets.forEach(pet => {
        const petDiv = document.createElement('div');
        petDiv.innerHTML = `
            <div class="pet">
                <div>
                    <h3>${pet.Nome}</h3> 
                    <img src="http://localhost:3000/${pet.filePath}" alt="${pet.Nome}"> 
                    <div class="descricao">
                        <p>${pet.Descricao}</p>
                    </div>
                </div>
                <p>${pet.Id}</p>
                <button onclick="abrirPopup(${pet.Id})">Detalhes</button>
            </div>
        `;
        container.appendChild(petDiv);
    });
}


// Função para carregar pets (buscar e renderizar)
async function carregarPets() {
    try {
        const pets = await buscarPets();
        console.log(pets);
        renderizarPets(pets);
    } catch (error) {
        console.error('Erro ao carregar pets:', error.message);
    }
}

function abrirPopup(petId) {
    const popup = document.querySelector('.popup');
    const popupContent = document.querySelector('.popup-content');
    popup.style.display = 'block';
    popupContent.style.display = 'block';
    popupContent.innerHTML = `
        <button onclick="fecharPopup()">Fechar</button>
        <button onclick="editarPet()">Editar</button>
        <button onclick="ConfirmarExcluir(${petId})">Excluir</button>
        
    `;
}



// Função para fechar popup
function fecharPopup() {
    const popup = document.querySelector('.popup');
    const popupContent = document.querySelector('.popup-content');
    const popupexcluir = document.querySelector('.popup-excluir');
    if (popup) popup.style.display = 'none';
    if (popupContent) popupContent.style.display = 'none';
    if (popupexcluir) popupexcluir.style.display = 'none';
}


function ConfirmarExcluir(petId) {
    buscarPets();
    const popup = document.querySelector('.popup-excluir');
    popup.style.display = 'block';
    popup.innerHTML = `
        <button onclick="excluirPet(${petId}); fecharPopup()">Confirmar</button>
        <button onclick="fecharPopup()">Cancelar</button>
    `;
}

// Função para excluir pet e excluir imagem de uploads
async function excluirPet(petId) {
    await fetch(`${API_URL_PETDELETE}/${petId}`, {
        method: 'DELETE'
    });
    carregarPets();
}

function editarPet() {
    window.location.href = "editarPet.html";
}

carregarPets();

console.log("pets.js carregado!");
