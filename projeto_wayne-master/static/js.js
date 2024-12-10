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
document.addEventListener('DOMContentLoaded', () => {
  carregarFuncionarios();
  carregarItens();
  carregarSalas();
});

// Função para carregar funcionários
async function carregarFuncionarios() {
  try {
      const response = await fetch('/usuarios');
      const funcionarios = await response.json();
      const tbody = document.querySelector('#funcionarios-table tbody');
      tbody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

      funcionarios.forEach(funcionario => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td><input type="text" value="${funcionario.NM_USUARIO}" data-id="${funcionario.ID_USUARIO}" /></td>
              <td><input type="text" value="${funcionario.CPF}" /></td>
              <td>
                  <select>
                      <option value="1" ${funcionario.NVL_ACESSO === 1 ? 'selected' : ''}>Funcionário</option>
                      <option value="2" ${funcionario.NVL_ACESSO === 2 ? 'selected' : ''}>Gerente</option>
                      <option value="3" ${funcionario.NVL_ACESSO === 3 ? 'selected' : ''}>Administrado</option>
                  </select>
              </td>
              <td>
                  <button class="btn" onclick="salvarFuncionario(${funcionario.ID_USUARIO})">Salvar</button>
                  <button class="btn" onclick="deletarFuncionario(${funcionario.ID_USUARIO})">Deletar</button>
              </td>
          `;
          tbody.appendChild(row);
      });
  } catch (error) {
      console.error('Erro ao carregar funcionários:', error);
  }
}

// Função para carregar itens
async function carregarItens() {
try {
      const response = await fetch('/itens');
      const itens = await response.json();
      const tbody = document.querySelector('#itens-table tbody');
      tbody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

      itens.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td><input type="text" value="${item.NOME_ITEM}" data-id="${item.ID_ITEM}" /></td>
              <td><input type="text" value="${item.NUMERO_SERIE}" /></td>
              <td><input type="text" value="${item.ID_SALA}" /></td>
              <td>
                  <button class="btn" onclick="salvarItem(${item.ID_ITEM})">Salvar</button>
                  <button class="btn" onclick="deletarItem(${item.ID_ITEM})">Deletar</button>
              </td>
          `;
          tbody.appendChild(row);
      });
  } catch (error) {
      console.error('Erro ao carregar itens:', error);
  }
}

// Função para carregar salas
async function carregarSalas() {
  try {
      const response = await fetch('/salas');
      const salas = await response.json();
      const tbody = document.querySelector('#salas-table tbody');
      tbody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

      salas.forEach(sala => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td><input type="text" value="${sala.NOME_SALA}" data-id="${sala.ID_SALA}" /></td>
              <td>
                  <select>
                      <option value="1" ${sala.NVL_ACESSO === 1 ? 'selected' : ''}>Funcionário</option>
                      <option value="2" ${sala.NVL_ACESSO === 2 ? 'selected' : ''}>Gerente</option>
                      <option value="3" ${sala.NVL_ACESSO === 3 ? 'selected' : ''}>Administrado</option>
                  </select>
              </td>
              <td>
                  <button class="btn" onclick="salvarSala(${sala.ID_SALA})">Salvar</button>
                  <button class="btn" onclick="deletarSala(${sala.ID_SALA})">Deletar</button>
              </td>
          `;
          tbody.appendChild(row);
      });
  } catch (error) {
      console.error('Erro ao carregar salas:', error);
  }
}

// Função para salvar as alterações do funcionário
async function salvarFuncionario(id) {
  const row = document.querySelector(`input[data-id="${id}"]`).closest('tr');
  const nome = row.querySelector('input[type="text"]').value;
  const cpf = row.querySelectorAll('input[type="text"]')[1].value;
  const nivelAcesso = row.querySelector('select').value;

  try {
      const response = await fetch(`/usuarios/alter/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ NM_USUARIO: nome, CPF: cpf, NVL_ACESSO: nivelAcesso })
      });

      if (response.ok) {
          alert('Funcionário salvo com sucesso!');
          carregarFuncionarios(); // Recarrega a tabela após salvar
      } else {
          const errorData = await response.json();
          alert('Erro ao salvar funcionário: ' + errorData.error);
      }
  } catch (error) {
      console.error('Erro ao salvar funcionário:', error);
      alert('Erro ao salvar funcionário.');
  }
}

// Função para deletar o funcionário
async function deletarFuncionario(id) {
  const confirmDelete = confirm("Tem certeza que deseja deletar este funcionário?");
  if (confirmDelete) {
      try {
          const response = await fetch(`/usuarios/delete/${id}`, {
              method: 'POST',
          });

          if (response.ok) {
              alert('Funcionário deletado com sucesso!');
              carregarFuncionarios(); // Recarrega a tabela após a exclusão
          } else {
              const errorData = await response.json();
              alert('Erro ao deletar funcionário: ' + errorData.error);
          }
      } catch (error) {
          console.error('Erro ao deletar funcionário:', error);
          alert('Erro ao deletar funcionário.');
      }
  }
}

// Função para salvar as alterações do item
async function salvarItem(id) {
  const row = document.querySelector(`input[data-id="${id}"]`).closest('tr');
  const nomeItem = row.querySelector('input[type="text"]').value;
  const numeroSerie = row.querySelectorAll('input[type="text"]')[1].value;
  const idSala = row.querySelectorAll('input[type="text"]')[2].value;

  try {
      const response = await fetch(`/inventario/alter/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ NOME_ITEM: nomeItem, NUMERO_SERIE: numeroSerie, ID_SALA: idSala })
      });

      if (response.ok) {
          alert('Item salvo com sucesso!');
          carregarItens(); // Recarrega a tabela após salvar
      } else {
          const errorData = await response.json();
          alert('Erro ao salvar item: ' + errorData.error);
      }
  } catch (error) {
      console.error('Erro ao salvar item:', error);
      alert('Erro ao salvar item.');
  }
}

// Função para deletar o item
async function deletarItem(id) {
  const confirmDelete = confirm("Tem certeza que deseja deletar este item?");
  if (confirmDelete) {
      try {
          const response = await fetch(`/inventario/delete/${id}`, {
              method: 'POST',
          });

          if (response.ok) {
              alert('Item deletado com sucesso!');
              carregarItens(); // Recarrega a tabela após a exclusão
          } else {
              const errorData = await response.json();
              alert('Erro ao deletar item: ' + errorData.error);
          }
      } catch (error) {
          console.error('Erro ao deletar item:', error);
          alert('Erro ao deletar item.');
      }
  }
}

// Função para salvar as alterações da sala
async function salvarSala(id) {
  const row = document.querySelector(`input[data-id="${id}"]`).closest('tr');
  const nomeSala = row.querySelector('input[type="text"]').value;
  const nivelAcesso = row.querySelector('select').value;

  try {
      const response = await fetch(`/salas/alter/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ NOME_SALA: nomeSala, NVL_ACESSO: nivelAcesso })
      });

      if (response.ok) {
          alert('Sala salva com sucesso!');
          carregarSalas(); // Recarrega a tabela após salvar
      } else {
          const errorData = await response.json();
          alert('Erro ao salvar sala: ' + errorData.error);
      }
  } catch (error) {
      console.error('Erro ao salvar sala:', error);
      alert('Erro ao salvar sala.');
  }
}

// Função para deletar a sala
async function deletarSala(id) {
  const confirmDelete = confirm("Tem certeza que deseja deletar esta sala?");
  if (confirmDelete) {
      try {
          const response = await fetch(`/salas/delete/${id}`, {
              method: 'POST',
          });

          if (response.ok) {
              alert('Sala deletada com sucesso!');
              carregarSalas(); // Recarrega a tabela após a exclusão
          } else {
              const errorData = await response.json();
              alert('Erro ao deletar sala: ' + errorData.error);
          }
      } catch (error) {
          console.error('Erro ao deletar sala:', error);
          alert('Erro ao deletar sala.');
      }
  }
}







// Função para carregar dados de funcionários
async function carregarFuncionarios() {
  const response = await fetch('/usuarios');
  const funcionarios = await response.json();
  const tbody = document.querySelector('#funcionarios-table tbody');
  tbody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados
  funcionarios.forEach(funcionario => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td><input type="text" value="${funcionario.NM_USUARIO}" data-id="${funcionario.ID_USUARIO}" /></td>
          <td><input type="text" value="${funcionario.CPF}" /></td>
          <td><input type="text" value="${funcionario.NVL_ACESSO}" /></td>
          <td>
              <button class="btn" onclick="editarFuncionario(${funcionario.ID_USUARIO})">Editar</button>
              <button class="btn" onclick="salvar Funcionario(${funcionario.ID_USUARIO})">Salvar</button>
              <button class="btn" onclick="deletarFuncionario(${funcionario.ID_USUARIO})">Deletar</button>
          </td>
      `;
      tbody.appendChild(row);
  });
}

// Função para editar funcionário
function editarFuncionario(id) {
  console.log(`Editando funcionário com ID: ${id}`);
}

// Função para salvar funcionário
async function salvarFuncionario(id) {
  const row = document.querySelector(`input[data-id="${id}"]`).closest('tr');
  const nome = row.querySelector('input[type="text"]').value;
  const cpf = row.querySelectorAll('input[type="text"]')[1].value;
  const nivelAcesso = row.querySelectorAll('input[type="text"]')[2].value;

  const response = await fetch(`/usuarios/alter/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ NM_USUARIO: nome, CPF: cpf, NIVEL_ACESSO: nivelAcesso })
  });

  if (response.ok) {
      alert('Funcionário salvo com sucesso!');
      carregarFuncionarios(); // Recarrega a tabela após salvar
  } else {
      alert('Erro ao salvar funcionário.');
  }
}

// Função para deletar funcionário
async function deletarFuncionario(id) {
  const confirmDelete = confirm("Tem certeza que deseja deletar este funcionário?");
  if (confirmDelete) {
      const response = await fetch(`/usuarios/delete/${id}`, {
          method: 'POST',
      });

      if (response.ok) {
          alert('Funcionário deletado com sucesso!');
          carregarFuncionarios(); // Recarrega a tabela após a exclusão
      } else {
          alert('Erro ao deletar funcionário.');
      }
  }
}
// Função para carregar dados de itens
async function carregarItens() {
  try {
      const response = await fetch('/inventario');
      if (!response.ok) {
          throw new Error('Erro ao carregar itens: ' + response.statusText);
      }
      const itens = await response.json();
      const tbody = document.querySelector('#itens-table tbody');
      tbody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

      itens.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${item.DE_RECURSO}</td>
              <td>${item.NR_SERIE}</td>
              <td>${item.ID_SALA}</td>
              <td>
                  <button class="btn" onclick="editarItem(${item.ID_RECURSO})">Editar</button>
                  <button class="btn" onclick="deletarItem(${item.ID_RECURSO})">Deletar</button>
              </td>
          `;
          tbody.appendChild(row);
      });
  } catch (error) {
      console.error('Erro ao carregar itens:', error);
  }
}
// Chame a função ao carregar a página
window.onload = function() {
  carregarFuncionarios();
  carregarItens(); // Certifique-se de que esta linha está presente
};

// Função para editar item
function editarItem(id) {
  console.log(`Editando item com ID: ${id}`);
  // Implemente a lógica para editar o item
}

// Função para deletar item
async function deletarItem(id) {
  const confirmDelete = confirm("Tem certeza que deseja deletar este item?");
  if (confirmDelete) {
      const response = await fetch(`/inventario/delete/${id}`, {
          method: 'POST',
      });

      if (response.ok) {
          alert('Item deletado com sucesso!');
          carregarItens(); // Recarrega a tabela após a exclusão
      } else {
          alert('Erro ao deletar item.');
      }
  }
}

// Chame a função ao carregar a página
window.onload = function() {
  carregarFuncionarios();
};