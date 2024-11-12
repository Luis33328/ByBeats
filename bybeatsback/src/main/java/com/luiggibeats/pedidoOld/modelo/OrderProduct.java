package com.luiggibeats.pedido.modelo;

import java.beans.Transient;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.criteria.Order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.luiggibeats.beat.modelo.Beat;


@Entity
public class OrderProduct {

    @EmbeddedId
    @JsonIgnore
    private OrderProductPK pk;

    //@Column(nullable = false)
	//private Integer quantity;

    // default constructor

    public OrderProduct(Pedido order, Beat beat) {
        pk = new OrderProductPK();
        pk.setPedido(order);
        pk.setBeat(beat);
    }

    @Transient
    public Beat getBeat() {
        return this.pk.getBeat();
    }

    @Transient
    public Double getTotalPrice() {
        return Double.valueOf(getBeat().getPrecoBasic());
    }

    public OrderProductPK getPk() {
        return pk;
    }

    public void setPk(OrderProductPK pk) {
        this.pk = pk;
    }

    /*public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }*/

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((pk == null) ? 0 : pk.hashCode());

        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        OrderProduct other = (OrderProduct) obj;
        if (pk == null) {
            if (other.pk != null) {
                return false;
            }
        } else if (!pk.equals(other.pk)) {
            return false;
        }

        return true;
    }
	
}
