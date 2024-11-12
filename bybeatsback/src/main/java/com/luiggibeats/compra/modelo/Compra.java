package com.luiggibeats.compra.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.luiggibeats.beat.modelo.Beat;
import com.luiggibeats.pedido.modelo.Pedido;
import com.luiggibeats.usuario.modelo.Usuario;

@Entity
@Table(name = "COMPRA")
public class Compra {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "GUID_COMPRA")
    private Integer guidCompra;
    
    /*@OneToOne
    @Column(name = "BEAT")
    private Beat beat;*/
    
    @OneToOne
    private Beat beat;
    
    @OneToOne
    //@Column(name = "USUARIO")
    private Usuario usuario;
    
    @Column(name = "LICENCA")
    private String licenca;
    
    @OneToOne
    private Pedido pedido;
    
    
    
 

	public Pedido getPedido() {
		return pedido;
	}

	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}

	public Compra() {
    	
    }
    
    public Compra(Beat beat, Usuario user, String licenca, Pedido pedido) {
    	this.beat = beat;
    	this.usuario = user;
    	this.licenca = licenca;
    	this.pedido = pedido;
    }
    
    
	public Integer getGuidCompra() {
		return guidCompra;
	}
	public void setGuidCompra(Integer guidCompra) {
		this.guidCompra = guidCompra;
	}
	public Beat getBeat() {
		return beat;
	}
	public String getLicenca() {
		return licenca;
	}

	public void setLicenca(String licenca) {
		this.licenca = licenca;
	}

	public void setBeat(Beat beat) {
		this.beat = beat;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
    
    

    
    


	
}
