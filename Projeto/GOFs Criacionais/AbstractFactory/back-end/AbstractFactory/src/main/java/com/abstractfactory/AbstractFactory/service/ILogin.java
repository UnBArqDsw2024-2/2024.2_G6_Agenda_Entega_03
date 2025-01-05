package com.abstractfactory.AbstractFactory.service;

public interface ILogin {
  boolean logar(String email, String senha);
  boolean logarComGoogle(String email);

}
