package com.luiggibeats.beat.modelo;

import javax.persistence.*;

import com.luiggibeats.usuario.modelo.Usuario;

import java.util.Date;

@Entity
@Table(name = "BEATS", indexes= {@Index(name = "tituloindex", columnList = "titulo"), 
@Index(name = "guidBeatindex", columnList = "guidBeat", unique = true), 
@Index(name = "tagsindex", columnList = "tags")})
public class Beat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "GUID_BEAT")
    private Integer guidBeat;
    
    @Column(name = "TITULO")
    private String titulo;

    @Column(name = "NOTA")
    private String nota;

    @Column(name = "BPM")
    private String bpm;
    
    @Column(name = "IMAGEM")
    private String imagem;
    
    @Column(name = "DATA_LANCAMENTO")
    private Date dataLancamento;
    
    @Column(name = "TAGS")
    private String tags;
    
    @Column(name = "PRECO_BASIC")
    private String precoBasic;
    
    @Column(name = "PRECO_PREMIUM")
    private String precoPremium;
    
    @Column(name = "PRECO_UNLIMITED")
    private String precoUnlimited;
    
    @Column(name = "WAV_TAGGED")
    private String wavTagged;
    
    @Column(name = "WAV_UNTAGGED")
    private String wavUntagged;
    
    @Column(name = "STEMS")
    private String stems;
    
    @Column(name = "SELECTED")
    private Integer selected;

	@Column(name = "DISCOUNT")
	private Float discount;
    
    @OneToOne
    //@Column(name = "USUARIO")
    private Usuario usuario;

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Float getDiscount() {
		return discount;
	}

	public Float setDiscount() {
		return discount;
	}

	public Integer getSelected() {
		return selected;
	}

	public void setSelected(Integer selected) {
		this.selected = selected;
	}

	public Integer getGuidBeat() {
		return guidBeat;
	}

	public void setGuidBeat(Integer guidBeat) {
		this.guidBeat = guidBeat;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getNota() {
		return nota;
	}

	public void setNota(String nota) {
		this.nota = nota;
	}

	public String getBpm() {
		return bpm;
	}

	public void setBpm(String bpm) {
		this.bpm = bpm;
	}

	public String getImagem() {
		return imagem;
	}

	public void setImagem(String imagem) {
		this.imagem = imagem;
	}

	public Date getDataLancamento() {
		return dataLancamento;
	}

	public void setDataLancamento(Date dataLancamento) {
		this.dataLancamento = dataLancamento;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public String getPrecoBasic() {
		return precoBasic;
	}

	public void setPrecoBasic(String precoBasic) {
		this.precoBasic = precoBasic;
	}

	public String getPrecoPremium() {
		return precoPremium;
	}

	public void setPrecoPremium(String precoPremium) {
		this.precoPremium = precoPremium;
	}

	public String getPrecoUnlimited() {
		return precoUnlimited;
	}

	public void setPrecoUnlimited(String precoUnlimited) {
		this.precoUnlimited = precoUnlimited;
	}

	public String getWavTagged() {
		return wavTagged;
	}

	public void setWavTagged(String wavTagged) {
		this.wavTagged = wavTagged;
	}

	public String getWavUntagged() {
		return wavUntagged;
	}

	public void setWavUntagged(String wavUntagged) {
		this.wavUntagged = wavUntagged;
	}

	public String getStems() {
		return stems;
	}

	public void setStems(String stems) {
		this.stems = stems;
	}

	
}
