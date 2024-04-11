package com.luiggibeats.beat.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luiggibeats.beat.modelo.Beat;

public interface BeatRepositorio extends JpaRepository<Beat, Integer> {
	
	public List<Beat> findAllByOrderByGuidBeatDesc();
}
