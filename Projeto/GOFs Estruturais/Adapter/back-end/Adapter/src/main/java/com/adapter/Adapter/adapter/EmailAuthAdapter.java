package com.adapter.Adapter.adapter;

import com.adapter.Adapter.model.Usuario;
import com.adapter.Adapter.repository.UsuarioRepository;
import com.adapter.Adapter.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class EmailAuthAdapter implements AuthService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public EmailAuthAdapter(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public boolean login(String email, String senha) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        return usuario != null && senha.equals(usuario.getSenha());
    }

    @Override
    public boolean register(Usuario usuarioRequest) {
        if (usuarioRepository.findByEmail(usuarioRequest.getEmail()) != null) {
            return false;
        }
        Usuario usuario = new Usuario();
        usuario.setNome(usuarioRequest.getNome());
        usuario.setEmail(usuarioRequest.getEmail());
        usuario.setSenha(usuarioRequest.getSenha());
        usuario.setTipo("EMAIL");
        usuarioRepository.save(usuario);
        return true;
    }
}
