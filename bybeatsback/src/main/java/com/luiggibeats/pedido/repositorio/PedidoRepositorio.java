package com.luiggibeats.pedido.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luiggibeats.beat.modelo.Beat;
import com.luiggibeats.carrinho.modelo.Carrinho;
import com.luiggibeats.compra.modelo.Compra;
import com.luiggibeats.pedido.modelo.Pedido;
import com.luiggibeats.usuario.modelo.Usuario;

public interface PedidoRepositorio extends JpaRepository<Pedido, Integer> {
	
	public List<Pedido> findByUsuario(Usuario user);
	

}
