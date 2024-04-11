package com.luiggibeats.carrinho.modelo;

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
@Table(name = "CARRINHO")
public class Carrinho {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "GUID_CARRINHO")
    private Integer guidCarrinho;
    
    /*@OneToOne
    @Column(name = "BEAT")
    private Beat beat;*/
    
    @OneToOne
    private Beat beat;
    
    @OneToOne
    //@Column(name = "USUARIO")
    private Usuario usuario;
    
    @Column(name = "PRECO_BEAT")
    private String precoBeat;
    
    
    
    public String getPrecoBeat() {
		return precoBeat;
	}

	public void setPrecoBeat(String precoBeat) {
		this.precoBeat = precoBeat;
	}

	public Carrinho() {
    	
    }
    
    public Carrinho(Beat beat, Usuario user, String price) {
    	this.beat = beat;
    	this.usuario = user;
    	this.precoBeat = price;
    }
    
    
	public Integer getGuidCarrinho() {
		return guidCarrinho;
	}
	public void setGuidCarrinho(Integer guidCarrinho) {
		this.guidCarrinho = guidCarrinho;
	}
	public Beat getBeat() {
		return beat;
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
