package com.luiggibeats.beat.repositorio;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luiggibeats.beat.modelo.Beat;
import com.luiggibeats.carrinho.modelo.Carrinho;
import com.luiggibeats.usuario.modelo.Usuario;

public interface BeatRepositorio extends JpaRepository<Beat, Integer> {
	
	public List<Beat> findAllByOrderByGuidBeatDesc();
	
	public List<Beat> findByUsuario(Usuario user);
	
	public List<Beat> findAllByDataLancamentoLessThanEqual(LocalDateTime localDateTime);
}
