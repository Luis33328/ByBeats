package com.luiggibeats.pedido.modelo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "PEDIDO")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "GUID_PEDIDO")
    private Long guidPedido;
    
    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(name = "DATA")
    private LocalDate data;
    
	@Column(name = "status")
    private String status;

    @JsonManagedReference
    @OneToMany(mappedBy = "pk.pedido")
    @Valid
    private List<OrderProduct> orderProducts = new ArrayList<>();

    @Transient
    public Double getTotalOrderPrice() {
        double sum = 0D;
        List<OrderProduct> orderProducts = getOrderProducts();
        for (OrderProduct op : orderProducts) {
            sum += op.getTotalPrice();
        }
        return sum;
    }
    

   

    public Long getGuidPedido() {
		return guidPedido;
	}

	public void setGuidPedido(Long guidPedido) {
		this.guidPedido = guidPedido;
	}

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<OrderProduct> getOrderProducts() {
		return orderProducts;
	}

	public void setOrderProducts(List<OrderProduct> orderProducts) {
		this.orderProducts = orderProducts;
	}



    @Transient
    public int getNumberOfProducts() {
        return this.orderProducts.size();
    }

    // standard getters and setters

	
}
