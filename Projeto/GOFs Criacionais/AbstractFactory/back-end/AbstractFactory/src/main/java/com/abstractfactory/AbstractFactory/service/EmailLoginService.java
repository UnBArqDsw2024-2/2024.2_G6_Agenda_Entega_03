package com.abstractfactory.AbstractFactory.service;

import com.abstractfactory.AbstractFactory.model.Usuario;
import com.abstractfactory.AbstractFactory.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailLoginService implements ILogin {

  @Autowired
  private UsuarioRepository repository;

  @Override
  public boolean logar(String email, String senha) {
    Usuario usuario = repository.findByEmail(email);
    return usuario != null && usuario.getSenha().equals(senha);
  }

  @Override
  public boolean logarComGoogle(String email) {
    return false;
  }

}
