package com.abstractfactory.AbstractFactory.service;

import com.abstractfactory.AbstractFactory.model.Usuario;
import com.abstractfactory.AbstractFactory.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoogleLoginService implements ILogin {

  @Autowired
  private UsuarioRepository repository;

  @Override
  public boolean logar(String email, String senha) {
    return false;
  }

  @Override
  public boolean logarComGoogle(String email) {
    if (email != null && email.endsWith("@gmail.com")) {
      Usuario usuario = repository.findByEmail(email);

      if (usuario != null) {
        return true;
      } else {
        usuario = new Usuario();
        usuario.setEmail(email);
        usuario.setTipo("GOOGLE");
        repository.save(usuario);
        return true;
      }
    } else {
      return false;
    }
  }
}