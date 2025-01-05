package com.abstractfactory.AbstractFactory.factory;


import com.abstractfactory.AbstractFactory.service.EmailCadastroService;
import com.abstractfactory.AbstractFactory.service.ICadastro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CadastroFactory {

  @Autowired
  private EmailCadastroService emailCadastroService;

  public ICadastro getCadastro(String tipo) {
    if ("EMAIL".equalsIgnoreCase(tipo)) {
      return emailCadastroService;
    }
    throw new IllegalArgumentException("Tipo de cadastro não suportado: " + tipo);
  }
}