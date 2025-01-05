package com.abstractfactory.AbstractFactory.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Usuario {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String nome;
  private String email;
  private String senha;
  private String tipo; // "EMAIL" ou "GOOGLE"
  private String googleId; // ID do Google

  // Getters e Setters
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getNome() { return nome; }
  public void setNome(String nome) { this.nome = nome; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public String getSenha() { return senha; }
  public void setSenha(String senha) { this.senha = senha; }
  public String getTipo() { return tipo; }
  public void setTipo(String tipo) { this.tipo = tipo; }
  public String getGoogleId() { return googleId; }
  public void setGoogleId(String googleId) { this.googleId = googleId; }
}