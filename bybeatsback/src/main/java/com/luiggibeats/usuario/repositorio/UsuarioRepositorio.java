package com.luiggibeats.usuario.repositorio;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.luiggibeats.usuario.modelo.Usuario;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Integer> {

    @Query("SELECT u FROM Usuario u WHERE u.login = ?1")
    Optional<Usuario> findByLogin(String username);

}
