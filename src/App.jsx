import React, { useState } from 'react';
import './App.css';

function App() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [clienteEditado, setClienteEditado] = useState(null);

  const mudaNome = (event) => {
    setNome(event.target.value);
  };

  const mudaEmail = (event) => {
    setEmail(event.target.value);
  };

  const mudaTele = (event) => {
    
    const newValue = event.target.value;
    if (newValue.length <= 15) {
      setTelefone(formatPhoneNumber(newValue));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const novoCliente = {
      nome: nome,
      email: email,
      telefone: telefone
    };

    setClientes([...clientes, novoCliente]);
    setNome('');
    setEmail('');
    setTelefone('');
  };

  const removeClient = (nome) => {
    const updatedClients = clientes.filter((cliente) => cliente.nome !== nome);
    setClientes(updatedClients);
  };

  const handleEditarCliente = (index) => {
    const cliente = clientes[index];
    setNome(cliente.nome);
    setEmail(cliente.email);
    setTelefone(cliente.telefone);
    setClienteEditado(index);
  };

  const handleSalvarEdicao = () => {
    const clienteAtualizado = {
      nome: nome,
      email: email,
      telefone: telefone
    };

    const clientesAtualizados = [...clientes];
    clientesAtualizados[clienteEditado] = clienteAtualizado;
    setClientes(clientesAtualizados);

    setNome('');
    setEmail('');
    setTelefone('');
    setClienteEditado(null);
  };

  function formatPhoneNumber(value) {
    const cleanedValue = value.replace(/\D/g, '');

    let formattedValue = '';
    for (let i = 0; i < cleanedValue.length; i++) {
      if (i === 0) formattedValue += '(';
      if (i === 2) formattedValue += ') ';
      if (i === 7) formattedValue += '-';
      formattedValue += cleanedValue[i];
    }
    return formattedValue;
  }

  return (
    <div className="container">
      <h1>Cadastro de Clientes</h1>
      <form className='formu' onSubmit={handleSubmit}>
        <div className='nome'>
          <label>
            Nome:
            <input type="text" value={nome} onChange={mudaNome} required />
          </label>
        </div>
        <div className='email'>
          <label>
            Email:
            <input type="email" value={email} onChange={mudaEmail} required />
          </label>
        </div>
        <div>
          <label className='tele'>
            Telefone:
            <input type="tel" value={telefone} onChange={mudaTele} required />
          </label>
        </div>
        <button className='cadastro' type="submit">Cadastrar</button>
      </form>
      <h2>Clientes Cadastrados:</h2>
      {clientes.map((cliente, index) => (
        <div key={index}>
          {clienteEditado === index ? (
            <div>
              <div className='nome'>
                <label>
                  Nome:
                  <input type="text" value={nome} onChange={mudaNome} required />
                </label>
              </div>
              <div className='email'>
                <label>
                  Email:
                  <input type="email" value={email} onChange={mudaEmail} required />
                </label>
              </div>
              <div>
                <label className='tele'>
                  Telefone:
                  <input type="tel" value={telefone} onChange={mudaTele} required />
                </label>
              </div>
              <button className='salvar' onClick={handleSalvarEdicao}>Salvar</button>
            </div>
          ) : (
            <div>
              <p>Nome: {cliente.nome}</p>
              <p>Email: {cliente.email}</p>
              <p>Telefone: {cliente.telefone}</p>
              <button className='delete' onClick={() => removeClient(cliente.nome)}>DELETAR</button>
              <button className='edita' onClick={() => handleEditarCliente(index)}>Editar</button>
            </div>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
