package com.luiggibeats.pedido.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luiggibeats.pedido.modelo.OrderProduct;
import com.luiggibeats.pedido.modelo.OrderProductPK;

public interface OrderProductRepositorio extends JpaRepository<OrderProduct, OrderProductPK> {
	

}
