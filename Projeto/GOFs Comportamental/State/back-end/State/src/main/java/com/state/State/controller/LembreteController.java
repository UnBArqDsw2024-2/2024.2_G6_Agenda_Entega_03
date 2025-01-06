package com.state.State.controller;

import com.state.State.entity.Lembrete;
import com.state.State.state.LembreteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lembrete")
public class LembreteController {

    @Autowired
    private LembreteService lembreteService;

    // Criar lembrete
    @PostMapping
    public ResponseEntity<String> criarLembrete(@RequestParam String mensagem, @RequestParam String dataHora) {
        try {
            Lembrete lembrete = lembreteService.criarLembrete(mensagem, dataHora);
            return new ResponseEntity<>("Lembrete criado com sucesso! Id do lembrete: " + lembrete.getId(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao criar lembrete: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> obterLembrete(@PathVariable Long id) {
        try {
            Lembrete lembrete = lembreteService.obterLembrete(id);
            if (lembrete != null) {
                return new ResponseEntity<>("Lembrete encontrado: " + lembrete, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Lembrete com ID " + id + " não encontrado.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao obter lembrete: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizarLembrete(@PathVariable Long id, @RequestParam String mensagem, @RequestParam String dataHora) {
        try {
            Lembrete lembrete = lembreteService.atualizarLembrete(id, mensagem, dataHora);
            if (lembrete != null) {
                return new ResponseEntity<>("Lembrete atualizado com sucesso: " + lembrete, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Lembrete com ID " + id + " não encontrado.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao atualizar lembrete: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
