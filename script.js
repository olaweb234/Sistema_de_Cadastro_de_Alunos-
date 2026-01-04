let listarjs = []
let editarindece = null

function calcular() {
    const nome = document.getElementById('nome').value.trim()
    const nota1 = parseFloat(document.getElementById('nota1').value)
    const nota2 = parseFloat(document.getElementById('nota2').value)
    const listahtml = document.getElementById('minha_lista')

    if (nome === '' || !isNaN(nome)) {
        alert('Digite um nome válido')
        return
    }

    if (isNaN(nota1) || isNaN(nota2)) {
        alert('Digite as notas')
        return
    }

    if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
        alert('Notas devem ser entre 0 e 10')
        return
    }

    const media = (nota1 + nota2) / 2
    let situacao, cor

    if (media >= 7) {
        situacao = 'Aprovado'
        cor = '#27ae60'
    } else if (media >= 5) {
        situacao = 'Recuperação'
        cor = '#f39c12'
    } else {
        situacao = 'Reprovado'
        cor = '#e74c3c'
    }

    const aluno = {
        nome,
        nota1,
        nota2,
        media: media.toFixed(2),
        situacao,
        cor
    }

    if (editarindece !== null) {
        listarjs[editarindece] = aluno
        renderizarLista()
        editarindece = null
    } else {
        listarjs.push(aluno)
        renderizarLista()
    }

    limparCampos()
}
function renderizarLista() {
    const listahtml = document.getElementById('minha_lista')
    listahtml.innerHTML = ''

    listarjs.forEach((aluno, index) => {
        const li = document.createElement('li')

        li.innerHTML = `
            <div><strong>Nome:</strong> ${aluno.nome}</div>
            <div>Nota 1: ${aluno.nota1}</div>
            <div>Nota 2: ${aluno.nota2}</div>
            <div>Média: ${aluno.media}</div>
            <div style="color:${aluno.cor}">${aluno.situacao}</div>
        `

        const editarBtn = document.createElement('button')
        editarBtn.textContent = 'Editar'
        editarBtn.onclick = () => {
            document.getElementById('nome').value = aluno.nome
            document.getElementById('nota1').value = aluno.nota1
            document.getElementById('nota2').value = aluno.nota2
            editarindece = index
        }

        const deletarBtn = document.createElement('button')
        deletarBtn.textContent = 'Deletar'
        deletarBtn.onclick = () => {
            listarjs.splice(index, 1)
            renderizarLista()
        }

        li.appendChild(editarBtn)
        li.appendChild(deletarBtn)
        listahtml.appendChild(li)
    })
    document.getElementById('nome').value = ''
    document.getElementById('nota1').value = ''
    document.getElementById('nota2').value = ''

}

