const API_URL = "http://localhost:3000/api/"
const API_URL_LOGIN = "http://localhost:3000/api/login"
const API_URL_LOGOUT = "http://localhost:3000/api/logout"
const API_URL_REGISTRO = "http://localhost:3000/api/register"
const API_URL_EDITAR = "http://localhost:3000/api/editar"
const API_URL_EXCLUIR = "http://localhost:3000/api/excluir"
let editingId = null





function PegarIDToken() {
    const token = localStorage.getItem('token');
    if (token) {
        const tokenParts = token.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));

        return payload.id;
    }
    return null;
}

// =============================================== Validar telefone ======================================================
function validarTelefone(telefone) {
    telefone = telefone.replace(/[^\d]+/g, ''); // remove tudo que não for número

    if (telefone.length < 10 || telefone.length > 11) {
        return false;
    }

    // Verifica se começa com DDD válido (2 dígitos de 11 a 99)
    const ddd = telefone.substring(0, 2);
    if (parseInt(ddd) < 11 || parseInt(ddd) > 99) {
        return false;
    }

    // Se tiver 11 dígitos, deve começar com 9 (nono dígito)
    if (telefone.length === 11 && telefone[2] !== '9') {
        return false;
    }

    return true;
}

// =============================================== Validar CPF ======================================================
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // remove pontos e traço

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Validar 1º dígito
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let dig1 = 11 - (soma % 11);
    if (dig1 >= 10) dig1 = 0;

    // Validar 2º dígito
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    let dig2 = 11 - (soma % 11);
    if (dig2 >= 10) dig2 = 0;

    // Verifica se os dígitos batem
    return cpf[9] == dig1 && cpf[10] == dig2;
} 

// =============================================== função de redirecionamento ======================================================

function redirecionar(pagina)
{
    window.location.href = pagina+".html"
}

// ===============================================  CHECAGEM de Login ======================================================
async function ChecarLogin() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    try {
        const response = await fetch(API_URL_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, senha }),
        });

        const result = await response.json(); 
        console.log(result); 

        if (response.ok) {
            alert("Login efetuado com sucesso!");
            // Armazenar o token no localStorage ou cookies
            localStorage.setItem('token', result.token);
            redirecionar("index")
        } else {
            alert("Erro: " + result.message || result);
        }
    } catch (error) {
        console.error("Erro no login:", error);
        alert("Erro ao conectar com o servidor.");
    }
}

// ===============================================  CHECAGEM de email ======================================================

function ValidarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
// ===============================================  CHECAGEM de senha ======================================================
  function validarSenha(senha) {
    // Verifica se a senha tem pelo menos 3 caracteres
    if (senha.length < 3) {
        alert("A senha deve ter pelo menos 3 caracteres.");
        return false;
    }

    // Verifica se tem pelo menos um caractere especial
    const caractereEspecial = /[!@#$%^&*(),.?":{}|<>]/;
    if (!caractereEspecial.test(senha)) {
        alert("A senha deve conter pelo menos um caractere especial.");
        return false;
    }

    return true; // senha válida
}

    
// ===============================================  CREATE e UPDATE ======================================================
async function createOrUpdateItem() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const CPF = document.getElementById("CPF").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;

    // Verifique se todos os campos foram preenchidos e se eles têm o formato correto
    if (!name || !email || !senha || !CPF || !telefone || !endereco) {
        alert("Preencha todos os campos.");
        return;
    }
    if (name.length < 3) {
        alert("O nome deve ter pelo menos 3 caracteres.");
        return;
    }
    if (!ValidarEmail(email)) {
        alert("O email deve ser válido.");
        return;
    }
    if (!validarSenha(senha)) {
        return;
    }
    if(!validarCPF(CPF)){
        alert("O CPF deve ser valido")
        return
    }
    if(!validarTelefone(telefone)){
        alert("O telefone deve ser valido")
        return
    }
    if(endereco.length < 3){
        alert("O endereco deve ter pelo menos 3 caracteres.")
        return
    }
// ===============================================  CREATE e UPDATE ======================================================
    try {
        let response;
        if (editingId !== null) {
            response = await fetch(`${API_URL}/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, senha, CPF, telefone, endereco}),
            });
            editingId = null;
        } else {
            response = await fetch(API_URL_REGISTRO, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, senha, CPF, telefone, endereco}),
            });
        }

        const message = await response.text();

        // Verifique se a solicitação foi bem-sucedida
        if (response.ok) {
            alert(message || "Conta criada com sucesso!");
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("senha").value = "";
            document.getElementById("CPF").value = "";
            document.getElementById("telefone").value = "";
            document.getElementById("endereco").value = "";
            document.getElementById("addButton").innerText = "Adicionar";
            redirecionar("login")
        } else {
            alert(`Erro: ${message}`);
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao processar a solicitação.");
    }
}

// ===============================================  DELETE ======================================================
async function deleteItem(id){
    await fetch(`${API_URL}/${id}`, {method: "DELETE"})
}

function editItem(id, name, email, senha){
    document.getElementById("name").value = name
    document.getElementById("email").value = email
    document.getElementById("senha").value = senha
    document.getElementById("addButton").innerText = "Atualizar"
    editingId = id
}

// ===============================================================================================================