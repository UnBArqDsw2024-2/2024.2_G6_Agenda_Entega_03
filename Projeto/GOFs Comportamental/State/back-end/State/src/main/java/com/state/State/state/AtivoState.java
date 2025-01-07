package com.state.State.state;


import com.state.State.entity.Lembrete;
import java.util.Date;

public class AtivoState implements LembreteStateInterface {

    @Override
    public void executarAcoes(Lembrete lembrete) {
        System.out.println("Lembrete Ativo: O lembrete está ativo e pode ser reprocessado ou adiado.");

        // Lógica para lembrete ativo
        if (new Date().after(lembrete.getDataHora())) {
            System.out.println("Hora do lembrete chegou! Lembrete pode ser expirado.");
            lembrete.setEstado(new ExpiradoState());
        }
    }
}