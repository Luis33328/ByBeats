package com.luiggibeats.desconto.modelo;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "DESCONTOS")
public class Desconto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "GUID_DESCONTO")
    private Integer guidDesconto;
    
    @Column(name = "NOME")
    private String nome;

    @Column(name = "PORCENTAGEM")
    private String porcentagem;
    
    

	public Integer getGuidDesconto() {
		return guidDesconto;
	}

	public void setGuidDesconto(Integer guidDesconto) {
		this.guidDesconto = guidDesconto;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getPorcentagem() {
		return porcentagem;
	}

	public void setPorcentagem(String porcentagem) {
		this.porcentagem = porcentagem;
	}

    
    


	
}
