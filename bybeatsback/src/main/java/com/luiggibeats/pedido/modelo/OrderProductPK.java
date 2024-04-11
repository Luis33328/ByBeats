package com.luiggibeats.pedido.modelo;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.luiggibeats.beat.modelo.Beat;

@Embeddable
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "order")
public class OrderProductPK implements Serializable {

	private static final long serialVersionUID = 476151177562655457L;
	
    @JsonBackReference
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "GUID_PEDIDO")
    private Pedido pedido;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "GUID_BEAT")
    private Beat beat;
    
    

	public Pedido getPedido() {
		return pedido;
	}

	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}

	public Beat getBeat() {
		return beat;
	}

	public void setBeat(Beat beat) {
		this.beat = beat;
	}
	
	
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;

        result = prime * result + ((pedido.getGuidPedido() == null)
          ? 0
          : pedido
            .getGuidPedido()
            .hashCode());
        result = prime * result + ((beat.getGuidBeat() == null)
          ? 0
          : beat
            .getGuidBeat()
            .hashCode());

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
        OrderProductPK other = (OrderProductPK) obj;
        if (pedido == null) {
            if (other.pedido != null) {
                return false;
            }
        } else if (!pedido.equals(other.pedido)) {
            return false;
        }

        if (beat == null) {
            if (other.beat != null) {
                return false;
            }
        } else if (!beat.equals(other.beat)) {
            return false;
        }

        return true;
    }


	
}
