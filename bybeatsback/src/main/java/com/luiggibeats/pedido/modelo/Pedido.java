package com.luiggibeats.pedido.modelo;

import java.util.Date;

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
import com.luiggibeats.usuario.modelo.Usuario;

@Entity
@Table(name = "PEDIDO")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "GUID_PEDIDO")
    private Integer guidPedido;
    
    /*@OneToOne
    @Column(name = "BEAT")
    private Beat beat;*/
    
    @OneToOne
    //@Column(name = "USUARIO")
    private Usuario usuario;
    
    @Column(name = "TOTAL")
    private String total;
    
 
    @Column(name = "DATA_PEDIDO")
    private Date dataPedido;
    
    
 

	public Pedido() {
    	
    }
    

	public Integer getGuidPedido() {
		return guidPedido;
	}


	public void setGuidPedido(Integer guidPedido) {
		this.guidPedido = guidPedido;
	}


	public String getTotal() {
		return total;
	}


	public void setTotal(String total) {
		this.total = total;
	}


	public Date getDataPedido() {
		return dataPedido;
	}


	public void setDataPedido(Date dataPedido) {
		this.dataPedido = dataPedido;
	}


	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
    
    

    
    


	
}
