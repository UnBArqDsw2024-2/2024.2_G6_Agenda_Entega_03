package com.state.State.entity;

import com.state.State.state.AtivoState;
import com.state.State.state.LembreteStateInterface;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import java.util.Date;

@Entity
public class Lembrete {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mensagem;

    private Date dataHora;

    @Transient
    private LembreteStateInterface estado;

    public Lembrete(String mensagem, Date dataHora) {
        this.mensagem = mensagem;
        this.dataHora = dataHora;
        this.estado = new AtivoState();  // Inicia com o estado Ativo
    }

    // Getter e Setter para mensagem
    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    // Getter e Setter para dataHora
    public Date getDataHora() {
        return dataHora;
    }

    public void setDataHora(Date dataHora) {
        this.dataHora = dataHora;
    }

    public LembreteStateInterface getEstado() {
        return estado;
    }

    public void setEstado(LembreteStateInterface estado) {
        this.estado = estado;
    }

    public void executarAcoes() {
        estado.executarAcoes(this);
    }

    public Long getId() {
        return id;
    }
}
