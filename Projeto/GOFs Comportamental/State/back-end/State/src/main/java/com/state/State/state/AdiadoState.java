package com.state.State.state;

import com.state.State.entity.Lembrete;
import java.util.Calendar;

public class AdiadoState implements LembreteStateInterface {

    @Override
    public void executarAcoes(Lembrete lembrete) {
        System.out.println("Lembrete Adiado: O lembrete foi adiado para um novo horário.");

        // Lógica para lembrete adiado
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(lembrete.getDataHora());
        calendar.add(Calendar.HOUR, 2); // Adiar o lembrete em 2 horas
        lembrete.setDataHora(calendar.getTime());

        System.out.println("Novo horário do lembrete: " + lembrete.getDataHora());
    }
}