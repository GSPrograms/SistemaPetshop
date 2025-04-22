const API_URL_REGISTRARPET = 'http://localhost:3000/api/RegistrarPet';
const fileInput = document.getElementById('imagemPet');
const imagePreview = document.getElementById('preview');


/*pegar id token*/
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


/* Função para pré-visualizar a imagem*/ 
fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        imagePreview.src = e.target.result;
    };

    reader.readAsDataURL(file);
});



function registrarPet() {
    const fileInput = document.getElementById('imagemPet'); // Você esqueceu de definir fileInput
    const formData = new FormData();

    alert('Registrando Pet...');
    formData.append('imagem', fileInput.files[0]);
    formData.append('Nome', document.getElementById('Nome').value);
    formData.append('Raca', document.getElementById('Raca').value);
    formData.append('Idade', document.getElementById('Idade').value);
    formData.append('user_id', pegarIdToken());

    // Pegar o radio button selecionado de sexo
    const sexoSelecionado = document.querySelector('input[name="sexo"]:checked');
    if (sexoSelecionado) {
        formData.append('Sexo', sexoSelecionado.value);
    }

    // Pegar o radio button selecionado de porte
    const porteSelecionado = document.querySelector('input[name="porte"]:checked');
    if (porteSelecionado) {
        formData.append('Porte', porteSelecionado.value);
    }

    formData.append('Descricao', document.getElementById('descricao').value);
   

    alert('Formdata feito');
    alert("checando formdata");

    // Para visualizar os dados:
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    fetch(API_URL_REGISTRARPET, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Pet cadastrado com sucesso!');
    })
    .catch(error => {
        console.error(error);
        alert('Erro ao cadastrar o pet.');
    });
}

