const API_URL = 'http://localhost:3000/api/RegistrarPet'


async function loadImages() {
    const res = await fetch(API_URL)
    const images = await res.json()
    images.forEach(img => {
        const container = document.createElement('div')
        container.style.display = "inline-block"
        container.style.margin = "10px"
        container.innerHTML = `
            <img src="http://localhost:3000/${img.filepath}" alt="${img.filename}" style="width:150px; display:block;">
            <button onclick="editImage(${img.id})">Editar</button>
            <button onclick="deleteImage(${img.id})">Excluir</button>
        `
        gallery.appendChild(container)
    })
}

async function editImage(id) {
    document.getElementById('imageId').value = id
    alert("Selecione uma nova imagem para substituir a atual e clique em 'Enviar Imagem'.")
}

async function deleteImage(id) {
    if (!confirm("Deseja realmente excluir esta imagem?")) return
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    loadImages()
}

loadImages()