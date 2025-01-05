package com.abstractfactory.AbstractFactory.service;

import com.abstractfactory.AbstractFactory.model.Usuario;
import com.abstractfactory.AbstractFactory.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailCadastroService implements ICadastro {

  @Autowired
  private UsuarioRepository repository;

  @Override
  public void cadastrar(String nome, String email, String senha) {
    if (repository.findByEmail(email) != null) {
      throw new RuntimeException("Usuário já cadastrado");
    }
    Usuario usuario = new Usuario();
    usuario.setNome(nome);
    usuario.setEmail(email);
    usuario.setSenha(senha);
    usuario.setTipo("EMAIL");
    repository.save(usuario);
  }
}
