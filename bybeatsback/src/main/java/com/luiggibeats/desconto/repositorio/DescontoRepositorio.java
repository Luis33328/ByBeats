package com.luiggibeats.desconto.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luiggibeats.desconto.modelo.Desconto;

public interface DescontoRepositorio extends JpaRepository<Desconto, Integer> {

}
