package com.luiggibeats.carrinho.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luiggibeats.beat.modelo.Beat;
import com.luiggibeats.carrinho.modelo.Carrinho;
import com.luiggibeats.usuario.modelo.Usuario;

public interface CarrinhoRepositorio extends JpaRepository<Carrinho, Integer> {
	
	public List<Carrinho> findByUsuario(Usuario user);
	
	public Carrinho findByUsuarioAndBeat(Usuario user, Beat beat);
}
