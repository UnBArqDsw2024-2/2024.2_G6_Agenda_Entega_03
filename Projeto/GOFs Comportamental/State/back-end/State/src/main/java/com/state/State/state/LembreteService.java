package com.state.State.state;

import com.state.State.entity.Lembrete;
import com.state.State.repository.LembreteRepository;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LembreteService {

    @Autowired
    private LembreteRepository lembreteRepository;

    public Lembrete criarLembrete(String mensagem, String dataHora) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date data = sdf.parse(dataHora);
            Lembrete lembrete = new Lembrete(mensagem, data);
            lembreteRepository.save(lembrete);
            lembrete.executarAcoes();  // Executa as ações com base no estado
            return lembrete;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Lembrete obterLembrete(Long id) {
        return lembreteRepository.findById(id).orElse(null);
    }

    public Lembrete atualizarLembrete(Long id, String mensagem, String dataHora) {
        try {
            Lembrete lembrete = lembreteRepository.findById(id).orElse(null);
            if (lembrete != null) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Date data = sdf.parse(dataHora);
                lembrete.setMensagem(mensagem);
                lembrete.setDataHora(data);
                lembreteRepository.save(lembrete);
                lembrete.executarAcoes();  // Executa as ações com base no estado
            }
            return lembrete;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}