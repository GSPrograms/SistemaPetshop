
async function buscaragendamento() {
    const response = await fetch('http://localhost:3000/api/agendamentos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar agendamentos');
    }

    const data = await response.json();
    console.log(data);
    return data;
}

/*pegar filepath do banco com base do id do pet e renderizar */
function renderizarImagem(imagemId) {
fetch(`http://localhost:3000/api/imagens/${imagemId}`)
    .then(response => response.json())
    .then(data => {
        const imagemElement = document.getElementById('imagem');
        imagemElement.src = data.filepath;
    })
}

/*renderizar agendamentos*/
async function renderizaragendamentos() {
    try {
        const agendamentos = await buscaragendamento();  
        const agendamentosContainer = document.getElementById('agendamentos');
        agendamentosContainer.innerHTML = ""; // limpa os agendamentos antigos

        agendamentos.forEach(agendamento => {
            const agendamentoElement = document.createElement('div');
            agendamentoElement.classList.add('agendamento');
            agendamentoElement.innerHTML = `
            <img id="imagem" src="" alt="Imagem do Pet" onclick="renderizarImagem(${agendamento.IdPet})">
            <p class="IdPet">IdPet: ${agendamento.IdPet}</p>
            <p class="horario">horario: ${agendamento.horario}</p>  
            <p class="servico">servico: ${agendamento.servico}</p>
            <p class="descricao">detalhes: ${agendamento.Descricao}</p>
            <div class="acoes">
               <button class="editar" onclick="AbrirEditar(${agendamento.id_agendamento})">Editar</button>
               <button class="cancelar" onclick="ExcluirAgendamento(${agendamento.id_agendamento})">Cancelar</button>
            </div>
          `;
            agendamentosContainer.appendChild(agendamentoElement);
        });
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
    }
}








/*cancelar agendamentos*/
async function ExcluirAgendamento(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/agendamentos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token') // caso precise do token também
        }
      });
  
      if (response.ok) {
        alert('Agendamento cancelado com sucesso!');
        renderizaragendamentos();
      } else {
        alert('Erro ao cancelar agendamento.');
      }
    } catch (error) {
      console.error('Erro na requisição de exclusão:', error);
    }
  }
  function fecharModal() {
    const janela = document.querySelector('.JanelaEditar');
    janela.style.display = 'none';
  }





  async function EditarAgendamento() {
    Console.log('Editando agendamento...');
    const formData = new FormData();
    const id = document.getElementById('id_Agendamento').textContent.split(':')[1].trim();

    const servico = document.querySelector('input[name="servico"]:checked');
    if (servico) {
        formData.append('servico', servico.value);
    }
    
    const horario = document.querySelector('input[name="horario"]:checked');
    if (horario) {
        formData.append('horario', horario.value);  // corrigido aqui
    }

    formData.append('Descricao', document.getElementById('descricao').value);

    try {
        const response = await fetch(`http://localhost:3000/api/EditarAgendamento/${id}`, {
            method: 'PUT',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token') // Não coloca 'Content-Type' quando usa FormData!
            },
            body: formData
        });

        if (response.ok) {
            alert('Agendamento editado com sucesso!');
            fecharModal();
            renderizaragendamentos();
        } else {
            alert('Erro ao editar agendamento.');
        }
    } catch (error) {
        console.error('Erro na requisição de edição:', error);
    }
}




  // Dentro da função que abre o editar, defina o ID
  async function AbrirEditar(id) {
    const janela = document.querySelector('.JanelaEditar');
    janela.style.display = 'block';
  
    try {
      const response = await fetch(`http://localhost:3000/api/Agendamentos/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
  
      if (response.ok) {
        const agendamento = await response.json();
  
        // Atualizar os textos da tela
        document.getElementById('id_Agendamento').textContent = `ID: ${agendamento.id_agendamento}`;
        document.getElementById('horario').textContent = `Horário: ${agendamento.horario}`;
        document.getElementById('servico').textContent = `Serviço: ${agendamento.servico}`;
        document.getElementById('descricao').value = agendamento.Descricao || '';
  
        // Criar o botão "Salvar" se ainda não existir
        const formEditar = document.querySelector('.form-editar');
        let botaoEditar = document.getElementById('editar');
  
        if (!botaoEditar) {
          botaoEditar = document.createElement('button');
          botaoEditar.id = 'botao-editar';
          botaoEditar.type = 'button';
          botaoEditar.textContent = 'Salvar Edição';
          botaoEditar.classList.add('editar');
  
          botaoEditar.addEventListener('click', () => {
            EditarAgendamento(id);
          });
  
          formEditar.appendChild(botaoEditar);
        } else {
          // Se o botão já existe, apenas atualiza o evento
          botaoEditar.onclick = () => EditarAgendamento(id);
        }
  
      } else {
        alert('Erro ao buscar agendamento.');
      }
    } catch (error) {
      console.error('Erro na requisição de edição:', error);
    }
  }
  
  
  
  

  async function AbrirEditar(id) {
    const janela = document.querySelector('.JanelaEditar');
    janela.style.display = 'block';
  
    try {
      const response = await fetch(`http://localhost:3000/api/Agendamentos/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
  
      if (response.ok) {
        const agendamento = await response.json();
  
        // Atualizando o conteúdo das tags <p> na JanelaEditar
        document.getElementById('id_Agendamento').textContent = `ID: ${agendamento.id_agendamento}`;
        document.getElementById('horario').textContent = `Horário: ${agendamento.horario}`;
        document.getElementById('servico').textContent = `Serviço: ${agendamento.servico}`;
        document.getElementById('descricao').textContent = `Descrição: ${agendamento.Descricao}`;
      } else {
        alert('Erro ao buscar agendamento.');
      }
    } catch (error) {
      console.error('Erro na requisição de edição:', error);
    }
  }
  


  






renderizaragendamentos();
console.log("agendamentos.js carregado!");
