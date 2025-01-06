package com.state.State.state;

import com.state.State.entity.Lembrete;

public class ExpiradoState implements LembreteStateInterface {

    @Override
    public void executarAcoes(Lembrete lembrete) {
        System.out.println("Lembrete Expirado: O lembrete expirou e não pode ser mais alterado.");

        // Lógica para lembrete expirado
        System.out.println("O lembrete expirou na data " + lembrete.getDataHora());
    }
}