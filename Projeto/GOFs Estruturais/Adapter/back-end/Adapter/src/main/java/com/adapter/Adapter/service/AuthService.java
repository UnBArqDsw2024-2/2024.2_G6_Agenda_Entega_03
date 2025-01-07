package com.adapter.Adapter.service;

import com.adapter.Adapter.model.Usuario;

public interface AuthService {
    boolean login(String email, String senha);
    boolean register(Usuario usuario);
}
