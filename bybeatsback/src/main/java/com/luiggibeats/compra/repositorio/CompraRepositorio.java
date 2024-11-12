package com.luiggibeats.compra.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luiggibeats.beat.modelo.Beat;
import com.luiggibeats.carrinho.modelo.Carrinho;
import com.luiggibeats.compra.modelo.Compra;
import com.luiggibeats.usuario.modelo.Usuario;

public interface CompraRepositorio extends JpaRepository<Compra, Integer> {
	
	public List<Compra> findByUsuario(Usuario user);
	
	public Carrinho findByUsuarioAndBeat(Usuario user, Beat beat);
}
