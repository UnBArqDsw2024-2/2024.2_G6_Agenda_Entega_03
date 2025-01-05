package com.abstractfactory.AbstractFactory.controller;


import com.abstractfactory.AbstractFactory.factory.CadastroFactory;
import com.abstractfactory.AbstractFactory.factory.LoginFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

  private final CadastroFactory cadastroFactory;
  private final LoginFactory loginFactory;

  @Autowired
  public UsuarioController(CadastroFactory cadastroFactory, LoginFactory loginFactory) {
    this.cadastroFactory = cadastroFactory;
    this.loginFactory = loginFactory;
  }

  @PostMapping("/cadastrar")
  public ResponseEntity<?> cadastrar(
      @RequestParam String nome,
      @RequestParam String email,
      @RequestParam String senha,
      @RequestParam String tipo) {
    try {
      cadastroFactory.getCadastro(tipo).cadastrar(nome, email, senha);
      return ResponseEntity.ok("Usuário cadastrado com sucesso!");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(
      @RequestParam String email,
      @RequestParam(required = false) String senha,
      @RequestParam String tipo) {
    try {
      boolean resultado;

      if ("GOOGLE".equalsIgnoreCase(tipo)) {
        // Loga com Google
        resultado = loginFactory.getLogin(tipo).logarComGoogle(email);
      } else {
        // Loga com as credenciais tradicionais
        resultado = loginFactory.getLogin(tipo).logar(email, senha);
      }

      return resultado
          ? ResponseEntity.ok("Login realizado com sucesso!")
          : ResponseEntity.status(401).body("Credenciais inválidas.");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }


}
