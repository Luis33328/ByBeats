package com.luiggibeats.usuario.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.luiggibeats.beat.modelo.Beat;

@Entity
@Table(name = "USUARIO", indexes= {@Index(name = "usernameindex", columnList = "guidUsuario", unique = true)})
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "GUID_USUARIO")
    private Integer guidUsuario;

    @Column(name = "EMAIL")
	private String email;

    @Column(name = "LOGIN")
    private String login;
    
    @Column(name = "SENHA")
    private String senha;
    
    @Column(name = "ROLE")
    private String role;
    
    @Column(name = "IMAGEM")
    private String imagem;
    
    @Column(name = "OTP")
	private Integer otp;
    
    
    @Column(name = "NOME")
    private String nome;

    @Column(name = "SOBRENOME")
    private String sobrenome;
    
    @Column(name = "CPF")
    private String cpf;
    
    @Column(name = "SOBRE")
    private String sobre;
    
    
    public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSobrenome() {
		return sobrenome;
	}

	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getSobre() {
		return sobre;
	}

	public void setSobre(String sobre) {
		this.sobre = sobre;
	}

	public Beat[] getCarrinho() {
		return carrinho;
	}

	public void setCarrinho(Beat[] carrinho) {
		this.carrinho = carrinho;
	}

	public String getImagem() {
		return imagem;
	}

	public void setImagem(String imagem) {
		this.imagem = imagem;
	}

	@Column(name = "CARRINHO")
    private Beat[] carrinho;
    
	
	public Integer getOtp() {return otp;}

	public void setOtp(Integer otp) {
		this.otp = otp;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Integer getGuidUsuario() {
		return guidUsuario;
	}

	public void setGuidUsuario(Integer guidUsuario) {
		this.guidUsuario = guidUsuario;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}



}
