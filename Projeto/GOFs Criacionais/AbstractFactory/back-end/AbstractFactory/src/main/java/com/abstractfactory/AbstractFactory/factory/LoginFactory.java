package com.abstractfactory.AbstractFactory.factory;

import com.abstractfactory.AbstractFactory.service.EmailLoginService;
import com.abstractfactory.AbstractFactory.service.GoogleLoginService;
import com.abstractfactory.AbstractFactory.service.ICadastro;
import com.abstractfactory.AbstractFactory.service.ILogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LoginFactory extends AbstractFactory {

  @Autowired
  private EmailLoginService emailLoginService;

  @Autowired
  private GoogleLoginService googleLoginService;


  @Override
  public ICadastro getCadastro(String tipo) {
    return null;
  }

  @Override
  public ILogin getLogin(String tipo) {
    if ("EMAIL".equalsIgnoreCase(tipo)) {
      return emailLoginService;
    } else if ("GOOGLE".equalsIgnoreCase(tipo)) {
      return googleLoginService;
    }
    throw new IllegalArgumentException("Tipo de login não suportado: " + tipo);
  }
}