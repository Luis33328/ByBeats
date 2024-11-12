package com.luiggibeats.pedido.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luiggibeats.beat.modelo.Beat;
import com.luiggibeats.pedido.modelo.Pedido;

public interface PedidoRepositorio extends JpaRepository<Pedido, Integer> {
	

}
