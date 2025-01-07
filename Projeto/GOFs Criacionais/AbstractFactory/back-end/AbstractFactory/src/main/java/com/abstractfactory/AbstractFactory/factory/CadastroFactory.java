package com.abstractfactory.AbstractFactory.factory;


import com.abstractfactory.AbstractFactory.service.EmailCadastroService;
import com.abstractfactory.AbstractFactory.service.ICadastro;
import com.abstractfactory.AbstractFactory.service.ILogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CadastroFactory extends AbstractFactory {

  @Autowired
  private EmailCadastroService emailCadastroService;

  @Override
  public ICadastro getCadastro(String tipo) {
    if ("EMAIL".equalsIgnoreCase(tipo)) {
      return emailCadastroService;
    }
    throw new IllegalArgumentException("Tipo de cadastro não suportado: " + tipo);
  }

  @Override
  public ILogin getLogin(String tipo) {
    return null;
  }
}