
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

function pegarIdToken() {
    const token = localStorage.getItem('token');
    if (token) {
        const tokenParts = token.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        console.log(payload.id);
        return payload.id;
    }
    return null;
} 


// Função para renderizar pets na página
function renderizarPets(pets) {
    const container = document.getElementById('SeusPets');
    container.innerHTML = '';

    pets.forEach(pet => {
        const petDiv = document.createElement('div');
        petDiv.innerHTML = `
            <div class="pet">
                <div>
                    <h3>${pet.Nome}</h3> 
                    <img src="http://localhost:3000/${pet.filePath}" alt="${pet.Nome}"> 
                    <div class="descricao">
                        <p style="position: relative; bottom: 10px; background-color:">${pet.Descricao}</p>
                    </div>
                   <button onclick="SelecionarPet('${pet.Nome}', ${pet.Id}, '${pet.filePath}')">Selecionar</button>
                </div>
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

function SelecionarPet(NomePet, idPet) {
    const petSelecionado = document.getElementById('petSelecionado');
    const idPetSpan = document.getElementById('IDPet');
    petSelecionado.innerHTML = NomePet;
    idPetSpan.innerHTML = idPet;
}

// Função para agendar a tosa
async function agendarTosa() {
    const horario = document.querySelector('input[name="horario"]:checked')?.value;
    const servico = document.querySelector('input[name="servico"]:checked')?.value;
    const idPet = document.getElementById('IDPet').innerText.trim();
    const user_id = pegarIdToken();  // Sua função para pegar o ID do usuário
    let descricao = document.getElementById('descricao').value;

    console.log(idPet);

    // Validações
    if (!horario || !servico || !idPet || !user_id) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    if (descricao.length > 2000) {
        alert('A descrição não pode ter mais de 2000 caracteres!');
        return;
    }

    if (descricao.trim().length === 0) {
        descricao = 'Sem descrição';
    }

    try {
        const response = await fetch('http://localhost:3000/api/agendarTosa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')  // Token de segurança
            },
            body: JSON.stringify({
                horario,
                IdPet: idPet,  // Aqui você envia como IdPet no banco
                servico,
                user_id,
                Descricao: descricao
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            alert('Tosa agendada com sucesso!');
            // Aqui você pode limpar o formulário se quiser
        } else {
            alert('Erro ao agendar: ' + data.error);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao agendar tosa');
    }
}

   

function redirecionar(rota) {
    window.location.href = rota;
}




carregarPets();

console.log("pets.js carregado!");