package com.luiggibeats.pedido.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luiggibeats.pedido.modelo.OrderProduct;
import com.luiggibeats.pedido.repositorio.OrderProductRepositorio;


@Service
public class OrderProductServico {
	
	
	@Autowired
    private OrderProductRepositorio orderProductRepositorio;


    public OrderProduct create(OrderProduct orderProduct) {
        return this.orderProductRepositorio.save(orderProduct);
    }
	
}
