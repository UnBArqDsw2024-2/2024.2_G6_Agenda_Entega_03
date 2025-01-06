package com.adapter.Adapter.controller;


import com.adapter.Adapter.adapter.EmailAuthAdapter;
import com.adapter.Adapter.adapter.GoogleAuthAdapter;
import com.adapter.Adapter.model.Usuario;
import com.adapter.Adapter.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final EmailAuthAdapter emailAuthAdapter;
    private final GoogleAuthAdapter googleAuthAdapter;

    @Autowired
    public AuthController(EmailAuthAdapter emailAuthAdapter, GoogleAuthAdapter googleAuthAdapter) {
        this.emailAuthAdapter = emailAuthAdapter;
        this.googleAuthAdapter = googleAuthAdapter;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(
            @RequestParam String nome,
            @RequestParam String email,
            @RequestParam String senha,
            @RequestParam String tipo) {

        Usuario usuario = new Usuario();
        usuario.setNome(nome);
        usuario.setEmail(email);
        usuario.setSenha(senha);
        usuario.setTipo(tipo);

        AuthService authService;
        if ("EMAIL".equals(tipo)) {
            authService = emailAuthAdapter;
        } else {
            return ResponseEntity.badRequest().body("Tipo de autenticação inválido.");
        }

        boolean registrado = authService.register(usuario);

        if (registrado) {
            return ResponseEntity.ok("Usuário cadastrado com sucesso!");
        } else {
            return ResponseEntity.badRequest().body("Erro: email já está cadastrado.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestParam String email,
            @RequestParam String senha,
            @RequestParam String tipo) {

        AuthService authService;
        if ("EMAIL".equals(tipo)) {
            authService = emailAuthAdapter;
        } else if ("GOOGLE".equals(tipo)) {
            authService = googleAuthAdapter;
        } else {
            return ResponseEntity.badRequest().body("Tipo de autenticação inválido.");
        }

        boolean autenticado = authService.login(email, senha);

        if (autenticado) {
            return ResponseEntity.ok("Login realizado com sucesso!");
        } else {
            return ResponseEntity.status(401).body("Credenciais inválidas.");
        }
    }
}
