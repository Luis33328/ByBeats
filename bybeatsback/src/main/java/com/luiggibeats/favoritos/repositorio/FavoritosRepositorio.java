package com.luiggibeats.favoritos.repositorio;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luiggibeats.beat.modelo.Beat;
import com.luiggibeats.carrinho.modelo.Carrinho;
import com.luiggibeats.favoritos.modelo.Favoritos;
import com.luiggibeats.usuario.modelo.Usuario;

public interface FavoritosRepositorio extends JpaRepository<Favoritos, Integer> {
	
	public List<Favoritos> findByUsuario(Usuario user);
	
	public Favoritos findByUsuarioAndBeat(Usuario user, Beat beat);
	
	@Transactional
	public void deleteByUsuarioAndBeat(Usuario user, Beat beat);
}
