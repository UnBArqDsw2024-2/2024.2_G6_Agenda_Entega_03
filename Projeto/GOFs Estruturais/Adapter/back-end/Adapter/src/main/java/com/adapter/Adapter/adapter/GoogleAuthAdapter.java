package com.adapter.Adapter.adapter;


import com.adapter.Adapter.model.Usuario;
import com.adapter.Adapter.repository.UsuarioRepository;
import com.adapter.Adapter.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class GoogleAuthAdapter implements AuthService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public GoogleAuthAdapter(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public boolean login(String email, String senha) {
        if (email != null && email.endsWith("@gmail.com")) {
            Usuario usuario = usuarioRepository.findByEmail(email);

            if (usuario != null) {
                return true;
            } else {
                usuario = new Usuario();
                usuario.setEmail(email);
                usuario.setTipo("GOOGLE");
                usuarioRepository.save(usuario);
                return true;
            }
        } else {
            return false;
        }
    }

    @Override
    public boolean register(Usuario usuario) {
        return false;

    }
}
