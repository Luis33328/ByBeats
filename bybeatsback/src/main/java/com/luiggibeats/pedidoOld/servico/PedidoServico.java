package com.luiggibeats.pedido.servico;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;

import org.apache.commons.io.IOUtils;
//import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.luiggibeats.beat.modelo.Beat;
import com.luiggibeats.pedido.modelo.Pedido;
import com.luiggibeats.pedido.repositorio.PedidoRepositorio;
import com.luiggibeats.util.excecao.BusinessException;
import com.luiggibeats.util.excecao.BusinessExceptionCode;

@Service
public class PedidoServico {

    @Autowired
    private PedidoRepositorio pedidoRepositorio;

    public List<Pedido> listar() throws BusinessException {
        return this.pedidoRepositorio.findAll();
    }
    
    /*public List<Pedido> listarDesc() throws BusinessException {
        return this.pedidoRepositorio.findAllByOrderByGuidBeatDesc();
    }*/

    public Page<Pedido> listarPage(Pageable pageable) throws Exception {
        return this.pedidoRepositorio.findAll(pageable);
    }

    public Pedido buscarPorId(Integer id) throws BusinessException {
        return this.pedidoRepositorio.findById(id)
                .orElseThrow(() -> new BusinessException(BusinessExceptionCode.BEAT_NAO_ENCONTRADO));
    }

    public Pedido atualizar(Pedido pedido) throws BusinessException {
        return this.salvar(pedido);
    }

    public void deletar(Integer id) throws BusinessException {
        this.pedidoRepositorio.deleteById(id);
    }

    public Pedido salvar(Pedido pedido) throws BusinessException {

	    	/*if (StringUtils.isEmpty(beat.getTitulo())) {
	            throw new BusinessException(BusinessExceptionCode.TITULO_OBRIGATORIO);
	        }
            if (StringUtils.isEmpty(beat.getImagem())) {
                throw new BusinessException(BusinessExceptionCode.IMAGEM_OBRIGATORIO);
            }
            if (StringUtils.isEmpty(beat.getWavUntagged())) {
                throw new BusinessException(BusinessExceptionCode.WAV_UNTAGGED_OBRIGATORIO);
            }*/

    	pedido.setData(LocalDate.now());


        return this.pedidoRepositorio.save(pedido);
    }

}
