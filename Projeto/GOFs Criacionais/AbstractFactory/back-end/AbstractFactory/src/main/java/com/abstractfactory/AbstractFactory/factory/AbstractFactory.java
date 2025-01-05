package com.abstractfactory.AbstractFactory.factory;

import com.abstractfactory.AbstractFactory.service.ICadastro;
import com.abstractfactory.AbstractFactory.service.ILogin;

public abstract class AbstractFactory {
  public abstract ICadastro getCadastro(String tipo);
  public abstract ILogin getLogin(String tipo);
}

