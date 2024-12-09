let tipo = ''
const baseURL = `${window.location.protocol}//${window.location.hostname}:3000`;

document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'NM_USUARIO': e.target[0].value,
          'SENHA': e.target[1].value
        })
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.redirect_url;
      } else {
        document.querySelector(".error").textContent = data.error
      }

    } catch (error) {
      console.log("Erro na requisição: ", error)
    }
  });

document.getElementById('cadastro-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  let response = ''
    try {
      if (tipo === 'Usuário') {
        response = await fetch(`${baseURL}/usuarios/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'NM_USUARIO': e.target[0].value,
          'CPF': e.target[1].value,
          'SENHA': e.target[2].value,
          'ID_FUNCAO': e.target[3].value
        })
      });
    } else if (tipo === 'Sala') {
        response = await fetch(`${baseURL}/salas/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'DE_SALA': e.target[0].value,
          'NVL_ACESSO': e.target[1].value
        })
      });
    } else if (tipo === 'Item') {
        response = await fetch(`${baseURL}/inventario/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'DE_RECURSO': e.target[0].value,
          'NR_SERIE': e.target[1].value,
          'ID_SALA': e.target[2].value
        })
      });
    }
    const data = await response.json();
    document.getElementById('cadastro-form').innerHTML = ''
    document.querySelector(".message").textContent = ''
    document.querySelector(".error").textContent = ''
    if (response.ok) {
      document.querySelector(".message").textContent = data.message
    } else {
      document.querySelector(".error").textContent = data.error
    }
    
  } catch (error) {
    console.log("Erro na requisição: ", error)
  }
});

async function buscarSalas() {
  let resp = await fetch(`${baseURL}/salas`, {method: 'GET'});
  let data = await resp.json();
  return data
}

document.getElementById('cadastro-btn')?.addEventListener('click', () => {window.location.href = '/cadastro'});

document.getElementById('editar-btn')?.addEventListener('click', () => {window.location.href = '/editar'});

document.getElementById('gerenciamento-btn')?.addEventListener('click', () => {window.location.href = '/gerenciamento'});

document.getElementById('user-btn')?.addEventListener('click', () => {
  const form = document.getElementById('cadastro-form')
  form.innerHTML = ''
  
  const lUser = document.createElement('label')
  lUser.textContent = 'Usuário'
  lUser.for = 'inputUsuario'
  lUser.className = 'label'

  const user = document.createElement('input')
  user.id = 'inputUsuario'
  user.placeholder = 'Digite aqui o nome do usuário'
  user.className = 'input'
  
  const lCPF = document.createElement('label')
  lCPF.textContent = 'CPF'
  lCPF.for = 'inputCPF'
  lCPF.className = 'label'

  const CPF = document.createElement('input')
  CPF.id = 'inputCPF'
  CPF.placeholder = 'Digite aqui o cpf do usuário'
  CPF.className = 'input'
  
  const lSenha = document.createElement('label')
  lSenha.textContent = 'Senha'
  lSenha.for = 'inputSenha'
  lSenha.className = 'label'

  const senha = document.createElement('input')
  senha.id = 'inputSenha'
  senha.placeholder = 'Digite aqui a senha do usuário'
  senha.className = 'input'
  
  const lNvlAcesso = document.createElement('label')
  lNvlAcesso.textContent = 'Função'
  lNvlAcesso.for = 'NvlAcesso'
  lNvlAcesso.className = 'label'

  const nvlAcesso = document.createElement('select')
  nvlAcesso.id = 'NvlAcesso'
  nvlAcesso.className = 'input'
  nvlAcesso.innerHTML = `
        <option value="1">Funcionário</option>
        <option value="2">Gerente</option>
        <option value="3">Administrado</option>
    `

  const btnSubmit = document.createElement('button')
  btnSubmit.textContent = 'Enviar'
  btnSubmit.type = 'submit'
  btnSubmit.id = 'btn-submit'
  btnSubmit.className = 'btn'
  
  form.appendChild(lUser)
  form.appendChild(user)
  form.appendChild(lCPF)
  form.appendChild(CPF)
  form.appendChild(lSenha)
  form.appendChild(senha)
  form.appendChild(lNvlAcesso)
  form.appendChild(nvlAcesso)
  form.appendChild(btnSubmit)
  tipo = 'Usuário'
  form.style = 'display: flex'
});

document.getElementById('room-btn')?.addEventListener('click', () => {
  const form = document.getElementById('cadastro-form')
  form.innerHTML = ''
 
  const lSala = document.createElement('label')
  lSala.textContent = 'Nome da Sala'
  lSala.for = 'inputSala'
  lSala.className = 'label'

  const Sala = document.createElement('input')
  Sala.id = 'inputSala'
  Sala.placeholder = 'Digite aqui o nome da sala'
  Sala.className = 'input'

  const lNvlAcesso = document.createElement('label')
  lNvlAcesso.textContent = 'Nível Acesso'
  lNvlAcesso.for = 'NvlAcesso'
  lNvlAcesso.className = 'label'

  const nvlAcesso = document.createElement('select')
  nvlAcesso.id = 'NvlAcesso'
  nvlAcesso.className = 'input'
  nvlAcesso.innerHTML = `
        <option value="1">1 - Funcionário</option>
        <option value="2">2 - Gerente</option>
        <option value="3">3 - Administrado</option>
  `

  const btnSubmit = document.createElement('button')
  btnSubmit.textContent = 'Enviar'
  btnSubmit.type = 'submit'
  btnSubmit.id = 'btn-submit'
  btnSubmit.className = 'btn'
    
  form.appendChild(lSala)
  form.appendChild(Sala)
  form.appendChild(lNvlAcesso)
  form.appendChild(nvlAcesso)
  form.appendChild(btnSubmit)
  tipo = 'Sala'
  form.style = 'display: flex'
});

document.getElementById('item-btn')?.addEventListener('click', () => {
  const form = document.getElementById('cadastro-form')
  form.innerHTML = ''
 
  const lItem = document.createElement('label')
  lItem.textContent = 'Nome do Item'
  lItem.for = 'inputItem'
  lItem.className = 'label'

  const item = document.createElement('input')
  item.id = 'inputItem'
  item.placeholder = 'Digite aqui o nome da Item'
  item.className = 'input'

  const lRef = document.createElement('label')
  lRef.textContent = 'Número de Referência'
  lRef.for = 'inputRef'
  lRef.className = 'label'

  const Ref = document.createElement('input')
  Ref.id = 'inputRef'
  Ref.placeholder = 'Digite aqui o número de referência'
  Ref.className = 'input'

  
  const lSala = document.createElement('label')
  lSala.textContent = 'Sala'
  lSala.for = 'Sala'
  lSala.className = 'label'
  
  const Sala = document.createElement('select')
  Sala.id = 'Sala'
  Sala.className = 'input'
  
  buscarSalas().then(
    (e) => {
      e.map(
        (d) => { 
          Sala.innerHTML = `${Sala.innerHTML}<option value="${d.ID_SALA}">${d.DE_SALA}</option>`
        }
      )
    }
  )

  const btnSubmit = document.createElement('button')
  btnSubmit.textContent = 'Enviar'
  btnSubmit.type = 'submit'
  btnSubmit.id = 'btn-submit'
  btnSubmit.className = 'btn'
    
  form.appendChild(lItem)
  form.appendChild(item)
  form.appendChild(lRef)
  form.appendChild(Ref)
  form.appendChild(lSala)
  form.appendChild(Sala)
  form.appendChild(btnSubmit)
  tipo = 'Item'
  form.style = 'display: flex'
});

// gerenciamento
async function carregarGerenciamento() {
  try {
    const salasResponse = await fetch(`${baseURL}/salas`);
    const itensResponse = await fetch(`${baseURL}/inventario`);
    const salas = await salasResponse.json();
    const itens = await itensResponse.json();

    const gerenciamento = document.getElementById('management-section');
    gerenciamento.innerHTML = '';

    salas.forEach(sala => {
      const salaDiv = document.createElement('div');
      salaDiv.className = 'sala';
      salaDiv.innerHTML = `
        <h3>Sala: ${sala.DE_SALA}</h3>
        <p>Nível de acesso: ${sala.NVL_ACESSO}</p>
        <ul id="itens-${sala.ID_SALA}"></ul>
      `;

      const salaItens = itens.filter(item => item.ID_SALA === sala.ID_SALA);
      const itensList = salaDiv.querySelector(`#itens-${sala.ID_SALA}`);
      
      salaItens.forEach(item => {
        const itemLi = document.createElement('li');
        itemLi.textContent = `${item.DE_RECURSO} (Nº Série: ${item.NR_SERIE})`;
        itensList.appendChild(itemLi);
      });

      gerenciamento.appendChild(salaDiv);
    });
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}

document.addEventListener('DOMContentLoaded', carregarGerenciamento);

//Editar itens de inventário
// Função para carregar itens na tabela
async function carregarItens() {
  try {
    const response = await fetch('/inventario'); // Altere a URL conforme necessário
    const itens = await response.json();
    
    const dataTable = document.getElementById('data-table');
    dataTable.innerHTML = ''; // Limpa a tabela antes de adicionar novos itens

    itens.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <span class="item-name" id="item-name-${item.ID_RECURSO}">${item.DE_RECURSO}</span>
          <input type="text" id="edit-input-${item.ID_RECURSO}" style="display:none;" placeholder="Novo nome" />
        </td>
        <td>
          <input type="text" id="nr-serie-input-${item.ID_RECURSO}" value="${item.NR_SERIE}" placeholder="Número de Série" />
        </td>
        <td>
          <input type="text" id="id-sala-input-${item.ID_RECURSO}" value="${item.ID_SALA}" placeholder="ID da Sala" />
        </td>
        <td>
          <button onclick="toggleEdit(${item.ID_RECURSO})">Editar</button>
          <button onclick="deletarItem(${item.ID_RECURSO})">Deletar</button>
        </td>
      `;
      dataTable.appendChild(row);
    });
  } catch (error) {
    console.error('Erro ao carregar itens:', error);
  }
}

// Função para alternar entre o modo de edição e o modo de visualização
function toggleEdit(id) {
  const itemName = document.getElementById(`item-name-${id}`);
  const editInput = document.getElementById(`edit-input-${id}`);

  if (editInput.style.display === "none") {
    // Muda para o modo de edição
    editInput.style.display = "block";
    editInput.value = itemName.textContent; // Preenche o campo de entrada com o valor atual
    itemName.style.display = "none"; // Esconde o nome do item
  } else {
    // Muda para o modo de visualização
    const newValue = editInput.value;
    itemName.textContent = newValue; // Atualiza o valor exibido
    itemName.style.display = "block"; // Mostra o nome do item
    editInput.style.display = "none"; // Esconde o campo de entrada

    // Aqui você pode adicionar a lógica para salvar a alteração no banco de dados
    salvarAlteracao(id, newValue);
  }
}

// Função para salvar a alteração no banco de dados
async function salvarAlteracao(id, novoNome) {
  // Aqui você deve coletar os outros campos necessários
  const nrSerie = document.getElementById(`nr-serie-input-${id}`).value; // Supondo que você tenha um input para o número de série
  const idSala = document.getElementById(`id-sala-input-${id}`).value; // Supondo que você tenha um input para o ID da sala

  try {
    const response = await fetch(`/inventario/alter/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ DE_RECURSO: novoNome, NR_SERIE: nrSerie, ID_SALA: idSala })
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.error);
    }
  } catch (error) {
    console.error('Erro ao salvar alteração:', error);
  }
}
// Função para deletar um item
async function deletarItem(id) {
  const confirmDelete = confirm("Tem certeza que deseja deletar este item?");
  if (confirmDelete) {
    try {
      const response = await fetch(`/inventario/delete/${id}`, {
        method: 'POST',
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        carregarItens(); // Recarrega a tabela de itens após a deleção
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Erro ao deletar item:', error);
    }
  }
}
//editar salas
// Função para carregar salas na tabela
async function carregarSalas() {
  try {
    const response = await fetch('/salas'); // Altere a URL conforme necessário
    const salas = await response.json();
    
    const salaTable = document.getElementById('sala-table');
    salaTable.innerHTML = ''; // Limpa a tabela antes de adicionar novas salas

    salas.forEach(sala => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <span class="sala-name" id="sala-name-${sala.ID_SALA}">${sala.DE_SALA}</span>
          <input type="text" id="edit-sala-input-${sala.ID_SALA}" style="display:none;" placeholder="Novo nome" />
        </td>
        <td>
          <input type="text" id="nvl-acesso-input-${sala.ID_SALA}" value="${sala.NVL_ACESSO}" placeholder="Nível de Acesso" />
        </td>
        <td>
          <button onclick="toggleEditSala(${sala.ID_SALA})">Editar</button>
          <button onclick="deletarSala(${sala.ID_SALA})">Deletar</button>
        </td>
      `;
      salaTable.appendChild(row);
    });
  } catch (error) {
    console.error('Erro ao carregar salas:', error);
  }
}
// Função para alternar entre o modo de edição e o modo de visualização para salas
function toggleEditSala(id) {
  const salaName = document.getElementById(`sala-name-${id}`);
  const editInput = document.getElementById(`edit-sala-input-${id}`);

  if (editInput.style.display === "none") {
    // Muda para o modo de edição
    editInput.style.display = "block";
    editInput.value = salaName.textContent; // Preenche o campo de entrada com o valor atual
    salaName.style.display = "none"; // Esconde o nome da sala
  } else {
    // Muda para o modo de visualização
    const newValue = editInput.value;
    salaName.textContent = newValue; // Atualiza o valor exibido
    salaName.style.display = "block"; // Mostra o nome da sala
    editInput.style.display = "none"; // Esconde o campo de entrada

    // Aqui você pode adicionar a lógica para salvar a alteração no banco de dados
    salvarAlteracaoSala(id, newValue);
  }
}

// Função para salvar a alteração da sala no banco de dados
async function salvarAlteracaoSala(id, novoNome) {
  const nvlAcesso = document.getElementById(`nvl-acesso-input-${id}`).value; // Coleta o nível de acesso

  try {
    const response = await fetch(`/salas/alter/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ DE_SALA: novoNome, NVL_ACESSO: nvlAcesso })
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.error);
    }
  } catch (error) {
    console.error('Erro ao salvar alteração da sala:', error);
  }
}
// Função para deletar uma sala
async function deletarSala(id) {
  const confirmDelete = confirm(" Você tem certeza de que deseja deletar esta sala?");
  if (confirmDelete) {
    try {
      const response = await fetch(`/salas/deletar/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        carregarSalas(); // Recarrega a tabela após a exclusão
      } else {
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      console.error('Erro ao deletar sala:', error);
    }
  }
}
document.getElementById('edit-btn').addEventListener('click', () => {
  const editMenu = document.getElementById('edit-menu');
  editMenu.classList.toggle('hidden'); // Alterna a visibilidade do menu de edição
});
document.getElementById('edit-room-btn').addEventListener('click', () => {
  // Lógica para editar sala
  // Por exemplo, redirecionar para a página de edição de salas
  window.location.href = '/editar-sala'; // Altere para a URL correta
});

document.getElementById('edit-item-btn').addEventListener('click', () => {
  // Lógica para editar item
  // Por exemplo, redirecionar para a página de edição de itens
  window.location.href = '/editar-item'; // Altere para a URL correta
});
// Chame a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarItens);