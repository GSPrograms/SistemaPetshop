const API_URL_PRIVATE = "http://localhost:3000/api/private"

/* escolher numero randomicamente*/
function NumeroRandomico(max) {
    const numero = Math.floor(Math.random() * max)
    return numero
}
/* escolher imagem de animal randomicamente e criar <img> dentro do <div class="animais">*/
async function escolherAnimal() {
    while (true) {
        const animaisDiv = document.getElementById("animais")
        const animais = ["gato.jpeg", "cachorro.jpg", "ourico.jpeg", "peixe.webp", "papagaio.jpeg"]
        const textos = ["Banho e Tosa com os melhores veterinários para seu pet arrazar", "Vacinação para seu pet se manter saudável", "Corte de Unhas para seu pet se sentir bem", "Adote Pets e a vida se torna mais feliz"]
        const numero = NumeroRandomico(animais.length)
        const textoramdomico = NumeroRandomico(textos.length)
        const animal = "../imagens/" + animais[numero]
        const img = document.createElement("img")
        const texto = document.createElement("p")   
        texto.textContent = textos[textoramdomico]
        img.src = animal
        img.classList.add("img")
        img.style.width = "500px"
        img.style.height = "300px"
        animaisDiv.appendChild(img)
        animaisDiv.appendChild(texto)
        /* aguardar*/
        await new Promise(resolve => setTimeout(resolve, 10000));
        animaisDiv.innerHTML = "";

    }
}

escolherAnimal()

function verificarAutenticacao() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado!');
      window.location.href = "login.html";
      return;
    }
  
    console.log("Fazendo fetch...");
    fetch(API_URL_PRIVATE, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => {
      console.log("Verificando autenticação...");
      if (!res.ok) throw new Error("Token inválido ou expirado");
      return res.json();
    })
    .then(data => {
      console.log("Autenticação verificada com sucesso!");
      console.log(data.message);
    })
    .catch(err => {
      console.error('Erro:', err);
      alert('Token inválido ou expirado!');
      localStorage.removeItem('token');
      window.location.href = "login.html";
    });
  }
  function redirecionar(rota) {
    window.location.href = rota + ".html";
  }
  verificarAutenticacao()

  function logout() {
    localStorage.removeItem('token');
    window.location.href = "login.html";
  }