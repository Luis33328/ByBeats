package com.luiggibeats.favoritos.modelo;

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
@Table(name = "FAVORITOS")
public class Favoritos {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "GUID_CARRINHO")
    private Integer guidFavoritos;
   
    
    @OneToOne
    private Beat beat;
    
    @OneToOne
    private Usuario usuario;
    
    

	public Favoritos() {
    	
    }
    
    public Favoritos(Beat beat, Usuario user) {
    	this.beat = beat;
    	this.usuario = user;
    }
    
    
	
	public Beat getBeat() {
		return beat;
	}
	public void setBeat(Beat beat) {
		this.beat = beat;
	}
	public Integer getGuidFavoritos() {
		return guidFavoritos;
	}

	public void setGuidFavoritos(Integer guidFavoritos) {
		this.guidFavoritos = guidFavoritos;
	}

	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
    
    

    
    


	
}
